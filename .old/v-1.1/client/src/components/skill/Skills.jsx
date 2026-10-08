import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';

// import components
import RingLoader from 'react-spinners/RingLoader';
import Skill from './Skill';

// import state
import { useGetSkillQuery } from '../../store/slices/resume/api-skill';

const Skills = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: skills,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSkillQuery({ resumeId });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function dispalyCategories() {
      if (skills) {
        const cat = [];
        skills.forEach((sk) => {
          if (!cat.find((c) => c === sk.category)) {
            cat.push(sk.category);
          }
        });
        setCategories(cat);
      }
    }
    dispalyCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

  return (
    <div id='skill' className='categories'>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess && highlight ? (
        <div className='skills'>
          {skills
            .filter((skill) => skill.highlighted === true)
            .sort((a, b) => b.experience - a.experience)
            .map((skill) => {
              return (
                <Skill
                  key={skill._id}
                  skill={skill}
                  resume={resumeId}
                  user={userId}
                />
              );
            })}
        </div>
      ) : (
        categories.sort().map((cat) => {
          return (
            <div key={nanoid()} className='category'>
              <h3>{cat}s</h3>
              <div className='skills'>
                {skills
                  .filter((skill) => skill.category === cat)
                  .sort((a, b) => b.experience - a.experience)
                  .map((skill) => {
                    return (
                      skill.category === cat && (
                        <Skill
                          key={skill._id}
                          skill={skill}
                          resume={resumeId}
                          user={userId}
                        />
                      )
                    );
                  })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
Skills.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};

export default Skills;
