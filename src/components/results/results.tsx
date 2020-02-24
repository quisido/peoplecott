import fuzzysort from 'fuzzysort';
import React from 'react';
import { entityNames, globalStateProvider } from '../../utils';
import './results.scss';

const fuzzyPreparedEntityNames: Fuzzysort.Prepared[] = entityNames.map(
  (entityName: string): Fuzzysort.Prepared =>
    fuzzysort.prepare(entityName) as Fuzzysort.Prepared,
);

const FUZZYSORT_OPTIONS: Fuzzysort.Options = {
  allowTypo: true,
  limit: 100,
  threshold: -10000,
};

export default function Results(): JSX.Element {
  const [search] = globalStateProvider.useGlobal('search');

  const fuzzyResults: Fuzzysort.Results = React.useMemo((): Fuzzysort.Results => {
    return fuzzysort.go(search, fuzzyPreparedEntityNames, FUZZYSORT_OPTIONS);
  }, [search]);

  return (
    <div className="results">
      <ul>
        {fuzzyResults.map(
          (fuzzyResult: Fuzzysort.Result): JSX.Element => (
            <li key={fuzzyResult.target}>
              <a
                href={`?entity=${fuzzyResult.target}`}
                title={fuzzyResult.target}
              >
                {fuzzyResult.target}
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
