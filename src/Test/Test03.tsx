import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import Container from '@mui/material/Container';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useParams } from 'react-router-dom';

interface Types {
    category_id: string;
    category_name: string;
    category_image: string;
}

interface ItemType {
    type_id: string;
    type_name: string;
    comment: string;
    category_id: string;
    Category: {
        category_name: string;
        category_image: string;
    };
}

interface TypeManufacturer {
    manufacturer_id: string;
    manufacturer_name: string;
    comment: string;
    type_id: string;
    Type: {
        type_id: string;
        type_name: string;
        comment: string;
    };
}

// ------------------------------------------------------------------------------------------------

interface ItemModel {
    item_model_id: string;
    item_model_name: string;
    comment: string;
    type_id: string;
    Type: {
        type_id: string;
        type_name: string;
        comment: string;
    };
}


export default function Test03() {
    const { category_id } = useParams()
    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(category_id || null);
    const [selectedType, setSelectedType] = React.useState<string>('');
    const [selectedManufacturer, setManufacturers] = React.useState<string>('');
    const [itemModels, setItemModels] = React.useState<ItemModel[] | null>(null);
    const [selectedItemModel, setSelectedItemModel] = React.useState<string>('');

    useEffect(() => {
        setCurrentCategoryId(category_id || null);
    }, [category_id]);

    const handleChangeA1 = (event: SelectChangeEvent) => {
        const selectedTypeValue = event.target.value as string;
        setSelectedType(selectedTypeValue);
        localStorage.setItem('selectedType', selectedTypeValue);
        setManufacturers('');
    };

    const handleChangeA2 = (event: SelectChangeEvent) => {
        setManufacturers(event.target.value as string);
    };


    const handleChangeA3 = (event: SelectChangeEvent) => {
        setSelectedItemModel(event.target.value as string);
    };


    const [data, setData] = useState<ItemType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:7000/api/type/get-type');
                setData(response.data.result.filter((types: Types) => types.category_id === category_id));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [manufacturer, setManufacturer] = useState<TypeManufacturer[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:7000/api/manufacturer/get-manufacturer');
                setManufacturer(response.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    // --------------------------------------------------------------------------------------------------------


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:7000/api/item-model/get-item_model');
                setItemModels(response.data.result);
            } catch (error) {
                console.error('Error fetching item models:', error);
            }
        };

        fetchData();
    }, []);
    // -------------------------------------------------------------------------------------------------------------


    useEffect(() => {
        const savedType = localStorage.getItem('selectedType');
        const savedManufacturer = localStorage.getItem('selectedManufacturer');

        if (savedType) {
            setSelectedType(savedType);
        }

        if (savedManufacturer) {
            setManufacturers(savedManufacturer);
        }
        const intervalId = setInterval(() => {
            localStorage.removeItem('selectedType');
            localStorage.removeItem('selectedManufacturer');
        }, 600000);

        return () => clearInterval(intervalId);
    }, [manufacturer, selectedType]);



    return (
        <div>
            <div className='flex justify-between items-center ml-4 mr-4 mt-8 mb-2'>
                <div>ทดสอบ</div>
            </div>

            <Container maxWidth="sm">

                <div className='mt-4'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedType}
                            label="Age"
                            onChange={handleChangeA1}
                        >
                            {data ? (
                                data.map((item: ItemType) => (
                                    <MenuItem key={item.type_id} value={item.type_id}>
                                        ชื่อ: {item.type_name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>

                <FormControl fullWidth>
                    <InputLabel id="manufacturer-select-label">ผู้ผลิต</InputLabel>
                    <Select
                        labelId="manufacturer-select-label"
                        id="manufacturer-select"
                        value={selectedManufacturer}
                        label="ผู้ผลิต"
                        onChange={handleChangeA2}
                    >
                        {manufacturer ? (
                            manufacturer
                                .filter((itemmft: TypeManufacturer) => itemmft.type_id === selectedType)
                                .map((itemmft: TypeManufacturer) => (
                                    <MenuItem key={itemmft.manufacturer_id} value={itemmft.manufacturer_id}>
                                        ชื่อ: {itemmft.manufacturer_name}
                                        <br />
                                        type: {itemmft.Type.type_id}
                                    </MenuItem>
                                ))
                        ) : (
                            <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
                        )}
                    </Select>
                </FormControl>


                <FormControl fullWidth>
                    <InputLabel id="item-model-select-label">รุ่นสินค้า</InputLabel>
                    <Select
                        labelId="item-model-select-label"
                        id="item-model-select"
                        value={selectedItemModel}
                        label="รุ่นสินค้า"
                        onChange={handleChangeA3}
                    >
                        {itemModels ? (
                            itemModels
                                .filter((itemModel: ItemModel) => itemModel.type_id === selectedType)
                                .map((itemModel: ItemModel) => (
                                    <MenuItem key={itemModel.item_model_id} value={itemModel.item_model_id}>
                                        ชื่อ: {itemModel.item_model_name}
                                        <br />
                                        type: {itemModel.Type.type_id}
                                    </MenuItem>
                                ))
                        ) : (
                            <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
                        )}
                    </Select>
                </FormControl>

            </Container>
        </div>
    );
}