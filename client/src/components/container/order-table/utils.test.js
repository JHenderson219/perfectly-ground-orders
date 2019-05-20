import { formatShipDate, formatOrderData, sortTableByShipDate } from './utils';

describe('formatShipDate', () => {
  it('doesnt crash', () => {
    formatShipDate();
  })
  describe('given no priority', () =>  {
    it('doesnt render with a *', () => {
      expect(formatShipDate({date:'2019/01/01'})).not.toContain('*');
    })
  })
  describe('given a priority', () =>  {
    it('renders with a *', () => {
      expect(formatShipDate({date:'2019/01/01', hasPriority: true})).toContain('*');
    })
  })
})

describe('formatOrderData', () => {
  const order = {
    cases: 10,
    caseType: {
      capacity: 25
    },
    shipDate: '2019/01/01',
    orderNumber: 1,
    coffee: {
      name: 'test coffee'
    },
    brewMethod: {
      name: 'brew method test'
    },
    hasPriority: true,
  }
  it('flattens the order into the expected format', () => {
    const expected = {
      coffee: order.coffee.name,
      brewMethod: order.brewMethod.name,
      cases: order.cases,
      packets: order.caseType.capacity,
      shipDate: formatShipDate({date: order.shipDate, hasPriority: order.hasPriority}),
      orderNumber: order.orderNumber,
    }
    expect(formatOrderData(order)).toEqual(expected);
  })
})

describe('sortTableByShipDate', () => {
  // column index 4 is where shipDate data will be coming from
  const data = [
    {data: [null, null, null, null, '2019/01/03']},
    {data: [null, null, null, null, '2019/01/02']},
    {data: [null, null, null, null, '2019/01/01']},
  ];
  it('sorts ascending by date', () => {
    const expected = [
      {data: [null, null, null, null, '2019/01/01']},
      {data: [null, null, null, null, '2019/01/02']},
      {data: [null, null, null, null, '2019/01/03']},
    ];
    expect(sortTableByShipDate(data)).toEqual(expected);
  })
})