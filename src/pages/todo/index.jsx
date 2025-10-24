import { useState, useEffect } from 'react';
import { todosAPI } from '../../api/todos';
import styles from './todos.module.css';

import Button from '../../shared/ui/atoms/Button';
import Textfield from '../../shared/ui/atoms/Textfield';

export default function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  // API 응답 데이터 정규화
  const normalizeTodo = apiTodo => ({
    id: apiTodo.id,
    content: apiTodo.content,
    isDone: apiTodo.isDone,
  });

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      const response = await todosAPI.getTodos();
      setTodoList(response.data.map(normalizeTodo));
      setError('');
    } catch (error) {
      console.error('할 일 목록을 불러오는데 실패했습니다:', error);
      setError('할 일 목록을 불러오는데 실패했습니다.');
    }
  };

<<<<<<< HEAD
  // 할일 추가
=======
  // 할일 추가 (DB에 저장)
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
  const addTodo = async e => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    try {
      const response = await todosAPI.createTodo({
        content: inputContent,
        isDone: false,
      });

<<<<<<< HEAD
      const newTodo = normalizeTodo(response.data);
      setTodoList([...todoList, newTodo]);
=======
      console.log('DB에 할 일 추가 완료:', response);

      setTodoList([...todoList, response.data.todo]);
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
      setInputContent('');
      setError('');
    } catch (error) {
      console.error('할 일 추가 실패:', error);
      setError('할 일을 추가하는데 실패했습니다.');
    }
  };

<<<<<<< HEAD
  // 완료 상태 토글
=======
  // 완료 체크 (DB 업데이트)
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
  const completeTodo = async id => {
    try {
      const response = await todosAPI.toggleTodo(id);
      const updatedTodo = normalizeTodo(response.data);

<<<<<<< HEAD
      setTodoList(todoList.map(todo => (todo.id === id ? updatedTodo : todo)));
=======
      console.log('DB에서 할 일 상태 변경 완료');

      setTodoList(
        todoList.map(todo =>
          todo.id === id
            ? {
                ...todo,
                isDone:
                  response.data.completed !== undefined
                    ? response.data.completed
                    : !todo.isDone,
              }
            : todo
        )
      );
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
    } catch (error) {
      console.error('할 일 상태 변경 실패:', error);
      setError('할 일 상태를 변경하는데 실패했습니다.');
    }
  };

  // 수정 시작
  const startEdit = todo => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  // 수정 완료
  const saveEdit = async () => {
    if (!editContent.trim()) return;

    try {
<<<<<<< HEAD
      const response = await todosAPI.updateTodo(editingId, {
        content: editContent,
=======
      const todo = todoList.find(t => t.id === editingId);

      // DB에서 업데이트
      const response = await todosAPI.updateTodo(editingId, {
        content: editContent,
        isDone: todo.isDone,
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
      });

      const updatedTodo = normalizeTodo(response.data);
      setTodoList(
<<<<<<< HEAD
        todoList.map(todo => (todo.id === editingId ? updatedTodo : todo))
=======
        todoList.map(todo =>
          todo.id === editingId ? { ...todo, content: editContent } : todo
        )
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
      );
      setEditingId(null);
      setEditContent('');
      setError('');
    } catch (error) {
      console.error('할 일 수정 실패:', error);
      setError('할 일을 수정하는데 실패했습니다.');
    }
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

<<<<<<< HEAD
  // 삭제
=======
  // 삭제 (DB에서 삭제)
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
  const deleteTodo = async id => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await todosAPI.deleteTodo(id);
      setTodoList(todoList.filter(todo => todo.id !== id));
      setError('');
    } catch (error) {
      console.error('할 일 삭제 실패:', error);
      setError('할 일을 삭제하는데 실패했습니다.');
    }
  };

  // 미완료 할일
  const activeTodos = todoList.filter(todo => !todo.isDone);

  // 완료된 할일
  const completedTodos = todoList.filter(todo => todo.isDone);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1>할 일 목록</h1>
      </aside>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {error && <div className={styles.errorMessage}>{error}</div>}

<<<<<<< HEAD
        <form onSubmit={addTodo} className={styles.inputForm}>
          <input
            type="text"
=======
        <div>
          <Textfield
            id="input_content"
            name="input_content"
>>>>>>> 252bf0f936b310f43273655f58b96ecda69ec091
            value={inputContent}
            onChange={e => setInputContent(e.target.value)}
            placeholder="할 일을 입력해주세요."
          />
          <Button variant="PRIMARY" onClick={addTodo}>
            등록하기
          </Button>
        </div>

        {/* <form onSubmit={addTodo} className={styles.inputForm}>
          <Textfield
            type="text"
            value={inputContent}
            onChange={e => setInputContent(e.target.value)}
            placeholder="할 일을 입력해주세요."
          />
          <Button type="submit" variant="PRIMARY">
            등록하기
          </Button>
        </form> */}

        <section className={styles.todoSection}>
          <h2>TO DO</h2>
          {activeTodos.length === 0 ? (
            <p className={styles.empty}>할 일 항목이 없습니다.</p>
          ) : (
            <ul>
              {activeTodos.map(todo => (
                <li key={todo.id}>
                  {editingId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className={styles.editInput}
                        autoFocus
                      />
                      <button onClick={saveEdit} className={styles.completeBtn}>
                        완료
                      </button>
                      <button onClick={cancelEdit} className={styles.cancelBtn}>
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <label>
                        <input
                          type="checkbox"
                          checked={todo.isDone}
                          onChange={() => completeTodo(todo.id)}
                        />
                        <span>{todo.content}</span>
                      </label>
                      <button onClick={() => startEdit(todo)}>수정</button>
                      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.doneSection}>
          <h2>DONE</h2>
          {completedTodos.length === 0 ? (
            <p className={styles.empty}>완료 항목이 없습니다.</p>
          ) : (
            <ul>
              {completedTodos.map(todo => (
                <li key={todo.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.isDone}
                      onChange={() => completeTodo(todo.id)}
                    />
                    <span>{todo.content}</span>
                  </label>
                  <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
