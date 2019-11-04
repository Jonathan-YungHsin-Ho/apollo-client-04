import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_USER = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export default function AddUser() {
  let input;

  const [addUser] = useMutation(ADD_USER, {
    update(
      cache,
      {
        data: { addUser },
      },
    ) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.concat([addUser]) },
      });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    addUser({ variables: { name: input.value } });
    input.value = '';
  };

  return (
    <div className='form'>
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='...User'
          ref={node => {
            input = node;
          }}
        />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
}
