import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// import components
import Modal from 'react-modal';
import SkillsList from '../skill/SkillsList';
import ExperienceForm from './form/ExperienceForm';
import Confirm from '../confirm/Confirm';
import Icon from '../icon/Icon';

// import state
import { useDeleteExperienceMutation } from '../../store/slices/resume/api-experience';

// comfigure dayjs
dayjs.extend(duration);
dayjs.extend(relativeTime);

const Experience = ({ experience, resume, user }) => {
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

  const [deleteExperience, { deleteIsLoading }] = useDeleteExperienceMutation();

  const handleDelete = () => {
    try {
      deleteExperience({
        resumeId: resume,
        experienceId: experience._id,
      });
      toast.warning('Experience deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const calculateDuration = (startdate, enddate) => {
    const start = startdate;
    const end = enddate;
    let duration;
    let remainder;
    let years;
    let months;

    if (!end) {
      duration = Math.abs(dayjs.duration(dayjs(start).diff()).asYears());
      years = Math.floor(
        Math.abs(dayjs.duration(dayjs(start).diff()).asYears())
      );
      remainder = duration - dayjs.duration({ years: years }).asYears();
      months = Math.round(dayjs.duration({ years: remainder }).asMonths());
      if (months === 12) {
        years = years + 1;
        months = 0;
      }
      return years === 0
        ? dayjs.duration({ months: months }).humanize()
        : months === 0
        ? dayjs.duration({ years: years }).humanize()
        : `${dayjs.duration({ years: years }).humanize()}, ${dayjs
            .duration({ months: months })
            .asMonths()} ${months > 1 ? 'months' : 'month'}`;
    } else {
      duration = dayjs.duration(dayjs(end).diff(start)).asYears();
      years = Math.floor(dayjs.duration(dayjs(end).diff(start)).asYears());
      remainder = duration - dayjs.duration({ years: years }).asYears();
      months = Math.round(dayjs.duration({ years: remainder }).asMonths());
      if (months === 12) {
        years = years + 1;
        months = 0;
      }
      return years === 0
        ? dayjs.duration({ months: months }).humanize()
        : months === 0
        ? dayjs.duration({ years: years }).humanize()
        : `${dayjs.duration({ years: years }).humanize()}, ${dayjs
            .duration({ months: months })
            .asMonths()} ${months > 1 ? 'months' : 'month'}`;
    }
  };

  return (
    <>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Update Experience Modal'
        isOpen={formIsOpen}
        onRequestClose={formModal}
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <ExperienceForm
          resumeId={resume}
          experienceId={experience._id}
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
          message='Are you sure you want to delete this experience?'
        />
      </Modal>
      <div
        className={
          experience.highlighted
            ? experience.sequential
              ? 'experience highlighted sequential'
              : 'experience highlighted'
            : experience.sequential
            ? 'experience sequential'
            : 'experience'
        }
      >
        <div className='headline'>
          <h3 className='position'>{experience.position}</h3>
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
        <div className='content'>
          <div className='details'>
            <p className='location'>
              {experience.location.city}, {experience.location.state}
            </p>
            <div className='separator'></div>
            <p className='dates'>
              {experience.startDate !== ''
                ? dayjs(experience.startDate).format('MMMM D, YYYY')
                : 'Now'}{' '}
              to{' '}
              {experience.endDate !== ''
                ? dayjs(experience.endDate).format('MMMM D, YYYY')
                : 'Now'}
            </p>
            <div className='separator'></div>
            <p className='duration'>
              {calculateDuration(experience.startDate, experience.endDate)}
            </p>
          </div>
          <p className='description'>{experience.description}</p>
          <SkillsList resumeId={resume} list={experience.skills} />
        </div>
      </div>
    </>
  );
};
Experience.propTypes = {
  resume: PropTypes.string.isRequired,
  user: PropTypes.string,
  experience: PropTypes.object.isRequired,
};
export default Experience;
