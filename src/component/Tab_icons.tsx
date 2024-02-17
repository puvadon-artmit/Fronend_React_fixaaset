import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChairIcon from '@mui/icons-material/Chair';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SettingsIcon from '@mui/icons-material/Settings';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';


export default function Tab_icons() {
    const isMobile = useMediaQuery('(min-width:600px)');
    return (
        <div>
            {isMobile && (
                <Link to='/home'>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                        <HomeIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.5rem' }} />
                        <div className='text-lg'>
                            หน้าหลัก
                        </div>
                    </Box>
                </Link>
            )}


            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '30px' }}>
                <ChairIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.2rem' }} />
                <div className='text-lg'>
                    สินทรัพย์ถาวร
                </div>
            </Box>

            <Link to='/category/all-category'>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '30px' }}>
                    <FormatListBulletedIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.2rem' }} />
                    <div className='text-lg'>
                        หมวดหมู่ทั้งหมด
                    </div>
                </Box>
            </Link>


            <Link to='/allassets'>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '30px' }}>
                    <AssignmentIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.2rem' }} />
                    <div className='text-lg'>
                        สินทรัพย์ทั้งหมด
                    </div>
                </Box>
            </Link>

            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '30px' }}>
                <AssignmentTurnedInIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.2rem' }} />
                <div className='text-lg'>
                    การตรวจนับ
                </div>
            </Box>


            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '30px' }}>
                <ApartmentIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.2rem' }} />
                <div className='text-lg'>
                    ตั้งค่าแผนผังอาคาร
                </div>
            </Box>


            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '30px' }}>
                <SettingsIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.2rem' }} />
                <div className='text-lg'>
                    การจัดการข้อมูล
                </div>
            </Box>


            {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '14px' }}>
                    <AccountCircleIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.5rem' }} />
                    <div className='text-lg'>
                        โปรไฟล์
                    </div>
                </Box>
            )}

            {isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '30px' }}>
                    <QrCodeScannerIcon sx={{ marginRight: 3, color: '#01345d', fontSize: '2.2rem' }} />
                    <div className='text-lg'>
                        แสกน
                    </div>
                </Box>
            )}
        </div>
    )
}