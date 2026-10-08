import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import state
import { useGetSkillQuery } from '../../store/slices/resume/api-skill';

const SkillsList = ({ list, resumeId }) => {
  const { data: skills, isSuccess } = useGetSkillQuery({ resumeId });
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    const skillsList = [];
    if (isSuccess) {
      list.forEach((sk) => {
        skills.forEach((s) => {
          if (s._id === sk) {
            skillsList.push({ _id: s._id, title: s.title });
          }
        });
      });
      setSkillsList(skillsList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

  return (
    <div className='skillslist'>
      {skillsList.map((sk, i) => {
        return (
          <div className='skill' key={sk._id}>
            <div className='name'>{sk.title}</div>
            {i !== skillsList.length - 1 && <div className='separator'></div>}
          </div>
        );
      })}
    </div>
  );
};
SkillsList.propTypes = {
  resumeId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};
export default SkillsList;
