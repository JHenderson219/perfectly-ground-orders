import gql from 'graphql-tag';

export default gql`
scalar Date

type WorkOrder {
    id: ID!
    brewMethod: BrewMethod!
    coffee: Coffee!
    shipDate: Date!
    cases: Int!
    caseType: CaseType!
    packets: Int!
    notes: String,
    hasPriority: Boolean!,
    number: Int!
}

type BrewMethod {
    id: ID!
    name: String!
}

type Coffee {
    id: ID!
    name: String!
}
type CaseType {
    id: ID!
    capacity: Int!
}

type Query {
    workOrders: [WorkOrder!]!
    brewMethods: [BrewMethod!]!
    coffees: [Coffee!]!
    caseTypes: [CaseType!]!
}

type Mutation {
    createWorkOrder(brewMethodID: ID!, coffeeID: ID!, shipDate: Date!, cases: Int!, caseTypeID: ID!, notes: String, hasPriority: Boolean): WorkOrder!
}
`