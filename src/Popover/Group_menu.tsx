import React, { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import { TextField, Paper, Grid, Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectuserData } from '../store/slice/userSlice';
import Container from '@mui/material/Container';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

export default function Group_menu() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const dispatch = useDispatch<any>();
    const username = useSelector(selectuserData);

    // const status = useSelector(selectStatus);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const [formData, setFormData] = React.useState({
        group_name: "",
        comment: "",
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInputChange = (key: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };


    const handleSubmit = async () => {
        try {
            handleClose();
            const isConfirmed = await Swal.fire({
                title: "คุณแน่ใจไหม?",
                text: "คุณจะไม่สามารถเปลี่ยนกลับสิ่งนี้ได้!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Submit"
            }).then((result) => result.isConfirmed);

            if (isConfirmed) {
                console.log("formData before axios.post:", formData);

                const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/group/create-group`, {
                    ...formData,
                    user_id: username.user_id,
                });

                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ!',
                    text: 'มีการเพิ่มกลุ่มใหม่',
                });
            }
        } catch (error) {
            console.error("Error while submitting data:", error);

            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: 'มีข้อผิดพลาดในการเพิ่มกลุ่ม',
            });
        } finally {
            handleClose();
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Link to={'/assets/view_group'}>
                    <Fab
                        sx={{ bgcolor: '#01345d', color: 'white', fontSize: '1rem', width: '36px', height: '56px', borderRadius: 0.5, boxShadow: 'none' }}
                    >
                        <RemoveRedEyeIcon />
                    </Fab>
                </Link>
                <Fab
                    aria-describedby={id}
                    onClick={handleClick}
                    sx={{ bgcolor: '#01345d', color: 'white', fontSize: '1rem', width: '36px', height: '56px', borderRadius: 0.5, boxShadow: 'none' }}
                >
                    <AddCircleOutlineIcon />
                </Fab>
            </div>

            <Popover
                id={id}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                className='mt-24'
            >
                <div className='flex justify-between items-center ml-4 mr-4 mt-2 mb-2'>
                    <div>เพิ่ม กลุ่ม</div>
                    <div onClick={handleClose}>
                        <CloseIcon />
                    </div>
                </div>
                <hr />
                <Paper sx={{ width: { xs: '340px', xl: '1200px' }, padding: '40px' }}>
                    <Grid container spacing={2}>
                        <Container maxWidth="sm">
                            <TextField label="ชื่อกลุ่ม" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('name_group', e.target.value)} />
                            <textarea id="comment" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 " placeholder="คอมเม้นต์" onChange={(e) => handleInputChange('comment', e.target.value)}></textarea>
                            <div className='flex justify-center'>
                                <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}>
                                    บันทึก
                                </Button>
                            </div>
                        </Container>
                    </Grid>
                </Paper>
            </Popover>
        </div>
    );
}