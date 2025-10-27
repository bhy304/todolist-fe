import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import TodoPage from './pages/todo';
import LoginPage from './pages/auth/login';
import JoinPage from './pages/auth/join';
import Common from './pages/common';

const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
  const token = cookies.get('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route path="/_common" element={<Common />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
