# Redux DevTools – Diff Monitor

[![build status](https://img.shields.io/travis/whetstone/redux-devtools-diff-monitor.svg?style=flat-square)](http://travis-ci.org/whetstone/redux-devtools-diff-monitor)
[![npm version](https://img.shields.io/npm/v/redux-devtools-diff-monitor.svg?style=flat-square)](https://www.npmjs.com/package/redux-devtools-diff-monitor)
[![npm downloads](https://img.shields.io/npm/dm/redux-devtools-diff-monitor.svg?style=flat-square)](https://www.npmjs.com/package/redux-devtools-diff-monitor)

(4.0 builds with react 0.14 and redux 3.0, using redux-devtools 3.0.0 in the /src and /examples)

This project provides an alternate monitor for Redux DevTools. The primary goal of this monitor is to highlight the 
changes to an application's state from action to action. This tool includes the main features from the default DevTools 
monitor (rollback, commit, reset and individual action toggles).

![Imgur](http://i.imgur.com/rvCR9OQ.png)

### Installation Examples

See the Redux Devtools [documentation](https://github.com/gaearon/redux-devtools#create-a-devtools-component)
for full details about how to use monitors.

#### Standalone Monitor

To use Diff Monitor by itself along with Redux Devtools, simply pass it to the `createDevTools` function directly.

Install from npm: `npm install --save-dev redux-devtools redux-devtools-diff-monitor`

```javascript
import React from 'react';
import { createDevTools } from 'redux-devtools';
import DiffMonitor from 'redux-devtools-diff-monitor';

export default createDevTools(
  <DiffMonitor />
);
```

#### Using DockMonitor

The [DockMonitor](https://github.com/gaearon/redux-devtools-dock-monitor) component provides common docking
functionality that makes monitors easier to work with. See the 
[documentation](https://github.com/gaearon/redux-devtools-dock-monitor#readme) for additional details.

Install from npm: `npm install --save-dev redux-devtools-dock-monitor redux-devtools-diff-monitor`

```javascript
import React from 'react';
import { createDevTools } from 'redux-devtools';
import DiffMonitor from 'redux-devtools-diff-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
    >
        <DiffMonitor theme='tomorrow' />
    </DockMonitor>
);
```

### Usage

- New actions appear at the top of the monitor as they occur.
- Actions will be minimized by default; actions shown in green are causing a state mutation.
- Click an action name to expand its pane to view the state mutations the action caused.
- Click "disable" next to any action name to ignore that action and roll back the state mutations that action caused.
- As in the default Redux DevTools, click 'Commit' to reset the monitor and set the current app state as the rollback 
point. If you click rollback after clicking commit, actions will be replayed through the commit point.
