import deep from 'deep-diff';
import Immutable from 'immutable';

export default (computedStates, index) => {
    if (index !== 0) {
        const newState = Immutable.fromJS({
            state: computedStates[index].state,
        }).toJS().state;

        const oldState = Immutable.fromJS({
            state: computedStates[index - 1].state,
        }).toJS().state;

        const diff = deep.diff(oldState, newState);

        return diff || [];
    }

    return [];
};
