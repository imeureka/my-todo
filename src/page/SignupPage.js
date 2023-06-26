import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
//   const handleSignup = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/signup', { email, password });
//       console.log('회원가입 성공:', response.data);
//     } catch (error) {
//       console.error('회원가입 오류:', error);
//     }
//   };
const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/signup', { email, password });
      const token = response.data.token; // 토큰 받아오기
  
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', token);
  
      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };
  
  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
