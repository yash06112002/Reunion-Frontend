import React, { useEffect, useState } from "react";

const TaskModal = ({ modalData, isEditing, onSubmit }) => {
    const [formData, setFormData] = useState(modalData);

    useEffect(() => {
        setFormData(modalData);
    }, [modalData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const formatDateForInput = (date) => {
        if (!date) return '';
        const localDate = new Date(date);
        return localDate.toISOString().slice(0, 16);
    };


    return (
        <div
            className="modal fade"
            id="taskModal"
            tabIndex="-1"
            aria-labelledby="taskModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="taskModalLabel">
                            {isEditing ? "Edit Task" : "Add New Task"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Task Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={formData.title || ""}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="priority" className="form-label">
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    className="form-select"
                                    value={formData.priority || ""}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Priority</option>
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <option key={val} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    className="form-select"
                                    value={formData.status || ""}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Finished">Finished</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startTime" className="form-label">
                                    Start Time
                                </label>
                                <input
                                    type="datetime-local"
                                    id="startTime"
                                    name="startTime"
                                    className="form-control"
                                    value={formatDateForInput(formData.startTime) || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endTime" className="form-label">
                                    End Time
                                </label>
                                <input
                                    type="datetime-local"
                                    id="endTime"
                                    name="endTime"
                                    className="form-control"
                                    value={formatDateForInput(formData.endTime) || ""}
                                    onChange={handleInputChange}
                                    required
                                    min={modalData.startTime}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {isEditing ? "Update Task" : "Add Task"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
