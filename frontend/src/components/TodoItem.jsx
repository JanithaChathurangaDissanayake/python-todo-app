import { useState } from 'react';
import TodoForm from './TodoForm';

const PRIORITY_COLORS = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const PRIORITY_LABELS = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 High' };

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = async (data) => {
    const ok = await onEdit(todo._id, data);
    if (ok) setIsEditing(false);
    return ok;
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <TodoForm
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
          initialData={todo}
        />
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="priority-bar" style={{ background: PRIORITY_COLORS[todo.priority] }} />

      <button
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo._id, todo.completed)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && '✓'}
      </button>

      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && <p className="todo-desc">{todo.description}</p>}
        <div className="todo-meta">
          <span className="priority-badge" style={{ color: PRIORITY_COLORS[todo.priority] }}>
            {PRIORITY_LABELS[todo.priority]}
          </span>
          {todo.dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
              📅 {new Date(todo.dueDate).toLocaleDateString()}
              {isOverdue && ' (Overdue!)'}
            </span>
          )}
          <span className="created-at">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => setIsEditing(true)}
          aria-label="Edit todo"
          title="Edit"
        >
          ✏️
        </button>
        {showConfirm ? (
          <div className="confirm-delete">
            <button className="action-btn confirm-yes" onClick={() => onDelete(todo._id)}>Delete?</button>
            <button className="action-btn confirm-no" onClick={() => setShowConfirm(false)}>No</button>
          </div>
        ) : (
          <button
            className="action-btn delete-btn"
            onClick={() => setShowConfirm(true)}
            aria-label="Delete todo"
            title="Delete"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}