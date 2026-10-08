import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Button from '../button/Button';
import Chip from '../chip/Chip';
import SkillsList from '../skills/SkillsList';
import Gallery from '../gallery/Gallery';

const PortfolioItemJoshSchmitz = () => {
  const navigate = useNavigate();
  const [portfolioItem, setPortfolioItem] = useState([]);

  useEffect(() => {
    const portfolioData = [
      {
        id: '00001',
        title: 'Josh Schmitz Website',
        description:
          '<p>Figma design for Josh Schmitz portfolio and resume website. The purpose of this website is to serve as my professional online presence showcasing my resume, projects, and portfolio of work.</p><p>Using free Figma features and components, I designed this website to deliver a natural user interface to showcase my resume and portfolio and create an elegant user experience. This design incorporates modern, mobile-first web design principles and component based development structures to streamline transition from design to final product.</p>',
        images: [
          '/src/assets/images/portfolio-joshschmitz/introduction-slide.png',
          '/src/assets/images/portfolio-joshschmitz/mobile-first-design-slide.png',
          '/src/assets/images/portfolio-joshschmitz/technology-stack-slide.png',
          '/src/assets/images/portfolio-joshschmitz/image-slider-slide.png',
          '/src/assets/images/portfolio-joshschmitz/resume-slide.gif',
          '/src/assets/images/portfolio-joshschmitz/skills-slide.png',
        ],
        meta: {
          headline: true,
          date: '3/1/2026',
          tags: ['Design', 'Website'],
          skills: [
            {
              id: '00001',
              name: 'Web Applications',
              level: 7,
              icon: 'IoCodeSlash',
            },
            {
              id: '00003',
              name: 'UI/UX',
              level: 3,
              icon: 'IoPencil',
            },
            {
              id: '00002',
              name: 'Figma',
              level: 4,
              icon: 'PiFigmaLogoBold',
            },
            {
              id: '00005',
              name: 'Mobile First Design',
              level: 9,
              icon: 'IoPhonePortraitOutline',
            },
            {
              id: '00020',
              name: 'Content Design',
              level: 3,
              icon: 'IoPhonePortraitOutline',
            },
            {
              id: '00008',
              name: 'Logos',
              level: 5,
              icon: 'IoPencil',
            },
          ],
        },
      },
    ];

    setPortfolioItem(portfolioData);
  }, []);

  const handleClick = () => {
    navigate('/portfolio');
  };

  return (
    <div className='body'>
      <div className='content-portfolio-item'>
        <Button
          type='back'
          text='Back'
          isLeftIcon
          leftIcon='IoChevronBack'
          onClick={handleClick}
        />
        {portfolioItem.map((item) => (
          <div className='portfolio-item' key={item.id}>
            <Gallery images={item.images} />
            <div className='details'>
              <div className='title'>{item.title}</div>
              <div
                className='description'
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
              <div className='meta'>
                <div className='date'>
                  {new Date(item.meta.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                  })}
                </div>
                <div className='tags'>
                  {item.meta.tags.map((tag) => (
                    <Chip key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <SkillsList type='small' skills={item.meta.skills} />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
export default PortfolioItemJoshSchmitz;
