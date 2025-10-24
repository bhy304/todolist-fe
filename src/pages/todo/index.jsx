import { useState, useEffect } from 'react';
import { todosAPI } from '../../api/todos';
import styles from './todos.module.css';

import Button from '../../shared/ui/atoms/Button';
import Textfield from '../../shared/ui/atoms/Textfield';
import Checkfield from '../../shared/ui/atoms/Checkfield';

export default function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 컴포넌트 마운트 시 할 일 목록 불러오기 (DB에서)
  useEffect(() => {
    fetchTodos();
  }, []);

  // 할 일 목록 가져오기 (DB에서)
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todosAPI.getTodos();
      setTodoList(response.data);
      setError('');
    } catch (error) {
      console.error('할 일 목록을 불러오는데 실패했습니다:', error);
      setError('할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 할일 추가 (DB에 저장)
  const addTodo = async e => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    try {
      // DB에 저장
      const response = await todosAPI.createTodo({
        content: inputContent,
      });

      console.log('DB에 할 일 추가 완료:', response);

      setTodoList([...todoList, response.data.todo]);
      setInputContent('');
      setError('');
    } catch (error) {
      console.error('할 일 추가 실패:', error);
      setError('할 일을 추가하는데 실패했습니다.');
    }
  };

  // 완료 체크 (DB 업데이트)
  const completeTodo = async id => {
    try {
      // DB에서 상태 토글
      const response = await todosAPI.updateTodo(id, {
        isDone: 1,
      });

      console.log('DB에서 할 일 상태 변경 완료', response);

      // setTodoList(
      //   todoList.map(todo =>
      //     todo.id === id
      //       ? {
      //           ...todo,
      //           isDone:
      //             response.data.completed !== undefined
      //               ? response.data.completed
      //               : !todo.isDone,
      //         }
      //       : todo
      //   )
      // );
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

  // 수정 완료 (DB 업데이트)
  const saveEdit = async () => {
    if (!editContent.trim()) return;

    try {
      const todo = todoList.find(t => t.id === editingId);

      // DB에서 업데이트
      const response = await todosAPI.updateTodo(editingId, {
        content: editContent,
      });

      console.log('DB에서 할 일 수정 완료:', response.data);

      setTodoList(
        todoList.map(todo =>
          todo.id === editingId ? { ...todo, content: editContent } : todo
        )
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

  // 삭제 (DB에서 삭제)
  const deleteTodo = async id => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      // DB에서 삭제
      await todosAPI.deleteTodo(id);

      console.log('DB에서 할 일 삭제 완료');

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

      <div className={styles.divider} />

      <div className={styles.todoMain}>
        <div className={styles.inputGroup}>
          <Textfield
            id="input_content"
            name="input_content"
            value={inputContent}
            onChange={e => setInputContent(e.target.value)}
            placeholder="할 일을 입력해주세요."
          />
          <Button variant="PRIMARY" onClick={addTodo}>
            등록하기
          </Button>
        </div>

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
                      <Textfield
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        autoFocus
                      />
                      <div className={styles.buttonGroup}>
                        <Button variant="PRIMARY" onClick={saveEdit}>
                          완료
                        </Button>
                        <Button variant="GHOST" onClick={cancelEdit}>
                          취소
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Checkfield
                        id={`todo-${todo.id}`}
                        checked={todo.isDone}
                        onChange={() => completeTodo(todo.id)}
                        label={todo.content}
                      />
                      <div className={styles.buttonGroup}>
                        <Button variant="GHOST" onClick={() => startEdit(todo)}>
                          수정
                        </Button>
                        <Button
                          variant="OUTLINE_DANGER"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          삭제
                        </Button>
                      </div>
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
                  <Checkfield
                    id={`todo-${todo.id}`}
                    checked={todo.isDone}
                    onChange={() => completeTodo(todo.id)}
                    label={todo.content}
                  />
                  <Button onClick={() => deleteTodo(todo.id)}>삭제</Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
