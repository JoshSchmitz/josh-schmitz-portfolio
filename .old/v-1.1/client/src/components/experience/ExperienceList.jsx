import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import state
import { useGetExperienceQuery } from '../../store/slices/resume/api-experiece';

const ExperienceList = ({ list, resumeId }) => {
  const { data: experiences, isSuccess } = useGetExperienceQuery({ resumeId });
  const [experiencesList, setExperienceList] = useState([]);

  useEffect(() => {
    const xpList = [];
    if (isSuccess) {
      list.forEach((l) => {
        experiences.forEach((e) => {
          if (e._id === l) {
            xpList.push({
              _id: e._id,
              position: e.position,
              company: e.company.name,
            });
          }
        });
      });
      setExperienceList(xpList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences]);

  return (
    <div className='skillslist'>
      {experiencesList.map((xp, i) => {
        return (
          <div className='skill' key={xp._id}>
            <div className='name'>
              {xp.position}, {xp.company}
            </div>
            {i !== experiencesList.length - 1 && (
              <div className='separator'></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
ExperienceList.propTypes = {
  resumeId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};
export default ExperienceList;
