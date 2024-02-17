import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import { TextField, Paper, Grid, Button, FormControl, InputLabel, MenuItem } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectuserData } from '../store/slice/userSlice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ItemType {
    type_id: string;
    type_name: string;
    comment: string;
    category_id: string;
    Category: {
        category_name: string;
        category_image: string;
        category_id: string;
    };
}

interface Types {
    category_id: string;
    category_name: string;
    category_image: string;
}


export default function Model_menu() {
    const { category_id } = useParams()
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const dispatch = useDispatch<any>();
    const username = useSelector(selectuserData);
    const [data, setData] = useState<ItemType[] | null>(null);
    const [manufacturer, setSelectedManufacturer] = React.useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const [formData, setFormData] = React.useState({
        item_model_name: "",
        comment: "",
        product_number: "",
        weight: "",
        required_units: "",
        frontpicture: null,
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

    const handleChangeManufacturer = (event: SelectChangeEvent) => {
        setSelectedManufacturer(event.target.value as string);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleInputChange('frontpicture', file);

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
    
                const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/item-model/upload`, formDataWithFile)
                    .then(async (response) => {
                        console.log(response)
                        const storyData = {
                            story_name: "เพิ่มรายการ",
                            username: username.username,
                            user_id: username.user_id,
                            item_model_id: response.data,
                        };
                        const storyResponse = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/story/create-story`, storyData);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/type/get-type`);
                setData(response.data.result.filter((types: Types) => types.category_id === category_id));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1px', marginTop: '30px' }}>
                <Link to={`/assets/view_model/${category_id}`}>
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
                    <div>เพิ่ม รุ่น</div>
                    <div onClick={handleClose}>
                        <CloseIcon />
                    </div>
                </div>
                <hr />
                <Paper sx={{ width: { xs: '340px', xl: '1200px' }, padding: '40px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField label="ชื่อรุ่น" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('item_model_name', e.target.value)} />
                            <TextField label="หมายเลขรุ่น" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('product_number', e.target.value)} />
                            <TextField label="required_units" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('required_units', e.target.value)} />
                            <TextField label="น้ำหนัก" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('weight', e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='mt-4'>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={manufacturer}
                                        label="Age"
                                        onChange={handleChangeManufacturer}
                                    >
                                        {data ? (
                                            data.map((item: ItemType) => (
                                                <MenuItem key={item.type_id} value={item.type_id}>
                                                    <h1>ชื่อ: {item.type_name}</h1>
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                    </Select>
                                </FormControl>
                            </div>


                            <textarea id="comment" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-8" placeholder="คอมเม้นต์" onChange={(e) => handleInputChange('comment', e.target.value)}></textarea>

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
                        </Grid>
                    </Grid>
                </Paper>
            </Popover>
        </div>
    );
}
