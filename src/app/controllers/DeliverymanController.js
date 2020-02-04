import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
    async index(req, res) {
        const deliverymen = await Deliveryman.findAll();

        return res.json(deliverymen);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { name, email } = req.body;

        const deliverymanExists = await Deliveryman.findOne({
            where: {
                email,
            },
        });

        if (deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman already exists.' });
        }

        const deliveryman = await Deliveryman.create({
            name,
            email,
        });

        return res.json(deliveryman);
    }

    async update(req, res) {
        const { id } = req.params;

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliveryman = await Deliveryman.findByPk(id);

        if (!deliveryman) {
            return res.status(404).json({ error: 'Deliveryman not found' });
        }

        const { email } = req.body;

        if (email && email !== deliveryman.email) {
            const devilerymanExists = await Deliveryman.findOne({
                where: {
                    email,
                },
            });

            if (devilerymanExists) {
                return res
                    .status(400)
                    .json({ error: 'Deliveryman already exists.' });
            }
        }

        const deliverymanUpdated = await deliveryman.update(req.body);

        return res.json(deliverymanUpdated);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const deliveryman = await Deliveryman.findByPk(id);

        if (!deliveryman) {
            return res.status(404).json({ error: 'Deliveryman not found' });
        }

        await deliveryman.destroy();

        return res.json({ message: 'Deliveryman deleteted with success' });
    }
}

export default new DeliverymanController();
