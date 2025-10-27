import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import TaskBoard from '../components/TaskBoard';
import TaskModal from '../components/TaskModal';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data.tasks);
      setError('');
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.task, ...tasks]);
      setShowModal(false);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Error al crear tarea');
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const response = await taskAPI.updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(task =>
        task.id === taskId ? response.data.task : task
      ));
    } catch (err) {
      setError('Error al actualizar tarea');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Error al eliminar tarea');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tasksByStatus = {
    por_hacer: tasks.filter(t => t.status === 'por_hacer'),
    en_progreso: tasks.filter(t => t.status === 'en_progreso'),
    completada: tasks.filter(t => t.status === 'completada')
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>TaskFlow</h1>
          <div className="header-right">
            <span className="user-name">Hola, {user?.name}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-actions">
          <button onClick={() => setShowModal(true)} className="btn-primary">
            + Nueva Tarea
          </button>
          <div className="task-summary">
            Total: {tasks.length} tareas
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Cargando tareas...</div>
        ) : (
          <TaskBoard
            tasksByStatus={tasksByStatus}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>

      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
