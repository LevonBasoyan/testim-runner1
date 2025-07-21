res.send({ message: "Test started" });

npx testim \
  --token "qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP" \
  --project "usw2RRRRFhuk6SLPxTmpc221" \
  --testId "jI3lPRlYjOsNo4sl" \
  --grid "Testim-Grid" \
  --use-local-chrome-driver


  const command = `npx testim --token "qhRgbWWMuLAVcKAmfH93UMt8p2elCyiyKBSGxSf83VG57SdtoP" --project "usw2RRRRFhuk6SLPxTmpc221" --testId "jI3lPRlYjOsNo4sl" --grid "Testim-Grid" --use-local-chrome-driver`;

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

~