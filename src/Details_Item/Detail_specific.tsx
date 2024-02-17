import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { Typography, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';

interface AssetData {
  assets_id: string;
  model_name: string;
  manufacturer: string;
  type: string;
  comment1: string;
  comment2: string;
  comment3: string;
  property_code: string;
  Item_model: {
    frontpicture: string;
    item_model_name: string;
  };
}

export default function DetailSpecific(): JSX.Element {
  const { assets_id } = useParams<{ assets_id: string }>();
  const [assetData, setAssetData] = useState<AssetData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ result: AssetData }>(
          `${import.meta.env.VITE_APP_API_BASE_URL}/api/assets/get-by-id/${assets_id}`
        );
        const responseData = response.data;

        if (responseData.result) {
          setAssetData(responseData.result);
        } else {
          console.error('Invalid response format or missing result:', responseData);
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchData();
  }, [assets_id]);

  const fullURL = `https://css74fl8-5173.asse.devtunnels.ms/specific_assets/specific-data/${assets_id}`;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {assetData ? (
          <Card>
            <div className='flex justify-center'>
          <img style={{height: '80px'}} src={`${import.meta.env.VITE_APP_API_BASE_URL}/api/item-model/get-image/${assetData.Item_model.frontpicture}`} alt="" />
            <CardContent>
              <Typography variant="h5" component="div">
                {assetData.model_name}
              </Typography>
              <Typography color="text.secondary">Manufacturer: {assetData.manufacturer}</Typography>
              <Typography color="text.secondary">Type: {assetData.type}</Typography>
              <Typography color="text.secondary">Comment1: {assetData.comment1}</Typography>
              <Typography color="text.secondary">Comment2: {assetData.comment2}</Typography>
              <Typography color="text.secondary">Comment3: {assetData.comment3}</Typography>
              <Typography color="text.secondary">Property Code: {assetData.property_code}</Typography>
            </CardContent>
            </div>
          </Card>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <QRCode value={fullURL} />
        </Paper>
      </Grid>
    </Grid>
  );
}
