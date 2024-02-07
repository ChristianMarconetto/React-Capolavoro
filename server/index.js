const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.get('/register', (req, res) => {
  res.send('Server Express funzionante!');
});
app.listen(PORT, () => {
  console.log(`Server Express in ascolto su http://localhost:${PORT}`);
});
