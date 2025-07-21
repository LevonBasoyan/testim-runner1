// server.js
const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

// Replace with your actual token
const AUTH_TOKEN = 'Bearer PAK-E8FieCPYMsihNa-KSCOmPXlNIu98mOeNPhpGpwpDNx63BuhvTku5Iyz6jsQy9G4dgz7jB7wKCafN8d228';

app.post('/run-testim', (req, res) => {
  if (req.headers.authorization !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Send response immediately
  res.status(202).json({ message: 'Test started' });

  // Build path to local testim CLI
  const testimPath = path.join(__dirname, 'node_modules', '.bin', 'testim');

  // Compose command to run testim
  const command = `${testimPath} --token "qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP" --project "usw2RRRRFhuk6SLPxTmpc221" --testId "k2xfbd8hs5MMV45F" --grid "Testim-Grid"`;

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
