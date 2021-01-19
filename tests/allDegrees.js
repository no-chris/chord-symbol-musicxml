/**
 * Useful data structures to perform assertions on the generated Harmony object
 */

const allDegrees = {};

allDegrees.omit3 = { value: '3', alter: '0', type: 'subtract' };
allDegrees.omitb3 = { value: '3', alter: '-1', type: 'subtract' };
allDegrees.omit5 = { value: '5', alter: '0', type: 'subtract' };

allDegrees.add3 = { value: '3', alter: '0', type: 'add' };
allDegrees.add4 = { value: '4', alter: '0', type: 'add' };
allDegrees.addb6 = { value: '6', alter: '-1', type: 'add' };
allDegrees.add6 = { value: '6', alter: '0', type: 'add' };
allDegrees.addma7 = { value: '7', alter: '0', type: 'add' };
allDegrees.addb9 = { value: '9', alter: '-1', type: 'add' };
allDegrees.add9 = { value: '9', alter: '0', type: 'add' };
allDegrees.addx9 = { value: '9', alter: '1', type: 'add' };
allDegrees.add11 = { value: '11', alter: '0', type: 'add' };
allDegrees.addx11 = { value: '11', alter: '1', type: 'add' };
allDegrees.addb13 = { value: '13', alter: '-1', type: 'add' };
allDegrees.add13 = { value: '13', alter: '0', type: 'add' };

allDegrees.alterb5 = { value: '5', alter: '-1', type: 'alter' };
allDegrees.alterx5 = { value: '5', alter: '1', type: 'alter' };
allDegrees.alterb9 = { value: '9', alter: '-1', type: 'alter' };
allDegrees.alterx9 = { value: '9', alter: '1', type: 'alter' };
allDegrees.alterx11 = { value: '11', alter: '1', type: 'alter' };
allDegrees.alterb13 = { value: '13', alter: '-1', type: 'alter' };

export default allDegrees;
