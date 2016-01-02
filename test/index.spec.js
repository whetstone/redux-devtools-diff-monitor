/* eslint-env mocha */

import { expect } from 'chai';
import React from 'react/addons';
import ReactDOM from 'react-dom';
import ManifestComponent from '../src/index';
import TestUtils from 'react-addons-test-utils';

describe('ManifestComponent', () => {
    it('should show actions', () => {
        const element = React.createElement(ManifestComponent, {
            computedStates: [{}, {}],
            actionsById: {
                0: {
                    type: 'PERFORM_ACTION',
                    action: {
                        type: 'TEST_ACTION_1',
                    },
                },
                1: {
                    type: 'PERFORM_ACTION',
                    action: {
                        type: 'TEST_ACTION_2',
                    },
                },
            },
            stagedActionIds: [0, 1],
            skippedActionIds: [],
            dispatch: () => {},
        });

        const rendered = TestUtils.renderIntoDocument(element);
        expect(
            ReactDOM.findDOMNode(rendered).querySelectorAll('.manifest-action-component')
        ).to.have.length(2);
    });
});
