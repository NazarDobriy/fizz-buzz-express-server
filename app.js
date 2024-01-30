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
      console.error('Error writing to file:', err);
      res.status(500).send('Error writing to file');
    } else {
      console.log('File saved:', filePath);
      res.download(filePath, 'output.txt', (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Error sending file');
        } else {
          console.log('File sent to client');
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted:', filePath);
            }
          });
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}/`);
});
