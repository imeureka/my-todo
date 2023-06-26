const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

// CORS 허용 설정
app.use(cors());

// JSON 요청 본문 파싱
app.use(express.json());

// JWT 시크릿 키 설정 (보안을 위해 더 강력한 키로 변경해야 함)
const secretKey = 'your_strong_secret_key';

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  
  // 회원가입 처리 로직 작성
  // ...

  // 회원가입이 성공했을 때 응답
  res.json({ message: '회원가입이 성공적으로 완료되었습니다.' });
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
  // 사용자가 제출한 로그인 정보 가져오기
  const { username, password } = req.body;

  //  유효성 검사 로직 수행

  // 간단히 사용자명과 비밀번호가 일치하는지 검사
  if (username === 'user' && password === 'password') {
    // 유효한 사용자인 경우 JWT 생성
    const userId = 123; // 사용자 ID (실제 값은 데이터베이스 또는 사용자 정보에 따라 다름)
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

    // JWT를 클라이언트로 반환
    res.json({ token });
  } else {
    // 유효하지 않은 사용자인 경우 에러 응답
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// 서버 시작
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});