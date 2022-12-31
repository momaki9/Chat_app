import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;