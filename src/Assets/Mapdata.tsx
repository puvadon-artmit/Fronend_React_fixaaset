import { useState, useEffect } from 'react';
import axios from 'axios';

interface ItemType {
  type_id: string;
  type_name: string;
  comment: string;
  Category: {
    category_name: string;
    category_image: string;
  };
}

export default function Mapdata() {
  const [data, setData] = useState<ItemType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/type/get-type`);
        setData(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          {data.map((item: ItemType) => (
            <div key={item.type_id}>
              <h1>ชื่อ: {item.type_name}</h1>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
