import gql from 'graphql-tag';

export const teams = gql`
  query Teams {
    teams {
      name
      players {
        id
        total_points
        web_name
        element_type
      }
    }
  }
`;

export default null;
