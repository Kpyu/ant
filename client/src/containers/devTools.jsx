import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// const Devtools = createDevTools(
//  <DockMonitor toggleVisibilityKey='ctrl-h'
//               changePositionKey='ctrl-q'>
//      <LogMonitor theme='tomorrow'></LogMonitor>
//  </DockMonitor>
// );

// export default Devtools

export default createDevTools(
  <DockMonitor toggleVisibilityKey="H"
    changePositionKey="W">
    <LogMonitor />
  </DockMonitor>
);
