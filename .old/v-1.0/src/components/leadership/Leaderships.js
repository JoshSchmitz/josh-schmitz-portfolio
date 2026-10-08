import { useSelector } from 'react-redux';
import Leadership from './Leadership';

const Leaderships = () => {
  const { leaderships } = useSelector((store) => store.leaderships);

  return (
    <section className='section leaderships'>
      <h1 className='title'>Leadership</h1>
      <hr />
      <div className='leaderships-container'>
        {leaderships.map((lead) => {
          return (
            <Leadership
              key={lead.id}
              icon={lead.icon}
              title={lead.title}
              description={lead.description}
              date={lead.date}
              highlighted={lead.highlighted}
            ></Leadership>
          );
        })}
      </div>
    </section>
  );
};

export default Leaderships;
