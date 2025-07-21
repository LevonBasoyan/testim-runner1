// server.js
const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

// Replace with your actual token
const AUTH_TOKEN = 'Bearer PAK-E8FieCPY…';

app.get('/run-testim', (req, res) => {
  if (req.headers.authorization !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Send response immediately
  res.status(202).json({ message: 'Test started' });

  // Build path to local testim CLI
  const testimPath = path.join(__dirname, 'node_modules', '.bin', 'testim');

  // Compose command to run testim
  const command = `${testimPath} --token "qhRgbW…" --project "usw2RRRR…" --testId "jI3lPRlYjOsNo4sl" --grid "Testim-Grid"`;

  // Run command
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ ERROR:', err);
      return;
    }
    if (stdout) console.log('✅ STDOUT:', stdout);
    if (stderr) console.error('⚠️ STDERR:', stderr);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
