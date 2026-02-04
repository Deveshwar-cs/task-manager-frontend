import React, {useState, useEffect} from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";

import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import EditProjectModal from "../components/EditProjectModal";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({title: "", description: ""});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editData, setEditData] = useState({title: "", description: ""});

  const fetchProjects = async () => {
    const res = await api.get("/projects/getProjects");
    setProjects(res.data);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await api.get("/projects/getProjects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/projects/addProject", formData);
    setFormData({title: "", description: ""});
    fetchProjects();
  };

  const openEditModal = (project) => {
    setEditingProjectId(project._id);
    setEditData(project);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) =>
    setEditData({...editData, [e.target.name]: e.target.value});

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.put(`/projects/updateProject/${editingProjectId}`, editData);
    setIsModalOpen(false);
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    await api.delete(`/projects/deleteProject/${id}`);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 via-purple-950 to-black px-4">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-900/30 backdrop-blur-xl border-b border-gray-700/50 shadow-lg">
        <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">
          Project Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-linear-to-r hover:cursor-pointer from-purple-700 via-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Add Project Card */}
        <div className="bg-gray-900/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-[0_0_40px_rgba(128,0,255,0.5)]">
          <h2 className="text-2xl text-white font-bold mb-6 tracking-wide drop-shadow-md">
            Add New Project
          </h2>
          <ProjectForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Project List Card */}
        <div className="bg-gray-900/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-[0_0_40px_rgba(128,0,255,0.5)]">
          <h2 className="text-2xl text-white font-bold mb-6 tracking-wide drop-shadow-md">
            Your Projects
          </h2>
          <ProjectList
            projects={projects}
            onEdit={openEditModal}
            onDelete={handleDeleteProject}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <EditProjectModal
        isOpen={isModalOpen}
        editData={editData}
        onChange={handleEditChange}
        onUpdate={handleUpdate}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
