import { expect } from 'chai';
import React from 'react/addons';
import ManifestActionComponent from '../../src/action/index';
const TestUtils = React.addons.TestUtils;

describe('ManifestActionComponent', () => {
  const props = {
    action: {
      type: 'ACTION_1'
    },
    diff: [],
    expanded: true
  };

  const render = (props) => {
    const element = React.createElement(ManifestActionComponent, props);

    return TestUtils.renderIntoDocument(element);
  };

  it('should show actions', () => {
    const rendered = render(props);

    expect(
        React.findDOMNode(rendered).querySelectorAll('.ACTION_1')
    ).to.have.length(1);
  });

  describe('diff', () => {

    it('should show no diff if the data has not changed', () => {
      const rendered = render(props);

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')
      ).to.have.length(0);
    });

    it('should show the correct diff when comparing objects having other properties', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [ { kind: 'E', path: [ 'key' ], lhs: {}, rhs: {
          other: 'property',
          another: 13.13
        } } ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('key: {} {"other":"property","another":13.13}');
    });

    it('should show the correct diff when replacing an object with an empty object', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [ { kind: 'D', path: [ 'one' ], lhs: 'property' } ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('one: "property"');
    });

    it('should show the correct diff when comparing changes in nested objects', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [ { kind: 'E', path: [ 'levelOne', 'levelTwo' ], lhs: 'value', rhs: 'another value' } ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('levelOne.levelTwo: "value" "another value"');
    });

    it('should show the correct diff when comparing changes in arrays', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [
          { kind: 'E', path: [ 0 ], lhs: 1, rhs: 2 },
          { kind: 'E', path: [ 1 ], lhs: 2, rhs: 3 },
          { kind: 'E', path: [ 2 ], lhs: 3, rhs: 4 }
        ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('0: 1 2 1: 2 3 2: 3 4');
    });

    it('should show the correct diff when comparing changes in arrays inside objects', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [
          { kind: 'E', path: [ 'a', 0 ], lhs: 1, rhs: 2 },
          { kind: 'E', path: [ 'a', 1 ], lhs: 2, rhs: 3 },
          { kind: 'E', path: [ 'a', 2 ], lhs: 3, rhs: 4 }
        ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('a.0: 1 2 a.1: 2 3 a.2: 3 4');
    });

    it('should show the correct diff when item removed from array', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [
          { kind: 'E', path: [ 0 ], lhs: 1, rhs: 2 },
          { kind: 'E', path: [ 1 ], lhs: 2, rhs: 3 },
          { kind: 'A', index: 2, item: { kind: 'D', lhs: 3 } }
        ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('0: 1 2 1: 2 3 2: 3');
    });

    it('should show the correct diff when item removed from array inside an object', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [
          { kind: 'E', path: [ 'a', 0 ], lhs: 1, rhs: 2 },
          { kind: 'E', path: [ 'a', 1 ], lhs: 2, rhs: 3 },
          { kind: 'A', path: [ 'a' ], index: 2, item: { kind: 'D', lhs: 3 } } ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('a.0: 1 2 a.1: 2 3 a.2: 3');
    });

    it('should diff items added to an array', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [ { kind: 'A', index: 2, item: { kind: 'N', rhs: 3 } } ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('2: undefined 3');
    });

    it('should diff complex objects', () => {
      const rendered = render(Object.assign({}, props, {
        diff: [
          { kind: 'A', path: [ 'ids' ], index: 0, item: { kind: 'N', rhs: 2 } },
          { kind: 'A', path: [ 'ids' ], index: 1, item: { kind: 'N', rhs: 3 } },
          { kind: 'E', path: [ 'turn' ], lhs: 0, rhs: 1 },
          { kind: 'E', path: [ 'round' ], lhs: 0, rhs: 1 }
        ]
      }));

      expect(
          React.findDOMNode(rendered).querySelectorAll('.diff')[0].textContent.trim()
      ).to.eql('ids.0: undefined 2 ids.1: undefined 3 turn: 0 1 round: 0 1');
    });
  });
});