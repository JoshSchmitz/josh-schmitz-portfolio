import { useState } from 'react';
import PropTypes from 'prop-types';

//import components
import Icon from '../icon/Icon';
import Modal from 'react-modal';
import AccomplishmentForm from '../accomplishment/form/AccomplishmentForm';
import AwardForm from '../award/form/AwardForm';
import EducationForm from '../education/form/EducationForm';
import ExperienceForm from '../experience/form/ExperienceForm';
import GroupForm from '../group/form/GroupForm';
import LanguageForm from '../language/form/LanguageForm';
import LeadershipForm from '../leadership/form/LeadershipForm';
import ProjectForm from '../project/form/ProjectForm';
import SkillForm from '../skill/form/SkillForm';

const AddBadge = ({ section, resume }) => {
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
        {section === 'Experience' && (
          <ExperienceForm
            resumeId={resume}
            edit={false}
            toggleModal={toggleModal}
          />
        )}
        {section === 'Education' && (
          <EducationForm
            resumeId={resume}
            edit={false}
            toggleModal={toggleModal}
          />
        )}
        {section === 'Skill' && (
          <SkillForm resumeId={resume} edit={false} toggleModal={toggleModal} />
        )}
        {section === 'Leadership' && (
          <LeadershipForm
            resumeId={resume}
            edit={false}
            toggleModal={toggleModal}
          />
        )}
        {section === 'Project' && (
          <ProjectForm
            resumeId={resume}
            edit={false}
            toggleModal={toggleModal}
          />
        )}
        {section === 'Accomplishment' && (
          <AccomplishmentForm
            resumeId={resume}
            edit={false}
            toggleModal={toggleModal}
          />
        )}
        {section === 'Award' && (
          <AwardForm resumeId={resume} edit={false} toggleModal={toggleModal} />
        )}
        {section === 'Group' && (
          <GroupForm resumeId={resume} edit={false} toggleModal={toggleModal} />
        )}
        {section === 'Language' && (
          <LanguageForm
            resumeId={resume}
            edit={false}
            toggleModal={toggleModal}
          />
        )}
      </Modal>
      <div className='addbadge' onClick={toggleModal}>
        <Icon icon='MdAddCircleOutline' />
        <h3 className='label'>Add {section}</h3>
      </div>
    </>
  );
};
AddBadge.propTypes = {
  section: PropTypes.string.isRequired,
  resume: PropTypes.string.isRequired,
};
export default AddBadge;
