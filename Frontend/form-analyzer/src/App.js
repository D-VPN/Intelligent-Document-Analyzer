import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useToken from './useToken';
import Registration from './components/Registration/Registration';
import CreateProject from './components/CreateProject/CreateProject';
import MainNav from './components/Navbar/MainNav';
import Visualizations from './components/Project/Visualizations/Visualizations';
import UploadForms from './components/CreateProject/UploadForms/UploadForms';
import HomePage from './components/HomePage/HomePage';

function App() {
  const { token, setToken } = useToken();
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={
            <MainNav setToken={setToken} token={token} path="/" />
          }></Route>
          <Route exact path="/login" element={
            <MainNav setToken={setToken} token={token} path="/login" />
          }></Route>
          <Route exact path="/registration" element={
            <MainNav setToken={setToken} token={token} path="/registration" />
          }></Route>
          <Route exact path="/create" element={
            <MainNav setToken={setToken} token={token} path="/create" />
          }></Route>
          <Route exact path="/create-project/upload-forms/:projectId" element={
            <MainNav setToken={setToken} token={token} path="/" />
          }></Route>
          <Route exact path="/project/upload-forms/:projectId" element={
            <MainNav setToken={setToken} token={token} path="/" />
          }></Route>
          <Route exact path="/project/visualization/:projectId" element={
            <MainNav setToken={setToken} token={token} path="/" />
          }></Route>

        </Routes>

        <Routes>

          <Route exact path="/" element=
            {
              token ? <Dashboard setToken={setToken} /> : <HomePage />
            }
          >
          </Route>
          <Route exact path="/login" element=
            {
              token ? <Dashboard setToken={setToken} /> : <Login setToken={setToken} />
            }
          >
          </Route>
          <Route exact path="/registration" element=
            {
              token ? <Dashboard setToken={setToken} /> : <Registration />
            }
          >
          </Route>
          <Route exact path="/create" element=
            {
              token ? <CreateProject setToken={setToken} /> : <Login setToken={setToken} />
            }
          >
          </Route>
          <Route path="/create-project/upload-forms/:projectId" exact element={<UploadForms currentCreate={true} />} />
          <Route path="/project/upload-forms/:projectId" exact element={<UploadForms currentCreate={false} />} />
          <Route path="/project/visualization/:projectId" exact element={<Visualizations />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
