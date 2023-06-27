import React from 'react';
import { useState, useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
    const navigate = useNavigate(); // navigate 함수 가져오기
    const [loggedIn, setLoggedIn] = useState(false);
  
    useEffect(() => {
      // 페이지 로드 시 로컬 스토리지에서 토큰 가져와 로그인 상태 확인
      const token = localStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
      }
    }, []);
  
    const handleLogin = async (email, password) => {
        try {
          const response = await axios.post('http://localhost:3001/login', { email, password });
      
          // 로그인 성공 시 토큰을 로컬 스토리지에 저장하고 로그인 상태 업데이트
          const token = response.data.token;
          localStorage.setItem('token', token);
        //   setLoggedIn(true);
         navigate('/todo');

        } catch (error) {
          console.log(error);
        }
      };
  

    const handleLogout = () => {
        // 로그아웃 시 로컬 스토리지에서 토큰 제거하고 로그인 상태 업데이트
        localStorage.removeItem('token');
        setLoggedIn(false);
      };
      
    return (
      <div>
        {loggedIn ? (
          <div>
            <h2>Welcome! You are logged in.</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    );
  };
  
  const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(username, password);
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    
      </div>
    );
  };
  
  export default LoginPage;