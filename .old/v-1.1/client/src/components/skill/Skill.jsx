import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import state
import { useDeleteSkillMutation } from '../../store/slices/resume/api-skill';

// import components
import SkillForm from './form/SkillForm';
import Confirm from '../confirm/Confirm';
import Modal from 'react-modal';

// import icons
import Icon from '../icon/Icon';

const Skill = ({ skill, resume, user }) => {
  // current user id and resume user id
  const { userInfo } = useSelector((state) => state.auth);
  const [experience, setExperience] = useState([]);

  // generate experience
  useEffect(() => {
    const xp = [];
    for (let i = 0; i < 6; i++) {
      if (i < skill.experience) {
        xp.push('filled');
      } else {
        xp.push('empty');
      }
    }
    setExperience(xp);
  }, [skill]);

  // modal functions
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const confirmModal = () => {
    setConfirmIsOpen(!confirmIsOpen);
  };
  const [formIsOpen, setFormIsOpen] = useState(false);
  const formModal = () => {
    setFormIsOpen(!formIsOpen);
  };

  const [deleteSkill, { deleteIsLoading }] = useDeleteSkillMutation();

  const handleDelete = () => {
    try {
      deleteSkill({
        resumeId: resume,
        skillId: skill._id,
      });
      toast.warning('Skill deleted');
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
        <SkillForm
          resumeId={resume}
          skillId={skill._id}
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
          message='Are you sure you want to delete this skill?'
        />
      </Modal>
      <div
        className={skill.highlighted ? 'skill highlighted' : 'skill'}
        key={skill._id}
      >
        <Icon icon={skill.icon} />
        <div className='details'>
          <div className='info'>
            <h3 className='name'>{skill.title}</h3>
            <div className='separator'></div>
            <p className='years'>
              {dayjs.duration(dayjs(skill.startDate).diff(dayjs())).humanize()}
            </p>
          </div>
          <div className='exp'>
            {experience.map((item, i) => {
              if (item === 'filled') {
                return <div key={i} className='xp filled'></div>;
              } else {
                return <div key={i} className='xp'></div>;
              }
            })}
          </div>
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
Skill.propTypes = {
  skill: PropTypes.object.isRequired,
  resume: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default Skill;
