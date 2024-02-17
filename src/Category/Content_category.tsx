import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

interface Category {
    category_id: string;
    category_name: string;
    category_image: string;
}

export default function ContentCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

   

    useEffect(() => {
        axios.get<{ result: Category[] }>(`${import.meta.env.VITE_APP_API_BASE_URL}/api/category/get-all`)
            .then(response => {
                setCategories(response.data.result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleCardClick = (category_id: string) => {
        // Navigate to Aggregate_alldata with category_id
        navigate(`/specific_assets/${category_id}`);
    };

    return (
        <Container component="main" maxWidth="md">
            <div>
                <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
                    หมวดหมู่ทั้งหมด
                </Typography>
                <Grid container spacing={3} className="md:flex-col lg:flex-row">
                    {categories.map(category => (
                        <Grid key={category.category_id} item xs={12} md={4} className="flex items-center">
                            <Card className="w-full p-4 mt-4 mx-2" onClick={() => handleCardClick(category.category_id)}>
                                <div className="flex items-center">
                                    <Avatar sx={{ width: 50, height: 50 }}>
                                        <img
                                            src={`${import.meta.env.VITE_APP_API_BASE_URL}/api/category/get-image/${category.category_image}`}
                                            alt=""
                                            style={{ width: '120%', height: '120%', objectFit: 'cover' }}
                                        />
                                    </Avatar>
                                    <div className="ml-4">
                                        <Typography variant="h6">{category.category_name}</Typography>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};
