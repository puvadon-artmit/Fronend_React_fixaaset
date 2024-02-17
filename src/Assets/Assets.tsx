import React, { useEffect } from 'react';
import Menubar from '../component/Menubar';
import Logo from "../image/logo-acg.png"
import { styled, useTheme } from '@mui/material/styles';
import { Box, Avatar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tab_icons from '../component/Tab_icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import Add_assets from './Add_assets';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

interface Types {
  category_id: string;
  category_name: string;
  category_image: string;
}


export default function Assets() {
  const { category_id } = useParams();
  const [types, setTypes] = React.useState<Types[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/category/get-all`)
      .then(response => response.json())
      .then(data => {
        const filteredTypes = data.result.filter((type: Types) => type.category_id === category_id);
        setTypes(filteredTypes);
      })
      .catch(error => console.error('Error fetching group data:', error));
  }, [category_id]);


  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#01345d' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }} >
            <MenuIcon />
          </IconButton>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Typography variant="h6" noWrap component="div" sx={{
              fontSize: {
                xs: '16px',
                sm: '16px',
                md: '18px',
                lg: '20px',
                xl: '22px',
              }
            }}>
              FIXED ASSET MANAGEMENT
            </Typography>
          </div>
          {isMobile && (
            <Menubar />
          )}



        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
              <img src={Logo} width={60} height={60} alt="Logo" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>

          </div>
        </DrawerHeader>
        <Divider />
        <List>

          <Tab_icons />

        </List>
        <Divider />


      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg">

          <div role="presentation" className='mb-6' onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                HOME
              </Link>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                <ChecklistRtlIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                หมวดหมู่
              </Link>
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                <AssignmentReturnedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                เพิ่มสินทรัพย์ /  <Avatar sx={{ width: 30, height: 30,marginLeft: '8px' }}>
                  {types.length > 0 ? (
                    <img
                      src={`${import.meta.env.VITE_APP_API_BASE_URL}/api/category/get-image/${types[0].category_image}`}
                      alt=""
                      style={{ width: '110%', height: '110%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>...</span>
                  )}
                </Avatar>
                {types.map(types => (
                  <div className='ml-2' key={types.category_id}>
                    {types.category_name}
                  </div>
                ))}
              </Typography>
            </Breadcrumbs>
          </div>

          <Add_assets />
        </Container>
      </Main>
    </Box>

  );
}
