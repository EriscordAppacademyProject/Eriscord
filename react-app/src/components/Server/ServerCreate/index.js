
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import ServerCreate from './ServerCreateForm';

function ServerCreateModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='add-server' >
                <div className='server-create-icon'onClick={() => setShowModal(true)}>
                    <i className="fa-regular fa-plus" id="create-server-plus"> </i>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ServerCreate setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    );
}


export default ServerCreateModal;
