module.exports = function(db, DataTypes) {
    return db.define('Role', {
        role: {
            type: DataTypes.STRING,
            unique: true,
            notNull: true
        },
        permission: DataTypes.STRING
    });
};
