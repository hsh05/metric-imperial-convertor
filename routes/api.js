'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  // Define the route for conversion
  app.get('/api/convert', (req, res) => {
    let input = req.query.input;
    
    // Extract the number and unit from the input
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    
    // Validate the unit
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    if (!validUnits.includes(initUnit)) {
      return res.json({ error: 'invalid unit' });
    }
    
    // Validate the number
    if (isNaN(initNum)) {
      return res.json({ error: 'invalid number' });
    }
    
    // Get the return unit and convert the number
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    
    // Generate the output string
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Send the response
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    });
  });

};
