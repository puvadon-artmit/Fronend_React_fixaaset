import Card from '@mui/material/Card';

import Avatar from '@mui/material/Avatar';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';



export default function MainTopic() {
    return (
        <div>
            <div className="flex flex-wrap justify-center">
                
                <Card className="flex items-center w-full md:w-2/5 p-4 mt-4 mx-2">
                <Link to='/assets'>
                    <div className="flex items-center">
                        <Avatar sx={{ width: 60, height: 60, backgroundColor: '#01345d' }}>
                            <AssignmentReturnedIcon sx={{ fontSize: 35 }} />
                        </Avatar>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">นำเข้าข้อมูลทะเบียนสินทรัพย์</h2>
                        </div>
                    </div>
                    </Link>
                </Card>
                

                <Card className="flex items-center w-full md:w-2/5 p-4 mt-4 mx-2">
                    <div className="flex items-center">
                        <Avatar sx={{ width: 60, height: 60, backgroundColor: '#01345d' }}>
                            <EqualizerIcon sx={{ fontSize: 35 }} />
                        </Avatar>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">ผลการตรวจนับสินทรัพย์</h2>
                        </div>
                    </div>
                </Card>

                <Card className="flex items-center w-full md:w-2/5 p-4 mt-4 mx-2">
                    <div className="flex items-center">
                        <Avatar sx={{ width: 60, height: 60, backgroundColor: '#01345d' }}>
                            <ApartmentIcon sx={{ fontSize: 35 }} />
                        </Avatar>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">ตั้งค่าแผนผังอาคาร</h2>
                        </div>
                    </div>
                </Card>

                <Card className="flex items-center w-full md:w-2/5 p-4 mt-4 mx-2">
                    <div className="flex items-center">
                        <Avatar sx={{ width: 60, height: 60, backgroundColor: '#01345d' }}>
                            <SettingsIcon sx={{ fontSize: 35 }} />
                        </Avatar>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">การจัดการข้อมูล</h2>
                        </div>
                    </div>
                </Card>
               
                <Card className="flex items-center w-full md:w-2/5 p-4 mt-4 mx-2">
                <Link to='/category'>
                    <div className="flex items-center">
                        <Avatar sx={{ width: 60, height: 60, backgroundColor: '#01345d' }}>
                            <PlaylistAddIcon sx={{ fontSize: 35 }} />
                        </Avatar>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">เพิ่มหมวดหมู่</h2>
                        </div>
                    </div>
                    </Link>
                </Card>

            </div>
            <div className='flex justify-center mt-8'>
                <Button variant="outlined" sx={{ fontSize: { xs: '12px', sm: '18px' }, margin: { xs: '0 2px', sm: '0 4px' } }}><MenuBookIcon sx={{ margin: { xs: '0 6px', sm: '0 10px' }, fontSize: { xs: '24px', sm: '35px' } }} /> คู่มือการใช้งาน</Button>
                <Button variant="contained" sx={{ fontSize: { xs: '12px', sm: '18px' }, margin: { xs: '0 2px', sm: '0 4px' } }}><DownloadIcon sx={{ margin: { xs: '0 6px', sm: '0 10px' }, fontSize: { xs: '24px', sm: '35px' } }} />ทะเบียนสินทรัพย์</Button>
            </div>
        </div>
    );
}