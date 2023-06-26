// import React, { useState } from 'react';

// function SignupPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     // 회원가입 유효성 검증
//     if (!email || !password) {
//       console.log('이메일과 비밀번호를 입력해주세요.');
//       return;
//     }

//     // 서버로 보낼 데이터 형식 준비
//     const userData = {
//       email,
//       password,
//     };

//     console.log('회원가입 데이터:', userData);

//     // 회원가입 처리 로직
//     console.log('회원가입이 완료되었습니다.');
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <div>
//       <input
//         data-testid="email-input"
//         type="email"
//         value={email}
//         onChange={handleEmailChange}
//       />
//       <input
//         data-testid="password-input"
//         type="password"
//         value={password}
//         onChange={handlePasswordChange}
//       />
//       <Link to='/signup'> 회원가입 </Link>

//     </div>
//   );
// }

// export default SignupPage;
