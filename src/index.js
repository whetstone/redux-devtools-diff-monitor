import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import ManifestAction from './action';
import ManifestButton from './button';

import deep from 'deep-diff';
import mousetrap from 'mousetrap';

import style from './style';

class ManifestComponent extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  static propTypes = {
    // Stuff you can use
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,
    shortcutKeys: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(React.PropTypes.number),
    ]),

    // Stuff you can do
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired, // ({ index })
    jumpToState: PropTypes.func.isRequired // ({ index })
  };

  static defaultProps = {
      shortcutKeys: ['ctrl+h', 'ctrl+]'],
  }

  componentDidMount() {
    const { toggleVisibility } = this;
    const { shortcutKeys } = this.props;

    Mousetrap.bind(shortcutKeys, function (e) {
      toggleVisibility();
      return false;
    });
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible});
  }

  componentWillUnmount() {
    Mousetrap.unbind(['ctrl+h', 'ctrl+]']);
  }

  render() {
    const actionReports = this.props.stagedActions.map(this.renderAction.bind(this));
    const { visible } = this.state;
    const { commit, rollback, reset } = this.props;

    return (
      <div style={[
          style.base,
          visible && style.hidden,
        ]}
      >
        <div style={style.controls}>
          <ManifestButton label="Commit" action={commit} />
          <ManifestButton label="Rollback" action={rollback} />
          <ManifestButton label="Reset" action={reset} />
        </div>

        {actionReports.reverse()}
      </div>
    );
  }

  renderAction(action, index) {
    let newState, oldState, diff;
    if (index !== 0) {
      newState = this.props.computedStates[index].state;
      oldState = this.props.computedStates[index - 1].state;
      diff = deep.diff(oldState, newState);
    }

    const skippingAction = this.props.skippedActions[index]===true;

    return (
      <ManifestAction action={action}
                      index={index}
                      key={index}
                      diff={diff || []}
                      skipped={skippingAction}
                      toggleAction={this.props.toggleAction.bind(this, index)}
                      jumpTo={this.jumpingTo.bind(this, index)}/>
    );
  }

  jumpingTo(index) {
    this.props.jumpToState(index);
  }
}

export default Radium(ManifestComponent);
