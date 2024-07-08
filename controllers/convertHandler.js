function ConvertHandler() {
  
  // Function to get the numerical part of the input
  this.getNum = function(input) {
    // Regular expression to match a number (including fractions and decimals)
    const numRegex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/;
    const match = input.match(numRegex);
    let result;
    
    if (match && match[0]) {
      try {
        result = eval(match[0]);
      } catch (e) {
        result = NaN;
      }
    } else {
      result = 1;
    }
    
    // Check for double fraction error
    if (input.split('/').length > 2) {
      result = NaN;
    }
    
    return result;
  };
  
  // Function to get the unit part of the input
  this.getUnit = function(input) {
    // Regular expression to match the unit
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    let result;
    
    if (match) {
      result = match[0].toLowerCase();
    }
    
    // Valid units and their mappings
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    const unitMap = {
      'l': 'L'
    };
    
    // Return null for invalid units
    if (!validUnits.includes(result)) {
      result = null;
    }
    
    // Convert 'l' to 'L'
    if (result && unitMap[result]) {
      result = unitMap[result];
    }
    
    return result;
  };
  
  // Function to get the return unit based on initial unit
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return unitMap[initUnit];
  };

  // Function to spell out the unit
  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return spellMap[unit.toLowerCase()];
  };
  
  // Function to convert the numerical value
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = NaN;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  // Function to generate the output string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spellOutInitUnit = this.spellOutUnit(initUnit);
    const spellOutReturnUnit = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${spellOutInitUnit} converts to ${parseFloat(returnNum.toFixed(5))} ${spellOutReturnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
