const express = require("express");

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get("/api/health", (req, res) => res.json({ msg: "Healthy!" }));

app.post("/api/user", (req, res) =>
  res.json({
    user: {
      name: "hello",
      mail: "jkksst1712@gmail.com",
    },
  })
);
