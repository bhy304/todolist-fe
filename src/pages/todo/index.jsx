import './todos.css';
import { useState } from 'react';
import { todosAPI } from '../../api/todos';
import Button from '../../components/atoms/Button';
import Textfield from '../../components/atoms/Textfield';
import Checkfield from '../../components/atoms/Checkfield';
import Sidebar from '../../components/organisms/Sidebar';
import AlertDialog from '../../components/molecules/AlertDialog';

export default function TodoPage() {
  const [deletedId, setDeletedId] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [teamId, setTeamId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const addTodo = async e => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    try {
      const response = await todosAPI.createTodo(teamId, {
        content: inputContent,
      });

      setTodoList([...todoList, response.data.todo]);
      setInputContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const completeTodo = async id => {
    const todo = todoList.find(todo => todo.id === id);
    if (!todo) return;

    const updatedTodoList = todoList.map(todo =>
      todo.id === id
        ? {
            ...todo,
            is_done: !todo.is_done,
          }
        : todo
    );
    setTodoList(updatedTodoList);

    try {
      await todosAPI.updateTodo(id, teamId, {
        content: todo.content,
        is_done: !todo.is_done,
      });
    } catch (error) {
      setTodoList(todoList);
      console.error(error);
    }
  };

  const startEdit = todo => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  const saveEdit = async todo => {
    if (!editContent.trim()) return;

    const updatedTodoList = todoList.map(t =>
      t.id === editingId
        ? {
            ...t,
            content: editContent,
          }
        : t
    );
    setTodoList(updatedTodoList);
    setEditingId(null);
    setEditContent('');

    try {
      await todosAPI.updateTodo(editingId, teamId, {
        content: editContent,
        is_done: todo.is_done,
      });
    } catch (error) {
      setTodoList(todoList);
      setEditingId(todo.id);
      setEditContent(todo.content);
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const deleteTodo = async id => {
    try {
      setIsAlertOpen(true);

      await todosAPI.deleteTodo(id);

      setTodoList(todoList.filter(todo => todo.id !== id));

      setIsAlertOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const activeTodos = todoList.filter(todo => !todo.is_done);
  const completedTodos = todoList.filter(todo => todo.is_done);

  return (
    <>
      <div className="container">
        <Sidebar
          teamId={teamId}
          setTeamId={setTeamId}
          setTodoList={setTodoList}
        />
        <div className="divider" />
        <div className="main-content">
          <div className="input-group">
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

          <section className="todo-section">
            <h2>TO DO</h2>
            {activeTodos.length === 0 ? (
              <p className="empty">할 일 항목이 없습니다.</p>
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
                        <div className="button-group">
                          <Button
                            variant="PRIMARY"
                            onClick={() => saveEdit(todo)}
                          >
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
                          checked={todo.is_done}
                          onChange={() =>
                            completeTodo(todo.id, { is_done: todo.is_done })
                          }
                          label={todo.content}
                        />
                        <div className="button-group">
                          <Button
                            variant="GHOST"
                            onClick={() => startEdit(todo)}
                          >
                            수정
                          </Button>
                          <Button
                            variant="OUTLINE_DANGER"
                            onClick={() => {
                              setIsAlertOpen(true);
                              setDeletedId(todo.id);
                            }}
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
          <section className="done-section">
            <h2>DONE</h2>
            {completedTodos.length === 0 ? (
              <p className="empty">완료 항목이 없습니다.</p>
            ) : (
              <ul>
                {completedTodos.map(todo => (
                  <li key={todo.id}>
                    <Checkfield
                      id={`todo-${todo.id}`}
                      checked={todo.is_done}
                      onChange={() => completeTodo(todo.id)}
                      label={todo.content}
                    />
                    <Button
                      variant="OUTLINE_DANGER"
                      onClick={() => {
                        setIsAlertOpen(true);
                        setDeletedId(todo.id);
                      }}
                    >
                      삭제
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      {isAlertOpen && (
        <AlertDialog
          isOpen={isAlertOpen}
          onConfirm={() => deleteTodo(deletedId)}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
}
