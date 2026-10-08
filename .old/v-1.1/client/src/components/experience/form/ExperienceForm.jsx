import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import {
  position_validation,
  description_validation,
  startdate_validation,
  enddate_validation,
  highlighted_validation,
  skills_validation,
  companyname_validation,
  companyphone_validation,
  address_validation,
  city_validation,
  state_validation,
  postcode_validation,
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
import MultiSelect from '../../form/MultiSelect';

// import state
import {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useGetExperienceQuery,
} from '../../../store/slices/resume/api-experience';
import { useGetSkillQuery } from '../../../store/slices/resume/api-skill';

const ExperienceForm = ({ resumeId, experienceId, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // state
  const [createExperience, { createIsLoading }] = useCreateExperienceMutation();
  const [updateExperience, { updateIsLoading }] = useUpdateExperienceMutation();
  const { data: experience, isSuccess } = useGetExperienceQuery({
    resumeId,
    experienceId,
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
    if (experienceId) {
      if (isSuccess) {
        loadData();
      }
    }
    async function loadData() {
      const sks = await experience.skills;
      const skillsValue = [];
      sks.forEach((sk) => {
        skills.forEach((s) => {
          if (s._id === sk) {
            skillsValue.push({ label: s.title, value: s._id, key: s._id });
          }
        });
      });
      const phone = await experience.company.phone;
      const xp = await {
        position: experience.position,
        description: experience.description,
        startDate:
          experience.startDate === ''
            ? null
            : dayjs(experience.startDate).format('YYYY-MM-DD'),
        endDate:
          experience.endDate === ''
            ? null
            : dayjs(experience.endDate).format('YYYY-MM-DD'),
        highlighted: experience.highlighted,
        companyname: experience.company.name,
        phone: phone
          ? `(${phone.substring(0, 3)}) ${phone.substring(
              3,
              6
            )}-${phone.substring(6)}`
          : '',
        address: experience.company.location.address,
        city: experience.company.location.city,
        state: experience.company.location.state,
        postcode: experience.company.location.postcode,
        skills: skillsValue,
      };
      methods.reset(xp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience]);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      try {
        let formskills = [];
        if (data.skills.length > 0) {
          formskills = data.skills.map((s) => {
            return s.value;
          });
        }
        const res = await createExperience({
          resumeId,
          ...data,
          skills: formskills,
          phone: data.phone.replaceAll(/[^0-9]/g, ''),
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Experience created');
        } else {
          toast.error('Could not create experience');
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
        const res = await updateExperience({
          resumeId,
          experienceId,
          ...data,
          skills: formskills,
          phone: data.phone.replaceAll(/[^0-9]/g, ''),
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Experience updated');
        } else {
          toast.error('Could not update experience');
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
          title={!edit ? 'Add Experience' : 'Update Experience'}
          subtitle={
            !edit
              ? 'Add work experience to your resume'
              : 'Update work experience on your resume'
          }
        />
        <FormContent>
          <FormSection size='full'>
            <FormGroup>
              <Input {...position_validation} />
              <Textarea {...description_validation} />
            </FormGroup>
          </FormSection>
          <FormSection>
            <MultiSelect {...skills_validation} options={skillOptions} />
            <Input {...startdate_validation} />
            <Input {...enddate_validation} />
            <FormGroup>
              <Checkbox {...highlighted_validation} />
            </FormGroup>
          </FormSection>
          <FormSection>
            <FormGroup>
              <Input {...companyname_validation} />
              <Input {...companyphone_validation} />
              <Input {...address_validation} />
              <Input {...city_validation} />
              <Input {...state_validation} />
              <Input {...postcode_validation} />
            </FormGroup>
          </FormSection>
        </FormContent>
        {!edit ? (
          <Button
            label='Create Experience'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Experience'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
ExperienceForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  experienceId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export default ExperienceForm;
