import { useTodos } from '../hooks/useTodos';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import TodoFilters from '../components/TodoFilters';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const {
    todos,
    loading,
    filters,
    setFilters,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    clearDone,
    stats,
  } = useTodos();

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h2>My Tasks</h2>
            <p className="greeting">Stay focused, one task at a time.</p>
          </div>

          {/* Add Todo */}
          <div className="card">
            <TodoForm onSubmit={addTodo} />
          </div>

          {/* Filters */}
          <TodoFilters
            filters={filters}
            setFilters={setFilters}
            stats={stats}
            onClearCompleted={clearDone}
          />

          {/* Todo List */}
          <div className="todo-list">
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Loading your todos...</p>
              </div>
            ) : todos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No todos found</h3>
                <p>
                  {filters.search || filters.priority || filters.status !== 'all'
                    ? 'Try adjusting your filters.'
                    : 'Add your first task above to get started!'}
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                  onDelete={removeTodo}
                />
              ))
            )}
          </div>

          {todos.length > 0 && (
            <p className="footer-note">
              {stats.active === 0
                ? '🎉 All tasks complete!'
                : `${stats.active} task${stats.active !== 1 ? 's' : ''} remaining`}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}