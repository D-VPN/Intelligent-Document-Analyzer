import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useToken from './useToken';
import Registration from './components/Registration/Registration';
import CreateProject from './components/CreateProject/CreateProject';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/" element=
            {
              token ? <Dashboard setToken={setToken} /> : <Login setToken={setToken} />
            }
          >
          </Route>
          <Route exact path="/create" element=
            {
              token ? <CreateProject setToken={setToken} /> : <Login setToken={setToken} />
            }
          >
          </Route>
          <Route path="/login" exact element={<Login setToken={setToken} />} />
          <Route path="/registration" exact element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
