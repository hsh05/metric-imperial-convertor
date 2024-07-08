const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2L'), 3.2);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.5/2L'), 2.75);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    assert.isNaN(convertHandler.getNum('3/2/3L'));
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    const units = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    units.forEach(unit => {
      assert.equal(convertHandler.getUnit('5' + unit), unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.isNull(convertHandler.getUnit('5invalidUnit'));
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    const returnUnits = ['L', 'gal', 'kg', 'lbs', 'km', 'mi'];
    inputUnits.forEach((unit, index) => {
      assert.equal(convertHandler.getReturnUnit(unit), returnUnits[index]);
    });
  });
  
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const units = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    for (let unit in units) {
      assert.equal(convertHandler.spellOutUnit(unit), units[unit]);
    }
  });
  
  test('convertHandler should correctly convert gal to L', function() {
    assert.closeTo(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.closeTo(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.closeTo(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.closeTo(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.closeTo(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.closeTo(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });

});
