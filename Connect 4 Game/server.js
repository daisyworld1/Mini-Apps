const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('client'));

app.get('/', (req, res) => {
    console.log(req.body)
    res.send("hello fren from server!")
});


app.listen(8080, () => {
    console.log('Multistep Checkout App listening on port 8080!')
});