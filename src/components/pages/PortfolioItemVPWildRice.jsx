import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Button from '../button/Button';
import Chip from '../chip/Chip';
import SkillsList from '../skills/SkillsList';
import Gallery from '../gallery/Gallery';

const PortfolioItemVPWildRice = () => {
  const navigate = useNavigate();
  const [portfolioItem, setPortfolioItem] = useState([]);

  useEffect(() => {
    const portfolioData = [
      {
        id: '00002',
        title: 'VP Wild Rice Logo',
        description:
          '<p>VP Wild Rice, a small family-owned and run company, commissioned a new logo design. They asked for a logo that was minimal yet clear, felt natural yet modern, and stylized the name of the company.</p><p>I used Adobe Photoshop and Microsoft Word to design and present logo designs and options that met the design brief. </p>',
        images: [
          '/src/assets/images/portfolio-vpwildrice/logo-option-1.png',
          '/src/assets/images/portfolio-vpwildrice/logo-option-2.png',
          '/src/assets/images/portfolio-vpwildrice/logo-option-3.png',
          '/src/assets/images/portfolio-vpwildrice/logo-option-4.png',
          '/src/assets/images/portfolio-vpwildrice/logo-option-5.png',
          '/src/assets/images/portfolio-vpwildrice/logo-option-6.png',
        ],
        meta: {
          headline: false,
          date: '2/1/2007',
          tags: ['Design', 'Logo'],
          skills: [
            {
              id: '00021',
              name: 'Graphic Design',
              level: 4,
              icon: 'IoPencil',
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
export default PortfolioItemVPWildRice;
