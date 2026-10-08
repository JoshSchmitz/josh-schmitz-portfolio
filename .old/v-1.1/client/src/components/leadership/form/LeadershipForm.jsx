import { useForm, FormProvider } from 'react-hook-form';
import { nanoid } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {
  title_validation,
  description_validation,
  date_validation,
  icon_validation,
  highlighted_validation,
} from './validation.jsx';

// import components
import Icon from '../../icon/Icon.jsx';
import Form from '../../form/Form';
import FormHeader from '../../form/FormHeader';
import FormContent from '../../form/FormContent';
import FormSection from '../../form/FormSection';
import FormGroup from '../../form/FormGroup';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';
import SingleSelect from '../../form/SingleSelect';
import Checkbox from '../../form/Checkbox';
import Button from '../../form/Button.jsx';

// import state
import { useGetResumeQuery } from '../../../store/slices/resume/api-resume';
import {
  useCreateLeadershipMutation,
  useUpdateLeadershipMutation,
  useGetLeadershipQuery,
} from '../../../store/slices/resume/api-leadership';

const LeadershipForm = ({ resumeId, leadershipId, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // redux state
  const { refetch } = useGetResumeQuery({ resumeId });
  const [createLeadership, { createIsLoading }] = useCreateLeadershipMutation();
  const [updateLeadership, { updateIsLoading }] = useUpdateLeadershipMutation();
  const { data: leadership, isSuccess } = useGetLeadershipQuery({
    resumeId,
    leadershipId,
  });

  useEffect(() => {
    if (leadershipId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      const lead = await {
        title: leadership.title,
        description: leadership.description,
        icon: {
          value: leadership.icon,
          label: (
            <div className='option-content' key={nanoid()}>
              <Icon icon={leadership.icon} />
            </div>
          ),
        },
        date:
          leadership.date === ''
            ? null
            : dayjs(leadership.date).format('YYYY-MM-DD'),
        highlighted: leadership.highlighted,
      };
      methods.reset(lead);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadership]);

  // on submit function
  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        const res = await createLeadership({
          resumeId,
          ...data,
          icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Leadership created');
          refetch();
        } else {
          toast.error('Could not create leadership');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      try {
        const res = await updateLeadership({
          resumeId,
          leadershipId,
          ...data,
          icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Leadership updated');
        } else {
          toast.error('Could not update leadership');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <Form name='leadership'>
        <FormHeader
          title={!edit ? 'Add Leadership' : 'Update Leadership'}
          subtitle={
            !edit
              ? 'Add leadership to your resume'
              : 'Update leadership on your resume'
          }
        />
        <FormContent>
          <FormSection size='full'>
            <FormGroup>
              <Input {...title_validation} />
              <Textarea {...description_validation} />
            </FormGroup>
            <SingleSelect {...icon_validation} />
            <Input {...date_validation} />
            <FormGroup>
              <Checkbox {...highlighted_validation} />
            </FormGroup>
          </FormSection>
        </FormContent>
        {!edit ? (
          <Button
            label='Create Leadership'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Leadership'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
LeadershipForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  leadershipId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default LeadershipForm;
