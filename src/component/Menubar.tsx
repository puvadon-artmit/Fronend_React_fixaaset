import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Menubar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleLogout = () => {

        Cookies.remove('token');
        navigate('/');
    };

    return (
        <div>
            <div>
                <IconButton
                    id="user-menu-button"
                    aria-controls={open ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color="inherit"
                >
                    <AccountCircleIcon sx={{ fontSize: '2.5rem' }} />
                </IconButton>
                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'user-menu-button',
                    }}
                    PaperProps={{
                        sx: {
                            width: '180px',
                            marginTop: '10px',
                        },
                    }}
                >
                    <MenuItem onClick={handleClose} sx={{ marginBottom: '8px' }}><PersonIcon sx={{ marginRight: 2 }} /> Profile</MenuItem>
                    <hr />
                    <MenuItem onClick={handleLogout} sx={{ marginTop: '8px' }}> <LogoutIcon sx={{ marginRight: 2 }} /> Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}
