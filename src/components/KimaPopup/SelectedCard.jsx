import React, { useMemo } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { getDescription } from './utils';

import './SelectedCard.css';

export const SelectedCard = props => {

  const { record } = props;

  const { id, presentationURI, title, type } = record;

  const description = useMemo(() => getDescription(record), [ record ]);

  console.log(record);

  // TOD getType, getDescription

  return (
    <div 
      className="kima-selected-card"
      onClick={props.onClick}>
      <header style={{ backgroundImage: `url("${presentationURI}")` }}>
        
      </header>

      <main>
        <h1>
          {title}
        </h1>
        <p>{description}</p>
      </main>

      <footer>
        <a href={id} target="_blank">
          <section className="details">
            <span>Details</span>
            <span>
              <HiChevronRight />
            </span>
          </section>
        </a>

        <section className="type">
          {type.label}
        </section>
      </footer>
    </div>
  )

}