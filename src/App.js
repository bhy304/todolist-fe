import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Todo from './pages/todo';
import Login from './pages/auth/login';
import Join from './pages/auth/join';
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
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <Todo />
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
