import React, { useState } from "react";
import axios from 'axios'; // Make sure to install axios with npm install axios

function SignUp() {
  const [fullName, setFullName] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    checkBox: "",
  });

  //on submit function
  async function onSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        firstName: fullName.fName,
        lastName: fullName.lName,
        email: fullName.email,
        phone: fullName.phone,
        password: fullName.password,
        gender: fullName.gender,
      });

      // Handle success
      alert("User registered successfully!");
      console.log(response.data); // Log the response data or do something with it
    } catch (error) {
      // Handle error
      alert("Registration failed: " + error.response.data.message);
    }
  }

  //handle change function named input Event
  function inputEvent(e) {
    const { name, value } = e.target;
    setFullName((preValue) => {
      return {
        ...preValue,
        [name]: value, // This dynamically sets fName, lName, etc. based on the input's name
      };
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <h1>SignUp Form</h1>
          <p>First Name: {fullName.fName}</p>
          <p>Last Name: {fullName.lName}</p>
          <p>Email: {fullName.email}</p>
          <p>Phone: {fullName.phone}</p>
          <p>Password: {fullName.password}</p>
          <div>
            <h3>Fill the Form</h3>
            <input
              type="text"
              placeholder="Enter your first name"
              name="fName"
              onChange={inputEvent}
              value={fullName.fName}
              required
            />
          </div>
          <br />
          <input
            type="text"
            placeholder="Enter your last name"
            name="lName"
            onChange={inputEvent}
            value={fullName.lName}
            required
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={inputEvent}
            value={fullName.email}
            required
          />
          <br />
          <br />
          <input
            className="password-container"
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={inputEvent}
            value={fullName.password}
            required
          />
          <br />
          <button type="submit">Sign Up</button>
          <br />
        </div>
      </form>
    </>
  );
};

export default SignUp;
