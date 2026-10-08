import { useSelector } from 'react-redux';
import Award from './Award';

const Awards = () => {
  const { awards } = useSelector((store) => store.awards);

  return (
    <section className='section awards'>
      <h1 className='title'>Awards</h1>
      <hr />
      <div className='awards-container'>
        {awards.map((award) => {
          return (
            <Award key={award.id} title={award.title} date={award.date}></Award>
          );
        })}
      </div>
    </section>
  );
};

export default Awards;
