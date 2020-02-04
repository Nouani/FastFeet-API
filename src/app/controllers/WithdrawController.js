import { Op } from 'sequelize';
import * as Yup from 'yup';
import { parseISO, isBefore, getHours, startOfDay, endOfDay } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class WithdrawController {
    async update(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { deliveryman_id, delivery_id } = req.params;

        const delivery = await Delivery.findByPk(delivery_id);
        if (!delivery) {
            return res.status(404).json({ error: 'Delivery not found' });
        }

        const deliveryman = await Deliveryman.findByPk(deliveryman_id);
        if (!deliveryman) {
            return res.status(404).json({ error: 'Deliveryman not found' });
        }

        if (delivery.start_date) {
            if (delivery.canceled_at || delivery.end_date) {
                return res.status(400).json({ error: 'Delivery closed' });
            }
            return res.status(400).json({ error: 'delivery already started' });
        }

        const { start_date } = req.body;
        const parsedDate = parseISO(start_date);

        if (isBefore(parsedDate, startOfDay(new Date()))) {
            return res.status(401).json({ error: 'Date invalid' });
        }

        if (getHours(parsedDate) <= 8 || getHours(parsedDate) >= 18) {
            return res.status(401).json({
                error:
                    'Schedule for withdraw available only between 08:00 and 18:00',
            });
        }

        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id,
                start_date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate),
                    ],
                },
            },
        });

        if (deliveries.length >= 5) {
            return res.status(400).json({
                error: 'Deliveryman already has 5 deliveries on the day.',
            });
        }

        const deliveryUpdated = await delivery.update(req.body);

        return res.json(deliveryUpdated);
    }
}

export default new WithdrawController();
