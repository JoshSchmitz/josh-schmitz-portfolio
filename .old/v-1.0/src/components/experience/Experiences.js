import Experience from './Experience';
import {
  useSelector /**
  useDispatch
*/,
} from 'react-redux';
// import { deleteExp } from '../experience/state/experiences';

const Experiences = () => {
  const { experiences } = useSelector((store) => store.experiences);
  // const dispatch = useDispatch();

  return (
    <section className='section experiences'>
      <h1 className='title'>Work Experience</h1>
      <hr />
      {experiences.map((exp) => {
        return (
          <Experience
            key={exp.id}
            position={exp.position}
            company={exp.company.name}
            location={exp.company.location}
            startdate={exp.startDate}
            enddate={exp.endDate}
            description={exp.description}
            highlighted={exp.highlighted}
            // delete={() => dispatch(deleteExp(exp.id))}
          ></Experience>
        );
      })}
    </section>
  );
};

export default Experiences;
