import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <NavLink to='/users'>Users</NavLink>
      <span> | </span>
      <NavLink to='/messages'>Messages</NavLink>
    </div>
  );
}
