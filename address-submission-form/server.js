const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

// Middleware for parsing form data
app.use(express.urlencoded({ extended: false }));

// Serve static files (e.g., HTML and CSS)
app.use(express.static("public"));

// Define the route to handle form submissions
app.post("/submit", (req, res) => {
  // Get the form data from the request
  const { name, address } = req.body;

  // Create a Nodemailer transporter with your email service configuration
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'Gmail'
    auth: {
      user: "alexander.a.maat@gmail.com",
      pass: "omyb ecmu uies gque",
    },
  });

  // Email content
  const mailOptions = {
    from: "alexander.a.maat@gmail.com",
    to: "aamaat99@gmail.com", // The recipient's email address
    subject: "New Address Submission",
    text: `Name: ${name}\nAddress: ${address}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Form submitted successfully!");
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
