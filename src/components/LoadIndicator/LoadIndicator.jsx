import { useDeviceState } from '@peripleo/peripleo';
import { CgSpinner } from 'react-icons/cg';

import './LoadIndicator.css';

export const LoadIndicator = props => {

  const device = useDeviceState();

  return (
    <div 
      className={device.size === 'DESKTOP' ? 
        "kima-load-indicator p6o-controls-btn" : "kima-load-indicator p6o-controls-btn mobile"}>
      <CgSpinner />
    </div>
  )

}