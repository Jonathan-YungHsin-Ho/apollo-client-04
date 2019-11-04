import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_MESSAGE = gql`
  mutation AddMessage($message: String!, $from: String!) {
    addMessage(message: $message, from: $from) {
      id
      message
      from
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      message
      from
    }
  }
`;

export default function AddMessage() {
  let message;
  let from;

  const [addMessage] = useMutation(ADD_MESSAGE, {
    update(
      cache,
      {
        data: { addMessage },
      },
    ) {
      const { messages } = cache.readQuery({ query: GET_MESSAGES });
      cache.writeQuery({
        query: GET_MESSAGES,
        data: { messages: messages.concat([addMessage]) },
      });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    addMessage({ variables: { from: from.value, message: message.value } });
    from.value = '';
    message.value = '';
  };

  return (
    <div className='form'>
      <h3>Add Message</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='...From'
          ref={node => {
            from = node;
          }}
        />
        <input
          placeholder='...Message'
          ref={node => {
            message = node;
          }}
        />
        <br />
        <button type='submit'>Add Message</button>
      </form>
    </div>
  );
}
