import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// import components
import Award from './Award';
import RingLoader from 'react-spinners/RingLoader';

// import state
import { useGetAwardQuery } from '../../store/slices/resume/api-award';

const Awards = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: awards,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAwardQuery({ resumeId });
  const [aws, setAws] = useState([]);

  useEffect(() => {
    async function displayHilighted() {
      if (awards) {
        const as = awards
          .filter((a) => a.highlighted === true)
          .sort((a, b) => dayjs(b.date) - dayjs(a.date));
        if (as.length === 0) {
          const as = [...awards];
          setAws(as.sort((a, b) => dayjs(b.date) - dayjs(a.date)).slice(0, 2));
        } else {
          setAws(as);
        }
      }
    }
    async function displayFull() {
      if (awards) {
        const as = [...awards];
        setAws(as.sort((a, b) => dayjs(b.date) - dayjs(a.date)));
      }
    }
    highlight ? displayHilighted() : displayFull();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awards]);

  return (
    <div className='awards'>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess &&
        aws.map((aw) => {
          return (
            <Award key={aw._id} award={aw} resume={resumeId} user={userId} />
          );
        })}
    </div>
  );
};
Awards.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};
export default Awards;
