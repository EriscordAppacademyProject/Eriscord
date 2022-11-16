import React, { useState } from "react";
import { useParams } from "react-router";
import MessagesBox from "../RM/MessagesBox";
import MessagesBoxTop from "../RM/MessagesBoxTop";
import ChannelCreateModal from "../Channel/ChannelCreate";
import ChannelEditModal from "../Channel/ChannelEdit"
import LogoutButton from "../auth/LogoutButton";
import './MainPage.css';
import CurrentUserServer from "../Server/CurrentUserServer";
import UsersInOneServer from "../Server/UsersInOneServer";
import ServerCreateModal from "../Server/ServerCreate";
// import ServerEdit from "../Server/ServerEdit/ServerEditForm";
import ServerDelete from "../Server/ServerDelete";
import ChannelListInServer from "../Channel/ChannelListInServer";
import ServerEditModal from "../Server/ServerEdit";
import CurrentUserDm from "../DM/CurrentUserDM";
import DMBox from "../DM/DMBox";
import ChatBox from "./Chatbox";


function MainPage(props) {
    const { dmShow } = props
    let messageShow;
    if (dmShow === false) {
        messageShow = true
    }
    // return (
    //     <div className="main-page-container">

    //         <div className="server-sidebar">
    //             <div>
    //             <CurrentUserServer />
    //             </div>
    //             <div>
    //             <ServerCreateModal/>
    //             </div>


    return (
        <div className="main-page-container">

            <div className="server-sidebar">
                <CurrentUserServer />
                <div className="server-plus">
                    {/* <ServerCreateModal /> */}
                </div>

            </div>

            <div className="channel-or-DM-sidebar">
                {/* {messageShow && <ServerEditModal />} */}
                {/* {messageShow && <ServerDelete />} */}
                <div>
                    {/* {messageShow && <ChannelCreateModal />} */}
                </div>

                <div>
                    {messageShow && <ChannelListInServer />}
                    {dmShow && <CurrentUserDm />}
                    {messageShow && <ChannelEditModal />}
                </div>


                <div>
                    <ChatBox />
                </div>



                <div>
                    {/* <LogoutButton /> */}
                </div>
            </div>
            <div className="messages-users-container">
                <>test test</>
                {/* <div> <MessagesBoxTop /></div> */}
                <div>
                    {messageShow &&
                        <div className="messages-container"> all the messages map
                            {/* <MessagesBox /> */}
                        </div>
                    }
                    {dmShow &&
                        <>
                            {/* <DMBox /> */}
                        </>
                    }
                    <div className="server-users-bar">
                        {/* <UsersInOneServer /> */}
                    </div>
                </div>

            </div>

            <div>

            </div>
        </div>
    )
}




export default MainPage;
