import * as Yup from 'yup';

import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import Mail from '../../lib/Mail';

class PackageController {
    async index(req, res) {
        const packages = await Package.findAll();

        return res.json(packages);
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

        const packageCreated = await Package.create(req.body);

        await Mail.sendMail({
            to: `${deliverymanExists.name} <${deliverymanExists.email}>`,
            subject: 'Nova encomenda disponível para retirada',
            template: 'notification',
            context: {
                deliveryman: deliverymanExists.name,
                product: packageCreated.product,
                name: recipientExists.destinatary_name,
                street: recipientExists.street,
                number: recipientExists.number,
                complement: recipientExists.complement,
                state: recipientExists.state,
                city: recipientExists.city,
                zipcode: recipientExists.zip_code,
            },
        });

        return res.json(packageCreated);
    }

    async update(req, res) {
        const { id } = req.params;

        const packageSearched = await Package.findByPk(id);

        if (!packageSearched) {
            return res.status(404).json({ error: 'Package not found' });
        }

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

        const { recipient_id, deliveryman_id, signature_id } = req.body;

        if (recipient_id && packageSearched.recipient_id !== recipient_id) {
            const recipientExists = await Recipient.findByPk(recipient_id);

            if (!recipientExists) {
                return res.status(404).json({ error: 'Recipient not found' });
            }
        }

        if (
            deliveryman_id &&
            packageSearched.deliveryman_id !== deliveryman_id
        ) {
            const deliverymanExists = await Deliveryman.findByPk(
                deliveryman_id
            );

            if (!deliverymanExists) {
                return res.status(404).json({ error: 'Deliveryman not found' });
            }
        }

        if (signature_id && packageSearched.signature_id !== signature_id) {
            const signatureExists = await File.findByPk(signature_id);

            if (!signatureExists) {
                return res.status(404).json({ error: 'Signature not found' });
            }
        }

        const packageUpdated = await packageSearched.update(req.body);

        return res.json(packageUpdated);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const packageSearched = await Package.findByPk(id);

        if (!packageSearched) {
            return res.status(404).json({ error: 'Package not found' });
        }

        await packageSearched.destroy();

        return res.json({ message: 'Package removed with success' });
    }
}

export default new PackageController();
