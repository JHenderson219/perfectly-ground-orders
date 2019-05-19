// name
  // bella donovan
  // giant steps
// id

const coffee = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('coffee', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: sequelize.UUIDV1,
    },
    name: {
      type: DataTypes.STRING
    }
  })

  return Coffee;

}
export default coffee;