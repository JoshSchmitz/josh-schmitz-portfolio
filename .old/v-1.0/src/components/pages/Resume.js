import Experiences from '../experience/Experiences';
import Educations from '../education/Educations';
import Skills from '../skill/Skills';
import Leaderships from '../leadership/Leaderships';
import Accomplishments from '../accomplishment/Accomplishments';

const Resume = () => {
  return (
    <div className='page' id='resume'>
      <article className='businesscard'>
        <h1>Resume works!</h1>
      </article>
      <article className='resume'>
        <Experiences></Experiences>
        <Educations></Educations>
        {/* map skill categories and display Skill for each unique category */}
        <Skills category='language'></Skills>
        <Skills category='framework'></Skills>
        <Skills category='skill'></Skills>
        <Leaderships></Leaderships>
        <Accomplishments></Accomplishments>
      </article>
    </div>
  );
};

export default Resume;
