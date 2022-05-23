
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, { // According to images Categories doesn't has timestamps
    timestamps: false,
    tableName: 'Categories',
  });
  return Categories;
};