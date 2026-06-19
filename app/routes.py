# app/routes.py
# Routes define our API endpoints.
# We use a Blueprint — think of it as a mini-app that can be registered
# onto the main app. Blueprints keep code organized and allow you
# to split a large app into multiple files.

from flask import Blueprint, jsonify, request
from app import db
from app.models import Todo

# Create a blueprint named 'todo'.
# url_prefix means all routes here start with '/api'
todo_bp = Blueprint('todo', __name__, url_prefix='/api')


@todo_bp.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    CI/CD pipelines and load balancers hit this to verify the app is alive.
    Always returns 200 if the app is running.
    """
    return jsonify({'status': 'healthy', 'message': 'TODO API is running'}), 200


@todo_bp.route('/todos', methods=['GET'])
def get_todos():
    """Get all todos, ordered by newest first."""
    todos = Todo.query.order_by(Todo.created_at.desc()).all()
    return jsonify([todo.to_dict() for todo in todos]), 200


@todo_bp.route('/todos', methods=['POST'])
def create_todo():
    """
    Create a new todo.
    Expects JSON body: { "title": "Buy groceries" }
    """
    data = request.get_json()

    # Validate input — never trust what the client sends you
    if not data or not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400

    title = data['title'].strip()
    if not title:
        return jsonify({'error': 'Title cannot be empty'}), 400

    if len(title) > 200:
        return jsonify({'error': 'Title must be 200 characters or less'}), 400

    new_todo = Todo(title=title)
    db.session.add(new_todo)   # Stage the new record
    db.session.commit()        # Write it to the database

    # 201 Created is the correct HTTP status for a successfully created resource
    return jsonify(new_todo.to_dict()), 201


@todo_bp.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """
    Update a todo (title and/or completed status).
    <int:todo_id> tells Flask to capture the number from the URL
    and pass it as an integer argument to the function.
    """
    # get_or_404 automatically returns a 404 response if the ID doesn't exist.
    # This saves us from writing an if/else every time.
    todo = db.get_or_404(Todo, todo_id)
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Only update fields that were actually sent in the request
    if 'title' in data:
        title = data['title'].strip()
        if not title:
            return jsonify({'error': 'Title cannot be empty'}), 400
        todo.title = title

    if 'completed' in data:
        # Ensure the value is actually a boolean
        if not isinstance(data['completed'], bool):
            return jsonify({'error': 'completed must be true or false'}), 400
        todo.completed = data['completed']

    db.session.commit()
    return jsonify(todo.to_dict()), 200


@todo_bp.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """Delete a todo by ID."""
    todo = db.get_or_404(Todo, todo_id)
    db.session.delete(todo)
    db.session.commit()
    # 204 No Content — success, but nothing to return
    return '', 204