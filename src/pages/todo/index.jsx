import './todos.css';
import { useState, useEffect } from 'react';
import { todosAPI } from '../../api/todos';
import { teamTodosAPI } from '../../api/teamTodos';

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

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todosAPI.getTodos();
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async e => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    try {
      if (teamId) {
        const response = await teamTodosAPI.createTeamTodo(teamId, {
          content: inputContent,
        });
        setTodoList([...todoList, response.data.todo]);
      } else {
        const response = await todosAPI.createTodo({
          content: inputContent,
        });

        setTodoList([...todoList, response.data.todo]);
      }
      setInputContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const completeTodo = async id => {
    try {
      if (teamId) {
        const response = await teamTodosAPI.toggleTeamTodo(id);

        setTodoList(
          todoList.map(todo =>
            todo.id === id
              ? {
                  ...todo,
                  is_done: response.data.todo.is_done,
                }
              : todo
          )
        );
      } else {
        const response = await todosAPI.toggleTodo(id);

        setTodoList(
          todoList.map(todo =>
            todo.id === id
              ? {
                  ...todo,
                  is_done: response.data.todo.is_done,
                }
              : todo
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = todo => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  const saveEdit = async () => {
    if (!editContent.trim()) return;

    try {
      if (teamId) {
        const response = await teamTodosAPI.updateTeamTodo(editingId, {
          content: editContent,
        });

        setTodoList(
          todoList.map(todo =>
            todo.id === editingId ? response.data.todo : todo
          )
        );
      } else {
        const response = await todosAPI.updateTodo(editingId, {
          content: editContent,
        });

        setTodoList(
          todoList.map(todo =>
            todo.id === editingId ? response.data.todo : todo
          )
        );
      }

      setEditingId(null);
      setEditContent('');
    } catch (error) {
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

      if (teamId) {
        await teamTodosAPI.deleteTeamTodo(id);
      } else {
        await todosAPI.deleteTodo(id);
      }

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
        <Sidebar setTodoList={setTodoList} />
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
                          checked={todo.is_done}
                          onChange={() => completeTodo(todo.id)}
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
