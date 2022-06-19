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
            <strong>Programming language: </strong>{task.p_language}<br/>
            <strong>Description: </strong> <br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vivamus arcu felis bibendum ut. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Enim facilisis gravida neque convallis a cras semper. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Fusce id velit ut tortor pretium viverra. Eu tincidunt tortor aliquam nulla facilisi cras. Malesuada pellentesque elit eget gravida cum sociis. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies. Amet purus gravida quis blandit turpis cursus. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque.

Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Enim sit amet venenatis urna. At volutpat diam ut venenatis. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare. Et malesuada fames ac turpis egestas maecenas pharetra. Pharetra massa massa ultricies mi quis hendrerit. Aliquam faucibus purus in massa tempor nec feugiat nisl. Morbi enim nunc faucibus a pellentesque sit amet. Cursus euismod quis viverra nibh. Facilisis leo vel fringilla est ullamcorper. Tortor dignissim convallis aenean et.
          </p>
          <Link to={"/tasks/" + props.match.params.id + "/review"} className="btn btn-primary">
            Contact
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