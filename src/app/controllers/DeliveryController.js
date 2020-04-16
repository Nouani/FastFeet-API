import { Op } from 'sequelize';
import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import NotificationMail from '../jobs/NotificationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
    async index(req, res) {
        const { page = 1, search = '' } = req.query;

        const deliveries = await Delivery.findAll({
            where: {
                product: {
                    [Op.like]: `%${search}`,
                },
            },
            limit: 20,
            offset: (page - 1) * 20,
            attributes: [
                'id',
                'recipient_id',
                'deliveryman_id',
                'signature_id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
            ],
            include: [
                {
                    model: Recipient,
                    attributes: [
                        'destinatary_name',
                        'street',
                        'number',
                        'complement',
                        'state',
                        'city',
                        'zip_code',
                    ],
                },
                {
                    model: Deliveryman,
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                        },
                    ],
                    attributes: ['name', 'email'],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['name', 'path'],
                },
            ],
        });

        return res.json(deliveries);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { recipient_id } = req.body;
        const recipientExists = await Recipient.findByPk(recipient_id);

        if (!recipientExists) {
            return res.status(404).json({ error: 'Recipient not found' });
        }

        const { deliveryman_id } = req.body;
        const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

        if (!deliverymanExists) {
            return res.status(404).json({ error: 'Deliveryman not found' });
        }

        const delivery = await Delivery.create(req.body);

        await Queue.add(NotificationMail.key, {
            deliverymanExists,
            delivery,
            recipientExists,
        });

        return res.json(delivery);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            signature_id: Yup.number(),
            product: Yup.string(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id } = req.params;

        const delivery = await Delivery.findByPk(id);

        if (!delivery) {
            return res.status(404).json({ error: 'Delivery not found' });
        }

        const { recipient_id, deliveryman_id, signature_id } = req.body;

        if (recipient_id && delivery.recipient_id !== recipient_id) {
            const recipientExists = await Recipient.findByPk(recipient_id);

            if (!recipientExists) {
                return res.status(404).json({ error: 'Recipient not found' });
            }
        }

        if (deliveryman_id && delivery.deliveryman_id !== deliveryman_id) {
            const deliverymanExists = await Deliveryman.findByPk(
                deliveryman_id
            );

            if (!deliverymanExists) {
                return res.status(404).json({ error: 'Deliveryman not found' });
            }
        }

        if (signature_id && delivery.signature_id !== signature_id) {
            const signatureExists = await File.findByPk(signature_id);

            if (!signatureExists) {
                return res.status(404).json({ error: 'Signature not found' });
            }
        }

        const deliveryUpdated = await delivery.update(req.body);

        return res.json(deliveryUpdated);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const delivery = await Delivery.findByPk(id);

        if (!delivery) {
            return res.status(404).json({ error: 'Delivery not found' });
        }

        await delivery.destroy();

        return res.json({ message: 'Delivery removed with success' });
    }
}

export default new DeliveryController();
