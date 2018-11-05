require('dotenv').config();

var express = require('express');
var app = express();
var cors = require('cors');
var messagebird = require('messagebird')(process.env.token);
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

app.get('/messages/list', (req, res) => {
  messagebird.messages.read('', (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(data);
  });
})

app.post('/messages/send', (req, res) => {
  const { originator, message, recipient } = req.body;

  const params = {
    originator,
    recipients: [ recipient ],
    body: message
  };

  messagebird.messages.create(params, (err, response) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(response);
  });
})

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
