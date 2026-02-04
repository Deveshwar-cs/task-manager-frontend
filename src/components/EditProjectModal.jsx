import React from "react";

const EditProjectModal = ({isOpen, editData, onChange, onUpdate, onClose}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50">
      <div className="bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md border border-gray-700 shadow-xl">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Edit Project
        </h2>

        <form onSubmit={onUpdate} className="space-y-5">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={onChange}
            placeholder="Project Title"
            className="w-full px-4 py-3 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md"
            required
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={onChange}
            placeholder="Project Description"
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md resize-none"
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-500 text-white transition-colors duration-200 hover:cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors duration-200 hover:cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
