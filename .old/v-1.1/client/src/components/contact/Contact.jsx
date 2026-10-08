import PropTypes from 'prop-types';

//import components
import Icon from '../icon/Icon';

// import assets
import portrait from '../../assets/images/portrait.png';

const Contact = ({ style }) => {
  return (
    <article className={style === 'vertical' ? 'contact vertical' : 'contact'}>
      <div className='details'>
        <img className='portrait round bw' src={portrait} alt='Portrait' />
      </div>
      <div className='contact-info'>
        {style === 'vertical' && (
          <div className='info bio'>
            <p>
              Front-End Web Developer looking for a remote position where I can
              be creative, solve problems, and add value to the front end of web
              applications and websites.
            </p>
          </div>
        )}
        <div className='info'>
          <Icon icon='MdOutlineEmail' />
          <p>josh.schmitz1@gmail.com</p>
        </div>
        <div className='info'>
          <Icon icon='MdOutlinePhone' />
          <p>218.491.5622</p>
        </div>
        <div className='info'>
          <Icon icon='MdOutlineLocationOn' />
          <p>
            736 NE 1st Avenue, <br />
            Grand Rapids, MN 55744
          </p>
        </div>
      </div>
      <div className='social'>
        <a
          href='https://github.com/JoshSchmitz'
          target='_blank'
          rel='noreferrer'
        >
          <Icon icon='AiFillGithub' />
        </a>
        <a
          href='https://www.linkedin.com/in/joshuahschmitz/'
          target='_blank'
          rel='noreferrer'
        >
          <Icon icon='AiFillLinkedin' />
        </a>
        <a href='https://x.com/JoshSchmitz3' target='_blank' rel='noreferrer'>
          <Icon icon='FaXTwitter' />
        </a>
      </div>
    </article>
  );
};
Contact.propTypes = {
  style: PropTypes.string,
};

export default Contact;
