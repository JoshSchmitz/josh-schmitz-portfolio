import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// import components
import RingLoader from 'react-spinners/RingLoader';
import Project from './Project';

// import state
import { useGetProjectQuery } from '../../store/slices/resume/api-project';

const Projects = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectQuery({ resumeId });
  const [proj, setProj] = useState([]);

  useEffect(() => {
    async function displayHighlighted() {
      if (projects) {
        const prj = projects
          .filter((p) => p.highlighted === true)
          .sort((a, b) => dayjs(b.endDate) - dayjs(a.endDate));
        if (prj.length === 0) {
          const ps = [...projects];
          setProj(
            ps.sort((a, b) => dayjs(b.endDate) - dayjs(a.endDate)).slice(0, 1)
          );
        } else {
          setProj(prj);
        }
      }
    }
    async function displayFull() {
      if (projects) {
        const ps = [...projects];
        setProj(ps.sort((a, b) => dayjs(b.date) - dayjs(a.date)));
      }
    }

    highlight ? displayHighlighted() : displayFull();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <div className='projects'>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess &&
        proj.map((proj) => {
          return (
            <Project
              key={proj._id}
              project={proj}
              resume={resumeId}
              user={userId}
            />
          );
        })}
    </div>
  );
};
Projects.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};
export default Projects;
