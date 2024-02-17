import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectuserData } from '../store/slice/userSlice';


export default function Add_category() {
  const dispatch = useDispatch<any>();
  const username = useSelector(selectuserData);
  // const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategoryImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('category_name', categoryName);
      formData.append('category_image', categoryImage as File);
      formData.append('user_id', username.user_id);

      const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/category/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Category created successfully!', response.data);

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ!',
        text: 'มีการเพิ่มมหมวดหมู่ใหม่',
      });

    } catch (error) {
      console.error('Error creating category:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: 'มีข้อผิดพลาดในการเพิ่มมหมวดหมู่',
      });
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
      {/* {username && (
            <p> User ID: {username.user_id}</p>
          )} */}
        <div>
          <Typography component="h1" variant="h5" sx={{marginBottom : '20px'}}>
            เพิ่มมหมวดหมู่
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="categoryName"
                  label="Category Name"
                  name="categoryName"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <div className='flex justify-center'>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryImageChange}
                    style={{ display: 'none' }}
                    id="categoryImageInput"
                  />
                  <label htmlFor="categoryImageInput">
                    <Button variant="outlined" component="span">
                      Upload Image
                    </Button>
                  </label>
                </div>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{marginTop : '20px'}}>
              บันทึก
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};


