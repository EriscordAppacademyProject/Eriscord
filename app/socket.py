from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins

origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('connect')
def handle_connect(data):
    print("~~~~~~!!!!!!")

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)


@socketio.on('message')
def handle_direct_chat(message, data):
    print ("data----", data)
    print ("begin 1 ----", datetime.now())
    message = Message()
    if data["is_channel_message"]:
        message.channel_id =data['channel_id']
    else:
        message.server_id = data['dm_server_id']

    message.user_id =data['sender_id']
    message.body =data['body']
    message.created_at = datetime.now()
    message.updated_at = datetime.now()

    # name_space = data['name-space']

    db.session.add(message)
    db.session.commit()
    # print ("receive data 1", direct_message.to_dict())
    print ("begin 2 ----", datetime.now())
    socketio.emit("hello", message.to_dict(), broadCast=True)
    print ("begin 3 ----", datetime.now())
