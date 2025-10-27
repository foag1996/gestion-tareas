import React from 'react';
import TaskCard from './TaskCard';
import '../styles/TaskBoard.css';

const TaskBoard = ({ tasksByStatus, onUpdateStatus, onDeleteTask }) => {
  const columns = [
    { key: 'por_hacer', title: 'Por Hacer', color: '#e3f2fd' },
    { key: 'en_progreso', title: 'En Progreso', color: '#fff3e0' },
    { key: 'completada', title: 'Completada', color: '#e8f5e9' }
  ];

  return (
    <div className="task-board">
      {columns.map(column => (
        <div key={column.key} className="board-column">
          <div className="column-header" style={{ backgroundColor: column.color }}>
            <h3>{column.title}</h3>
            <span className="task-count">{tasksByStatus[column.key].length}</span>
          </div>
          <div className="column-content">
            {tasksByStatus[column.key].length === 0 ? (
              <div className="empty-column">
                No hay tareas
              </div>
            ) : (
              tasksByStatus[column.key].map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdateStatus={onUpdateStatus}
                  onDelete={onDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
