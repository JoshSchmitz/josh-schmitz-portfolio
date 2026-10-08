import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import components
import Skills from './Skills';
import SkillForm from './form/SkillForm';
import Icon from '../icon/Icon';
import Modal from 'react-modal';

const SkillSection = ({ resumeId, userId }) => {
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
        contentLabel='Create Experience Modal'
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        preventScroll={false}
        shouldFocusAfterRender={false}
      >
        <SkillForm resumeId={resumeId} edit={false} toggleModal={toggleModal} />
      </Modal>
      <section className='section' id='skills'>
        <div className='headline'>
          <h1 className='title'>Skills</h1>
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
        <Skills resumeId={resumeId} userId={userId} />
      </section>
    </>
  );
};
SkillSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default SkillSection;
