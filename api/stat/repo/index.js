import graphqlRequest from 'graphql-request';
import config from 'config';

const graphqlEndpoint = config.get('graphql.endpoint');

const client = new graphqlRequest.GraphQLClient(graphqlEndpoint, { headers: {} });

export default client;
