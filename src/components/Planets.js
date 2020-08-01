import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['planets', page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error fetching planets</p>}
      {status === 'success' &&
        data.results.map((planet) => (
          <Planet key={planet.name} planet={planet} />
        ))}
    </div>
  );
};

export default Planets;
