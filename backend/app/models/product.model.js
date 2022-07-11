module.exports = (sequelize, DataType) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataType.STRING,
      unique: true
    },
    description: {
      type: DataType.STRING
    },
    photo: {
      type: DataType.TEXT('long')
    },
    price: {
      type: DataType.FLOAT
    },
    status: {
      type: DataType.STRING,
      defaultValue: "A" //A is active
    },
    extraDetails:{
      type: DataType.JSON
    }
  });

  return Product;
};
