import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// import components
import RingLoader from 'react-spinners/RingLoader';
import Accomplishment from './Accomplishment';

// import state
import { useGetAccomplishmentQuery } from '../../store/slices/resume/api-accomplishment';

const Accomplishments = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: accomplishments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAccomplishmentQuery({ resumeId });
  const [accomps, setAccomps] = useState([]);

  useEffect(() => {
    async function displayHighlighted() {
      if (accomplishments) {
        const as = accomplishments
          .filter((a) => a.highlighted === true)
          .sort((a, b) => dayjs(b.date) - dayjs(a.date));
        if (as.length === 0) {
          const as = [...accomplishments];
          setAccomps(
            as.sort((a, b) => dayjs(b.date) - dayjs(a.date)).slice(0, 2)
          );
        } else {
          setAccomps(as);
        }
      }
    }
    async function displayFull() {
      if (accomplishments) {
        const as = [...accomplishments];
        setAccomps(as.sort((a, b) => dayjs(b.date) - dayjs(a.date)));
      }
    }

    highlight ? displayHighlighted() : displayFull();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accomplishments]);

  return (
    <div className='accomplishments'>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess &&
        accomps.map((acc) => {
          return (
            <Accomplishment
              key={acc._id}
              accomplishment={acc}
              resume={resumeId}
              user={userId}
            />
          );
        })}
    </div>
  );
};
Accomplishments.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};
export default Accomplishments;
