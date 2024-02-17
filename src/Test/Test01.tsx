import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

// ประกาศ interface สำหรับโครงสร้างข้อมูล category
interface CategoryData {
  category_id: string;
  category_name: string;
  category_image: string;
  created_at: string;
  updated_at: string;
  DeletedAt: string | null;
  user_id: string;

}

const Test01: React.FC = () => {
  const { category_id } = useParams();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ result: CategoryData, status: string }> = await axios.get(`http://127.0.0.1:7000/api/category/get-by-id/${category_id}`);
        const data = response.data;

        if (data.status === 'success') {
          setCategoryData(data.result);
        } else {
          // Handle error if needed
          console.error('Failed to fetch category data');
        }
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [category_id]);

  return (
    <div>
      {categoryData ? (
        <div>
          <h1>{categoryData.category_name}</h1>
          <img src={categoryData.category_image} alt={categoryData.category_name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Test01;
