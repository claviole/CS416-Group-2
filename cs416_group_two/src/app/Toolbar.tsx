import React from 'react';
import logoImage from '../images/logoImage.png';
import Image from 'next/image';
import Link from 'next/link';
const Toolbar = () => {
  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    // Add more styles as needed
  };

  const logoStyle = {
    // Add styles for the logo
  };

  const navStyle = {
    display: 'flex',
    listStyle: 'none',
    // Add more styles as needed
  };

  const navItemStyle = {
    margin: '0 10px',
    // Add more styles as needed
  };

  const searchStyle = {
    // Add styles for the search icon
  };

  return (
    <div style={toolbarStyle}>


<Image src={logoImage} alt="Logo" />


<ul style={navStyle}>
      <li style={navItemStyle}>
        <Link href="https://www.pnw.edu/admissions/">ADMISSIONS</Link>
      </li>
      <li style={navItemStyle}>
        <Link href="https://www.pnw.edu/academics-research/">ACADEMICS</Link>
      </li>
      <li style={navItemStyle}>
        <Link href="https://www.pnw.edu/paying-for-college/">PAYING FOR COLLEGE</Link>
      </li>
      <li style={navItemStyle}>
        <Link href="https://www.pnw.edu/student-life/">STUDENT LIFE</Link>
      </li>
      <li style={navItemStyle}>
        <Link href="https://pnwathletics.com/">ATHLETICS</Link>
      </li>
      <li style={navItemStyle}>
        <Link href="https://www.pnw.edu/about-pnw/">ABOUT PNW</Link>
      </li>
      <li style={navItemStyle}>
        <Link href="https://www.pnw.edu/espanol/">PNW EN ESPAÑOL</Link>
      </li>
    </ul>
      
    </div>
  );
};

export default Toolbar;