import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import components
import Icon from '../icon/Icon';
import Modal from 'react-modal';
import Confirm from '../confirm/Confirm';
import LeadershipForm from './form/LanguageForm';

// import state
import { useDeleteLanguageMutation } from '../../store/slices/resume/api-language';

const Language = ({ language, resume, user }) => {
  // state
  const { userInfo } = useSelector((state) => state.auth);
  const [experience, setExperience] = useState([]);
  const [deleteLanguage, { deleteIsLoading }] = useDeleteLanguageMutation();

  // modal functions
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const confirmModal = () => {
    setConfirmIsOpen(!confirmIsOpen);
  };
  const [formIsOpen, setFormIsOpen] = useState(false);
  const formModal = () => {
    setFormIsOpen(!formIsOpen);
  };

  // generate experience
  useEffect(() => {
    const xp = [];
    for (let i = 0; i < 6; i++) {
      if (i < language.experience) {
        xp.push('filled');
      } else {
        xp.push('empty');
      }
    }
    setExperience(xp);
  }, [language]);

  // delete leadership handler
  const handleDelete = () => {
    try {
      deleteLanguage({
        resumeId: resume,
        languageId: language._id,
      });
      toast.warning('Language deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Modal
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel='Update Language Modal'
        isOpen={formIsOpen}
        onRequestClose={formModal}
        preventScroll={true}
        shouldFocusAfterRender={false}
      >
        <LeadershipForm
          resumeId={resume}
          languageId={language._id}
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
          message='Are you sure you want to delete this language?'
        />
      </Modal>
      <div
        className={language.highlighted ? 'language highlighted' : 'language'}
        key={language._id}
      >
        <div className='details'>
          <div className='info'>
            <h3 className='name'>{language.name}</h3>
            <p className='dialect'>
              {language.dialect && `( ${language.dialect} )`}
            </p>
            <div className='separator'></div>
            <p className='years'>
              {dayjs
                .duration(dayjs(language.startDate).diff(dayjs()))
                .humanize()}
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
Language.propTypes = {
  language: PropTypes.object.isRequired,
  resume: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default Language;
