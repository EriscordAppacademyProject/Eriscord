from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .server_member import server_member


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String, nullable=True)

    server_u = db.relationship(
        "Server", back_populates="user_s", cascade='all, delete')
    message_u = db.relationship(
        "Message", back_populates="user_m", cascade='all, delete')

    user_server_member = db.relationship(
        "Server",
        secondary=server_member,
        back_populates="server_server_members",
        cascade="all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        user_dict = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "color": self.color,
        }
        return user_dict

    def __repr__(self):
        return f'<User model: id={self.id}, username={self.username}, email={self.email}, color={self.color}>'
