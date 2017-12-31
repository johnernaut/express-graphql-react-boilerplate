import gql from 'graphql-tag';

const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
      name
      jwt
    }
  }
`;

const userLoginMutation = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
      jwt
    }
  }
`;

const userSignupMutation = gql`
  mutation signupUser(
    $name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
      password_confirmation: $password_confirmation
    ) {
      name
      email
      jwt
    }
  }
`;

export { currentUserQuery, userLoginMutation, userSignupMutation };
