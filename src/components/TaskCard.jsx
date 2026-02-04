import {useDraggable} from "@dnd-kit/core";

const TaskCard = ({task, onEdit, onDelete}) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        bg-gray-900/70
        border border-gray-700
        rounded-2xl
        p-5
        shadow-md
        hover:shadow-lg
        transition-shadow duration-200
        select-none
      "
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        className="
          cursor-grab
          active:cursor-grabbing
          mb-3
          text-pink-400
          font-semibold
          text-sm
          select-none
        "
      >
        ⠿ Drag
      </div>

      <h3 className="text-white text-lg font-semibold">{task.title}</h3>

      {task.description && (
        <p className="text-gray-300 text-sm mt-2">{task.description}</p>
      )}

      <div className="flex justify-between items-center mt-4">
        {task.dueDate && (
          <span className="text-xs bg-blue-700/20 text-blue-400 px-3 py-1 rounded-full">
            {task.dueDate.slice(0, 10)}
          </span>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-xs px-3 py-1 rounded-full bg-blue-500 hover:cursor-pointer text-white transition-colors duration-200"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="text-xs px-3 py-1 rounded-full bg-[oklch(0.33_0.09_273.49)] hover:cursor-pointer text-white transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
