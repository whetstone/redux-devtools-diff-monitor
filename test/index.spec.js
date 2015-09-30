import { expect } from 'chai';
import React from 'react/addons';
import ManifestComponent from '../src/index';
const TestUtils = React.addons.TestUtils;

describe('ManifestComponent', () => {

  it('should show actions', () => {

    const element = React.createElement(ManifestComponent, {
      computedStates: [{}, {}],
      currentStateIndex: 0,
      stagedActions: [{}, {}],
      skippedActions: {},
      reset: () => {},
      commit: () => {},
      rollback: () => {},
      sweep: () => {},
      toggleAction: () => {},
      jumpToState: () => {}
    });

    const rendered = TestUtils.renderIntoDocument(element);
    expect(
        React.findDOMNode(rendered).querySelectorAll('.manifest-action-component')
    ).to.have.length(2);
  });
});