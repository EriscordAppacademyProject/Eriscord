from .db import db, environment, SCHEMA, add_prefix_for_prod


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id')))
    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('servers.id')))
    sender_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user_m = db.relationship("User", back_populates="message_u")
    channel_m = db.relationship("Channel", back_populates="message_c")
    server_m = db.relationship("Server", back_populates="message_s")

    # stop case:
    def to_dict(self):
        dicted = {
            "username": "unknown",
            "color": 4
        }
        if self.user_m:
            dicted = self.user_m.to_dict()

        message_dict = {
            "id": self.id,
            "content": self.content,
            "channel_id": self.channel_id,
            "server_id": self.server_id,
            "sender_id": self.sender_id,
            "sender_name": dicted["username"],
            "sender_color": dicted["color"],
            "created_at": str(self.created_at)
        }
        return message_dict

    def __repr__(self):
        return f'<Message model: id={self.id}, content={self.content}, channel_id={self.channel_id}, server_id={self.server_id}, sender_id={self.sender_id}, created_at={self.created_at}>'
