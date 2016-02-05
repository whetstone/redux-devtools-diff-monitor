import deep from 'deep-diff';
import Immutable from 'immutable';

export default (current, previous) => {
  const newState = Immutable.fromJS(current).toJS().state;
  const oldState = Immutable.fromJS(previous).toJS().state;

  console.log('Diffing', oldState, newState);
  const diff = deep.diff(oldState, newState);

  return diff || [];
};
