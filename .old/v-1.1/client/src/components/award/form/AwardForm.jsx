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
  useCreateAwardMutation,
  useUpdateAwardMutation,
  useGetAwardQuery,
} from '../../../store/slices/resume/api-award';

const AwardForm = ({ resumeId, awardId, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // redux state
  const { refetch } = useGetResumeQuery({ resumeId });
  const [createAward, { createIsLoading }] = useCreateAwardMutation();
  const [updateAward, { updateIsLoading }] = useUpdateAwardMutation();
  const { data: award, isSuccess } = useGetAwardQuery({
    resumeId,
    awardId,
  });

  useEffect(() => {
    if (awardId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      const awd = await {
        title: award.title,
        description: award.description,
        icon: {
          value: award.icon,
          label: (
            <div className='option-content' key={nanoid()}>
              <Icon icon={award.icon} />
            </div>
          ),
        },
        date: award.date === '' ? null : dayjs(award.date).format('YYYY-MM-DD'),
        highlighted: award.highlighted,
      };
      methods.reset(awd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [award]);

  // on submit function
  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        const res = await createAward({
          resumeId,
          ...data,
          icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Award created');
          refetch();
        } else {
          toast.error('Could not create award');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      try {
        const res = await updateAward({
          resumeId,
          awardId,
          ...data,
          icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Award updated');
        } else {
          toast.error('Could not update award');
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
          title={!edit ? 'Add Award' : 'Update Award'}
          subtitle={
            !edit ? 'Add award to your resume' : 'Update award on your resume'
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
            label='Create Award'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Award'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
AwardForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  awardId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default AwardForm;
