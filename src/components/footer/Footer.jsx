import Menu from '../menu/Menu';

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className='footer'>
        <div className='footer-content'>
          <Menu type='footer' />
          <p className='copyright'>
            Copyright © 2026, Joshuah Schmitz. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
