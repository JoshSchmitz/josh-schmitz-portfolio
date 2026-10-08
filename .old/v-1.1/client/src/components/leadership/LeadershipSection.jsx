import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import components
import Leaderships from './Leaderships';
import LeadershipForm from './form/LeadershipForm';
import Icon from '../icon/Icon';
import Modal from 'react-modal';

const LeadershipSection = ({ resumeId, userId }) => {
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
        contentLabel='Create Leadership Modal'
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        preventScroll={false}
        shouldFocusAfterRender={false}
      >
        <LeadershipForm
          resumeId={resumeId}
          edit={false}
          toggleModal={toggleModal}
        />
      </Modal>
      <section className='section' id='leadership'>
        <div className='headline'>
          <h1 className='title'>Leadership</h1>
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
        <Leaderships resumeId={resumeId} userId={userId} />
      </section>
    </>
  );
};
LeadershipSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default LeadershipSection;
