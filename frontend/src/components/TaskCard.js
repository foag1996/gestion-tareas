import React from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onUpdateStatus, onDelete }) => {
  const priorityColors = {
    baja: '#4caf50',
    media: '#ff9800',
    alta: '#f44336'
  };

  const statusOptions = [
    { value: 'por_hacer', label: 'Por Hacer' },
    { value: 'en_progreso', label: 'En Progreso' },
    { value: 'completada', label: 'Completada' }
  ];

  const handleStatusChange = (e) => {
    onUpdateStatus(task.id, e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span
          className="task-priority"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority.toUpperCase()}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-delete"
          title="Eliminar tarea"
        >
          ×
        </button>
      </div>

      <h4 className="task-title">{task.title}</h4>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="task-date">{formatDate(task.created_at)}</span>
      </div>
    </div>
  );
};

export default TaskCard;
