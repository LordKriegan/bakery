module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    Item.associate = function(models) {
        models.Item.hasMany(models.Order, {
            onDelete: "cascade"
        });
    };

    return Item;
};