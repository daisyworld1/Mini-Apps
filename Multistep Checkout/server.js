const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('client'));

app.get('/', (req, res) => {
    console.log(req.body)
    res.send("hello, homo sapien!")
});

app.post('/create', (req, res) => {
  return User.create({
  })
  .then((users) => {
    if(users) {
      console.log(users.id) //logged id e.g. 1
      res.send(users.id.toString())
    } else {
      res.status(400).send('Error creating a new record')
    }
  })
  .catch((err) => {
    throw err;
  })
});

app.post('/update', (req, res) => {
  return User.update(req.body, {
    where: {
      id: req.body.id
    }
  })
  .then((data) => {
    res.send('updated user account record')
  })
  .catch((err) => {
    throw err;
  })
});

app.listen(5000, () => {
    console.log('Multistep Checkout App listening on port 5000!')
});

//database

const Sequelize = require('sequelize');
let db = new Sequelize('checkout', 'root', '', {host: 'localhost', dialect: 'mysql'});

let User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  shipToLine1: Sequelize.STRING,
  shipToLine2: Sequelize.STRING,
  shipToCity: Sequelize.STRING,
  shipToState: Sequelize.STRING,
  shipToZipcode: Sequelize.BIGINT,
  creditCardNumber: Sequelize.BIGINT,
  expiryDate: Sequelize.BIGINT,
  CVV: Sequelize.BIGINT,
  billingZipcode: Sequelize.BIGINT
}, {
  tableName: 'users',
  timestamps: false
});

