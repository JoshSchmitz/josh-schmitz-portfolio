import { useForm, FormProvider } from 'react-hook-form';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {
  name_validation,
  dialect_validation,
  startDate_validation,
  experience_validation,
  highlighted_validation,
} from './validation.jsx';

// import components
import Form from '../../form/Form';
import FormHeader from '../../form/FormHeader';
import FormContent from '../../form/FormContent';
import FormSection from '../../form/FormSection';
import FormGroup from '../../form/FormGroup';
import Input from '../../form/Input';
import Range from '../../form/Range';
import Checkbox from '../../form/Checkbox';
import Button from '../../form/Button.jsx';

// import state
import { useGetResumeQuery } from '../../../store/slices/resume/api-resume';
import {
  useCreateLanguageMutation,
  useUpdateLanguageMutation,
  useGetLanguageQuery,
} from '../../../store/slices/resume/api-language';

const LanguageForm = ({ resumeId, languageId, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // redux state
  const { refetch } = useGetResumeQuery({ resumeId });
  const [createLanguage, { createIsLoading }] = useCreateLanguageMutation();
  const [updateLanguage, { updateIsLoading }] = useUpdateLanguageMutation();
  const { data: language, isSuccess } = useGetLanguageQuery({
    resumeId,
    languageId,
  });

  useEffect(() => {
    if (languageId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      const lang = await {
        name: language.name,
        dialect: language.dialect,
        experience: language.experience,
        startDate:
          language.startDate === ''
            ? null
            : dayjs(language.startDate).format('YYYY-MM-DD'),
        highlighted: language.highlighted,
      };
      methods.reset(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // on submit function
  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        const res = await createLanguage({
          resumeId,
          ...data,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Language created');
          refetch();
        } else {
          toast.error('Could not create language');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      try {
        const res = await updateLanguage({
          resumeId,
          languageId,
          ...data,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Language updated');
        } else {
          toast.error('Could not update language');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <Form name='language'>
        <FormHeader
          title={!edit ? 'Add Language' : 'Update Language'}
          subtitle={
            !edit
              ? 'Add language to your resume'
              : 'Update language on your resume'
          }
        />
        <FormContent>
          <FormSection size='full'>
            <FormGroup>
              <Input {...name_validation} />
              <Input {...dialect_validation} />
            </FormGroup>
            <Input {...startDate_validation} />
            <Range {...experience_validation} />
            <FormGroup>
              <Checkbox {...highlighted_validation} />
            </FormGroup>
          </FormSection>
        </FormContent>
        {!edit ? (
          <Button
            label='Create Language'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Language'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
LanguageForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  languageId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default LanguageForm;
