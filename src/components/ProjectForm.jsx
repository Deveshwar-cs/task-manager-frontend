import React from "react";

const ProjectForm = ({formData, onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="text-white text-sm">Project Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter project title"
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-md"
          required
        />
      </div>

      <div>
        <label className="text-white text-sm">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter project description"
          rows="4"
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-md resize-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-white text-indigo-700 hover:cursor-pointer font-bold hover:scale-105 transition-transform shadow-lg"
      >
        ➕ Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
