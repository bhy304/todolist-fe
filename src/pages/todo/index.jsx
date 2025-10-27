import { useState, useEffect } from 'react';
import { todosAPI } from '../../api/todos';
import { usersAPI } from '../../api/users';
import { teamsAPI } from '../../api/teams';
import { teamTodosAPI } from '../../api/teamTodos';
import './todos.css';

import Button from '../../components/atoms/Button';
import Textfield from '../../components/atoms/Textfield';
import Checkfield from '../../components/atoms/Checkfield';
import AlertDialog from '../../components/molecules/AlertDialog';
import CreateTeamDialog from '../../components/molecules/CreateTeamDialog';
import InviteTeamMemberDialog from '../../components/molecules/InviteTeamMemberDialog';

export default function TodoPage() {
  const [deletedId, setDeletedId] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showDropMenu, setShowDropMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [teamId, setTeamId] = useState(null);
  // 다이얼로그 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);

  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username : '';

  useEffect(() => {
    fetchTodos();
    fetchTeams();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todosAPI.getTodos();
      setTodoList(response.data);
      console.log('개인 할일 목록', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getTeams();
      setTeamList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeamTodos = async id => {
    try {
      const response = await teamTodosAPI.getTeamTodos(id);
      console.log('팀 할일', response);
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTeam = async id => {
    try {
      await teamsAPI.deleteTeam(id);
      fetchTeams();
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

        console.log('DB에 할 일 추가 완료:', response);

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

  // 수정 시작
  const startEdit = todo => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  // 수정 완료 (DB 업데이트)
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

  const activeTodos = todoList.filter(todo => !todo.is_done); // 미완료 할일
  const completedTodos = todoList.filter(todo => todo.is_done); // 완료된 할일

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li onClick={fetchTodos}>개인 할일 목록</li>
              {/* 팀 할일 목록 */}
              {teamList.map(({ teamname, id }) => (
                <li
                  key={id}
                  className="nav-item"
                  onClick={() => {
                    fetchTeamTodos(id);
                    setTeamId(id);
                  }}
                >
                  <span>{teamname}의 할일 목록</span>
                  <div className="dropmenu">
                    <button
                      className="dropmenu-button"
                      onClick={e => {
                        e.stopPropagation(); // 부모 li의 onClick 실행 방지
                        setShowDropMenu(showDropMenu === id ? null : id);
                      }}
                    >
                      <img src="/ellipsis.svg" alt="dropmenu" />
                    </button>
                    {showDropMenu === id && (
                      <div className="menu">
                        <button
                          className="invite"
                          onClick={() => {
                            setIsInviteMemberOpen(true);
                            setShowDropMenu(null);
                          }}
                        >
                          초대하기
                        </button>
                        <button
                          className="delete"
                          onClick={() => {
                            deleteTeam(id);
                            setShowDropMenu(null);
                          }}
                        >
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Button
              variant="GHOST"
              size="FULL"
              onClick={() => setIsCreateTeamOpen(true)}
            >
              팀 만들기
            </Button>
          </nav>
          {/* 사용자 정보 (하단) */}
          <div className="sidebar-footer">
            <div className="user-info">
              <span>{username}</span>
              <button
                className="dropmenu-button"
                onClick={() => setShowUserMenu(true)}
              >
                <img src="/ellipsis.svg" alt="dropmenu" />
              </button>
              {showUserMenu && (
                <div className="menu user-menu">
                  <button className="" onClick={usersAPI.logout}>
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

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
          title="정말 삭제하시겠습니까?"
          onConfirm={() => deleteTodo(deletedId)}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
      {isCreateTeamOpen && (
        <CreateTeamDialog
          isOpen={isCreateTeamOpen}
          setIsCreateTeamOpen={setIsCreateTeamOpen}
          onConfirm={fetchTeams} // 팀 생성 성공 시 팀 목록 새로고침
          onCancel={() => setIsCreateTeamOpen(false)}
        />
      )}
      {isInviteMemberOpen && (
        <InviteTeamMemberDialog
          isOpen={isInviteMemberOpen}
          teamId={teamId}
          onConfirm={() => {}}
          onCancel={() => setIsInviteMemberOpen(false)}
        />
      )}
    </>
  );
}
