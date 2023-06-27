import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate(); // navigate 함수 가져오기
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateForm(value, password);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validateForm(email, value);
  };

  const validateForm = (email, password) => {
    // 이메일 유효성 검사 (@ 포함)
    const isEmailValid = email.includes('@');

    // 비밀번호 유효성 검사 (8자 이상)
    const isPasswordValid = password.length >= 8;

    // 이메일과 비밀번호가 모두 유효한 경우 버튼 활성화
    setIsButtonDisabled(!(isEmailValid && isPasswordValid));
  };

//   const checkDuplicateEmail = async (email) => {
//     try {
//       const response = await axios.post('http://localhost:3001/checkDuplicateEmail', { email });
//       setIsEmailDuplicate(response.data.isDuplicate);
//     } catch (error) {
//       console.error('중복 이메일 체크 오류:', error);
//     }
//   };

const handleSignup = async () => {
    try {
        // 중복 이메일 체크
        // await checkDuplicateEmail(email);
  
        // // 중복된 이메일인 경우 처리
        // if (isEmailDuplicate) {
        //   console.log('중복된 이메일입니다.');
        //   return;
        // }
  
        // 회원가입 요청
        const response = await axios.post('http://localhost:3001/signup', { email, password });
        console.log('회원가입 성공:', response.data);
  
        // 회원가입 성공 시 토큰을 로컬 스토리지에 저장
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // 회원가입 완료 후 /signin 경로로 이동
        navigate('/todo');
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
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        {isEmailDuplicate && <p style={{ color: 'red' }}>이미 사용 중인 이메일입니다.</p>}
       
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="button" onClick={handleSignup} disabled={isButtonDisabled}>
          Signup
        </button>
      </form>
      {isEmailDuplicate && <p>Email already exists.</p>}
     
     
    </div>
  );
};

export default SignupPage;
