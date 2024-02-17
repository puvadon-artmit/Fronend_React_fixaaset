
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Logo from "../image/logo-acg-white.png"

export default function Nevbar() {
  return (
    <div> <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" className='flex justify-center items-center'   sx={{backgroundColor: '#02345d'}}>
      <Toolbar>
        
       <div className='mt-3 mb-3'>
      <img  src={Logo} width={120} height={120}   alt="Logo" />
      </div>

      </Toolbar>
    </AppBar>
  </Box></div>
  )
}