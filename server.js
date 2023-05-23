const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('client/build'));


const submittedForms = [];


app.post('/submit-form', (req, res) => {
 
  const { name, email, dob } = req.body;
  if (!name || !email || !dob) 
  {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // DoB validation
  const birthDate = new Date(dob);
  const ageDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (age < 18) 
  {
    return res.status(400).json({ error: 'Age must be at least 18 years.' });
  }


  const phoneNumber = req.body.phoneNumber;
  if (!phoneNumber) 
  {
    return res.status(400).json({ error: 'Phone number is required.' });
  }


  const form = {
    name,
    email,
    dob,
    phoneNumber
  };
  submittedForms.push(form);


  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dsandip0000@gmail.com',
      pass: 'famnmmkyhzcrgdnj'
    }
  });

  const mailOptions = {
    from: 'dsandip0000@gmail.com',
    to: email,
    subject: 'Form Submission Confirmation',
    text: 'Thank you for submitting the form.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.redirect('/submitted-forms');
});


app.get('/submitted-forms', (req, res) => {
  res.json(submittedForms);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
