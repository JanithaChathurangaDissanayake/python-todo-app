export default function TodoFilters({ filters, setFilters, stats, onClearCompleted }) {
  const handleChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="filters-container">
      <div className="stats-bar">
        <span className="stat"><strong>{stats.total}</strong> total</span>
        <span className="stat active"><strong>{stats.active}</strong> active</span>
        <span className="stat done"><strong>{stats.completed}</strong> done</span>
      </div>

      <div className="filter-controls">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search todos..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="search-input"
        />

        {/* Status Filter */}
        <div className="filter-group">
          {['all', 'active', 'completed'].map((s) => (
            <button
              key={s}
              className={`filter-btn ${filters.status === s ? 'active' : ''}`}
              onClick={() => handleChange('status', s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <select
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="filter-select"
        >
          <option value="">All Priorities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="filter-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">By Priority</option>
          <option value="dueDate">By Due Date</option>
        </select>

        {/* Clear Completed */}
        {stats.completed > 0 && (
          <button className="btn-ghost btn-sm clear-btn" onClick={onClearCompleted}>
            Clear {stats.completed} done
          </button>
        )}
      </div>
    </div>
  );
}