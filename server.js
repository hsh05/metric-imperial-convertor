'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
const ConvertHandler = require('./controllers/convertHandler.js');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

const convertHandler = new ConvertHandler();

app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (isNaN(initNum) && !initUnit) {
    res.json({ error: 'invalid number and unit' });
  } else if (isNaN(initNum)) {
    res.json({ error: 'invalid number' });
  } else if (!initUnit) {
    res.json({ error: 'invalid unit' });
  } else {
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  }
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
          console.log('Tests are not valid:');
          console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
