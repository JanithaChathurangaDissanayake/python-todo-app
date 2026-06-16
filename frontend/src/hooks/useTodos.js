import { useState, useEffect, useCallback } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, clearCompleted } from '../utils/api';
import toast from 'react-hot-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: '',
    search: '',
    sort: 'newest',
  });

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;
      if (filters.sort) params.sort = filters.sort;

      const { data } = await getTodos(params);
      setTodos(data.todos);
    } catch (err) {
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData) => {
    try {
      const { data } = await createTodo(todoData);
      setTodos((prev) => [data, ...prev]);
      toast.success('Todo added!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add todo');
      return false;
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const { data } = await updateTodo(id, { completed: !completed });
      setTodos((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch {
      toast.error('Failed to update todo');
    }
  };

  const editTodo = async (id, updates) => {
    try {
      const { data } = await updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? data : t)));
      toast.success('Todo updated!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update todo');
      return false;
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
      toast.success('Todo deleted');
    } catch {
      toast.error('Failed to delete todo');
    }
  };

  const clearDone = async () => {
    try {
      await clearCompleted();
      setTodos((prev) => prev.filter((t) => !t.completed));
      toast.success('Completed todos cleared!');
    } catch {
      toast.error('Failed to clear completed todos');
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };

  return {
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
  };
};