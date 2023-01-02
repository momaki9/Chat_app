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
        user(userId: $userId) {
            username
            email
        }
    }
`;

export const QUERY_ALL_ROOMS = gql`
    query allRooms {
        rooms {
            _id
            category
        }
    }
`;

export const QUERY_ONE_ROOM = gql`
    query oneRoom($roomId: ID!) {
        room(roomId: $roomId) {
            _id
            category
        }
    }
`;