import Awards from '../awards/Awards';
import Groups from '../groups/Groups';
import Projects from '../projects/Projects';

const Accomplishments = () => {
  return (
    <section className='section accomplishments'>
      <h1 className='title'>Accomplishments</h1>
      <hr />
      <div className='accomplishments-container'>
        <Awards></Awards>
        <Groups></Groups>
        <Projects></Projects>
      </div>
    </section>
  );
};

export default Accomplishments;
