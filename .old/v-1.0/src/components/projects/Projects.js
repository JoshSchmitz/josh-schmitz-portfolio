import { useSelector } from 'react-redux';
import Project from './Project';

const Projects = () => {
  const { projects } = useSelector((store) => store.projects);

  return (
    <section className='section projects'>
      <h1 className='title'>Projects</h1>
      <hr />
      <div className='projects-container'>
        {projects.map((proj) => {
          return (
            <Project
              key={proj.id}
              title={proj.title}
              start={proj.startDate}
              end={proj.endDate}
              description={proj.description}
              highlighted={proj.highlighted}
            ></Project>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
