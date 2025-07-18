const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

const AUTH_TOKEN = "Bearer PAK-E8FieCPYMsihNa-KSCOmPXlNIu98mOeNPhpGpwpDNx63BuhvTku5Iyz6jsQy9G4dgz7jB7wKCafN8d228";

app.post("/run-testim", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== AUTH_TOKEN) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  res.send({ message: "Test started" });

npx testim \
  --token "qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP" \
  --project "usw2RRRRFhuk6SLPxTmpc221" \
  --testId "jI3lPRlYjOsNo4sl" \
  --grid "Testim-Grid" \
  --use-local-chrome-driver



  exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ ERROR:", err);
  }
  if (stdout) {
    console.log("✅ STDOUT:", stdout);
  }
  if (stderr) {
    console.error("⚠️ STDERR:", stderr);
  }
});

});

app.listen(3000, () => {
  console.log("🚀 Server ready");
});


