import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      info {
        count
      }
      results {
        id
        name
        image
        status
      }
    }
  }
`;
