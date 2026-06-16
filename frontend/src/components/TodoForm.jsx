import { useState, useEffect } from 'react';

export default function TodoForm({ onSubmit, onCancel, initialData = null }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : '',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate || null,
    };
    const ok = await onSubmit(payload);
    if (ok && !initialData) {
      setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    }
  };

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          name="title"
          type="text"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={handleChange}
          required
          className="todo-input"
          autoFocus
        />
        <button type="submit" className="btn-primary btn-add">
          {initialData ? 'Save' : '+ Add'}
        </button>
      </div>

      <div className="form-extras">
        <textarea
          name="description"
          placeholder="Add a note... (optional)"
          value={form.description}
          onChange={handleChange}
          rows={2}
          className="todo-textarea"
        />
        <div className="form-meta">
          <select name="priority" value={form.priority} onChange={handleChange} className="priority-select">
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className="date-input"
          />
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}