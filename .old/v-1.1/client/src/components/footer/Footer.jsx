import dayjs from 'dayjs';

// import components
import Nav from '../nav/Nav';

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div>
          Copyright &copy;{dayjs().format('YYYY')}, Joshuah Schmitz, all rights
          reserved.
        </div>
        <Nav location='footer' />
      </div>
    </footer>
  );
};
export default Footer;
