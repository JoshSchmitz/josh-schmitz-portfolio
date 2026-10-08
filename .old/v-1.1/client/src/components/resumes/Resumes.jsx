import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

// import components
import ResumeTile from './ResumeTile';
import RingLoader from 'react-spinners/RingLoader';
import Icon from '../icon/Icon';
import Modal from 'react-modal';
import ResumeForm from './form/ResumeForm';

// import state
import { useGetResumeQuery } from '../../store/slices/resume/api-resume';

const Resumes = ({ userId }) => {
  // state
  const {
    data: resumes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResumeQuery({ userId });
  const [resumeIds, setResumeIds] = useState([]);

  useEffect(() => {
    if (userId) {
      if (isSuccess) {
        getResumeIds();
      }
    }
    async function getResumeIds() {
      const rs = await resumes;
      const ids = [];
      rs.forEach((r) => {
        ids.push(r._id);
      });
      setResumeIds(ids);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        contentLabel='Create Group Modal'
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        preventScroll={false}
        shouldFocusAfterRender={false}
      >
        <ResumeForm
          edit={false}
          resumes={resumeIds}
          toggleModal={toggleModal}
        />
      </Modal>
      <article className='section' id='resumes'>
        <div className='headline'>
          <h1 className='title'>Resumes</h1>
        </div>
        <div className='resumes'>
          {isLoading && (
            <RingLoader className='loader-page' loading={isLoading} size={50} />
          )}
          {isError && <h1>Error: {error}</h1>}
          {isSuccess &&
            resumes.map((resume) => {
              return (
                <ResumeTile
                  key={resume._id}
                  resume={resume}
                  resumes={resumeIds}
                  userId={userId}
                />
              );
            })}
          <section className='resume add' onClick={toggleModal}>
            <Icon icon='MdAddCircleOutline' />
            <h3 className='label'>Add a Resume</h3>
          </section>
        </div>
      </article>
    </>
  );
};
Resumes.propTypes = {
  userId: PropTypes.string,
};
export default Resumes;
