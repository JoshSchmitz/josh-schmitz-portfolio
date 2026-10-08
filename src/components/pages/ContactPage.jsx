import Footer from '../footer/Footer';
import Button from '../button/Button';
import SocialButton from '../button/SocialButton';
import Portrait from '../portrait/Portrait';

const ContactPage = () => {
  const figmaClick = () => {
    window.open('https://www.figma.com/@joshuahschmitz', '_blank');
  };
  const githubClick = () => {
    window.open('https://github.com/JoshSchmitz', '_blank');
  };
  const linkedinClick = () => {
    window.open('https://www.linkedin.com/in/joshuahschmitz/', '_blank');
  };
  const emailClick = () => {
    window.open('mailto:josh.schmitz1@gmail.com', '_self');
  };
  return (
    <div className='body'>
      <div className='content-contact'>
        <Portrait />
        <div className='details'>
          <div className='headline'>
            <h2 className='name'>Joshuah Schmitz</h2>
            <h5 className='title'>Site Operations Manager, May Mobility</h5>
          </div>
          <div className='contact'>
            <h5 className='title'>Contact me by</h5>
            <div className='contact-buttons'>
              <Button
                type='secondary'
                text='LinkedIn'
                isLeftIcon
                leftIcon='IoLogoLinkedin'
                onClick={linkedinClick}
              />
              <Button
                type='primary'
                text='Email'
                isLeftIcon
                leftIcon='IoMailOutline'
                onClick={emailClick}
              />
            </div>
          </div>
          <div className='social'>
            <h5 className='title'>Check out my work</h5>
            <div className='social-buttons'>
              <SocialButton icon='IoLogoGithub' onClick={githubClick} />
              <SocialButton icon='PiFigmaLogoBold' onClick={figmaClick} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ContactPage;
