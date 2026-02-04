import React, {useEffect, useState} from "react";
import api from "../api/axios";
import {useParams} from "react-router-dom";
import {DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import Column from "../components/Column";

const Project = () => {
  const {id} = useParams();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {distance: 6}, // quick grab
    }),
  );

  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // -------- Fetch Tasks --------
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await api.get(`/tasks/getTasks/${id}`);
      const grouped = {todo: [], doing: [], done: []};
      res.data.forEach((task) => grouped[task.status].push(task));
      setColumns(grouped);
    };
    fetchTasks();
  }, [id]);

  // -------- Add Task --------
  const handleChange = (e) =>
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post(`/tasks/createTask/${id}`, formData);
    setColumns((prev) => ({...prev, todo: [...prev.todo, res.data]}));
    setFormData({title: "", description: "", dueDate: ""});
  };

  // -------- Drag (fast & smooth) --------
  const handleDragEnd = async ({active, over}) => {
    if (!over) return;
    const sourceCol = Object.keys(columns).find((col) =>
      columns[col].some((t) => t._id === active.id),
    );
    const targetCol = over.id;
    if (sourceCol === targetCol) return;

    const task = columns[sourceCol].find((t) => t._id === active.id);
    setColumns((prev) => ({
      ...prev,
      [sourceCol]: prev[sourceCol].filter((t) => t._id !== active.id),
      [targetCol]: [{...task, status: targetCol}, ...prev[targetCol]],
    }));

    await api.put(`/tasks/updateStatus/${active.id}`, {status: targetCol});
  };

  // -------- Edit --------
  const handleEdit = (task) => {
    setEditTask(task);
    setModalData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.slice(0, 10) || "",
    });
    setIsModalOpen(true);
  };

  const handleModalChange = (e) =>
    setModalData((prev) => ({...prev, [e.target.name]: e.target.value}));

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const res = await api.put(`/tasks/updateTask/${editTask._id}`, modalData);
    const updated = res.data;

    setColumns((prev) => {
      const newCols = {...prev};
      Object.keys(newCols).forEach((col) => {
        newCols[col] = newCols[col].map((t) =>
          t._id === updated._id ? updated : t,
        );
      });
      return newCols;
    });

    setIsModalOpen(false);
    setEditTask(null);
  };

  // -------- Delete --------
  const handleDeleteTask = async (taskId) => {
    await api.delete(`/tasks/deleteTask/${taskId}`);
    setColumns((prev) => {
      const newCols = {...prev};
      Object.keys(newCols).forEach(
        (col) => (newCols[col] = newCols[col].filter((t) => t._id !== taskId)),
      );
      return newCols;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 tracking-wide text-center">
        Project Board
      </h1>

      {/* -------- Add Task -------- */}
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-gray-800/30 border border-gray-700 rounded-2xl p-6 shadow-2xl flex flex-wrap gap-4 items-end justify-center mb-12"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title..."
          required
          className="bg-gray-900/50 p-3 rounded-xl w-56 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description..."
          className="bg-gray-900/50 p-3 rounded-xl w-72 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="bg-gray-900/50 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button className="bg-linear-to-r hover:cursor-pointer bg-indigo-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
          Add Task
        </button>
      </form>

      {/* -------- Board -------- */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-8 overflow-x-auto p-6">
          <Column
            id="todo"
            title="Todo"
            tasks={columns.todo}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
          />
          <Column
            id="doing"
            title="Doing"
            tasks={columns.doing}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
          />
          <Column
            id="done"
            title="Done"
            tasks={columns.done}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
          />
        </div>
      </DndContext>

      {/* -------- Modal -------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 w-96 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl mb-6 text-center font-semibold">
              Edit Task
            </h2>

            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                value={modalData.title}
                onChange={handleModalChange}
                className="bg-gray-900/50 p-3 rounded-xl placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
              <input
                name="description"
                value={modalData.description}
                onChange={handleModalChange}
                className="bg-gray-900/50 p-3 rounded-xl placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="date"
                name="dueDate"
                value={modalData.dueDate}
                onChange={handleModalChange}
                className="bg-gray-900/50 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-pink-400"
              />

              <div className="flex justify-between mt-4">
                <button className="bg-purple-600 hover:bg-purple-700 hover:cursor-pointer px-4 py-2 rounded-xl hover:scale-105 transition-transform">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-500 hover:cursor-pointer px-4 py-2 rounded-xl hover:scale-105 transition-transform"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
