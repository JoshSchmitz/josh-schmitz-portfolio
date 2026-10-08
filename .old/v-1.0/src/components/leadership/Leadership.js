const Leadership = (props) => {
  return (
    <div
      className={
        props.highlighted ? 'leadership leadership-highlighted' : 'leadership'
      }
    >
      <h1 className='icon'>{props.icon}</h1>
      <div className='details'>
        <h2 className='headline'>{props.title}</h2>
        <h4 className='date'>{props.date}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Leadership;
