import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $status: String) {
    characters(filter: { name: $name, status: $status }) {
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

export const GET_DETAIL_CHARACTER_BY_ID = gql`
  query GetDetailCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
      created
    }
  }
`;
