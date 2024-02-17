import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ChairIcon from '@mui/icons-material/Chair';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import ImgScan from '../image/scan.png'


export default function Navigation() {
    const [value, setValue] = React.useState(0);

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleToggleCamera = async () => {
        try {
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                setStream(null);
                setVideoReady(false);
            } else {
                const cameraStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                    },
                });
                setStream(cameraStream);
            }
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().then(() => setVideoReady(true));
        }
    }, [stream]);

    
    

    return (
        <div>
            <div className='flex justify-center mt-40 flex-col items-center'>
                {stream && (
                    <Container maxWidth="sm" style={{ minHeight: '100%' }}>
                        <div
                            className="flex flex-col items-center mt-2"
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden', 
                            }}
                        >
                            <video
                                ref={videoRef}
                                width="100%"
                                height="100%"
                                autoPlay
                                playsInline
                                style={{ transform: 'scaleX(-1)', borderRadius: '20px', height: '100%' }}
                            ></video>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10%', 
                                    width: '80%',
                                    height: '80%',
                                    backgroundImage: `url(${ImgScan})`,
                                    backgroundSize: 'cover',
                                    
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                        </div>
                    </Container>
                )}
            </div>

            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Box sx={{ flexGrow: 1 }}>
                    {/* Your main content goes here */}
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        bottom: 0,
                        position: 'fixed',
                        alignSelf: 'flex-end',
                        borderTop: '1px solid #ccc', // เพิ่มเส้นบนไอคอน
                    }}
                >
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="หน้าหลัก" icon={<HomeIcon sx={{ fontSize: 35 }} />} sx={{ margin: 0 }} />
                        <BottomNavigationAction label="สินทรัพย์" icon={<ChairIcon sx={{ fontSize: 35 }} />} sx={{ margin: 0 }} />

                        <BottomNavigationAction
                            label="แสกน"
                            icon={
                                <Link to='/Scan-QRcode' onClick={handleToggleCamera}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            backgroundColor: 'primary.main',
                                        }}
                                    >
                                        <QrCodeScannerIcon sx={{ fontSize: 35, color: 'white' }} />
                                    </Box>
                                </Link>
                            }
                            sx={{ margin: 0, marginBottom: '30px' }}
                        />

                        <BottomNavigationAction label="ตรวจนับ" icon={<AssignmentTurnedInIcon sx={{ fontSize: 35 }} />} sx={{ margin: 0 }} />
                        <BottomNavigationAction label="โปรไฟล์" icon={<AccountCircleIcon sx={{ fontSize: 35 }} />} sx={{ margin: 0 }} />
                    </BottomNavigation>
                </Box>
            </Box>
        </div>
    );
}
