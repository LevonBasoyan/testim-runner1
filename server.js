const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/run-testim", (req, res) => {
  res.send({ message: "Test started" });

  const command = `npx testim --token "qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP" --project "usw2RRRRFhuk6SLPxTmpc221" --testId "96EJRqkb6s9GlHNH" `;

  exec(command, (err, stdout, stderr) => {
    if (err) console.error("❌ ERROR:", err);
    else console.log("✅ TESTIM OUTPUT:\n", stdout || stderr);
  });
});

app.listen(3000, () => {
  console.log("🚀 Server ready");
});
