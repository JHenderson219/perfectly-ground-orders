  // aeropress
  // coffee maker
  // cold brew
  // french press
  // pour over
// id
const brewMethod = (sequelize, DataTypes) => {
  const BrewMethod = sequelize.define('brewMethod', {
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
  return BrewMethod;
}


export default brewMethod;