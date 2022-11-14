import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { thunkEditOneChannel } from "../../../store/channelReducer";
import ChannelDelete from "../ChannelDelete";
import './ChannelEdit.css';


function ChannelEdit({setShowModal}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { channelId, serverId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);



        const editedchannelPayload = { name, topic }
        editedchannelPayload.channelId = channelId
        console.log("!!!!!frontend", editedchannelPayload)
        let editedChannel = await dispatch(thunkEditOneChannel(editedchannelPayload)).catch(async (res) => {

            const data = await res.json();

            if (data && data.errors) {
                setErrors(data.errors)
            };
        });

        if (editedChannel) {
            // history.push(`/`)
            console.log(editedChannel)
        }
    }


    return (
        <>
            <hr></hr>
            <>
                This gonna be where you edit the channel
            </>
            <div>
                <form onSubmit={handleSubmit}>

                        <label > NAME</label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />

                        <label >TOPIC</label>
                        <input type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required/>
                    <button type="submit">Edit Channel</button>
                </form>
                <div>
                    <ChannelDelete/>
                </div>
            </div>
        </>
    )
}




export default ChannelEdit;