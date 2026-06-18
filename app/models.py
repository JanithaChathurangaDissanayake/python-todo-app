# app/models.py
# Models define the structure of our database tables.
# Each class here becomes one table. Each class attribute becomes one column.

from datetime import datetime, timezone
from app import db


class Todo(db.Model):
    """
    Represents a single TODO item in the database.
    Table name will be 'todo' (Flask-SQLAlchemy lowercases the class name).
    """
    # __tablename__ lets you override the default table name if needed
    __tablename__ = 'todos'

    # Primary key — every table needs one. Auto-increments (1, 2, 3...).
    id = db.Column(db.Integer, primary_key=True)

    # The task text. nullable=False means this field is required.
    title = db.Column(db.String(200), nullable=False)

    # Whether the task is done. Defaults to False for new tasks.
    completed = db.Column(db.Boolean, default=False, nullable=False)

    # Automatically set to the current time when a record is created.
    # timezone.utc ensures we always store UTC time — a best practice
    # because it avoids timezone confusion across servers.
    created_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    def to_dict(self):
        """
        Converts this model instance to a Python dictionary.
        This is needed to return JSON responses from our API routes.
        You can't directly JSON-serialize a SQLAlchemy object.
        """
        return {
            'id': self.id,
            'title': self.title,
            'completed': self.completed,
            'created_at': self.created_at.isoformat()
        }

    def __repr__(self):
        """
        Developer-friendly string representation.
        Useful when you print a Todo object or see it in debugger.
        """
        return f'<Todo id={self.id} title="{self.title}" completed={self.completed}>'