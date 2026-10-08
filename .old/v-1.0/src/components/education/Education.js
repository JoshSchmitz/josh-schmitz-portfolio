const Education = (props) => {
  const dateOptions = {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className={props.highlighted ? 'education highlighted' : 'education'}>
      <div className='headline'>
        <h2 className='degree'>
          {props.degree} in{' '}
          {props.majors.map((maj, i, { length }) => {
            if (length - 1 === i) {
              return maj.title;
            } else {
              return `${maj.title} and `;
            }
          })}
        </h2>
        <div className='actions'>
          {/* <MdEdit className='action'></MdEdit>
          <MdDelete className='action' onClick={props.delete}></MdDelete> */}
        </div>
        <div className='break'></div>
        <h3 className='minors'>
          {props.minors.map((min, i, { length }) => {
            if (length - 1 === i) {
              return min.title;
            } else {
              return `${min.title} and `;
            }
          })}
        </h3>
      </div>
      <div className='details'>
        <h3 className='insitution'>{props.institution} -</h3>
        <h3 className='location'>
          {props.location.city}, {props.location.state}
        </h3>
        <div className='break'></div>
        <h4 className='time'>
          {props.startdate} to{' '}
          {props.enddate ===
          new Date(Date.now()).toLocaleDateString(undefined, dateOptions)
            ? 'Now'
            : props.enddate}
        </h4>
      </div>
    </div>
  );
};

export default Education;
