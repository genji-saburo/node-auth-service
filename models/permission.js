module.exports = function(db, DataTypes) {
    return db.define('Permission', {
        permission: {
            type: DataTypes.STRING,
            unique: true,
            notNull: true
        }
    });
};
