import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

//import components
import Educations from './Educations';
import EducationForm from './form/EducationForm';
import Icon from '../icon/Icon';
import Modal from 'react-modal';

const EducationSection = ({ resumeId, userId }) => {
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
        <EducationForm
          resumeId={resumeId}
          edit={false}
          toggleModal={toggleModal}
        />
      </Modal>
      <section className='section' id='educations'>
        <div className='headline'>
          <h1 className='title'>Education</h1>
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
        <Educations resumeId={resumeId} userId={userId} />
      </section>
    </>
  );
};
EducationSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default EducationSection;
