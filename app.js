const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/process-array', (req, res) => {
  const dataArray = req.body;
  const filePath = 'output.txt';

  const fileContents = dataArray.join('\n');
  fs.writeFile(filePath, fileContents, (err) => {
    if (err) {
      res.status(500).send('Error writing to file');
    } else {
      res.download(filePath, 'output.txt', (err) => {
        if (err) {
          res.status(500).send('Error sending file');
        } else {
          fs.unlink(filePath);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}/`);
});
