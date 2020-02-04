import Mail from '../../lib/Mail';

class FuncionalidadeExp {
    get key() {
        return 'NotificationMail';
    }

    async handle({ data }) {
        const {
            deliverymanExists: deliveryman,
            recipientExists: recipient,
            delivery,
        } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Nova encomenda disponível para retirada',
            template: 'notification',
            context: {
                deliveryman: deliveryman.name,
                product: delivery.product,
                name: recipient.destinatary_name,
                street: recipient.street,
                number: recipient.number,
                complement: recipient.complement,
                state: recipient.state,
                city: recipient.city,
                zipcode: recipient.zip_code,
            },
        });
    }
}

export default new FuncionalidadeExp();
