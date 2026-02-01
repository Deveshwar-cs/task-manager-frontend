import React, {useEffect, useState} from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects/getProjects");
        setProjects(res.data);
      } catch {
        setError("Failed to fetch data");
      }
    };
    fetchProjects();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{color: "red"}}>{error}</p>}
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h3>{project.title}</h3>
              <h3>{project.description}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
