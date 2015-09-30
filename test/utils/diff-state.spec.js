import { expect } from 'chai';
import diffState from '../../src/utils/diff-state';
import Immutable from 'immutable';

describe('diffState', () => {
  let computedStates = [{}, {}];

  const empty = {};

  describe('Plain JavaScript data', () => {

    describe('A target that has no properties', () => {
      computedStates[0].state = empty;

      it('shows no differences when compared to another empty object', () => {
        computedStates[1].state = {};

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an('array');
        expect(diff).to.have.length(0);
      });
    });

    describe('when compared to a different type of keyless object', () => {
      const aDate = new Date();

      const comparandTuples = [
        ['an array', {
          key: []
        }],
        ['an object', {
          key: {}
        }],
        ['a date', {
          key: aDate
        }],
        ['a null', {
          key: null
        }]
      ];

      comparandTuples.forEach(function(lhsTuple) {
        comparandTuples.forEach(function(rhsTuple) {
          if (lhsTuple[0] === rhsTuple[0]) {
            return;
          }

          it('shows differences when comparing ' + lhsTuple[0] + ' to ' + rhsTuple[0], () => {
            computedStates[0].state = lhsTuple[1];
            computedStates[1].state = rhsTuple[1];

            const diff = diffState(computedStates, 1);

            expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');

            if (lhsTuple[0] === comparandTuples[0][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('[]');
            } else if (lhsTuple[0] === comparandTuples[1][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('{}');
            } else if (lhsTuple[0] === comparandTuples[2][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('"' + aDate.toISOString() + '"');
            } else if (lhsTuple[0] === comparandTuples[3][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('null');
            }

            if (rhsTuple[0] === comparandTuples[0][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('[]');
            } else if (rhsTuple[0] === comparandTuples[1][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('{}');
            } else if (rhsTuple[0] === comparandTuples[2][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('"' + aDate.toISOString() + '"');
            } else if (rhsTuple[0] === comparandTuples[3][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('null');
            }
          });
        });
      });
    });

    describe('when compared with an object having other properties', () => {
      computedStates[0].state = empty;
      computedStates[1].state = {
        other: 'property',
        another: 13.13
      };

      const diff = diffState(computedStates, 1);

      it('the differences are reported', () => {

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"other"');
        expect(JSON.stringify(diff[0].lhs)).be.undefined;
        expect(JSON.stringify(diff[0].rhs)).eql('"property"');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"another"');
        expect(JSON.stringify(diff[1].lhs)).be.undefined;
        expect(JSON.stringify(diff[1].rhs)).eql('13.13');
      });

    });

    describe('A target that has one property', function() {
      const lhs = {
        one: 'property'
      };

      it('shows no differences when compared to itself', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = lhs;

        const diff = diffState(computedStates, 1);
        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

      it('shows the property as removed when compared to an empty object', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = empty;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"one"');
        expect(JSON.stringify(diff[0].lhs)).eql('"property"');
        expect(JSON.stringify(diff[0].rhs)).be.undefined;
      });

      it('shows the property as edited when compared to an object with null', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = {
          one: null
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"one"');
        expect(JSON.stringify(diff[0].lhs)).eql('"property"');
        expect(JSON.stringify(diff[0].rhs)).eql('null');
      });

      it('shows the property as edited when compared to an array', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = ['one'];

        const diff = diffState(computedStates, 1);

        expect(diff[0].path).to.be.undefined;
        expect(JSON.stringify(diff[0].lhs)).eql('{"one":"property"}');
        expect(JSON.stringify(diff[0].rhs)).eql('["one"]');
      });

    });

    describe('A target that has null value', function() {
      const lhs = {
        key: null
      };

      it('shows no differences when compared to itself', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = lhs;

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

      it('shows the property as removed when compared to an empty object', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = empty;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('null');
        expect(JSON.stringify(diff[0].rhs)).be.undefined;
      });

      it('shows the property is changed when compared to an object that has value', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = {
          key: 'value'
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('null');
        expect(JSON.stringify(diff[0].rhs)).eql('"value"');
      });

      it('shows that an object property is changed when it is set to null', function() {
        lhs.key = {
          nested: 'value'
        };

        computedStates[0].state = lhs;
        computedStates[1].state = {
          key: null
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('{"nested":"value"}');
        expect(JSON.stringify(diff[0].rhs)).eql('null');
      });

    });

    describe('A target that has a NaN', function() {
      const lhs = {
        key: NaN
      };

      it('shows the property is changed when compared to another number', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = {
          key: 0
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('null');
        expect(JSON.stringify(diff[0].rhs)).eql('0');
      });

      it('shows no differences when compared to another NaN', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = {
          key: NaN
        };

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

    });

    describe('A target that has nested values', function() {
      const nestedOne = {
        noChange: 'same',
        levelOne: {
          levelTwo: 'value'
        }
      };
      const nestedTwo = {
        noChange: 'same',
        levelOne: {
          levelTwo: 'another value'
        }
      };

      it('shows no differences when compared to itself', function() {
        computedStates[0].state = nestedOne;
        computedStates[1].state = nestedOne;

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

      it('shows the property as removed when compared to an empty object', function() {
        computedStates[0].state = nestedOne;
        computedStates[1].state = empty;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"noChange"');
        expect(JSON.stringify(diff[0].lhs)).eql('"same"');
        expect(JSON.stringify(diff[0].rhs)).to.be.undefined;

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"levelOne"');
        expect(JSON.stringify(diff[1].lhs)).eql('{"levelTwo":"value"}');
        expect(JSON.stringify(diff[1].rhs)).be.undefined;
      });

      it('shows the property is changed when compared to an object that has value', function() {
        computedStates[0].state = nestedOne;
        computedStates[1].state = nestedTwo;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"levelOne.levelTwo"');
        expect(JSON.stringify(diff[0].lhs)).eql('"value"');
        expect(JSON.stringify(diff[0].rhs)).eql('"another value"');
      });

      it('shows the property as added when compared to an empty object on left', function() {
        computedStates[0].state = empty;
        computedStates[1].state = nestedOne;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"noChange"');
        expect(JSON.stringify(diff[0].lhs)).be.undefined;
        expect(JSON.stringify(diff[0].rhs)).eql('"same"');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"levelOne"');
        expect(JSON.stringify(diff[1].lhs)).to.be.undefined;
        expect(JSON.stringify(diff[1].rhs)).eql('{"levelTwo":"value"}');
      });
    });

    describe('Working with arrays', () => {

      it('should diff items changed in an array', () => {
        computedStates[0].state = [1, 2, 3];
        computedStates[1].state = [2, 3, 4];

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"2"');
        expect(JSON.stringify(diff[2].lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].rhs)).eql('4');
      });

      it('should diff items changed in an array inside an object', () => {
        computedStates[0].state = {
          a: [1, 2, 3]
        };
        computedStates[1].state = {
          a: [2, 3, 4]
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"a.2"');
        expect(JSON.stringify(diff[2].lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].rhs)).eql('4');
      });

      it('should diff when item removed from array', () => {
        computedStates[0].state = [1, 2, 3];
        computedStates[1].state = [2, 3];

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].index)).to.eql('2');
        expect(JSON.stringify(diff[2].item.lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].item.rhs)).be.undefined;
      });

      it('should diff item removed from an array inside an object', () => {
        computedStates[0].state = {
          a: [1, 2, 3]
        };
        computedStates[1].state = {
          a: [2, 3]
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"a"');
        expect(JSON.stringify(diff[2].index)).to.eql('2');
        expect(JSON.stringify(diff[2].item.lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].item.rhs)).be.undefined;
      });

      it('should diff items added to an array', () => {
        computedStates[0].state = [1, 2];
        computedStates[1].state = [1, 2, 3];

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].index)).to.eql('2');
        expect(JSON.stringify(diff[0].item.lhs)).to.be.undefined;
        expect(JSON.stringify(diff[0].item.rhs)).eql('3');
      });

      it('should diff item added to an array inside an object', () => {
        computedStates[0].state = {
          a: [1, 2]
        };
        computedStates[1].state = {
          a: [2, 3, 4]
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"a"');
        expect(JSON.stringify(diff[2].index)).to.eql('2');
        expect(JSON.stringify(diff[2].item.lhs)).to.be.undefined;
        expect(JSON.stringify(diff[2].item.rhs)).to.eql('4');
      });
    });

  });

  describe('ImmutableJS data', () => {
    let computedStates = [{}, {}];

    const empty = Immutable.Map();

    describe('A target that has no properties', () => {
      computedStates[0].state = empty;

      it('shows no differences when compared to another empty object', () => {
        computedStates[1].state = Immutable.Map();

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an('array');
        expect(diff).to.have.length(0);
      });
    });

    describe('when compared to a different type of keyless object', () => {
      const aDate = new Date();

      const comparandTuples = [
        ['an array', {
          key: Immutable.fromJS([])
        }],
        ['an object', {
          key: Immutable.fromJS({})
        }],
        ['a date', {
          key: Immutable.fromJS(aDate)
        }],
        ['a null', {
          key: Immutable.fromJS(null)
        }],
        ['a regexp literal', {
          key: Immutable.fromJS(/a/)
        }]
      ];

      comparandTuples.forEach(function(lhsTuple) {
        comparandTuples.forEach(function(rhsTuple) {
          if (lhsTuple[0] === rhsTuple[0]) {
            return;
          }

          it('shows differences when comparing ' + lhsTuple[0] + ' to ' + rhsTuple[0], () => {
            computedStates[0].state = lhsTuple[1];
            computedStates[1].state = rhsTuple[1];

            const diff = diffState(computedStates, 1);

            expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');

            if (lhsTuple[0] === comparandTuples[0][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('[]');
            } else if (lhsTuple[0] === comparandTuples[1][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('{}');
            } else if (lhsTuple[0] === comparandTuples[2][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('"' + aDate.toISOString() + '"');
            } else if (lhsTuple[0] === comparandTuples[3][0]) {
              expect(JSON.stringify(diff[0].lhs)).to.eql('null');
            }

            if (rhsTuple[0] === comparandTuples[0][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('[]');
            } else if (rhsTuple[0] === comparandTuples[1][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('{}');
            } else if (rhsTuple[0] === comparandTuples[2][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('"' + aDate.toISOString() + '"');
            } else if (rhsTuple[0] === comparandTuples[3][0]) {
              expect(JSON.stringify(diff[0].rhs)).to.eql('null');
            }
          });
        });
      });
    });

    describe('when compared with an object having other properties', () => {
      computedStates[0].state = empty;
      computedStates[1].state = Immutable.fromJS({
        other: 'property',
        another: 13.13
      });

      const diff = diffState(computedStates, 1);

      it('the differences are reported', () => {

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"other"');
        expect(JSON.stringify(diff[0].lhs)).be.undefined;
        expect(JSON.stringify(diff[0].rhs)).eql('"property"');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"another"');
        expect(JSON.stringify(diff[1].lhs)).be.undefined;
        expect(JSON.stringify(diff[1].rhs)).eql('13.13');
      });

    });

    describe('A target that has one property', function() {
      const lhs = Immutable.fromJS({
        one: 'property'
      });

      it('shows no differences when compared to itself', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = lhs;

        const diff = diffState(computedStates, 1);
        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

      it('shows the property as removed when compared to an empty object', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = empty;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"one"');
        expect(JSON.stringify(diff[0].lhs)).eql('"property"');
        expect(JSON.stringify(diff[0].rhs)).be.undefined;
      });

      it('shows the property as edited when compared to an object with null', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = Immutable.fromJS({
          one: null
        });

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"one"');
        expect(JSON.stringify(diff[0].lhs)).eql('"property"');
        expect(JSON.stringify(diff[0].rhs)).eql('null');
      });

      it('shows the property as edited when compared to an array', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = Immutable.fromJS(['one']);

        const diff = diffState(computedStates, 1);

        expect(diff[0].path).to.be.undefined;
        expect(JSON.stringify(diff[0].lhs)).eql('{"one":"property"}');
        expect(JSON.stringify(diff[0].rhs)).eql('["one"]');
      });

    });

    describe('A target that has null value', function() {
      const lhs = Immutable.fromJS({
        key: null
      });

      it('shows no differences when compared to itself', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = lhs;

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

      it('shows the property as removed when compared to an empty object', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = empty;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('null');
        expect(JSON.stringify(diff[0].rhs)).be.undefined;
      });

      it('shows the property is changed when compared to an object that has value', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = Immutable.fromJS({
          key: 'value'
        });

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('null');
        expect(JSON.stringify(diff[0].rhs)).eql('"value"');
      });

      it('shows that an object property is changed when it is set to null', function() {
        computedStates[0].state = lhs.set('key', {
          nested: 'value'
        });
        computedStates[1].state = Immutable.fromJS({
          key: null
        });

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('{"nested":"value"}');
        expect(JSON.stringify(diff[0].rhs)).eql('null');
      });

    });


    describe('A target that has a NaN', function() {
      const lhs = Immutable.fromJS({
        key: NaN
      });

      it('shows the property is changed when compared to another number', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = Immutable.fromJS({
          key: 0
        });

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"key"');
        expect(JSON.stringify(diff[0].lhs)).eql('null');
        expect(JSON.stringify(diff[0].rhs)).eql('0');
      });

      it('shows no differences when compared to another NaN', function() {
        computedStates[0].state = lhs;
        computedStates[1].state = Immutable.fromJS({
          key: NaN
        });

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

    });

    describe('A target that has nested values', function() {
      const nestedOne = Immutable.fromJS({
        noChange: 'same',
        levelOne: {
          levelTwo: 'value'
        }
      });
      const nestedTwo = Immutable.fromJS({
        noChange: 'same',
        levelOne: {
          levelTwo: 'another value'
        }
      });

      it('shows no differences when compared to itself', function() {
        computedStates[0].state = nestedOne;
        computedStates[1].state = nestedOne;

        const diff = diffState(computedStates, 1);

        expect(diff).to.be.an.array;
        expect(diff).to.have.length(0);
      });

      it('shows the property as removed when compared to an empty object', function() {
        computedStates[0].state = nestedOne;
        computedStates[1].state = empty;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"noChange"');
        expect(JSON.stringify(diff[0].lhs)).eql('"same"');
        expect(JSON.stringify(diff[0].rhs)).to.be.undefined;

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"levelOne"');
        expect(JSON.stringify(diff[1].lhs)).eql('{"levelTwo":"value"}');
        expect(JSON.stringify(diff[1].rhs)).be.undefined;
      });

      it('shows the property is changed when compared to an object that has value', function() {
        computedStates[0].state = nestedOne;
        computedStates[1].state = nestedTwo;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"levelOne.levelTwo"');
        expect(JSON.stringify(diff[0].lhs)).eql('"value"');
        expect(JSON.stringify(diff[0].rhs)).eql('"another value"');
      });

      it('shows the property as added when compared to an empty object on left', function() {
        computedStates[0].state = empty;
        computedStates[1].state = nestedOne;

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"noChange"');
        expect(JSON.stringify(diff[0].lhs)).be.undefined;
        expect(JSON.stringify(diff[0].rhs)).eql('"same"');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"levelOne"');
        expect(JSON.stringify(diff[1].lhs)).to.be.undefined;
        expect(JSON.stringify(diff[1].rhs)).eql('{"levelTwo":"value"}');
      });
    });

    describe('Immutable data in plain objects', function() {

      describe('Single level Immutable objects one level deep in plain object', () => {

        const nestedOne = {
          a: Immutable.fromJS({
            one: 'something'
          })
        };

        const nestedTwo = {
          a: Immutable.fromJS({
            one: 'somethingElse'
          })
        };

        it('shows the property is changed when compared to an object that has value', () => {
          computedStates[0].state = nestedOne;
          computedStates[1].state = nestedTwo;

          const diff = diffState(computedStates, 1);

          expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.one"');
          expect(JSON.stringify(diff[0].lhs)).eql('"something"');
          expect(JSON.stringify(diff[0].rhs)).eql('"somethingElse"');
        });
      });

      describe('Nested Immutable objects one level deep in plain object', () => {

        const nestedOne = {
          a: Immutable.fromJS({
            one: {
              two: 'something'
            }
          })
        };

        const nestedTwo = {
          a: Immutable.fromJS({
            one: {
              two: 'somethingElse'
            }
          })
        };

        const nestedThree = {
          a: Immutable.fromJS({
            one: {
              two: 'somethingElse'
            },
            three: {
              four: "cheese"
            }
          })
        };

        it('shows the property is changed when compared to an object that has value', () => {
          computedStates[0].state = nestedOne;
          computedStates[1].state = nestedTwo;

          const diff = diffState(computedStates, 1);

          expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.one.two"');
          expect(JSON.stringify(diff[0].lhs)).eql('"something"');
          expect(JSON.stringify(diff[0].rhs)).eql('"somethingElse"');
        });

        it('shows properties change when compared to an object that has value', () => {
          computedStates[0].state = nestedOne;
          computedStates[1].state = nestedThree;

          const diff = diffState(computedStates, 1);

          expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.one.two"');
          expect(JSON.stringify(diff[0].lhs)).eql('"something"');
          expect(JSON.stringify(diff[0].rhs)).eql('"somethingElse"');

          expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.three"');
          expect(JSON.stringify(diff[1].lhs)).to.be.undefined;
          expect(JSON.stringify(diff[1].rhs)).eql('{"four":"cheese"}');
        })
      });
    });

    describe('Working with arrays', () => {

      it('should diff items changed in an array', () => {
        computedStates[0].state = Immutable.List([1, 2, 3]);
        computedStates[1].state = Immutable.List([2, 3, 4]);

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"2"');
        expect(JSON.stringify(diff[2].lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].rhs)).eql('4');
      });

      it('should diff items changed in an array inside an object', () => {
        computedStates[0].state = {
          a: Immutable.List([1, 2, 3])
        };
        computedStates[1].state = {
          a: Immutable.List([2, 3, 4])
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"a.2"');
        expect(JSON.stringify(diff[2].lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].rhs)).eql('4');
      });

      it('should diff items changed in an array inside a map', () => {
        computedStates[0].state = Immutable.Map({
          a: [1, 2, 3]
        });
        computedStates[1].state = Immutable.Map({
          a: [2, 3, 4]
        });

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"a.2"');
        expect(JSON.stringify(diff[2].lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].rhs)).eql('4');
      });

      it('should diff when item removed from array', () => {
        computedStates[0].state = Immutable.List([1, 2, 3]);
        computedStates[1].state = Immutable.List([2, 3]);

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].index)).to.eql('2');
        expect(JSON.stringify(diff[2].item.lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].item.rhs)).be.undefined;
      });

      it('should diff item removed from an array inside an object', () => {
        computedStates[0].state = {
          a: Immutable.List([1, 2, 3])
        };
        computedStates[1].state = {
          a: Immutable.List([2, 3])
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"a"');
        expect(JSON.stringify(diff[2].index)).to.eql('2');
        expect(JSON.stringify(diff[2].item.lhs)).to.eql('3');
        expect(JSON.stringify(diff[2].item.rhs)).be.undefined;
      });

      it('should diff items added to an array', () => {
        computedStates[0].state = Immutable.List([1, 2]);
        computedStates[1].state = Immutable.List([2, 3, 4]);

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].index)).to.eql('2');
        expect(JSON.stringify(diff[2].item.lhs)).to.be.undefined;
        expect(JSON.stringify(diff[2].item.rhs)).eql('4');
      });

      it('should diff item added to an array inside an object', () => {
        computedStates[0].state = {
          a: Immutable.List([1, 2])
        };
        computedStates[1].state = {
          a: Immutable.List([2, 3, 4])
        };

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"a.0"');
        expect(JSON.stringify(diff[0].lhs)).to.eql('1');
        expect(JSON.stringify(diff[0].rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"a.1"');
        expect(JSON.stringify(diff[1].lhs)).to.eql('2');
        expect(JSON.stringify(diff[1].rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"a"');
        expect(JSON.stringify(diff[2].index)).to.eql('2');
        expect(JSON.stringify(diff[2].item.lhs)).to.be.undefined;
        expect(JSON.stringify(diff[2].item.rhs)).to.eql('4');
      });

      it('should diff complex object', () => {
        computedStates[0].state = Immutable.Map({
          ids: [],
          turn: 0,
          round: 0
        });
        computedStates[1].state = Immutable.Map({
          ids: [2,3],
          turn:1,
          round: 1
        });

        const diff = diffState(computedStates, 1);

        expect(JSON.stringify(diff[0].path.join('.'))).to.eql('"ids"');
        expect(JSON.stringify(diff[0].index)).to.eql('0');
        expect(JSON.stringify(diff[0].item.lhs)).to.be.undefined;
        expect(JSON.stringify(diff[0].item.rhs)).eql('2');

        expect(JSON.stringify(diff[1].path.join('.'))).to.eql('"ids"');
        expect(JSON.stringify(diff[1].index)).to.eql('1');
        expect(JSON.stringify(diff[1].item.lhs)).to.be.undefined;
        expect(JSON.stringify(diff[1].item.rhs)).eql('3');

        expect(JSON.stringify(diff[2].path.join('.'))).to.eql('"turn"');
        expect(JSON.stringify(diff[2].lhs)).to.eql('0');
        expect(JSON.stringify(diff[2].rhs)).to.eql('1');

        expect(JSON.stringify(diff[3].path.join('.'))).to.eql('"round"');
        expect(JSON.stringify(diff[3].lhs)).to.eql('0');
        expect(JSON.stringify(diff[3].rhs)).to.eql('1');
      });
    });
  });
});