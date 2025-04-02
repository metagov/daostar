const express = require("express");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");

const app = express();
app.use(bodyParser.json());

const DOMAIN = "daostar.org"; 
const mg = mailgun({ apiKey: "process.env.REACT_APP_MAILGUN_API_KEY", domain: DOMAIN });

app.post("/send-email", (req, res) => {
  const { email, title, pdfUrl } = req.body;

  const data = {
    from: "Rashmi Abbigeri <rashmi@daostar.org>",
    to: email,
    subject: `Access to Report: ${title}`,
    text: `Hello,\n\nYou requested access to the report "${title}". You can download it here: ${pdfUrl}\n\nBest regards,\nYour Team`,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Failed to send email.");
    }
    res.status(200).send("Email sent successfully!");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});