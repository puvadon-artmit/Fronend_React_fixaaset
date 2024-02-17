import React, { useEffect, useState } from 'react';
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

export default function Ground_menu() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const dispatch = useDispatch<any>();
    const username = useSelector(selectuserData);
    const [manufacturer, setSelectedManufacturer] = React.useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const [formData, setFormData] = React.useState({
        ground_name: "",
        comment: "",
        location_code: "",
        building: "",
        floor: "",
        room: "",
        ground_image: null,
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInputChange = (key: string, value: string | File) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleInputChange('ground_image', file);

            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
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
                const formDataWithFile = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formDataWithFile.append(key, value);
                    }
                });

                formDataWithFile.append('user_id', username.user_id);
                formDataWithFile.append('type_id', manufacturer);

                const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/ground/upload`, formDataWithFile)
                    .then(async (response) => {
                        console.log(response)
                        const storyData = {
                            groundstory_name: "เพิ่มรายการ",
                            ground_username: username.username,
                            user_id: username.user_id,
                            ground_id: response.data,
                        };
                        const storyResponse = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/ground_story/create-ground-story`, storyData);
                        console.log(storyResponse.data);
                    });


                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ!',
                    text: 'มีการเพิ่มสถานะใหม่',
                });
            }
        } catch (error) {
            console.error("Error while submitting data:", error);

            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: 'มีข้อผิดพลาดในการเพิ่มสถานะ',
            });
        } finally {
            handleClose();
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 1, marginTop: '30px' }}>
                <Link to={'/assets/view_ground'}>
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

            <div style={{ height: '100%' }}>
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
                        <div>เพิ่มสถานที่</div>
                        <div onClick={handleClose}>
                            <CloseIcon />
                        </div>
                    </div>
                    <hr />
                    <Paper sx={{ width: { xs: '340px', xl: '1000px' }, padding: '40px' }}>

                        <div className='flex justify-center'>
                            <Container maxWidth="sm">
                                <TextField label="ชื่อสถานที่" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('ground_name', e.target.value)} />
                                <TextField label="รหัสสถานที่" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('location_code', e.target.value)} />
                                <TextField label="อาคาร" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('building', e.target.value)} />
                                <TextField label="ชั้น" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('floor', e.target.value)} />
                                <TextField label="ห้อง" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('room', e.target.value)} />
                                <textarea id="comment" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-8" placeholder="คอมเม้นต์" onChange={(e) => handleInputChange('comment', e.target.value)}></textarea>

                                <h1 className='text-center mb-8'>โปรดเลือกรูปที่มี ขนาด (800x800) และ ขนาดไฟล์ห้ามเกิน(20 MB)</h1>
                                <div className='flex justify-center'>
                                    <label className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-8">
                                        เลือกไฟล์
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div className='flex justify-center'>
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxWidth: '400px',
                                            marginTop: '20px',
                                        }}
                                        />
                                    )}
                                </div>
                                <div className='flex justify-center'>
                                    <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}>
                                        บันทึก
                                    </Button>
                                </div>
                            </Container>
                        </div>
                    </Paper>
                </Popover>
            </div>
        </div>
    )
}