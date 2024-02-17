import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import { TextField, Paper, Grid, Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectuserData } from '../store/slice/userSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

export default function BranchMenu() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const dispatch = useDispatch<any>();
    const username = useSelector(selectuserData);
    const [subnets, setSubnets] = useState<string[]>([]);
    const [name_branch, setNameBranch] = useState<string[]>([]);
    // const status = useSelector(selectStatus);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const [formData, setFormData] = React.useState({
        name_branch: "",
        subnet: "",
        zip_code: "",
        county: "",
        province: "",
        comment: "",
        building: "",
        address: "",
        town: "",
        room_number: "",
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

    const [subnet, setSubnet] = React.useState('');

    const handleChange01 = (event: SelectChangeEvent) => {
        const selectedSubnet = event.target.value as string;
        console.log("Selected Subnet:", selectedSubnet);
        setSubnet(selectedSubnet);
        handleInputChange('subnet', selectedSubnet);
    };

    const handleSubmit = async () => {
        try {
            console.log("formData before axios.post:", formData);

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
                const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/branch/create`, {
                    ...formData,
                    user_id: username.user_id,
                });

                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ!',
                    text: 'มีการเพิ่มสาขาใหม่',
                });
            }
        } catch (error) {
            console.error("Error while submitting data:", error);

            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: 'มีข้อผิดพลาดในการเพิ่มสาขา',
            });
        } finally {
            handleClose();
        }
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const fetchSubnets = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/branch/get-all`);
            const responseData = response.data;

            if (responseData.status === 'success' && Array.isArray(responseData.result)) {
                const data = responseData.result;
                const uniqueSubnets = Array.from(new Set(data.map((item: any) => item.subnet))) as string[];
                setSubnets(uniqueSubnets);


                const uniqueNameBranches = Array.from(new Set(data.map((item: any) => `${item.name_branch} ${item.subnet}`))) as string[];
                setNameBranch(uniqueNameBranches);
            } else {
                console.error("Invalid response format or missing 'result' array:", responseData);
            }
        } catch (error) {
            console.error("Error while fetching subnets:", error);
        }
    };

    useEffect(() => {
        fetchSubnets();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1px' }}>
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
                    <div>เพิ่ม สาขา-ที่ตั้ง</div>
                    <div onClick={handleClose}>
                        <CloseIcon />
                    </div>
                </div>
                <hr />
                <Paper sx={{ width: { xs: '340px', xl: '1200px' }, padding: '40px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField label="ชื่อสาขา" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('name_branch', e.target.value)} />
                            <FormControl fullWidth sx={{ marginTop: '10px' }}>
                                <InputLabel id="demo-simple-select-label">ชื่อสาขาย่อย</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subnet}
                                    label="Age"
                                    onChange={handleChange01}
                                >
                                    <MenuItem disabled>Subnets</MenuItem>
                                    {subnets.map((subnetItem) => (
                                        <MenuItem key={subnetItem} value={subnetItem}>
                                            {subnetItem}
                                        </MenuItem>
                                    ))}


                                    <MenuItem disabled>Name Branches</MenuItem>
                                    {name_branch
                                        .sort((a, b) => {
                                            const [, subnetItemA] = a.split(' ');
                                            const [, subnetItemB] = b.split(' ');
                                            const [, nameBranchA] = a.split(' ');
                                            const [, nameBranchB] = b.split(' ');
                                            const subnetCompare = subnetItemA.localeCompare(subnetItemB);
                                            return subnetCompare !== 0 ? subnetCompare : nameBranchA.localeCompare(nameBranchB);
                                        })
                                        .map((nameBranchItem) => {
                                            const [nameBranch, subnetItem] = nameBranchItem.split(' ');
                                            return (
                                                <MenuItem key={nameBranchItem} value={nameBranchItem}>
                                                    {subnetItem} {'>'} {nameBranch}
                                                </MenuItem>
                                            );
                                        })}

                                </Select>
                            </FormControl>

                            <TextField label="รหัสไปรษณีย์" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('zip_code', e.target.value)} />
                            <TextField label="อำเภอ/เขต" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('county', e.target.value)} />
                            <TextField label="จังหวัด" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('province', e.target.value)} />
                            <textarea id="comment" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 " placeholder="คอมเม้นต์" onChange={(e) => handleInputChange('comment', e.target.value)}></textarea>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="หมายเลขอาคาร" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('building', e.target.value)} />
                            <TextField label="ที่อยู่" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('address', e.target.value)} />
                            <TextField label="เมือง" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('town', e.target.value)} />
                            <TextField label="ประเทศ" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('country', e.target.value)} />
                            <TextField label="หมายเลขห้อง" variant="outlined" fullWidth sx={{ marginTop: '10px' }} onChange={(e) => handleInputChange('room_number', e.target.value)} />
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