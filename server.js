const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

const AUTH_TOKEN = "Bearer PAK-E8FieCPYMsihNa-KSCOmPXlNIu98mOeNPhpGpwpDNx63BuhvTku5Iyz6jsQy9G4dgz7jB7wKCafN8d228";

// POST /run-testim endpoint to trigger a Testim test run
app.post("/run-testim", (req, res) => {
  const authHeader = req.headers.authorization;

  // Check for correct authorization header
  if (authHeader !== AUTH_TOKEN) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  // Use the full path to the Testim CLI for reliability
  const testimPath = `${process.cwd()}${require('path').sep}node_modules${require('path').sep}.bin${require('path').sep}testim`;
  const command = `"${testimPath}" --token "qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP" --project "usw2RRRRFhuk6SLPxTmpc221" --testId "jI3lPRlYjOsNo4sl" --grid "Testim-Grid" --use-local-chrome-driver`;

  // Log environment for debugging
  console.log("ENVIRONMENT VARIABLES:", process.env);

  // Use the system shell for compatibility
  exec(command, { shell: process.env.ComSpec || 'cmd.exe' }, (err, stdout, stderr) => {
    if (stdout) console.log("✅ STDOUT:\n", stdout);
    if (stderr) console.error("⚠️ STDERR:\n", stderr);
    if (err) {
      console.error("❌ ERROR:", err);
      return res.status(500).send({
        error: "Testim run failed",
        stdout,
        stderr,
        message: err.message
      });
    }
    res.send({ message: "Testim run completed", output: stdout });
  });
});

app.listen(3000, () => {
  console.log("🚀 Server ready");
});


