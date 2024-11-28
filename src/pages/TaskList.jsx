import React, { useState, useEffect } from "react";
import TaskTable from "../components/TaskTable";
import TaskModal from "../components/TaskModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [modalData, setModalData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [filters, setFilters] = useState({ priority: "", status: "" });
    const [sortKey, setSortKey] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setTasks(data);
            setFilteredTasks(data);
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, sortKey, tasks]);

    const applyFilters = () => {
        let updatedTasks = [...tasks];
        if (filters.priority) {
            updatedTasks = updatedTasks.filter(
                (task) => task.priority === Number(filters.priority)
            );
        }
        if (filters.status) {
            updatedTasks = updatedTasks.filter((task) => task.status === filters.status);
        }
        if (sortKey) {
            updatedTasks.sort((a, b) => new Date(a[sortKey]) - new Date(b[sortKey]));
        }
        setFilteredTasks(updatedTasks);
    };

    const handleOpenAddModal = () => {
        setModalData({});
        setIsEditing(false);
        const modal = new window.bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
    };

    const handleOpenEditModal = (task) => {
        setModalData(task);
        setIsEditing(true);
        const modal = new window.bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
    };

    const handleFormSubmit = async (data) => {
        if (data.startTime && data.endTime) {

            const startTime = new Date(data.startTime);
            const endTime = new Date(data.endTime);

            if (startTime > endTime) {
                alert("Start time cannot be greater than end time.");
                return;
            }
        }
        if (data.status === 'Finished') {
            data.endTime = new Date();
        }
        if (isEditing) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${data._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem('token') },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setTasks((prev) =>
                    prev.map((task) => (task._id === data._id ? data : task))
                );
            }
        } else {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem('token') },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const newTask = await response.json();
                setTasks((prev) => [...prev, newTask]);
            }
        }
        const modal = window.bootstrap.Modal.getInstance(
            document.getElementById("taskModal")
        );
        modal.hide();
    };

    const handleDeleteSelectedTasks = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem('token') },
            body: JSON.stringify({ ids: selectedTasks }),
        });

        if (response.ok) {
            setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task._id)));
            setSelectedTasks([]);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSortChange = (key) => {
        setSortKey(key);
    };

    const handleSelectTask = (taskId, isChecked) => {
        setSelectedTasks((prevTaskIds) =>
            isChecked ? [...prevTaskIds, taskId] : prevTaskIds.filter((oldTaskId) => oldTaskId !== taskId)
        );
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary" onClick={handleOpenAddModal}>
                    Add New Task
                </button>
                <button
                    className="btn btn-danger"
                    onClick={handleDeleteSelectedTasks}
                    disabled={selectedTasks.length === 0}
                >
                    Delete Selected Tasks
                </button>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="priorityFilter" className="form-label">
                        Filter by Priority
                    </label>
                    <select
                        id="priorityFilter"
                        name="priority"
                        className="form-select"
                        value={filters.priority}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Priorities</option>
                        {[1, 2, 3, 4, 5].map((priority) => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="statusFilter" className="form-label">
                        Filter by Status
                    </label>
                    <select
                        id="statusFilter"
                        name="status"
                        className="form-select"
                        value={filters.status}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Sort by</label>
                    <div>
                        <button
                            className="btn btn-outline-secondary me-2"
                            onClick={() => handleSortChange("startTime")}
                        >
                            Start Time
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleSortChange("endTime")}
                        >
                            End Time
                        </button>
                    </div>
                </div>
            </div>
            <TaskTable
                tasks={filteredTasks}
                selectedTasks={selectedTasks}
                onEdit={handleOpenEditModal}
                onSelectTask={handleSelectTask}
            />
            <TaskModal
                modalData={modalData}
                isEditing={isEditing}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default TaskList;
