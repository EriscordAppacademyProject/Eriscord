from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models import Channel


class ChannelForm(FlaskForm):
    name = StringField('CHANNEL NAME', validators=[DataRequired()])
    topic = StringField('CHANNEL TOPIC')
    server_id = StringField('CHANNEL BELONG TO SERVER ID')
    submit = SubmitField("Create")
