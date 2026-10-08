import { useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// import state
import { useDeleteEducationMutation } from '../../store/slices/resume/api-education';

// import components
import Icon from '../icon/Icon';
import Modal from 'react-modal';
import EducationForm from './form/EducationForm';
import Confirm from '../confirm/Confirm';

const Education = ({ education, resume, user }) => {
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

  const [deleteEducation, { deleteIsLoading }] = useDeleteEducationMutation();

  const handleDelete = () => {
    try {
      deleteEducation({
        resumeId: resume,
        educationId: education._id,
      });
      toast.warning('Education deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Update Education Modal'
        isOpen={formIsOpen}
        onRequestClose={formModal}
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <EducationForm
          resumeId={resume}
          educationId={education._id}
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
          message='Are you sure you want to delete this education?'
        />
      </Modal>
      <div
        className={
          education.highlighted ? 'education highlighted' : 'education'
        }
        key={education._id}
      >
        <div className='headline'>
          <div className='details'>
            <h3 className='degree'>{education.degree}</h3>
            <div className='separator' />
            <h4 className='gpa'>{education.gpa} GPA</h4>
            <div className='separator' />
            <div className='dates'>
              <h4 className='startdate'>
                {education.startDate !== ''
                  ? dayjs(education.startDate).format('MMMM D, YYYY')
                  : 'Now'}{' '}
                to{' '}
                {education.endDate !== ''
                  ? dayjs(education.endDate).format('MMMM D, YYYY')
                  : 'Now'}
              </h4>
            </div>
          </div>
          {userInfo && userInfo._id === user && (
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
        <div className='specializations'>
          <div className='majors'>
            <p>{education.majorCount > 1 ? 'Majors:' : 'Major:'}</p>
            {education.majors.map((m, i, majors) => {
              return (
                <div className='major' key={nanoid()}>
                  <p className='name'>{m.title}</p>
                  {i < majors.length - 1 && <div className='separator' />}
                </div>
              );
            })}
          </div>
          <div className='minors'>
            <p>{education.minorCount > 1 ? 'Minors:' : 'Minor:'}</p>
            {education.minors.map((m, i, minors) => {
              return (
                <div className='minor' key={nanoid()}>
                  <p className='name'>{m.title}</p>
                  {i < minors.length - 1 && <div className='separator' />}
                </div>
              );
            })}
          </div>
        </div>
        <div className='institution'>
          <p className='institution-name'>{education.institution.name}</p>
          <div className='separator' />
          <p className='institution-location'>
            {education.institution.location.city},{' '}
            {education.institution.location.state}
          </p>
        </div>
      </div>
    </>
  );
};
Education.propTypes = {
  resume: PropTypes.string.isRequired,
  user: PropTypes.string,
  education: PropTypes.object.isRequired,
};
export default Education;
