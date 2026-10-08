import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Portrait from '../portrait/Portrait';
import Button from '../button/Button';
import SocialButton from '../button/SocialButton';

const HomePage = () => {
  const navigate = useNavigate();
  const resumeClick = () => {
    navigate('/resume');
  };
  const portfolioClick = () => {
    navigate('/portfolio');
  };
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
      <div className='content-home'>
        <Portrait />
        <div className='details'>
          <div className='headline'>
            <h2 className='name'>Joshuah Schmitz</h2>
            <h5 className='education'>
              Bachelors of Science, Computer Information Systems
            </h5>
            <h5 className='title'>Site Operations Manager, May Mobility</h5>
          </div>
          <div className='contact-buttons'>
            <Button
              type='secondary'
              text='Resume'
              isLeftIcon
              leftIcon='IoDocumentText'
              onClick={resumeClick}
            />
            <Button
              type='primary'
              text='Portfolio'
              isLeftIcon
              leftIcon='IoFolderOpen'
              onClick={portfolioClick}
            />
          </div>
          <div className='bio'>
            <h5 className='title'>About Me</h5>
            <div className='bio-text'>
              <p>
                Josh Schmitz is a Site Operations Manager for May Mobility who
                leads an autonomous vehicle deployment in Grand Rapids, MN. Josh
                believes that autonomous vehicles can reshape the transportation
                landscape, creating movement opportunities for everyone.
              </p>
              <p>
                He oversaw the AV relaunch of goMARTI 2.0, and managed Garmin
                Camera QA Process and NH Server Upgrade projects. He is a
                mentor, Eagle Scout, and NSF STEM Scholar.
              </p>
              <p>
                Josh holds a Bachelors of Science in Computer Information
                Systems from The College of St. Scholastica.
              </p>
            </div>
          </div>
          <div className='social'>
            <SocialButton icon='PiFigmaLogoBold' onClick={figmaClick} />
            <SocialButton icon='IoLogoGithub' onClick={githubClick} />
            <SocialButton icon='IoLogoLinkedin' onClick={linkedinClick} />
            <SocialButton icon='IoMailOutline' onClick={emailClick} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default HomePage;
