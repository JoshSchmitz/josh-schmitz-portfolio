import { useSelector } from 'react-redux';
import Education from './Education';

const Educations = () => {
  const { educations } = useSelector((store) => store.educations);

  return (
    <section className='section educations'>
      <h1 className='title'>Education</h1>
      <hr />
      {educations.map((ed) => {
        return (
          <Education
            key={ed.id}
            degree={ed.degree}
            majors={ed.majors}
            minors={ed.minors}
            institution={ed.institution.name}
            location={ed.institution.location}
            startdate={ed.startDate}
            enddate={ed.endDate}
            highlighted={ed.highlighted}
          ></Education>
        );
      })}
    </section>
  );
};

export default Educations;
