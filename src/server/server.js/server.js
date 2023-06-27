const express = require('express');
const cors = require('cors');
const app = express();


// CORS 허용 설정
app.use(cors());

// JSON 요청 본문 파싱
app.use(express.json());

// 예시로 사용할 Todo 데이터 배열
let todos = [];

// JWT 시크릿 키 설정 (보안을 위해 더 강력한 키로 변경해야 함)
const secretKey = 'your_strong_secret_key';

let users = []; // 일시적으로 회원 정보를 저장할 배열
const jwt = require('jsonwebtoken');


// Todo 생성 및 관리
app.post('/todo', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, secretKey);
  const userId = decoded.userId;
  console.log(userId);

  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title, completed: false, userId };

  todos.push(newTodo);

  console.log(newTodo);
  res.json({ todo: newTodo });
});

// Todo 리스트 가져오기
app.get('/todo', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, secretKey);
  const userId = decoded.userId;

  const userTodos = todos.filter(todo => todo.userId === userId);

  res.json({ todos: userTodos });
});

// Todo 완료 표시 및 삭제
app.put('/todo/:id', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, secretKey);
  const userId = decoded.userId;

  const todoId = parseInt(req.params.id);

  const todo = todos.find(todo => todo.id === todoId && todo.userId === userId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  if (req.body.title !== undefined) {
    todo.title = req.body.title;
  }

  res.json({ todo });
});

// Todo 삭제
app.delete('/todo/:id', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, secretKey);
  const userId = decoded.userId;

  const todoId = parseInt(req.params.id);

  const todoIndex = todos.findIndex(todo => todo.id === todoId && todo.userId === userId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);

  res.json({ message: 'Todo deleted successfully' });
});
// 회원가입 요청 처리
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Received signup request:', { email, password });

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
  }

  try {
    // 회원 정보를 메모리에 저장
    const newUser = { email, password };
    users.push(newUser);

    // 회원가입이 성공했을 때 토큰 생성
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    // 회원가입이 성공했을 때 응답에 토큰 전달
    res.json({ message: '회원가입이 성공적으로 완료되었습니다.', token });
  } catch (error) {
    // 회원가입 처리 중 에러가 발생한 경우 에러 응답
    console.error('회원가입 오류:', error);
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.' });
  }
});

// app.post('/checkDuplicateEmail', (req, res) => {
//   const { email } = req.body;
//   console.log('Received duplicate email check request:', { email });

//   // 이메일 중복 체크 로직 구현
//   // const isDuplicate = users.some(user => user.email === email);
 
//   try {
//     // 이메일 중복 체크 로직 수행
//     const isDuplicate = users.some((user) => user.email === email);

//     // 중복 여부에 따라 응답 전송
//     res.json({ isDuplicate });
//   } catch (error) {
//     console.error('중복 이메일 체크 오류:', error);
//     res.status(500).json({ error: '중복 이메일 체크 중 오류가 발생했습니다.' });
//   }

//   // // 중복된 이메일인 경우
//   // if (isDuplicate) {
//   //   return res.json({ isDuplicate: true });
//   // }

//   // // 중복되지 않은 이메일인 경우
//   // return res.json({ isDuplicate: false });
// });


// 로그인 요청 처리
app.post('/login', (req, res) => {
  // 사용자가 제출한 로그인 정보 가져오기
  const { email , password } = req.body;

  //  유효성 검사 로직 수행

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // 유효한 사용자인 경우 JWT 생성
    const userId = email; // 사용자 ID (여기서는 이메일을 사용)
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

    // JWT를 클라이언트로 반환
    res.json({ token });
  } else {
    // 유효하지 않은 사용자인 경우 에러 응답
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// 로그아웃 요청 처리
app.post('/logout', (req, res) => {
  // 로그아웃 시 로컬 스토리지에서 토큰 제거
  localStorage.removeItem('token');
  
  // 로그아웃 성공 응답
  res.json({ message: '로그아웃되었습니다.' });
});




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 시작
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});