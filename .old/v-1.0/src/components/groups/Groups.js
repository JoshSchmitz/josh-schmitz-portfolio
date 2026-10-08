import { useSelector } from 'react-redux';
import Group from './Group';

const Groups = () => {
  const { groups } = useSelector((store) => store.groups);

  return (
    <section className='section groups'>
      <h1 className='title'>Groups</h1>
      <hr />
      <div className='groups-container'>
        {groups.map((group) => {
          return (
            <Group
              key={group.id}
              title={group.title}
              start={group.startDate}
              end={group.endDate}
            ></Group>
          );
        })}
      </div>
    </section>
  );
};

export default Groups;
