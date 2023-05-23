import React, { useState } from 'react';
import SubmittedForms from './SubmittedForms';
import './styles.css';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !dob) 
    {
      setError('All fields are required.');
      return;
    }

    // DoB validation
    const birthDate = new Date(dob);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 18) {
      setError('Age must be at least 18 years.');
      return;
    }


    if (!phoneNumber) {
      setError('Phone number is required.');
      return;
    }

    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, dob, phoneNumber })
    });

    const data = await response.json();
    if (response.ok) 
    {
      // Form submitted successfully
      setError('');

      setShowForm(false);
    } 
    else 
    {

      setError(data.error);
    }
  };

  return (
    <div>
      {showForm ? (
        <div className="form-container">
          <h1>User Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" value={name} placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div>
              <label>Phone Number:</label>
              <input type="tel" value={phoneNumber} placeholder="Enter Your Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <SubmittedForms />
      )}
    </div>
  );
};

export default App;
