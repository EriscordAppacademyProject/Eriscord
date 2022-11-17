import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { thunkLoadoneChannel } from "../../../store/channelReducer"
import SendRegulerMsg from "../SendRegulerMsg";
import { io } from 'socket.io-client';
import './MessagesBox.css';
let socket;

function MessagesBox() {
    const dispatch = useDispatch();
    const { channelId, serverId } = useParams();

    let channel = useSelector(state => state.channel)
    let messagesArr = useSelector(state => state.channel[+channelId]?.messages)


    useEffect(() => {
        dispatch(thunkLoadoneChannel(channelId))
    }, [dispatch, channelId]);


    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("RM", (chat) => {
            console.log("MESSAGE FROM TEST :", chat)
            dispatch(thunkLoadoneChannel(channelId))

        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [messagesArr])

    // console.log(channelId, serverId)
    // console.log("A community for all users who want to call a server home. Here we hangout. Have a laugh. We're always looking for lively people so come hangout with us!".length)



    console.log('messages!!!!!!!!', messagesArr)
    let channelArr = Object.values(channel)
    // console.log('channelArr!!!!!!!!', channelArr)

    if (!messagesArr) { return null }


    return (
        <>
            <hr></hr>
            <>
                {channel.name}
            </>

            <hr></hr>
            <div>
                {messagesArr.map((message) => (
                    <div className='single-message-container' key={message.id}>
                        <div className='review-name'>background color:  {message?.sender_color}</div>
                        <div className='review-name'>sender name:  {message?.sender_name}</div>
                        <div className='review-name'>content:  {message?.content}</div>
                        <div className='review-name'>time:  {message?.created_at.slice(0, 16)}</div>
                    </div>
                ))}

            </div>
            {/* <div className="channel-message-form">
            <form className='channel-send-message-form'>
                        <textarea
                        className='channel-send-message-content'
                        placeholder={`Message @${channel.name}`}
                        rows='1'
                        onChange={handleMessageInput}
                        value={messageInput}
                        />
                    <button type='submit' id='send-message-btn' style={{display: 'none'}} />
                    </form>
            </div> */}


            <SendRegulerMsg />
        </>
    )
}




export default MessagesBox;
