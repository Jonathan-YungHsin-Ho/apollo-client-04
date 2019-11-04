import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import AddMessage from './AddMessage';

const GET_MESSAGES = gql`
  query {
    messages {
      id
      message
      from
    }
  }
`;

export default function Messages() {
  const { loading, error, data } = useQuery(GET_MESSAGES);

  // console.log(data);

  return (
    <div>
      <h2>Messages</h2>
      <AddMessage />
      {loading && <p>Loading...</p>}
      {error && <p>Error! {error}</p>}
      <div className='messages-wrapper'>
        {data &&
          data.messages.map(message => (
            <div key={message.id} className='message'>
              <p>
                <span className='bold'>From:</span> {message.from}
              </p>
              <p>
                <span className='bold'>Message:</span> {message.message}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
