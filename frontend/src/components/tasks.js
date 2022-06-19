import React, { useState, useEffect } from "react";
import TaskDataService from "../services/task";
import { Link } from "react-router-dom";

const Task = props => {
  const initialTaskState = {
    id: null,
    name: "",
    company: "",
    p_language: ""
  };

  const [task, setTask] = useState(initialTaskState);

  const getTask = id => {
    TaskDataService.get(id)
      .then(response => {
        setTask(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTask(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      {task ? (
        <div>
          <h5>{task.name}</h5>
          <p>
            <strong>Company: </strong>{task.company}<br/>
            <strong>Programming language: </strong>{task.p_language}
          </p>
          <Link to={"/tasks/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>No tasks selected.</p>
        </div>
      )}
    </div>
  );
};

export default Task;