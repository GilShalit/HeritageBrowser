import { useEffect, useState } from 'react';
import { RiContactsBookLine } from 'react-icons/ri';

const PADDING = [50, 50]; 

export const useAutoPosition = (ref, x, y) => {

  const [ left, setLeft ] = useState(x);

  const [ top, setTop ] = useState(y);

  useEffect(() => setLeft(x), [ x ]);

  useEffect(() => setTop(y), [ y ]);

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        const elemBounds = 
          ref.current?.getBoundingClientRect();
          
        const mapBounds =
          ref.current.closest('.p6o-map-container')?.getBoundingClientRect();

        if (elemBounds && mapBounds) {
          const exceedsRight = elemBounds.right > mapBounds.right;
          const exceedsBottom = elemBounds.bottom > mapBounds.bottom;

          if (exceedsRight) {
            setLeft(mapBounds.right - elemBounds.width - PADDING[0]);
          }

          if (exceedsBottom) {
            setTop(mapBounds.bottom - elemBounds.bottom - PADDING[1]);
          }
        }
      }, 1);
    }
  }, [ ref.current?.getBoundingClientRect() ]);

  return { top, left };

}