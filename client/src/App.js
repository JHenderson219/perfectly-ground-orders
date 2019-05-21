import React from 'react';
import logo from './logo.svg';
import ApolloClient, { gql } from 'apollo-boost';
import CreateOrderDialog from './components/container/create-order-dialog';
import Table from './components/container/order-table';
import { ApolloProvider, Query } from 'react-apollo';
import Header from './components/presentation/header';
import ErrorSnackbar from './components/presentation/error-snackbar';
const client = new ApolloClient();

class App extends React.Component {
  state = {
    isModalOpen: false,
    error: null,
  }
  style = {
    app: {
      padding: '0 2em 0 2em'
    }
  }
  toggleModal = () => {
    const isModalOpen = !this.state.isModalOpen;
    this.setState({ isModalOpen });
  }
  onError = (error) => {
    this.setState({error})
    this.setState({ isModalOpen: false });
  }
  closeSnackbar = () => {
    this.setState({error: null});
  }
  render() {
    return (
      <div style={this.style.app}>
        <Header logo={logo} toggleModal={this.toggleModal} />
        <main style={this.style.main}>
          <ApolloProvider client={client}>
            <TableSectionWrapper 
            toggleModal={this.toggleModal} 
            isModalOpen={this.state.isModalOpen}
            onError={this.onError} />
            <ErrorSnackbar error={this.state.error} handleClose={this.closeSnackbar} />
          </ApolloProvider>
        </main>
      </div>
    );
  }
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
    caseTypes {
      id
      capacity
    }
  }
`
const TableSectionWrapper = (props) => {
  const { isModalOpen, toggleModal, onError } = props;
  return (
    <Query query={ORDERS}>
      {(result) => {
        return (
        <TableSection result={result} {...props} />)
      }}
    </Query>
  )
}


const TableSection = (props) => {
  const { isModalOpen, toggleModal, result, onError } = props;
  const { data, loading, error, refetch } = result
  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return `Error: ${error}`;
  }
  const onSave = () => {
    toggleModal();
    refetch();
  }
  return (
    <div>
      <Table />
      <CreateOrderDialog data={data} open={isModalOpen} onClose={toggleModal} 
      onSave={onSave} onError={onError}/>
    </div>
  )
}


export default App;
