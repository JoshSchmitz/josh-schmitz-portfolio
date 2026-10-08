import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

// import components
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ResumeForm from './form/ResumeForm';
import Confirm from '../confirm/Confirm';
import Icon from '../icon/Icon';

// import state
import { useDeleteResumeMutation } from '../../store/slices/resume/api-resume';

const ResumeTile = ({ resume, resumes, userId }) => {
  // state
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteResume, { deleteIsLoading }] = useDeleteResumeMutation();

  // modal functions
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const confirmModal = () => {
    setConfirmIsOpen(!confirmIsOpen);
  };
  const [formIsOpen, setFormIsOpen] = useState(false);
  const formModal = () => {
    setFormIsOpen(!formIsOpen);
  };

  // delete leadership handler
  const handleDelete = () => {
    try {
      deleteResume({
        resumeId: resume._id,
      });
      toast.warning('Resume deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Update Group Modal'
        isOpen={formIsOpen}
        onRequestClose={formModal}
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <ResumeForm
          resumeId={resume._id}
          resumes={resumes}
          edit={true}
          toggleModal={formModal}
        />
      </Modal>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Confirm Modal'
        isOpen={confirmIsOpen}
        onRequestClose={confirmModal}
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <Confirm
          confirm={handleDelete}
          confirmLabel='Delete'
          loading={deleteIsLoading}
          close={confirmModal}
          closeLabel='Cancel'
          message='Are you sure you want to delete this resume?'
        />
      </Modal>
      <section
        key={resume._id}
        className={resume.main === true ? 'resume main' : 'resume'}
      >
        <div className='headline'>
          <Link to={`/resume/${resume._id}`}>
            <h3 className='name'>{resume.title}</h3>
          </Link>
          {userInfo && userInfo._id === userId && (
            <div className='actions'>
              <Icon
                icon='MdEdit'
                className='action update'
                onClick={formModal}
              />
              <Icon
                icon='MdDelete'
                className='action delete'
                onClick={confirmModal}
              />
            </div>
          )}
        </div>
        <p className='bio'>{resume.bio}</p>
        <div className='stats'>
          <p>Experiences: {resume.experienceCount}</p>
          <p>Education: {resume.educationCount}</p>
          <p>Skills: {resume.skillCount}</p>
          <p>Leadership: {resume.leadershipCount}</p>
          <p>Projects: {resume.projectCount}</p>
          <p>Accomplishments: {resume.accomplishmentCount}</p>
          <p>Awards: {resume.awardCount}</p>
          <p>Groups: {resume.groupCount}</p>
          <p>Languages: {resume.languageCount}</p>
        </div>
      </section>
    </>
  );
};
ResumeTile.propTypes = {
  resume: PropTypes.object.isRequired,
  resumes: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};
export default ResumeTile;
