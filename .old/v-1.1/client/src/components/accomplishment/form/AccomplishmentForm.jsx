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
import {
  useCreateAccomplishmentMutation,
  useUpdateAccomplishmentMutation,
  useGetAccomplishmentQuery,
} from '../../../store/slices/resume/api-accomplishment';

const AccomplishmentForm = ({
  resumeId,
  accomplishmentId,
  edit,
  toggleModal,
}) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // state
  const [createAccomplishment, { createIsLoading }] =
    useCreateAccomplishmentMutation();
  const [updateAccomplishment, { updateIsLoading }] =
    useUpdateAccomplishmentMutation();
  const { data: accomplishment, isSuccess } = useGetAccomplishmentQuery({
    resumeId,
    accomplishmentId,
  });

  useEffect(() => {
    if (accomplishmentId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      const accomp = await {
        title: accomplishment.title,
        description: accomplishment.description,
        icon: {
          value: accomplishment.icon,
          label: (
            <div className='option-content' key={nanoid()}>
              <Icon icon={accomplishment.icon} />
            </div>
          ),
        },
        date:
          accomplishment.date === ''
            ? null
            : dayjs(accomplishment.date).format('YYYY-MM-DD'),
        highlighted: accomplishment.highlighted,
      };
      methods.reset(accomp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accomplishment]);

  // on submit function
  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        const res = await createAccomplishment({
          resumeId,
          ...data,
          icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Accomplishment created');
        } else {
          toast.error('Could not create accomplishment');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      try {
        const res = await updateAccomplishment({
          resumeId,
          accomplishmentId,
          ...data,
          icon: data.icon.value,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Accomplishment updated');
        } else {
          toast.error('Could not update accomplishment');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <Form name='accomplishment'>
        <FormHeader
          title={!edit ? 'Add Accomplishment' : 'Update Accomplishment'}
          subtitle={
            !edit
              ? 'Add accomplishment to your resume'
              : 'Update accomplishment on your resume'
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
            label='Create Accomplishment'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Accomplishment'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
AccomplishmentForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  accomplishmentId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default AccomplishmentForm;
