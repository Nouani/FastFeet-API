import { Op } from 'sequelize';
import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
    async index(req, res) {
        const { page = 1, search = '' } = req.query;

        const deliverymen = await Deliveryman.findAll({
            where: {
                name: {
                    [Op.like]: `%${search}`,
                },
            },
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
            ],
        });

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

        const { email } = req.body;

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

        const deliveryman = await Deliveryman.create(req.body);

        return res.json(deliveryman);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id } = req.params;

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

        const { avatar_id } = req.body;

        const avatarExists = await File.findByPk(avatar_id);

        if (!avatarExists) {
            return res.status(404).json({ error: 'Avatar not found' });
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
