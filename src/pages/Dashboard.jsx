import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
                    headers: { Authorization: localStorage.getItem('token') }
                });

                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const {
        totalTasks,
        tasksFinishedInPercent,
        tasksPendingInPercent,
        finishedTasksAverageTime,
        pendingTasksCount,
        pendingTasksTimeLapsed,
        estimatedTimeToFinishPendingTasks,
        priorityWisePendingTaskData
    } = data;

    return (
        <div className="container">
            <h3>Summary</h3>

            <div className="row">
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className='text-primary fw-bold'>{totalTasks}</h5>
                            <p className="card-title">Total Tasks</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className='text-primary fw-bold'>{tasksFinishedInPercent}%</h5>
                            <p className="card-title">Completed</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className='text-primary fw-bold'>{tasksPendingInPercent}%</h5>
                            <p className="card-title">Pending</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className='text-primary fw-bold'>{finishedTasksAverageTime} hrs</h5>
                            <p className="card-title">Average Time per task completed</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Pending Tasks Summary</h3>
            <div className="row mb-1">
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className='text-primary fw-bold'>{pendingTasksCount}</h5>
                            <p className="card-title">Pending Tasks </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className='text-primary fw-bold'>{pendingTasksTimeLapsed} hrs</h5>
                            <p className="card-title">Total Time Lapsed</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className='text-primary fw-bold'>{estimatedTimeToFinishPendingTasks} hrs</h5>
                            <p className="card-title">Total time to finish</p>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table table-striped">
                <thead >
                    <tr>
                        <th className="bg-secondary text-white">Priority</th>
                        <th className="bg-secondary text-white">Pending Tasks Count</th>
                        <th className="bg-secondary text-white">Time Lapsed</th>
                        <th className="bg-secondary text-white">Remaining Time</th>
                    </tr>
                </thead>
                <tbody>
                    {priorityWisePendingTaskData.map((task, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{task.count}</td>
                            <td>{task.timeLapsed}</td>
                            <td>{task.timeRemaining}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
