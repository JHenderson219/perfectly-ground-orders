import Sequelize from 'sequelize';
// ship date
// # of cases
// packets per case (25 or 50)
// notes (text)
// priority (bool) hasPriority

// has one coffee
// has one brew method

const workOrder = (sequelize, DataTypes) => {
  const WorkOrder = sequelize.define('workOrder', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    shipDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING
    },
    hasPriority: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    brewMethodID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'brewMethods',
        key: 'id',
      },
    },
    coffeeID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'coffees',
        key: 'id',
      },
    },
    caseTypeID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'caseTypes',
        key: 'id',
      },
    },
  })

  return WorkOrder;
}

export default workOrder;