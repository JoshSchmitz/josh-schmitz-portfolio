import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

// import state
import { useDeleteGroupMutation } from '../../store/slices/resume/api-group';

// import components
import Icon from '../icon/Icon';
import Modal from 'react-modal';
import Confirm from '../confirm/Confirm';
import LeadershipForm from './form/GroupForm';

// comfigure dayjs
dayjs.extend(duration);
dayjs.extend(relativeTime);

const Group = ({ group, resume, user }) => {
  // state
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteGroup, { deleteIsLoading }] = useDeleteGroupMutation();

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
      deleteGroup({
        resumeId: resume,
        groupId: group._id,
      });
      toast.warning('Group deleted');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // const calculateDuration = (startdate, enddate) => {
  //   const start = startdate;
  //   const end = enddate;
  //   let duration;
  //   let remainder;
  //   let years;
  //   let months;

  //   if (!end) {
  //     duration = Math.abs(dayjs.duration(dayjs(start).diff()).asYears());
  //     years = Math.floor(
  //       Math.abs(dayjs.duration(dayjs(start).diff()).asYears())
  //     );
  //     remainder = duration - dayjs.duration({ years: years }).asYears();
  //     months = Math.round(dayjs.duration({ years: remainder }).asMonths());
  //     if (months === 12) {
  //       years = years + 1;
  //       months = 0;
  //     }
  //     return years === 0
  //       ? dayjs.duration({ months: months }).humanize()
  //       : months === 0
  //       ? dayjs.duration({ years: years }).humanize()
  //       : `${dayjs.duration({ years: years }).humanize()}, ${dayjs
  //           .duration({ months: months })
  //           .asMonths()} ${months > 1 ? 'months' : 'month'}`;
  //   } else {
  //     duration = dayjs.duration(dayjs(end).diff(start)).asYears();
  //     years = Math.floor(dayjs.duration(dayjs(end).diff(start)).asYears());
  //     remainder = duration - dayjs.duration({ years: years }).asYears();
  //     months = Math.round(dayjs.duration({ years: remainder }).asMonths());
  //     if (months === 12) {
  //       years = years + 1;
  //       months = 0;
  //     }
  //     return years === 0
  //       ? dayjs.duration({ months: months }).humanize()
  //       : months === 0
  //       ? dayjs.duration({ years: years }).humanize()
  //       : `${dayjs.duration({ years: years }).humanize()}, ${dayjs
  //           .duration({ months: months })
  //           .asMonths()} ${months > 1 ? 'months' : 'month'}`;
  //   }
  // };

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
        <LeadershipForm
          resumeId={resume}
          groupId={group._id}
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
          message='Are you sure you want to delete this group?'
        />
      </Modal>
      <div
        className={group.highlighted ? 'group highlighted' : 'group'}
        key={group._id}
      >
        {/* <div className='icon'><Icon /></div> */}
        <div className='details'>
          <div className='headline'>
            <h3 className='group-title'>{group.title}</h3>
            <div className='separator'></div>
            <p className='dates'>
              {group.startDate !== ''
                ? dayjs(group.startDate).format('MMMM D, YYYY')
                : 'Now'}{' '}
              to{' '}
              {group.endDate !== ''
                ? dayjs(group.endDate).format('MMMM D, YYYY')
                : 'Now'}
            </p>
          </div>
          <p className='description'>{group.description}</p>
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
Group.propTypes = {
  group: PropTypes.object.isRequired,
  resume: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default Group;
