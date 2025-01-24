import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Menu, Dropdown, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { ThemeContext } from '../context/theme';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  let navigate = useNavigate();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Style adjustments for Instagram-like appearance
  const MenuStyle = isDarkTheme ? {
    inverted: true,
    pointing: false,
    secondary: false,
    size: 'massive',
    style: { backgroundColor: '#1d1f20', boxShadow: 'none' }, // Dark background
  } : {
    inverted: false,
    pointing: true,
    secondary: true,
    size: 'massive',
    color: 'teal',
    style: { backgroundColor: 'white', boxShadow: 'none' }, // Light background
  }

  const dropdownItems = []

  if (pathname.includes('/post') || pathname.includes('/user')) {
    dropdownItems.push(
      <Dropdown.Item key={dropdownItems.length} as={Link} to="/">
        Home
      </Dropdown.Item>
    )
  }

  if (!pathname.includes('/user')) {
    dropdownItems.push(
      <Dropdown.Item key={dropdownItems.length} as={Link} to={`/user/${user?.id}`}>
        {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}'s Profile
      </Dropdown.Item>
    )
  }

  const menuBar = user ? (
    <Menu {...MenuStyle}>
      <Dropdown item icon="home" className="instagram-home">
        <Dropdown.Menu>
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>
      {user.isAdmin && <Menu.Item>Admin</Menu.Item>}
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={handleLogout}
          style={{ padding: '0 20px', fontSize: '16px' }}
        />
        <Menu.Item
          name='theme'
          onClick={toggleTheme}
          style={{ padding: '0 20px', fontSize: '16px' }}
        >
          <Icon name={isDarkTheme ? 'sun' : 'moon'} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu {...MenuStyle}>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
        style={{ fontSize: '16px' }}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
          style={{ fontSize: '16px' }}
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
          style={{ fontSize: '16px' }}
        />
        <Menu.Item
          name='theme'
          onClick={toggleTheme}
          style={{ padding: '0 20px', fontSize: '16px' }}
        >
          <Icon name={isDarkTheme ? 'sun' : 'moon'} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
