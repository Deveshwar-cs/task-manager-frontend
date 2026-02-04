import React from "react";
import {useNavigate} from "react-router-dom";

const ProjectList = ({projects, onEdit, onDelete}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-gray-900/30 backdrop-blur-xl p-6 rounded-3xl border border-gray-700/50 shadow-[0_0_30px_rgba(128,0,255,0.5)] flex justify-between items-center"
        >
          <div>
            <h3 className="text-white text-lg font-bold tracking-wide drop-shadow-md">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm mt-1">{project.description}</p>
          </div>

          <div className="flex gap-3">
            {/* Open Button */}
            <button
              onClick={() => navigate(`/project/${project._id}`)}
              className="px-4 py-2 bg-linear-to-r  bg-[oklch(0.63_0.12_238.16)] text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:cursor-pointer"
            >
              Open
            </button>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(project)}
              className="px-4 py-2 bg-linear-to-r  bg-blue-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:cursor-pointer"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(project._id)}
              className="px-4 py-2 bg-linear-to-r bg-[oklch(0.33_0.09_273.49)] text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
