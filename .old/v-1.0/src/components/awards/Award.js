const Award = (props) => {
  return (
    <div className='award'>
      <h4 className='award-title'>{props.title}</h4>
      <h4 className='award-date'>{props.date}</h4>
    </div>
  );
};

export default Award;
