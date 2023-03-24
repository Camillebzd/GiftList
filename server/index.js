const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'f1ea1308357c970bf134b1b4eb493d7ea0b9f4b6059aadb4df3acbba980f518c';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name } = req.body;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
