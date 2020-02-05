import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { delivery } = data;

        await Mail.sendMail({
            to: `${delivery.Deliveryman.name} <${delivery.Deliveryman.email}>`,
            subject: `Encomenda de ${delivery.product}`,
            template: 'cancellation',
            context: {
                deliveryman: delivery.Deliveryman.name,
                product: delivery.product,
                date: format(
                    parseISO(delivery.canceled_at),
                    "'dia' dd 'de' MMMM',' 'às' HH:mm'h'",
                    { locale: pt }
                ),
            },
        });
    }
}

export default new CancellationMail();
