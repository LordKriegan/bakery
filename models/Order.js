module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        orderNum: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        filled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Order.associate = function(models) {
        models.Order.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        models.Order.belongsTo(models.Item, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Order;
};