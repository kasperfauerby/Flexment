import React, { useState, useEffect } from "react";
import TaskDataService from "../services/task";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TasksList = props => {
  const [tasks, setTasks] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchCompany, setSearchCompany ] = useState("");
  const [searchLanguage, setSearchLanguage ] = useState("");
  const [p_languages, setLanguages] = useState(["All Languages"]);

  useEffect(() => {     // Tell component to do something after render
    retrieveTasks();
    retrieveLanguages();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchCompany = e => {
    const searchCompany = e.target.value;
    setSearchCompany(searchCompany);
  };

  const onChangeSearchLanguage = e => {
    const searchLanguage = e.target.value;
    setSearchLanguage(searchLanguage);
    
  };

  const retrieveTasks = () => {
    TaskDataService.getAll()
      .then(response => {
        console.log(response.data);
        setTasks(response.data.tasks);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveLanguages = () => {
    TaskDataService.getLanguages()
      .then(response => {
        console.log(response.data);
        setLanguages(["All Languages"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTasks();
  };

  const find = (query, by) => {
    TaskDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setTasks(response.data.tasks);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByCompany = () => {
    find(searchCompany, "company")
  };

  const findByLanguage = () => {
    if (searchLanguage === "All Languages") {
      refreshList();
    } else {
      find(searchLanguage, "p_language")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by company"
            value={searchCompany}
            onChange={onChangeSearchCompany}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCompany}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchLanguage}>
             {p_languages.map(p_language => {
               return (
                 <option value={p_language}> {p_language.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByLanguage}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {tasks.map((task) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{task.name}</h5>
                  <p className="card-text">
                    <strong>Programming Language: </strong>{task.p_language}<br/>
                    <strong>Company: </strong>{task.company}
                  </p>
                  <div className="row">
                  <Link to={"/tasks/"+task._id} className="btn btn-warning col-lg-11 mx-1 mb-1">
                    View Task
                  </Link>
                  {/* <div className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default TasksList;
