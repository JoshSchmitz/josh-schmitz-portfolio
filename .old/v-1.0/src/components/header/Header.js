import Nav from '../nav/Nav';

const Header = () => {
  return (
    <header>
      <div className='container'>
        <div className='logo'>
          <h1>Josh Schmitz</h1>
        </div>
        <Nav></Nav>
      </div>
    </header>
  );
};

export default Header;
