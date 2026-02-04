import {useDroppable} from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({id, title, tasks, onEdit, onDelete}) => {
  const {setNodeRef, isOver} = useDroppable({id});

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-1 min-w-55
        bg-gray-800/30 backdrop-blur-xl
        border border-gray-700
        rounded-2xl p-6
        shadow-2xl
        transition-all duration-300
        ${isOver ? "ring-2 ring-pink-400 scale-[1.02]" : ""}
      `}
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-6 tracking-wide text-white">
        {title}
      </h2>

      {/* Tasks */}
      <div className="flex flex-col gap-5">
        {tasks.length === 0 ? (
          <p className="text-gray-400/50 text-center italic">Drop tasks here</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
