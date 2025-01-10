import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

const translations = {
  en: {
    home: "Home",
    skills: "Skills", 
    projects: "Projects",
    connect: "Let's Connect"
  },
  he: {
    home: "דף הבית",
    skills: "כישורים",
    projects: "פרויקטים", 
    connect: "צור קשר"
  }
};

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isHebrew, setIsHebrew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Check browser language first
        const browserLang = navigator.language;
        if (browserLang.includes('he')) {
          setIsHebrew(true);
          setLoading(false);
          return;
        }

        // Fallback to IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIsHebrew(data.country_code === 'IL');
      } catch (error) {
        console.error('Location detection failed:', error);
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const lang = isHebrew ? 'he' : 'en';
  
  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" dir={isHebrew ? "rtl" : "ltr"}>
              <Nav.Link 
                href="#home"
                className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('home')}
              >
                {translations[lang].home}
              </Nav.Link>
              <Nav.Link 
                href="#skills"
                className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('skills')}
              >
                {translations[lang].skills}
              </Nav.Link>
              <Nav.Link 
                href="#projects"
                className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('projects')}
              >
                {translations[lang].projects}
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
                <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div>
              <HashLink to='#connect'>
                <button className="vvd">
                  <span>{translations[lang].connect}</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
