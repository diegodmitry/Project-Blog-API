module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
  }, {
    timestamps: false,
    tableName: 'Users',
  });
  // Se entendi correto de acordo com o site, https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento,
  // o relacionamento entre a tabela Users e BlogPosts é de 1:N.
  // Então acho que é necessário, associar a tabela Users com a tabela BlogPosts
  // userId é foreingKey dentro de BlogPosts
  // Source: https://sequelize.org/docs/v6/core-concepts/assocs/
  // BlogPost será criada no requesito à frente
  // Comentei pois estava dando erro na importação do User model para o service
  // Users.associate = (models) => {
  //   Users.hasMany(models.BlogPosts, { foreignKey: 'userId' });
  // };
  return Users;
}; 