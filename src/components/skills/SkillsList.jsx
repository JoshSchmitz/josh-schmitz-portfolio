import PropTypes from 'prop-types';
import Skill from './Skill';

const SkillsList = ({ type, skills, onClick }) => {
  const className = `skills-${type || 'default'}`;
  return type === 'small' ? (
    <div className={className}>
      {skills.map((skill, index) =>
        index !== skills.length - 1 ? (
          <Skill key={skill.id} text={skill.name} separator />
        ) : (
          <Skill key={skill.id} text={skill.name} />
        ),
      )}
    </div>
  ) : (
    <div className={className}>
      {skills.map((skill) => (
        <Skill
          key={skill.id}
          icon={skill.icon}
          type={type}
          text={skill.name}
          level={skill.level}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
SkillsList.propTypes = {
  type: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};
export default SkillsList;
