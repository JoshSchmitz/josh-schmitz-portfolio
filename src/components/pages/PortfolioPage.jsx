import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import Gallery from '../gallery/Gallery';

// import slider images
import IntroductionSlide from '../../assets/images/portfolio-joshschmitz/introduction-slide.png';
import MobileFirstDesignSlide from '../../assets/images/portfolio-joshschmitz/mobile-first-design-slide.png';
import TechnologyStackSlide from '../../assets/images/portfolio-joshschmitz/technology-stack-slide.png';
import ImageSliderSlide from '../../assets/images/portfolio-joshschmitz/image-slider-slide.png';
import ResumeSlide from '../../assets/images/portfolio-joshschmitz/resume-slide.gif';
import SkillsSlide from '../../assets/images/portfolio-joshschmitz/skills-slide.png';

const PortfolioPage = () => {
  const portfolioData = [
    {
      id: '00001',
      title: 'Josh Schmitz Website',
      description:
        '<p>Figma design for Josh Schmitz portfolio and resume website. The purpose of this website is to serve as my professional online presence showcasing my resume, projects, and portfolio of work.</p><p>Using free Figma features and components, I designed this website to deliver a natural user interface to showcase my resume and portfolio and create an elegant user experience. This design incorporates modern, mobile-first web design principles and component based development structures to streamline transition from design to final product.</p>',
      images: [
        IntroductionSlide,
        MobileFirstDesignSlide,
        TechnologyStackSlide,
        ImageSliderSlide,
        ResumeSlide,
        SkillsSlide,
      ],
      meta: {
        headline: true,
        date: '3/1/2026',
        tags: ['Design', 'Website'],
        skills: [
          'Web App Design',
          'UI/UX',
          'Figma',
          'Mobile First Design',
          'Content Design',
          'Logos',
        ],
      },
    },
    {
      id: '00002',
      title: 'VP Wild Rice Logo',
      description:
        '<p>VP Wild Rice, a small family-owned and run company, commissioned a new logo design. They asked for a logo that was minimal yet clear, felt natural yet modern, and stylized the name of the company.</p><p>I used Adobe Photoshop and Microsoft Word to design and present logo designs and options that met the design brief. </p>',
      images: [],
      meta: {
        headline: false,
        date: '2/1/2007',
        tags: ['Design', 'Logo'],
        skills: ['Graphic Design', 'Logo'],
      },
    },
  ];

  const navigate = useNavigate();
  const [portfolio] = useState(portfolioData);

  const handleClick = (id) => {
    id === '00001' && navigate('/portfolio-joshschmitz');
    id === '00002' && navigate('/portfolio-vpwildrice');
  };

  return (
    <div className='body'>
      <div className='content-portfolio'>
        <div className='portfolio-list'>
          <div className='headline'>
            {portfolio.map(
              (item) =>
                item.meta.headline && (
                  <div className='item-headline' key={item.id}>
                    <Gallery images={item.images} />
                    <div className='details'>
                      <div className='title'>{item.title}</div>
                      <div
                        className='description'
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></div>
                      <Button
                        type='secondary'
                        text='View Piece'
                        isRightIcon
                        rightIcon='IoChevronForward'
                        onClick={() => handleClick(item.id)}
                      />
                    </div>
                  </div>
                ),
            )}
          </div>
          <div className='list'>
            {portfolio.map(
              (item) =>
                !item.meta.headline && (
                  <div
                    className='item'
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                  >
                    <div className='details'>
                      <div className='title'>{item.title}</div>
                      <div
                        className='description'
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></div>
                    </div>
                    <Icon className='icon' icon='IoChevronForward' />
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PortfolioPage;
