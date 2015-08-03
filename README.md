# Redux DevTools – Diff Monitor
This project provides an alternate monitor to Redux DevTools – the primary concern for this monitor is easily showing the mutation of your application's state from action to action, while still providing the same level of control afforded by the default DevTools monitor (rollback, commit, reset and individual action toggles).


### Usage
- When included as a DevTools monitor, use `Ctrl+]` to toggle visibility of the frame.
- Actions will be minimized by default; actions shown in green are causing a state mutation.
- Click an action name to view the state mutations caused between adjacent actions.
