import React, { PropTypes } from 'react';
import ManifestAction from './action';
import ManifestButton from './button';
import { ActionCreators } from 'redux-devtools';
import style from './style';

const { reset, rollback, commit, toggleAction, jumpToState } = ActionCreators;

export default class ManifestComponent extends React.Component {
    static propTypes = {
        computedStates: PropTypes.array,
        actionsById: PropTypes.object,
        stagedActionIds: PropTypes.array,
        skippedActionIds: PropTypes.array,
        dispatch: PropTypes.func,
    };

    static update = () => {};

    handleJumpTo = id => {
        this.props.dispatch(jumpToState(id));
    };

    handleToggleAction = id => {
        this.props.dispatch(toggleAction(id));
    };

    renderAction = id => {
        const action = this.props.actionsById[id];
        //const diffedStates = diffState.bind(this.props.computedStates, id);

        const skippingAction = this.props.skippedActionIds.indexOf(id) !== -1;

        return (
            <ManifestAction
                action={action}
                index={id}
                key={id}
                currentState={this.props.computedStates[id]}
                previousState={this.props.computedStates[id - 1]}
                skipped={skippingAction}
                toggleAction={() => this.handleToggleAction(id)}
                jumpTo={() => this.handleJumpTo(id)}
            />
        );
    };

    render() {
        const actionReports = this.props.stagedActionIds.map(this.renderAction);
        const { dispatch } = this.props;

        return (
            <div style={style.base}>
                <div style={style.controls}>
                    <ManifestButton label="Commit" action={() => dispatch(commit())}/>
                    <ManifestButton label="Rollback" action={() => dispatch(rollback())}/>
                    <ManifestButton label="Reset" action={() => dispatch(reset())}/>
                </div>

                {actionReports.reverse()}
            </div>
        );
    };
}
