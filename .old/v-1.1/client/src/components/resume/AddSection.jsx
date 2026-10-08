import PropTypes from 'prop-types';

//import components
import AddBadge from './AddBadge';
import RingLoader from 'react-spinners/RingLoader';

//import state
import { useGetResumeQuery } from '../../store/slices/resume/api-resume';

const AddSection = ({ resumeId }) => {
  const {
    data: resume,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResumeQuery({ resumeId });

  return (
    <>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess && (
        <section className='insert' id='addsection'>
          {resume.experienceCount === 0 && (
            <AddBadge section='Experience' resume={resumeId} />
          )}
          {resume.educationCount === 0 && (
            <AddBadge section='Education' resume={resumeId} />
          )}
          {resume.skillCount === 0 && (
            <AddBadge section='Skill' resume={resumeId} />
          )}
          {resume.leadershipCount === 0 && (
            <AddBadge section='Leadership' resume={resumeId} />
          )}
          {resume.projectCount === 0 && (
            <AddBadge section='Project' resume={resumeId} />
          )}
          {resume.accomplishmentCount === 0 && (
            <AddBadge section='Accomplishment' resume={resumeId} />
          )}
          {resume.awardCount === 0 && (
            <AddBadge section='Award' resume={resumeId} />
          )}
          {resume.groupCount === 0 && (
            <AddBadge section='Group' resume={resumeId} />
          )}
          {resume.languageCount === 0 && (
            <AddBadge section='Language' resume={resumeId} />
          )}
        </section>
      )}
    </>
  );
};
AddSection.propTypes = {
  resumeId: PropTypes.string.isRequired,
};
export default AddSection;
