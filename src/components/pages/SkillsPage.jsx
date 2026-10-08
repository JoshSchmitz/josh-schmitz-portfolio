import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Button from '../button/Button';
import SkillsList from '../skills/SkillsList';

const SkillsPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const skillsData = [
      {
        id: '00001',
        name: 'Web Applications',
        level: 7,
        icon: 'IoCodeSlash',
      },
      {
        id: '00002',
        name: 'Figma',
        level: 4,
        icon: 'PiFigmaLogoBold',
      },
      {
        id: '00003',
        name: 'UI/UX',
        level: 3,
        icon: 'IoPencil',
      },
      {
        id: '00004',
        name: 'UI/Project Management',
        level: 5,
        icon: 'IoBarChart',
      },
      {
        id: '00005',
        name: 'Mobile First Design',
        level: 9,
        icon: 'IoPhonePortraitOutline',
      },
      {
        id: '00006',
        name: 'React',
        level: 6,
        icon: 'IoLogoReact',
      },
      {
        id: '00007',
        name: 'SharePoint',
        level: 8,
        icon: 'PiMicrosoftTeamsLogoFill',
      },
      {
        id: '00008',
        name: 'Logos',
        level: 5,
        icon: 'IoPencil',
      },
      {
        id: '00009',
        name: 'GitHub',
        level: 7,
        icon: 'IoLogoGithub',
      },
      {
        id: '00010',
        name: 'Process Improvement',
        level: 6,
        icon: 'IoBarChart',
      },
      {
        id: '00011',
        name: 'MongoDB',
        level: 4,
        icon: 'SiMongodb',
      },
      {
        id: '00012',
        name: 'Constructive Feedback',
        level: 8,
        icon: 'IoPeople',
      },
      {
        id: '00013',
        name: 'Sass',
        level: 6,
        icon: 'IoLogoSass',
      },
      {
        id: '00014',
        name: 'NodeJS',
        level: 4,
        icon: 'IoLogoNodejs',
      },
      {
        id: '00015',
        name: 'Example Leadership',
        level: 7,
        icon: 'IoPeople',
      },
      {
        id: '00016',
        name: 'Organization',
        level: 9,
        icon: 'IoGitBranch',
      },
      {
        id: '00017',
        name: 'Active Listening',
        level: 7,
        icon: 'IoPeople',
      },
      {
        id: '00018',
        name: 'Conflict Resolution',
        level: 5,
        icon: 'IoPeople',
      },
      {
        id: '00019',
        name: 'Properties & Variables',
        level: 6,
        icon: 'PiFigmaLogoBold',
      },
      {
        id: '00020',
        name: 'Content Design',
        level: 3,
        icon: 'BiBookContent',
      },
      {
        id: '00021',
        name: 'Graphic Design',
        level: 4,
        icon: 'IoPencil',
      },
    ];

    setSkills(skillsData);
  }, []);

  const handleClick = () => {
    navigate('/resume');
  };

  return (
    <div className='body'>
      <div className='content-skills'>
        <Button
          type='back'
          text='Back'
          isLeftIcon
          leftIcon='IoChevronBack'
          onClick={handleClick}
        />
        <div className='skill-section'>
          <div className='title'>Skills</div>
          <SkillsList type='full' skills={skills} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SkillsPage;
