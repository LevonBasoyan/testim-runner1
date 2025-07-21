// server.js
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Replace with your actual token
const AUTH_TOKEN = 'Bearer PAK-E8FieCPYMsihNa-KSCOmPXlNIu98mOeNPhpGpwpDNx63BuhvTku5Iyz6jsQy9G4dgz7jB7wKCafN8d228';

// Health check route for Railway - with delay to test container stability
app.get('/', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 10000)); // 10s delay
  res.status(200).send('Still alive');
});


app.get('/run-testim', (req, res) => {
  if (req.headers.authorization !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(202).json({ message: 'Test started' });

  const testimPath = path.join(__dirname, 'node_modules', '.bin', 'testim');

  // Ensure the CLI is executable (fixes permission denied issue)
  try {
    fs.chmodSync(testimPath, 0o755);
  } catch (err) {
    console.error('⚠️ chmod failed:', err.message);
  }

  const args = [
    '--token', 'qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP',
    '--project', 'usw2RRRRFhuk6SLPxTmpc221',
    // '--testId', '96EJRqkb6s9GlHNH',
    '--suite','Quiz Flow Suite Library',
    '--grid', 'Testim-Grid'
  ];

  const child = spawn(testimPath, args);

  child.stdout.on('data', (data) => {
    console.log('✅ STDOUT:', data.toString());
  });

  child.stderr.on('data', (data) => {
    console.error('⚠️ STDERR:', data.toString());
  });

  child.on('error', (error) => {
    console.error('❌ Spawn Error:', error.message);
  });

  child.on('close', (code) => {
    console.log(`🔚 Testim process exited with code ${code}`);
  });
});

// Handle uncaught errors to keep Railway server alive
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
