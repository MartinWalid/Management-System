import NewTask from "./NewTask.jsx";



export default function Tasks({ tasks, onAdd, onDelete, onEdit }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">This Project has no tasks yet</p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-slate-100">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center my-4"
            >
              <span>{task.text}</span>
              <div>
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => onEdit(task.id)}
                >
                  Edit
                </button>
                <button
                  className="text-stone-700 hover:text-red-600"
                  onClick={() => onDelete(task.id)}
                >
                  Clear
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
