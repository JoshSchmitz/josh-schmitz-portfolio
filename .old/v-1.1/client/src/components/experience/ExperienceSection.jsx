import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Experiences from './Experiences';
import ExperienceForm from './form/ExperienceForm';
import Icon from '../icon/Icon';
import Modal from 'react-modal';

const ExperienceSection = ({ resumeId, userId }) => {
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
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <ExperienceForm
          resumeId={resumeId}
          edit={false}
          toggleModal={toggleModal}
        />
      </Modal>
      <section className='section' id='experiences'>
        <div className='headline'>
          <h1 className='title'>Work Experience</h1>
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
        <Experiences resumeId={resumeId} userId={userId} />
      </section>
    </>
  );
};
ExperienceSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default ExperienceSection;
