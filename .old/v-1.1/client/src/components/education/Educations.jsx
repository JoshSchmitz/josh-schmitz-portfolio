import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import components
import Education from './Education';
import RingLoader from 'react-spinners/RingLoader';

//import state
import { useGetEducationQuery } from '../../store/slices/resume/api-education';

const Educations = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: eds,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEducationQuery({ resumeId });
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    async function displayHighlghted() {
      if (eds) {
        const es = eds
          .filter((e) => e.highlighted === true)
          .sort((a, b) => dayjs(b.endDate) - dayjs(a.endDate));
        if (es.length === 0) {
          const es = [...eds];
          setEducations(
            es.sort((a, b) => dayjs(b.endDate) - dayjs(a.endDate)).slice(0, 1)
          );
        } else {
          setEducations(es);
        }
      }
    }
    async function displayFull() {
      if (eds) {
        const es = [...eds];
        setEducations(es.sort((a, b) => dayjs(b.endDate) - dayjs(a.endDate)));
      }
    }
    if (highlight) {
      displayHighlghted();
    } else {
      displayFull();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eds]);

  return (
    <div className='educations'>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess &&
        educations.map((ed) => {
          return (
            <Education
              key={ed._id}
              education={ed}
              resume={resumeId}
              user={userId}
            ></Education>
          );
        })}
    </div>
  );
};
Educations.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};
export default Educations;
