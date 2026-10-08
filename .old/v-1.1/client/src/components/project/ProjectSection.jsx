import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import components
import Projects from './Projects';
import ProjectForm from './form/ProjectForm';
import Icon from '../icon/Icon';
import Modal from 'react-modal';

const ProjectSection = ({ resumeId, userId }) => {
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
        contentLabel='Create Project Modal'
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        preventScroll={false}
        shouldFocusAfterRender={false}
      >
        <ProjectForm
          resumeId={resumeId}
          edit={false}
          toggleModal={toggleModal}
        />
      </Modal>
      <section className='section' id='projects'>
        <div className='headline'>
          <h1 className='title'>Projects</h1>
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
        <Projects resumeId={resumeId} userId={userId} />
      </section>
    </>
  );
};
ProjectSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};
export default ProjectSection;
