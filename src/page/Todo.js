import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Redirect } from 'react-router-dom';

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

//리다이렉팅
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } 
  }, [navigate]);

//todo list 가져오기 
const fetchTodoList = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.get('http://localhost:3001/todo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setTodos(response.data.todos);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 토큰이 유효하지 않거나 인증되지 않은 사용자의 경우
        // 적절한 처리를 수행하거나 사용자를 로그인 페이지로 리디렉션할 수 있습니다.
        console.error('투두 리스트 가져오기 오류1:', error);
        navigate('/signin'); // 사용자를 로그인 페이지로 리디렉션
      } else {
        // 기타 오류 처리
        console.error('투두 리스트 가져오기 오류2:', error);
      }
    }
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };
  
//todo 생성하기
  const handleAddTodo = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3001/todo', {
        title: newTodo,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos([...todos, response.data.todo]);
      setNewTodo('');
    } catch (error) {
      console.error('투두 추가 오류:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:3001/todo/${id}`, {
        completed: true,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error('투두 완료 표시 오류:', error);
    }
  };

   const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:3001/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('투두 삭제 오류:', error);
    }
  };

  return (
    <div>
    <h2>Todo List</h2>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span>{todo.title}</span>
          </label>
          <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
    <div>
      <input
        data-testid="new-todo-input"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button data-testid="new-todo-add-button" onClick={handleAddTodo}>
        추가
      </button>
    </div>
  </div>
  );
};

export default Todo;
