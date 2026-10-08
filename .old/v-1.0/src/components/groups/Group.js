const Group = (props) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
  };

  return (
    <div className='group'>
      <h4 className='group-title'>{props.title}</h4>
      <h4 className='group-date'>
        {props.start} to{' '}
        {props.end === new Date().toLocaleDateString(undefined, dateOptions)
          ? 'Now'
          : props.end}
      </h4>
    </div>
  );
};

export default Group;
