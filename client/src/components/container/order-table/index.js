import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import MUIDataTable from "mui-datatables";
import {  sortTableByShipDate, formatTableData } from './utils';
const columns = [
  {name: "coffee", label: "Coffee"}, 
  {name: "brewMethod", label: "Method"}, 
  {name: "cases", label:"Number of Cases"}, 
  {name: "packets", label:"Packets per Case"},
  {name:"shipDate", label: "Ship Date", options: {sortDirection: 'asc'}},
  {name: "orderNumber", label:"Order"}
];
export const OrdersTable = (props = {}) => {
  const { result } = props;
  if (!result) {
    return 'Error! No result from query.';
  }
  const { loading, error, data } = result;
  if (loading) {
    return 'Loading orders...';
  }
  if (error) {
    return `Error! ${error}`
  }
  if (!data) {
    return 'Error! No data';
  }
  const tableData = formatTableData(data);
  const options = {
    customSort: sortTableByShipDate,
    rowsPerPage: 25,
    selectableRows: 'none',
    responsive: 'scroll',
    filter: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    rowsPerPageOptions: [10, 25, 50],
    sort: false,
  }
  console.log(tableData)
  return (
    <MUIDataTable options={options} columns={columns} title={"ORDERS"} 
      data={tableData} />
  )
}
const ORDERS = gql`
  query orders {
    workOrders {
      id
      caseType {
        id
        capacity
      }
      cases
      notes
      hasPriority
      shipDate
      orderNumber
      brewMethod {
        id
        name
      }
      coffee {
        id
        name
      }
    }
    coffees {
      id
      name
    }
    brewMethods {
      id
      name
    }
  }
`
const TableWrapper = () => {
  return(
    <Query query={ORDERS} >
    {(result) => {
      return (
        <OrdersTable result={result} />
      )
    }}
    </Query>
  )
}

export default TableWrapper

