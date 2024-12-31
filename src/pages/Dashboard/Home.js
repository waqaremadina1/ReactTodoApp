import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="dashboard-container mb-5 mt-2">
            {/* Header Section */}
            <header className="text-center py-2 bg-light shadow-sm">
                <h1 className="fw-bold text-dark fs-4">Dashboard - Manage Your Todos</h1>
                <p className="text-muted small">Effortlessly organize your tasks with a clean and intuitive dashboard.</p>
            </header>

            {/* Main Content */}
            <main className="container mt-4">
                {/* Intro Section */}
                <div className="row justify-content-center mt-4">
                    <div className="col-md-8 text-center mt-3">
                        <div className="card shadow-sm p-3 border-0 rounded">
                            <p className="text-dark fw-bold fs-6 mb-0">
                                The Todos React App Dashboard is a sleek, user-friendly interface designed to streamline task management. Built with React, it provides a responsive and visually appealing platform for organizing daily tasks and long-term projects.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="row text-center mt-4">
                    <div className="col-md-6 mb-3">
                        <Link to="/add" className="btn btn-primary btn-lg w-100 shadow-sm">
                            Add New Todo
                        </Link>
                    </div>
                    <div className="col-md-6 mb-3">
                        <Link to="/todos" className="btn btn-success btn-lg w-100 shadow-sm">
                            View Todos
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="row mt-4 d-flex align-items-stretch">
                    <div className="col-md-6 text-center mb-3">
                        <div className="card shadow-sm p-3 border-0 rounded h-100">
                            <i className="fas fa-calendar-check fa-2x text-primary mb-2"></i>
                            <h4 className="text-dark fs-5">Task Scheduling</h4>
                            <p className="text-muted small">Plan your day with our built-in task scheduler and never miss a deadline.</p>
                        </div>
                    </div>
                    <div className="col-md-6 text-center mb-3">
                        <div className="card shadow-sm p-3 border-0 rounded h-100">
                            <i className="fas fa-sync-alt fa-2x text-success mb-2"></i>
                            <h4 className="text-dark fs-5">Sync Across Devices</h4>
                            <p className="text-muted small">Access your tasks seamlessly on any device, anywhere.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Styling */}
            <style>
                {`
                .dashboard-container {
                    font-family: 'Arial', sans-serif;
                    background: linear-gradient(to bottom, #f8f9fa 60%, #d3e0ff 100%);
                    min-height: 100vh;
                    padding: 0;
                }
                    body{
                    background: linear-gradient(to bottom, #f8f9fa 60%, #d3e0ff 100%);
                    }
                header {
                    border-bottom: 1px solid #ddd;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
                .btn-lg {
                    font-weight: bold;
                    font-size: 1.1rem;
                    border-radius: 8px;
                }
                .card {
                    background: #ffffff;
                    border-radius: 10px;
                }
                .card.h-100 {
                    height: 100%;
                }
                h1 {
                    font-size: 1.5rem;
                }
                p {
                    font-size: 0.9rem;
                }
                @media (max-width: 768px) {
                    .btn-lg {
                        font-size: 1rem;
                    }
                    .fas {
                        font-size: 2rem;
                    }
                    h1 {
                        font-size: 1.3rem;
                    }
                    p {
                        font-size: 0.85rem;
                    }
                }
                `}
            </style>
        </div>
    );
}
