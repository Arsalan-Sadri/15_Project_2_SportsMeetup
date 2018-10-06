module.exports = function (sequelize, DataTypes) {
    var UserM = sequelize.define("UserM", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    UserM.associate = function (models) {
        UserM.hasMany(models.EventM, {
            onDelete: "cascade"
        });
    };

    return UserM;
};