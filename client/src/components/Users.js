import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import AddUser from './AddUser';

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  // console.log(data);

  return (
    <div>
      <h2>Users</h2>
      <AddUser />
      {loading && <p>Loading...</p>}
      {error && <p>Error! {error}</p>}
      <div className='users-wrapper'>
        {data && data.users.map(user => <p key={user.id}>{user.name}</p>)}
      </div>
    </div>
  );
}
