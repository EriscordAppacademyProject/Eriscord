
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import ChannelEdit from './ChannelEditForm';

function ChannelEditModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='edit-channel'>
                <div className='text-channel'>
                    <div className='gear-div'>
                    <i className="fa-sharp fa-solid fa-gear" onClick={() => setShowModal(true)} > </i>
                    </div>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ChannelEdit setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    );
}


export default ChannelEditModal;
