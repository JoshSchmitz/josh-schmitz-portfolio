import { useForm, FormProvider } from 'react-hook-form';
// import { nanoid } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
  title_validation,
  description_validation,
  startdate_validation,
  enddate_validation,
  skills_validation,
  highlighted_validation,
} from './validation.jsx';

// import components
import Form from '../../form/Form';
import FormHeader from '../../form/FormHeader';
import FormContent from '../../form/FormContent';
import FormSection from '../../form/FormSection';
import FormGroup from '../../form/FormGroup';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';
import MultiSelect from '../../form/MultiSelect';
import Checkbox from '../../form/Checkbox';
import Button from '../../form/Button.jsx';

// import state
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectQuery,
} from '../../../store/slices/resume/api-project';
import { useGetSkillQuery } from '../../../store/slices/resume/api-skill';

const ProjectForm = ({ resumeId, projectId, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // redux state
  const [createProject, { createIsLoading }] = useCreateProjectMutation();
  const [updateProject, { updateIsLoading }] = useUpdateProjectMutation();
  const { data: project, isSuccess } = useGetProjectQuery({
    resumeId,
    projectId,
  });
  const { data: skills, isSuccess: isSkillSuccess } = useGetSkillQuery({
    resumeId,
  });

  // state
  const [skillOptions, setSkillOptions] = useState([]);

  useEffect(() => {
    if (isSkillSuccess) {
      loadSkills();
    }
    async function loadSkills() {
      const sk = await skills;
      const options = sk.map((s) => {
        return { label: s.title, value: s._id, key: s._id };
      });
      setSkillOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

  useEffect(() => {
    if (projectId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      const sks = await project.skills;
      const skillsValue = [];
      sks.forEach((sk) => {
        skills.forEach((s) => {
          if (s._id === sk) {
            skillsValue.push({ label: s.title, value: s._id, key: s._id });
          }
        });
      });
      const proj = await {
        title: project.title,
        description: project.description,
        startDate:
          project.startDate === ''
            ? null
            : dayjs(project.startDate).format('YYYY-MM-DD'),
        endDate:
          project.endDate === ''
            ? null
            : dayjs(project.endDate).format('YYYY-MM-DD'),
        skills: skillsValue,
        highlighted: project.highlighted,
      };
      methods.reset(proj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // on submit function
  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        let formskills = [];
        if (data.skills.length > 0) {
          formskills = data.skills.map((s) => {
            return s.value;
          });
        }
        const res = await createProject({
          resumeId,
          ...data,
          skills: formskills,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Project created');
        } else {
          toast.error('Could not create project');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      try {
        let formskills = [];
        if (data.skills.length > 0) {
          formskills = data.skills.map((s) => {
            return s.value;
          });
        }
        const res = await updateProject({
          resumeId,
          projectId,
          ...data,
          skills: formskills,
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Project updated');
        } else {
          toast.error('Could not update project');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <Form name='project'>
        <FormHeader
          title={!edit ? 'Add Project' : 'Update Project'}
          subtitle={
            !edit
              ? 'Add project to your resume'
              : 'Update project on your resume'
          }
        />
        <FormContent>
          <FormSection size='full'>
            <FormGroup>
              <Input {...title_validation} />
              <Textarea {...description_validation} />
            </FormGroup>
            <Input {...startdate_validation} />
            <Input {...enddate_validation} />
            <MultiSelect {...skills_validation} options={skillOptions} />
            <FormGroup>
              <Checkbox {...highlighted_validation} />
            </FormGroup>
          </FormSection>
        </FormContent>
        {!edit ? (
          <Button
            label='Create Project'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Project'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
ProjectForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  projectId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ProjectForm;
