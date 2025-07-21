// server.js
const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

const AUTH_TOKEN = 'Bearer PAK-E8FieCPY…';  // same token you used before

app.get('/run-testim', (req, res) => {
  if (req.headers.authorization !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(202).json({ message: 'Test triggered' }); // reply fast

  // build CLI command
  const testim = `${path.join(process.cwd(), 'node_modules', '.bin', 'testim')}`;
  const command = `${testim} --token "qhRgbW…" --project "usw2RRRR…" --testId "jI3lPRlYjOsNo4sl" --grid "Testim-Grid"`;

  exec(command, (err, stdout, stderr) => {
    if (err) console.error('❌ ERROR:', err);
    if (stdout) console.log('✅ STDOUT:', stdout);
    if (stderr) console.error('⚠️ STDERR:', stderr);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server ready on ${PORT}`));