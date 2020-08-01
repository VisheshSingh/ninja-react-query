import React from 'react';
import { useQuery } from 'react-query';

import Person from './Person';

const fetchPeople = async () => {
  const res = await fetch(`https://swapi.dev/api/people`);
  return res.json();
};

const People = () => {
  const { data, status } = useQuery('people', fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error fetching people</p>}
      {status === 'success' &&
        data.results.map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </div>
  );
};

export default People;
