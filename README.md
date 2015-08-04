# Redux DevTools – Diff Monitor

This project provides an alternate monitor for Redux DevTools. The primary goal of this monitor is to highlight the changes to an application's state from action to action. This tool includes the main features from the default DevTools monitor (rollback, commit, reset and individual action toggles).

### Usage

- When included as a DevTools monitor, use `Ctrl+]` to toggle visibility of the frame.
- New actions appear at the top of the monitor as they occur.
- Actions will be minimized by default; actions shown in green are causing a state mutation.
- Click an action name to expand its pane to view the state mutations the action caused.
- Click "disable" next to any action name to ignore that action and roll back the state mutations that action caused.
- As in the default Redux DevTools, click 'Commit' to reset the monitor and set the current app state as the rollback point. If you click rollback after clicking commit, actions will be replayed through the commit point.

### Example

The TodoMVC example from the Redux Devtools project is included in `./examples/todomvc`. To build and view the example:

1. Run `npm install` from the project root
2. cd to `./examples/todomvc`
3. Run `npm install`
4. Run `npm start` to run the app on port 3000 at localhost.
