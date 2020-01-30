import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                destinatary_name: Sequelize.STRING,
                street: Sequelize.STRING,
                number: Sequelize.INTEGER,
                complement: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                zip_code: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
    }
}

export default Recipient;
