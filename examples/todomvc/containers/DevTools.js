import React from 'react';
import { createDevTools } from 'redux-devtools';
import DiffMonitor from '../../../lib'
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey='H'
               changePositionKey='Q'>
    <DiffMonitor />
  </DockMonitor>
);