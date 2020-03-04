 //implement report generation logic

 //The response from the server should contain the CSV report along with the form so the user can keep submitting indefinitely, 
 //without having to go back to the "form page"

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const { Parser } = require('json2csv');

var app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors())

let flatObj = (obj) => {
  let result = [obj];
  let findNode = (node) => {
    for(let [key, val] of Object.entries(node)){
      if (val instanceof Array && val.length > 0) {
        for (item of val) {
          result.push(item);
          findNode(item);
        }
      }
    }
  }
  findNode(obj);
  return result;
};

app.get('/', (req, res) => {
  console.log('/ -->',req.body);
  res.send('Hello, homo sapien!');
});

app.post('/toCSV', (req, res) => {
  console.log('req --->',req);
  const parsedJson = JSON.parse(req.body.json);
  console.log('parsedJson  ', parsedJson);
  let fields = [];
  for(let [key, val] of Object.entries(parsedJson)){
    if (!(val instanceof Array)) {
      fields.push(key);
    }
  }
  console.log('fields  ', fields);
  const flatJson = flatObj(parsedJson);
  console.log('flatJson  ', flatJson);
  const json2csvParser = new Parser({ fields });
  let csv = json2csvParser.parse(flatJson);
  console.log('csv  ', csv);
  csv = csv.replace(/"/g,'')
  res.send(csv);
  res.end(200)
});
//
app.listen(3000, () => {
  console.log('CSV Report Generator app listening on port 3000!')
});

