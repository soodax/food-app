import './Header.scss';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Header = (props) => {

    const [isMenuOpen, toggleMenu] = useState(false);

    const toggleMenuHandler = () => {
        !isMenuOpen ? toggleMenu(true) : toggleMenu(false);
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000',
            },
        },
    });

    return (
        <header className='header'>
            <div className='header__logo'>
                <span>Food app</span>
                <img src={logo} alt="logo" />
            </div>

            <nav className={!isMenuOpen ? 'header__nav menu-close' : 'header__nav menu-open'}>
                <ul>
                    <li> <NavLink className={({ isActive }) => isActive
                        ? 'active-link'
                        : 'default-link'}
                        to={'/main'}
                        onClick={toggleMenuHandler}> Food search </NavLink> </li>
                    <li> <NavLink className={({ isActive }) => isActive
                        ? 'active-link'
                        : 'default-link'}
                        to={'/recipes'}
                        onClick={toggleMenuHandler}> Recipe search </NavLink> </li>
                    <li> <NavLink className={({ isActive }) => isActive
                        ? 'active-link'
                        : 'default-link'}
                        to={'/favourites'}
                        onClick={toggleMenuHandler}> Favourite recipes </NavLink> </li>
                </ul>
            </nav>
            <button className='menu-btn' onClick={toggleMenuHandler}>
                <ThemeProvider theme={theme}>
                    <span>{!isMenuOpen ? <MenuIcon color='primary' /> : <CloseIcon color='primary' />}</span>
                    
                </ThemeProvider>
            </button>
        </header>
    )
}

export default Header;