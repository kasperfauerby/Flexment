import React from "react";
import { Switch, Route, Link } from "react-router-dom"; // VIGTIGT FOR AT DET VIRKER: npm install react-router-dom@5
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";

import AddReview from "./components/add-review";
import Task from "./components/tasks";
import TasksList from "./components/tasks-List";
import Login from "./components/login";

function App() {
  const [ user, setUser] = React.useState(null); // user state variable

  async function login(user = null) {
    setUser(user);
  }

  async function logout () {
    setUser(null);
  }

  return (
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tasks" className="navbar-brand">
          FLEXMENT
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tasks"} className="nav-link">
              Tasks
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a href="/login" onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tasks"]} component={TasksList} />
          <Route 
            path="/tasks/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/tasks/:id"
            render={(props) => (
              <Task {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;