import { useEffect, useState, ChangeEvent } from 'react';
import { TextField, Grid } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectuserData } from '../store/slice/userSlice';
import { useParams, Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
// import Problem_menu from './Problem_menu';
// import Transfer_menu from './Transfer_menu';

interface ItemType {
    type_id: string;
    ground_name: string;
    location_code: string;
    category_id: string;
    item_model_name: string;
    floor: string;
    comment: string;
    building: string;
    ground_image: string
    room: string;
    GroundImage: string | null;
    Category: {
        category_name: string;
        category_image: string;
        category_id: string;
    };
}

interface FormData {
    ground_name: string;
    comment: string;
    location_code: string;
    building: string;
    floor: string;
    room: string
    GroundImage: File | null;
}

export default function Detail_ground() {
    const { ground_id } = useParams<{ ground_id: string }>();
    const dispatch = useDispatch<any>();
    const username = useSelector(selectuserData);
    const [data, setData] = useState<ItemType | null>(null);
    const [manufacturer, setSelectedManufacturer] = useState<string>('');
    const [storyCount, setStoryCount] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const [formData, setFormData] = useState<FormData>({
        ground_name: '',
        comment: '',
        location_code: '',
        building: '',
        floor: '',
        room: '',
        GroundImage: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/api/ground/get-by-id/${ground_id}`
                );
                setData(response.data.result);

                setFormData({
                    ground_name: response.data.result.ground_name || '',
                    comment: response.data.result.comment || '',
                    location_code: response.data.result.location_code || '',
                    building: response.data.result.building || '',
                    floor: response.data.result.floor || '',
                    room: response.data.result.room || '',
                    GroundImage: null,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [ground_id]);

    const handleInputChange = (key: keyof FormData, value: string | File) => {
        if (key === 'GroundImage' && value instanceof File) {
            setFormData((prevData) => ({
                ...prevData,
                [key]: value,
            }));
        } else if (key !== 'GroundImage') {
            setFormData((prevData) => ({
                ...prevData,
                [key]: value,
            }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                GroundImage: files[0],
            }));
        }
    };

    const getDetailsOfChanges = (originalData: ItemType, newData: FormData) => {
        const details = [];
        if (originalData.ground_name !== newData.ground_name) {
            details.push(`ชื่อสถานที่: ${originalData.ground_name} เป็น ${newData.ground_name}`);
        }

        if (originalData.GroundImage !== newData.GroundImage && newData.GroundImage !== null) {
            details.push('มีการอัพเดทรูปภาพ');
        }
        if (originalData.comment !== newData.comment) {
            details.push(`คอมเมนต์: ${originalData.comment} เป็น ${newData.comment}`);
        }

        if (originalData.location_code !== newData.location_code) {
            details.push(`รหัสสถานที่: ${originalData.location_code} เป็น ${newData.location_code}`);
        }

        if (originalData.building !== newData.building) {
            details.push(`ตึก: ${originalData.building} เป็น ${newData.building}`);
        }

        if (originalData.floor !== newData.floor) {
            details.push(`ชั้นที่: ${originalData.floor} เป็น ${newData.floor}`);
        }

        if (originalData.room !== newData.room) {
            details.push(`ห้องที่: ${originalData.room} เป็น ${newData.room}`);
        }

        return details.join(', ');
    };

    const handleSubmit = async () => {
        try {
            const isConfirmed = await Swal.fire({
                title: 'คุณแน่ใจไหม?',
                text: 'คุณจะไม่สามารถเปลี่ยนกลับสิ่งนี้ได้!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Submit',
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

                const response = await axios.patch(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/api/ground/update/${ground_id}`,
                    formDataWithFile
                ).then(async (response) => {
                    console.log(response);
                    const changedDetails = getDetailsOfChanges(data!, formData);

                    const storyData = {
                        groundstory_name: 'แก้ไขรายการ',
                        ground_username: username.username,
                        user_id: username.user_id,
                        ground_id: ground_id,
                        ground_details: changedDetails,
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
            console.error('Error while submitting data:', error);

            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: 'มีข้อผิดพลาดในการเพิ่มสถานะ',
            });
        }
    };

    useEffect(() => {
        const fetchStoryCount = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/ground_story/get-ground-story`);
                const stories = response.data.result;

                const filteredStories = stories.filter((story: any) => story.ground_id === ground_id);

                setStoryCount(filteredStories.length);
            } catch (error) {
                console.error('Error fetching story count:', error);
            }
        };

        fetchStoryCount();
    }, [ground_id]);

    return (
        <div style={{ height: '100%' }}>
            <div className='flex justify-center text-2xl'>
                <div className='flex items-center'>
                    <span className='mr-2'>แก้ไข ข้อมูล </span>
                    <p className='text-blue-800'>{formData.ground_name}</p>
                </div>
            </div>
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded " />
            <Grid container spacing={2} className='justify-center items-center'>
                <div className='flex justify-center mt-8 mb-8'>
                    {data?.ground_image && (
                        <img
                            src={`${import.meta.env.VITE_APP_API_BASE_URL}/api/ground/get-image/${data.ground_image}`}
                            alt=''
                            style={{ width: '200px', height: '200px' }}
                        />
                    )}

                    <div className='flex items-center justify-center w-60 ml-8'>
                        <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 '>
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <svg
                                    className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 20 16'
                                >
                                    <path
                                        stroke='currentColor'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='2'
                                        d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                    />
                                </svg>
                                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                    <span className='font-semibold'>Click to upload</span>
                                </p>
                                <p className='text-xs text-gray-500 dark:text-gray-400'>
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id='dropzone-file'
                                type='file'
                                className='hidden'
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                </div>
            </Grid>
            <div className='flex justify-center mb-8'>
                <Link to={`/template_data/grond-story/${ground_id}`}>
                    <button
                        type="button"
                        className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <ArticleIcon />
                        <span className="ml-2">ดูประวัติ</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">{storyCount}</div>
                    </button>
                </Link>


                {/* <Transfer_menu/>
               <Problem_menu/> */}

            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label='ชื่อสถานที่'
                        variant='outlined'
                        fullWidth
                        value={formData.ground_name}
                        sx={{ marginTop: '10px' }}
                        onChange={(e) => handleInputChange('ground_name', e.target.value)}
                    />
                    <TextField
                        label='รหัสสถานที่'
                        variant='outlined'
                        fullWidth
                        value={formData.location_code}
                        sx={{ marginTop: '10px' }}
                        onChange={(e) => handleInputChange('location_code', e.target.value)}
                    />
                    <TextField
                        label='ตึก'
                        variant='outlined'
                        fullWidth
                        value={formData.building}
                        sx={{ marginTop: '10px' }}
                        onChange={(e) => handleInputChange('building', e.target.value)}
                    />
                    <TextField
                        label='ห้อง'
                        variant='outlined'
                        fullWidth
                        value={formData.room}
                        sx={{ marginTop: '10px' }}
                        onChange={(e) => handleInputChange('room', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label='ชั้น'
                        variant='outlined'
                        fullWidth
                        value={formData.floor}
                        sx={{ marginTop: '10px' }}
                        onChange={(e) => handleInputChange('floor', e.target.value)}
                    />

                    <textarea
                        id='comment'
                        rows={4}
                        className='mt-6 block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-8'
                        placeholder='คอมเม้นต์'
                        value={formData.comment}
                        onChange={(e) => handleInputChange('comment', e.target.value)}
                    ></textarea>
                    <div className='flex justify-center'>
                        <button
                            onClick={handleSubmit}
                            className='text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 '
                            style={{ backgroundColor: '#12328b', color: 'white', marginTop: '20px' }}
                        >
                            อัพเดท
                        </button>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
}
