module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        hash: {
            type: DataTypes.STRING(1500),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        models.User.hasMany(models.Order, {
            onDelete: "cascade"
        });
    };

    return User;
};