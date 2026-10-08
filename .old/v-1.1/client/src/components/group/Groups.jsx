import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import components
import RingLoader from 'react-spinners/RingLoader';
import Group from './Group';

// import state
import { useGetGroupQuery } from '../../store/slices/resume/api-group';

const Groups = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: groups,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGroupQuery({ resumeId });
  const [grps, setGrps] = useState([]);

  useEffect(() => {
    async function displayHighlighted() {
      if (groups) {
        const gs = groups
          .filter((g) => g.highlighted === true)
          .sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate));
        if (gs.length === 0) {
          const gs = [...groups];
          setGrps(
            gs
              .sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate))
              .slice(0, 2)
          );
        } else {
          setGrps(gs);
        }
      }
    }
    async function displayFull() {
      if (groups) {
        const gs = [...groups];
        setGrps(gs.sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate)));
      }
    }
    highlight ? displayHighlighted() : displayFull();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  return (
    <div className='groups'>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess &&
        grps.map((group) => {
          return (
            <Group
              key={group._id}
              group={group}
              resume={resumeId}
              user={userId}
            />
          );
        })}
    </div>
  );
};
Groups.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};
export default Groups;
