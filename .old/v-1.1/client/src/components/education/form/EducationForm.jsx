import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import {
  institutionname_validation,
  institutionphone_validation,
  address_validation,
  city_validation,
  state_validation,
  postcode_validation,
  degree_validation,
  majors_validation,
  minors_validation,
  startdate_validation,
  gpa_validation,
  enddate_validation,
  highlighted_validation,
} from './validation';

// import components
import Form from '../../form/Form';
import FormHeader from '../../form/FormHeader';
import FormContent from '../../form/FormContent';
import FormSection from '../../form/FormSection';
import FormGroup from '../../form/FormGroup';
import Input from '../../form/Input';
import Button from '../../form/Button';
import SingleSelect from '../../form/SingleSelect';
import MultiValueText from '../../form/MultiValueText';
import Checkbox from '../../form/Checkbox';

// import state
import { useGetResumeQuery } from '../../../store/slices/resume/api-resume';
import {
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useGetEducationQuery,
} from '../../../store/slices/resume/api-education';

const EducationForm = ({ resumeId, educationId, edit, toggleModal }) => {
  // react-hook-form validation
  const methods = useForm({ mode: 'onChange' });

  // state
  const { refetch } = useGetResumeQuery({ resumeId });
  const [createEducation, { createIsLoading }] = useCreateEducationMutation();
  const [updateEducation, { updateIsLoading }] = useUpdateEducationMutation();
  const [majors, setMajors] = useState();
  const [minors, setMinors] = useState();
  const { data: education, isSuccess } = useGetEducationQuery({
    resumeId,
    educationId,
  });

  useEffect(() => {
    async function loadData() {
      const phone = await education.institution.phone;
      setMajors(
        await education.majors.map((m) => {
          return { label: m.title, value: m.title };
        })
      );
      setMinors(
        await education.minors.map((m) => {
          return { label: m.title, value: m.title };
        })
      );
      const ed = await {
        degree: { label: education.degree, value: education.degree },
        gpa: education.gpa,
        institutionname: education.institution.name,
        phone: phone
          ? `(${phone.substring(0, 3)}) ${phone.substring(
              3,
              6
            )}-${phone.substring(6)}`
          : '',
        address: education.institution.location.address,
        city: education.institution.location.city,
        state: education.institution.location.state,
        postcode: education.institution.location.postcode,
        startDate:
          education.startDate === ''
            ? null
            : dayjs(education.startDate).format('YYYY-MM-DD'),
        endDate:
          education.endDate === ''
            ? null
            : dayjs(education.endDate).format('YYYY-MM-DD'),
        highlighted: education.highlighted,
      };
      methods.reset(ed);
    }
    if (educationId) {
      if (isSuccess) {
        loadData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [education]);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!edit) {
      // create submit
      try {
        const res = await createEducation({
          resumeId,
          ...data,
          majors: data.majors.map((m) => {
            return { title: m.label };
          }),
          minors: data.minors.map((m) => {
            return { title: m.label };
          }),
          degree: data.degree.label,
          majorCount: data.majors.length,
          minorCount: data.minors.length,
          phone: data.phone.replaceAll(/[^0-9]/g, ''),
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Education created');
          refetch();
        } else {
          toast.error('Could not create education');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      // update submit
      try {
        const res = await updateEducation({
          resumeId,
          educationId,
          ...data,
          majors: data.majors.map((m) => {
            return { title: m.label };
          }),
          minors: data.minors.map((m) => {
            return { title: m.label };
          }),
          degree: data.degree.label,
          majorCount: data.majors.length,
          minorCount: data.minors.length,
          phone: data.phone.replaceAll(/[^0-9]/g, ''),
        }).unwrap();
        if (res) {
          toggleModal();
          toast.success('Education updated');
        } else {
          toast.error('Could not update education');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  });

  // display
  return (
    <FormProvider {...methods}>
      <Form name='education'>
        <FormHeader
          title={!edit ? 'Add Education' : 'Update Education'}
          subtitle={
            !edit
              ? 'Add education to your resume'
              : 'Update education on your resume'
          }
        />
        <FormContent>
          <FormSection size='full'>
            <FormGroup>
              <SingleSelect {...degree_validation} />
              <MultiValueText {...majors_validation} initialvalue={majors} />
              <MultiValueText {...minors_validation} initialvalue={minors} />
            </FormGroup>
            <Input {...gpa_validation} />
          </FormSection>
          <FormSection>
            <FormGroup>
              <Input {...institutionname_validation} />
              <Input {...institutionphone_validation} />
              <Input {...address_validation} />
              <Input {...city_validation} />
              <Input {...state_validation} />
              <Input {...postcode_validation} />
            </FormGroup>
          </FormSection>
          <FormSection>
            <Input {...startdate_validation} />
            <Input {...enddate_validation} />
            <FormGroup>
              <Checkbox {...highlighted_validation} />
            </FormGroup>
          </FormSection>
        </FormContent>
        {!edit ? (
          <Button
            label='Create Education'
            loading={createIsLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <Button
            label='Update Education'
            loading={updateIsLoading}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormProvider>
  );
};
EducationForm.propTypes = {
  resumeId: PropTypes.string.isRequired,
  educationId: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export default EducationForm;
