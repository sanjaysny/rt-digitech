module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            isEmail: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        isTnc: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "A",
        }
    });
    return Employee;
}