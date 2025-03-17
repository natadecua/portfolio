const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');


app.use(cors());
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const uploadDir = path.join(__dirname, 'uploads');
const upload = multer({ storage: storage });

app.use(express.static('content'));

app.post('/upload', upload.single('myImage'), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  // File has been uploaded successfully
  res.send(`File uploaded successfully! File name: ${req.file.filename}`);
});


// Route to retrieve HTML content for Article 4
app.get('/article4', (req, res) => {
  res.sendFile(path.join(__dirname, 'content', 'article4.ejs'));
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});