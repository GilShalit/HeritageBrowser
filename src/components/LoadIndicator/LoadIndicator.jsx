import { CgSpinner } from 'react-icons/cg';

import './LoadIndicator.css';

export const LoadIndicator = props => {

  return (
    <div className="kima-load-indicator p6o-controls-btn">
      <CgSpinner />
    </div>
  )

}