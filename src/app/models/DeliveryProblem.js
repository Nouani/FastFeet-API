import { Model, Sequelize } from 'sequelize';

class DeliveryProblem extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Delivery, {
            foreignKey: 'delivery_id',
        });
    }
}

export default DeliveryProblem;
