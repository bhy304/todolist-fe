import './Sidebar.css';
import { useState, useEffect } from 'react';
import { usersAPI } from '../../api/users';
import { teamsAPI } from '../../api/teams';
import { todosAPI } from '../../api/todos';
import { teamTodosAPI } from '../../api/teamTodos';
import Button from '../atoms/Button';
import CreateTeamDialog from '../../components/molecules/CreateTeamDialog';
import InviteTeamMemberDialog from '../../components/molecules/InviteTeamMemberDialog';

const Sidebar = ({ setTodoList }) => {
  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username : '';

  const [teamId, setTeamId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [showDropMenu, setShowDropMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (showDropMenu || showUserMenu) {
        const isDropMenuButton = event.target.closest('.dropmenu-button');
        const isMenu = event.target.closest('.menu');
        if (!isDropMenuButton && !isMenu) {
          setShowDropMenu(false);
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropMenu, showUserMenu]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getTeams();
      setTeamList(response.data.data);
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

  const fetchTodos = async () => {
    try {
      const response = await todosAPI.getTodos();
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeamTodos = async id => {
    try {
      const response = await teamTodosAPI.getTeamTodos(id);
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li
              onClick={() => {
                fetchTodos();
                setTeamId(null);
              }}
            >
              개인 할일 목록
            </li>
            {teamList.map(({ teamname, id }) => (
              <li
                key={id}
                className="nav-item"
                onClick={() => {
                  setTeamId(id);
                  fetchTeamTodos(id);
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
                    <div className="menu dropdown-menu">
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
        <div className="sidebar-footer">
          <div className="user-info">
            <span>{username}</span>
            <button
              className="dropmenu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
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
};
export default Sidebar;
