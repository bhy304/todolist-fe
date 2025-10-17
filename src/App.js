import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './pages/todo';
import Login from './pages/auth/login';
import Join from './pages/auth/join';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
