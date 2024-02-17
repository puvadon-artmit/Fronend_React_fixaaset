import { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Logo from '../image/logo-acg.png'
import '../css/background.css'


export default function login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/sign-in`, {
                username: username,
                password: password,
            });

            if (response.status === 200) {

                const token = response.data.token;

                Cookies.set('token', token);

                console.log('Login success:', response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'เข้าสู่ระบบสำเร็จ!',
                    text: 'ยินดีต้อนรับเข้าสู่ระบบ',
                }).then(() => {
                    // Redirect ไปหน้า "/"
                    navigate('/home');
                });
            } else {
                // ดำเนินการเมื่อ login ไม่สำเร็จ
                console.error('Login failed:', response.data);

                // แสดง SweetAlert2 แจ้งเตือนเมื่อ login ไม่สำเร็จ
                Swal.fire({
                    icon: 'error',
                    title: 'เข้าสู่ระบบไม่สำเร็จ!',
                    text: 'กรุณาตรวจสอบข้อมูลที่ให้ถูกต้อง',
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire({
                icon: 'error',
                title: 'เข้าสู่ระบบไม่สำเร็จ!',
                text: 'กรุณาตรวจสอบข้อมูลที่ให้ถูกต้อง',
            });
        }
    };

    return (
        <div className='background'>
        <Container component="main" maxWidth="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img className='mb-8 mt-2'  src={Logo} width={120} height={120}   alt="Logo" />
                <Typography component="h1" variant="h5">
                    Login to your account
                </Typography>

                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-6 dark:bg-gray-200"></hr>


                <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '16px' }}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
        </div>
    );
};
