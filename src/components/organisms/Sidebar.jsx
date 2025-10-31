import './Sidebar.css';
import { useState, useEffect, useRef } from 'react';
import { usersAPI } from '../../api/users';
import { teamsAPI } from '../../api/teams';
import { todosAPI } from '../../api/todos';
import Button from '../atoms/Button';
import CreateTeamDialog from '../../components/molecules/CreateTeamDialog';
import InviteTeamMemberDialog from '../../components/molecules/InviteTeamMemberDialog';

const Sidebar = ({ teamId, setTeamId, setTodoList }) => {
  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username : '';

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
    const initializeSidebar = async () => {
      await fetchTeams();

      const lastSelectedId = localStorage.getItem('lastSelectedId');

      if (lastSelectedId && lastSelectedId !== 'null') {
        const teamId = Number(lastSelectedId);

        try {
          await fetchTodos(teamId);
          setTeamId(teamId);
        } catch (error) {
          console.error(
            '팀 할일 목록을 불러올 수 없습니다. 개인 할일 목록으로 이동합니다.'
          );
          await fetchTodos();
          setTeamId(null);
          localStorage.setItem('lastSelectedId', 'null');
        }
      } else {
        await fetchTodos();
        setTeamId(null);
      }
    };

    initializeSidebar();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getTeams();
      setTeamList(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const deleteTeam = async id => {
    try {
      await teamsAPI.deleteTeam(id);
      await fetchTeams();

      const lastSelectedId = localStorage.getItem('lastSelectedId');
      if (lastSelectedId && Number(lastSelectedId) === id) {
        await fetchTodos();
        setTeamId(null);
        localStorage.setItem('lastSelectedId', 'null');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodos = async (selectedTeamId = null) => {
    try {
      const response = await todosAPI.getTodos(selectedTeamId);
      setTodoList(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li
              onClick={() => {
                fetchTodos(null);
                setTeamId(null);
                localStorage.setItem('lastSelectedId', 'null');
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
                  fetchTodos(id);
                  localStorage.setItem('lastSelectedId', id);
                }}
              >
                <span className="teamname">
                  {teamname}의 할일 목록
                  <span className="teamname-tooltip">
                    {teamname}의 할일 목록
                  </span>
                </span>
                <div className="dropmenu">
                  <button
                    className="dropmenu-button"
                    onClick={e => {
                      e.stopPropagation();
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
                          setTeamId(null);
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
          onConfirm={fetchTeams}
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
