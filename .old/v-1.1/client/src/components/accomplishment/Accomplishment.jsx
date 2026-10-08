import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import state
import { useDeleteAccomplishmentMutation } from '../../store/slices/resume/api-accomplishment';

// import components
import Modal from 'react-modal';
import Confirm from '../confirm/Confirm';
import AccomplishmentForm from './form/AccomplishmentForm';
import Icon from '../icon/Icon';

const Accomplishment = ({ accomplishment, resume, user }) => {
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

  // state
  const [deleteLeadership, { deleteIsLoading }] =
    useDeleteAccomplishmentMutation();

  // delete leadership handler
  const handleDelete = () => {
    try {
      deleteLeadership({
        resumeId: resume,
        accomplishmentId: accomplishment._id,
      });
      toast.warning('Accomplishment deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Update Accomplishment Modal'
        isOpen={formIsOpen}
        onRequestClose={formModal}
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <AccomplishmentForm
          resumeId={resume}
          accomplishmentId={accomplishment._id}
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
          message='Are you sure you want to delete this accomplishment?'
        />
      </Modal>
      <div
        className={
          accomplishment.highlighted
            ? 'accomplishment highlighted'
            : 'accomplishment'
        }
        key={accomplishment._id}
      >
        <Icon icon={accomplishment.icon} />
        <div className='details'>
          <h3 className='lead-title'>{accomplishment.title}</h3>
          <p className='description'>{accomplishment.description}</p>
          <p className='date'>
            {dayjs(accomplishment.date).format('MMMM D, YYYY')}
          </p>
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
Accomplishment.propTypes = {
  accomplishment: PropTypes.object.isRequired,
  resume: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default Accomplishment;
