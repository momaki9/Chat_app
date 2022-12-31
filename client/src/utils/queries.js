import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
    query allUsers {
        users {
            _id
            username
            email
        }
    }
`;

export const QUERY_ONE_USER = gql`
    query oneUser($userId: ID!) {
        user(userId: userId) {
            username
            email
        }
    }
`;