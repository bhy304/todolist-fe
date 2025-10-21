import { useState } from 'react';
import styles from './todos.module.css';

export default function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  // 할일 추가
  const addTodo = (e) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const newTodo = {
      id: Date.now(),
      content: inputContent,
      isDone: false,
    };

    setTodoList([...todoList, newTodo]);
    setInputContent('');
  };

  // 완료 체크
  const completeTodo = (id) => {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // 수정 시작
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  // 수정 완료
  const saveEdit = () => {
    if (!editContent.trim()) return;

    setTodoList(
      todoList.map(todo =>
        todo.id === editingId ? { ...todo, content: editContent } : todo
      )
    );
    setEditingId(null);
    setEditContent('');
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  // 삭제
  const deleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
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

      <main className={styles.main}>
        <form onSubmit={addTodo} className={styles.inputForm}>
          <input
            type="text"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="할 일을 입력해주세요."
          />
          <button type="submit">등록하기</button>
        </form>

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
                        onChange={(e) => setEditContent(e.target.value)}
                        className={styles.editInput}
                        autoFocus
                      />
                      <button onClick={saveEdit} className={styles.completeBtn}>완료</button>
                      <button onClick={cancelEdit} className={styles.cancelBtn}>취소</button>
                    </>
                  ) : (
                    <>
                      <label>
                        <input type="checkbox" checked={todo.isDone} onChange={() => completeTodo(todo.id)} />
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
                    <input type="checkbox" checked={todo.isDone} onChange={() => completeTodo(todo.id)} />
                    <span>{todo.content}</span>
                  </label>
                  <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}