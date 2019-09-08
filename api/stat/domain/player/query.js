import gql from 'graphql-tag';

export const player = gql`
  query Player {
    player(id: 1) {
      id
      first_name
      second_name
    }
  }
`;

export default null;
