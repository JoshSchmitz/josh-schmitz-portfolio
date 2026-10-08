import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  title_validation,
  bio_validation,
  main_validation,
} from './validation';

// import components
import Form from '../../form/Form';
import FormHeader from '../../form/FormHeader';
import FormContent from '../../form/FormContent';
import FormSection from '../../form/FormSection';
import FormGroup from '../../form/FormGroup';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';
import Checkbox from '../../form/Checkbox';
import Button from '../../form/Button';

// import state
import {
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useGetResumeQuery,
} from '../../../store/slices/resume/api-resume';

const ResumeForm = ({ resumeId, resumes, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // state
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const [createResume, { createIsLoading }] = useCreateResumeMutation();
  const [updateResume, { updateIsLoading }] = useUpdateResumeMutation();
  const { data: resume, isSuccess } = useGetResumeQuery({
    userId,
    resumeId,
  });

  useEffect(() => {
    if (resumeId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      const r = await {
        title: resume.title,
        bio: resume.bio,
        main: resume.main,
      };
      methods.reset(r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        const res = await createResume({
          userId,
          ...data,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Resume created');
        } else {
          toast.error('Could not create resume');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      try {
        if (data.main !== resume.main) {
          resumes.forEach((r) => {
            if (r !== resumeId) {
              updateResume({
                resumeId: r,
                main: false,
              });
            }
          });
        }
        const res = await updateResume({
          resumeId,
          ...data,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Resume updated');
        } else {
          toast.error('Could not update resume');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <Form name='experience'>
        <FormHeader
          title={!edit ? 'Add Resume' : 'Update Resume'}
          subtitle={!edit ? 'Add a new resume' : 'Update your resume details'}
        />
        <FormContent>
          <FormSection size='full'>
            <FormGroup>
              <Input {...title_validation} />
              <Textarea {...bio_validation} />
            </FormGroup>
            {isSuccess && resume.main === false && (
              <FormGroup>
                <Checkbox {...main_validation} />
              </FormGroup>
            )}
          </FormSection>
        </FormContent>
        {!edit ? (
          <Button
            label='Create Resume'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Resume'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
ResumeForm.propTypes = {
  resumeId: PropTypes.string,
  resumes: PropTypes.array.isRequired,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export default ResumeForm;
