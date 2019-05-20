import dayjs from 'dayjs';
import get from 'lodash.get';

export const formatShipDate = (props = {}) => {
  const { hasPriority, date } = props;
  const formattedDate = dayjs(date).format('MM/DD/YYYY')
  if (!hasPriority) {
    return formattedDate;
  }
  
  return `${formattedDate} *`;
}
export const formatOrderData = (order) => {
  const { 
    cases, 
    caseType, 
    shipDate, 
    orderNumber,
    coffee, 
    brewMethod, 
    hasPriority 
  } = order;
  const packets = get(caseType, 'capacity', null);
  const coffeeName = get(coffee, 'name', '');
  const brewMethodName = get(brewMethod, 'name', '');
  return {
    coffee: coffeeName,
    brewMethod: brewMethodName,
    cases,
    packets,
    shipDate: formatShipDate({date: shipDate, hasPriority}),
    orderNumber
  };
}

export const sortTableByShipDate = (tableData = []) => {
  const SHIP_DATE_INDEX = 4;
  
  return tableData.sort((a,b) => {
    const aDate = dayjs(a.data[SHIP_DATE_INDEX]);
    const bDate = dayjs(b.data[SHIP_DATE_INDEX]);
    if (aDate.isBefore(bDate)) {
      return -1;
    }
    return 1;
  })
}