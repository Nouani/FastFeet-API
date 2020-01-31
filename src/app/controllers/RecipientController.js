import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            destinatary_name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const recipientExists = await Recipient.findOne({
            where: { destinatary_name: req.body.destinatary_name },
        });

        if (recipientExists) {
            return res.status(400).json({ error: 'Recipient already exists.' });
        }

        const recipient = await Recipient.create(req.body);

        return res.json({ recipient });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            destinatary_name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        let recipient = await Recipient.findByPk(req.params.id);

        if (!recipient) {
            return res.status(400).json({ error: 'Recipient does not found' });
        }

        recipient = await recipient.update(req.body);

        return res.json(recipient);
    }
}

export default new RecipientController();
