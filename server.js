const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

// Replace this token with the one you want to accept in Authorization header
const AUTH_TOKEN = "Bearer PAK-E8FieCPYMsihNa-KSCOmPXINlu98mOeNPhpGpwpDNx63BuhvTku5lyz6jsQy9G4dgz7jB7wKCafN8d228";

app.post("/run-testim", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== AUTH_TOKEN) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  res.send({ message: "Test started" });

  const command = `./node_modules/.bin/testim --token "qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP" --project "usw2RRRRFhuk6SLPxTmpc221" --testId "96EJRqkb6s9GlHNH"`;

  exec(command, (err, stdout, stderr) => {
    if (err) console.error("❌ ERROR:", err);
    else console.log("✅ TESTIM OUTPUT:\n", stdout || stderr);
  });
});

app.listen(3000, () => {
  console.log("🚀 Server ready");
});
