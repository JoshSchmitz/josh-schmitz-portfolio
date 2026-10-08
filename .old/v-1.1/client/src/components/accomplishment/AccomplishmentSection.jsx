import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import components
import Accomplishments from './Accomplishments';
import AccomplishmentForm from './form/AccomplishmentForm';
import Icon from '../icon/Icon';
import Modal from 'react-modal';

const AccomplishmentSection = ({ resumeId, userId }) => {
  // state
  const { userInfo } = useSelector((state) => state.auth);

  // modal functions
  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Create Accomplishment Modal'
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        preventScroll={false}
        shouldFocusAfterRender={false}
      >
        <AccomplishmentForm
          resumeId={resumeId}
          edit={false}
          toggleModal={toggleModal}
        />
      </Modal>
      <section className='section' id='accomplishments'>
        <div className='headline'>
          <h1 className='title'>Accomplishments</h1>
          {userInfo && userInfo._id === userId && (
            <div className='actions'>
              <Icon
                icon='MdAddCircleOutline'
                className='action create'
                onClick={toggleModal}
              />
            </div>
          )}
        </div>
        <hr />
        <Accomplishments resumeId={resumeId} userId={userId} />
      </section>
    </>
  );
};
AccomplishmentSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default AccomplishmentSection;
