const TaskTable = ({ tasks, selectedTasks, onEdit, onSelectTask }) => {
    const handleCheckboxChange = (e, taskId) => {
        onSelectTask(taskId, e.target.checked);
    };

    return (
        <table className="table table-striped">
            <thead className="bg-secondary text-white">
                <tr key="heading">
                    <th>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                tasks.forEach((task) => handleCheckboxChange(e, task._id))
                            }
                        />
                    </th>
                    <th>Task ID</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Total Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task._id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedTasks.includes(task._id)}
                                onChange={(e) => handleCheckboxChange(e, task._id)}
                            />
                        </td>
                        <td>{task._id}</td>
                        <td>{task.title}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td>{new Date(task.startTime).toLocaleString()}</td>
                        <td>{new Date(task.endTime).toLocaleString()}</td>
                        <td>{((new Date(task.endTime) - new Date(task.startTime)) / (60 * 60 * 1000)).toFixed(1)} hrs</td>
                        <td>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => onEdit(task)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default TaskTable;