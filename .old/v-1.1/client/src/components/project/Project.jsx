import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import state
import { useDeleteProjectMutation } from '../../store/slices/resume/api-project';

// import components
import Icon from '../icon/Icon';
import Modal from 'react-modal';
import Confirm from '../confirm/Confirm';
import ProjectForm from './form/ProjectForm';
import SkillsList from '../skill/SkillsList';

const Project = ({ project, resume, user }) => {
  // current user id and resume user id
  const { userInfo } = useSelector((state) => state.auth);

  // modal functions
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const confirmModal = () => {
    setConfirmIsOpen(!confirmIsOpen);
  };
  const [formIsOpen, setFormIsOpen] = useState(false);
  const formModal = () => {
    setFormIsOpen(!formIsOpen);
  };

  // redux state
  const [deleteProject, { deleteIsLoading }] = useDeleteProjectMutation();

  // delete leadership handler
  const handleDelete = () => {
    try {
      deleteProject({
        resumeId: resume,
        projectId: project._id,
      });
      toast.warning('Project deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Update Project Modal'
        isOpen={formIsOpen}
        onRequestClose={formModal}
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <ProjectForm
          resumeId={resume}
          projectId={project._id}
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
          message='Are you sure you want to delete this project?'
        />
      </Modal>
      <div
        className={project.highlighted ? 'project highlighted' : 'project'}
        key={project._id}
      >
        <div className='details'>
          <div className='headline'>
            <h3 className='proj-title'>{project.title}</h3>
            <div className='separator'></div>
            <p className='dates'>
              {`${dayjs(project.startDate).format('MMMM D, YYYY')} to ${
                project.endDate === ''
                  ? 'Now'
                  : dayjs(project.endDate).format('MMMM D, YYYY')
              }`}
            </p>
          </div>

          <p className='description'>{project.description}</p>
          <SkillsList resumeId={resume} list={project.skills} />
        </div>
        {userInfo && userInfo._id === user && (
          <div className='actions'>
            <Icon icon='MdEdit' className='action update' onClick={formModal} />
            <Icon
              icon='MdDelete'
              className='action delete'
              onClick={confirmModal}
            />
          </div>
        )}
      </div>
    </>
  );
};
Project.propTypes = {
  project: PropTypes.object.isRequired,
  resume: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default Project;
