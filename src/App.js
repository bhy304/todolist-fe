import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './pages/todo';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
