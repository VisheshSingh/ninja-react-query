import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';

import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['planets', page],
    fetchPlanets
  );

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error fetching planets</p>}
      {status === 'success' && (
        <div>
          <button
            onClick={() => setPage((oldValue) => Math.max(oldValue - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((oldValue) =>
                !latestData || !latestData.next ? oldValue : oldValue + 1
              )
            }
            disabled={!latestData || !latestData.next}
          >
            Next Page
          </button>
          {resolvedData.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
