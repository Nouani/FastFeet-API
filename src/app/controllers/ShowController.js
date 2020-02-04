import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class ShowController {
    async index(req, res) {
        const { delivered = 'false', page = 1 } = req.query;

        const { id } = req.params;

        const deliverymanExists = await Deliveryman.findByPk(id);

        if (!deliverymanExists) {
            return res.status(404).json({ error: 'Deliveryman not found' });
        }

        const deliveries = await Delivery.findAll({
            limit: 20,
            offset: (page - 1) * 20,
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: delivered === 'true' ? { [Op.ne]: null } : null,
            },
        });

        return res.json(deliveries);
    }
}

export default new ShowController();
