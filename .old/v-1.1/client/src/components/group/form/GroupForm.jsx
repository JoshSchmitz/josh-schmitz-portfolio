import { useForm, FormProvider } from 'react-hook-form';
// import { nanoid } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {
  title_validation,
  description_validation,
  startdate_validation,
  enddate_validation,
  highlighted_validation,
} from './validation.jsx';

// import icons
// import * as MdIcons from 'react-icons/md';

// import components
import Form from '../../form/Form';
import FormHeader from '../../form/FormHeader';
import FormContent from '../../form/FormContent';
import FormSection from '../../form/FormSection';
import FormGroup from '../../form/FormGroup';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';
// import SingleSelect from '../../form/SingleSelect';
import Checkbox from '../../form/Checkbox';
import Button from '../../form/Button.jsx';

// import state
import {
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useGetGroupQuery,
} from '../../../store/slices/resume/api-group';

const GroupForm = ({ resumeId, groupId, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // state
  const [createGroup, { createIsLoading }] = useCreateGroupMutation();
  const [updateGroup, { updateIsLoading }] = useUpdateGroupMutation();
  const { data: group, isSuccess } = useGetGroupQuery({
    resumeId,
    groupId,
  });

  useEffect(() => {
    if (groupId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      // let Icon = '';
      // Icon = MdIcons[`${group.icon}`];

      const grp = await {
        title: group.title,
        description: group.description,
        // icon: {
        //   value: group.icon,
        //   label: (
        //     <div className='option-content' key={nanoid()}>
        //       <Icon className='icon' />
        //     </div>
        //   ),
        // },
        startDate:
          group.startDate === ''
            ? null
            : dayjs(group.startDate).format('YYYY-MM-DD'),
        endDate:
          group.endDate === ''
            ? null
            : dayjs(group.endDate).format('YYYY-MM-DD'),
        position: group.position,
        highlighted: group.highlighted,
      };
      methods.reset(grp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  // on submit function
  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        const res = await createGroup({
          resumeId,
          ...data,
          // icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Group created');
        } else {
          toast.error('Could not create group');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      try {
        const res = await updateGroup({
          resumeId,
          groupId,
          ...data,
          // icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Group updated');
        } else {
          toast.error('Could not update group');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <Form name='award'>
        <FormHeader
          title={!edit ? 'Add Group' : 'Update Group'}
          subtitle={
            !edit ? 'Add group to your resume' : 'Update group on your resume'
          }
        />
        <FormContent>
          <FormSection size='full'>
            <FormGroup>
              <Input {...title_validation} />
              <Textarea {...description_validation} />
            </FormGroup>
            {/* <SingleSelect {...icon_validation} /> */}
            <Input {...startdate_validation} />
            <Input {...enddate_validation} />
            <FormGroup>
              <Checkbox {...highlighted_validation} />
            </FormGroup>
          </FormSection>
        </FormContent>
        {!edit ? (
          <Button
            label='Create Group'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Group'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
GroupForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  groupId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default GroupForm;
