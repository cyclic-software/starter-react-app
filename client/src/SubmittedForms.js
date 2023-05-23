import React, { useEffect, useState } from 'react';
import './styles.css';

const SubmittedForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {

    const fetchForms = async () => {
      const response = await fetch('/submitted-forms');
      const data = await response.json();
      setForms(data);
    };

    fetchForms();
  }, []);

  return (
    <div className="submitted-forms-container">
      <h1>Submitted Forms</h1>
      {forms.length > 0 ? (
        forms.map((form, index) => (
          <div key={index}>
            <h2>Form #{index + 1}</h2>
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Date of Birth:</strong> {form.dob}
            </p>
            <p>
              <strong>Phone Number:</strong> {form.phoneNumber}
            </p>
            <hr />
          </div>
        ))
      ) : (
        <p>No forms submitted yet.</p>
      )}
    </div>
  );
};

export default SubmittedForms;
