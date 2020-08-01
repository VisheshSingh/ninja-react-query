import React from 'react';

const Navbar = ({ setPage }) => {
  return (
    <div>
      <button onClick={() => setPage('planets')}>Planets</button>
      <button onClick={() => setPage('people')}>People</button>
    </div>
  );
};

export default Navbar;
