import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import components
import Languages from './Languages';
import LanguageForm from './form/LanguageForm';
import Icon from '../icon/Icon';
import Modal from 'react-modal';

const LanguageSection = ({ resumeId, userId }) => {
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
        contentLabel='Create Language Modal'
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        preventScroll={false}
        shouldFocusAfterRender={false}
      >
        <LanguageForm
          resumeId={resumeId}
          edit={false}
          toggleModal={toggleModal}
        />
      </Modal>
      <section className='section' id='languages'>
        <div className='headline'>
          <h1 className='title'>Languages</h1>
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
        <Languages resumeId={resumeId} userId={userId} />
      </section>
    </>
  );
};
LanguageSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};
export default LanguageSection;
