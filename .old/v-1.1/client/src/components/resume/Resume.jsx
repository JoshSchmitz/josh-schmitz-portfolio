import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// import components
import AddSection from './AddSection';
import RingLoader from 'react-spinners/RingLoader';
import ExperienceSection from '../experience/ExperienceSection';
import EducationSection from '../education/EducationSection';
import SkillSection from '../skill/SkillSection';
import LeadershipSection from '../leadership/LeadershipSection';
import ProjectSection from '../project/ProjectSection';
import AccomplishmentSection from '../accomplishment/AccomplishmentSection';
import AwardSection from '../award/AwardSection';
import GroupSection from '../group/GroupSection';
import LanguageSection from '../language/LanguageSection';

// import state
import { useGetResumeQuery } from '../../store/slices/resume/api-resume';

const Resume = ({ resumeId }) => {
  const {
    data: resume,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResumeQuery({ resumeId });
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess && (
        <article className='resume'>
          <section className='section' id='bio'>
            <h1 className='title'>{resume.title}</h1>
            <p className='bio'>{resume.bio}</p>
          </section>
          {userInfo && userInfo._id === resume.user && (
            <AddSection resumeId={resumeId} />
          )}
          {resume.experienceCount > 0 && (
            <ExperienceSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.educationCount > 0 && (
            <EducationSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.skillCount > 0 && (
            <SkillSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.leadershipCount > 0 && (
            <LeadershipSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.projectCount > 0 && (
            <ProjectSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.accomplishmentCount > 0 && (
            <AccomplishmentSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.awardCount > 0 && (
            <AwardSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.groupCount > 0 && (
            <GroupSection resumeId={resumeId} userId={resume.user} />
          )}
          {resume.languageCount > 0 && (
            <LanguageSection resumeId={resumeId} userId={resume.user} />
          )}
        </article>
      )}
    </>
  );
};
Resume.propTypes = {
  resumeId: PropTypes.string.isRequired,
};
export default Resume;
