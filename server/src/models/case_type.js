
const caseType = (sequelize, DataTypes) => {
  const CaseType = sequelize.define('caseType', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: sequelize.UUIDV1,
    },
    capacity: {
      type: DataTypes.INTEGER
    }
  })

  return CaseType;

}
export default caseType;