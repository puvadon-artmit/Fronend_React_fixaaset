import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import '../css/assets.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Group_menu from '../Popover/Group_menu';
import axios from 'axios';
import BranchMenu from '../Popover/Branch_menu';
import Status_menu from '../Popover/Status_menu';
import Type_menu from '../Popover/Type_menu';
import { useParams } from 'react-router-dom';
import Manufacturer_menu from '../Popover/Manufacturer_menu';
import Model_menu from '../Popover/Model_menu';
import Ground_menu from '../Popover/Ground_menu';
import Responsible_menu from '../Popover/Responsible_menu';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectuserData } from '../store/slice/userSlice';
import Swal from 'sweetalert2';

interface User {
  user_id: string;
  username: string;
  firstname: string;
  lastname: string;
}

interface Grouphardware {
  group_id: string;
  group_name: string;
  user_id: string;
}

interface Status {
  status_id: string;
  status_name: string;
  user_id: string;
}

interface Location {
  ground_id: string;
  ground_name: string;
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

interface Types {
  category_id: string;
  category_name: string;
  category_image: string;
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

interface Employee {
  responsible_id: string;
  responsible_name: string;
  employee_code: string;
  Group: {
    name_group: string;
  }
}


export default function Add_assets() {
  const { category_id } = useParams();
  const dispatch = useDispatch<any>();
  const [branch, setBranch] = React.useState('');
  const [status, setStatus] = React.useState<Status[]>([]);
  const [hardware, setHardware] = React.useState('');
  const [grouphardware, setGrouphardware] = React.useState<Grouphardware[]>([]);
  const [user, setUser] = React.useState('');
  const [group, setGroup] = React.useState('');
  const [employee, setEmployee] = React.useState<Employee[]>([]);
  const [selectEmployee, setSelectEmployee] = React.useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [subnets, setSubnets] = useState<string[]>([]);
  const [name_branch, setNameBranch] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<string>('');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [location, setLocation] = React.useState<Location[]>([]);
  
  const [itemModels, setItemModels] = React.useState<ItemModel[] | null>(null);
  const [selectedItemModel, setSelectedItemModel] = React.useState<string>('');
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(category_id || null);


  
  const username = useSelector(selectuserData);


  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    setCurrentCategoryId(category_id || null);
  }, [category_id]);


  const handleChange = (event: SelectChangeEvent) => {
    setBranch(event.target.value as string);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleChange5 = (event: SelectChangeEvent) => {
    setHardware(event.target.value as string);
  };

  const handleChange6 = (event: SelectChangeEvent) => {
    setSelectedGroup(event.target.value as string);
  };

  const handleChange7 = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  const handleChange8 = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };


  const handleChange12 = (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value as string);
  };

  const handleChange13 = (event: SelectChangeEvent) => {
    setSelectEmployee(event.target.value as string);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/get-alluser`)
      .then(response => response.json())
      .then(data => setUsers(data.result))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/group/get-group`)
      .then(response => response.json())
      .then(data => setGrouphardware(data.result))
      .catch(error => console.error('Error fetching group data:', error));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/status/get-status`)
      .then(response => response.json())
      .then(data => setStatus(data.result))
      .catch(error => console.error('Error fetching group data:', error));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/ground/get-ground`)
      .then(response => response.json())
      .then(data => setLocation(data.result))
      .catch(error => console.error('Error fetching group data:', error));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/responsible/get-responsible`)
      .then(response => response.json())
      .then(data => setEmployee(data.result))
      .catch(error => console.error('Error fetching group data:', error));
  }, []);


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


  const [data, setData] = useState<ItemType[] | null>(null);

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

  // ----------------------------------------------------------------------------------------------------------------------------

  const [selectedType, setSelectedType] = React.useState<string>('');
  const [selectedManufacturer, setManufacturers] = React.useState<string>('');


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


  const [manufacturer, setManufacturer] = useState<TypeManufacturer[] | null>(null);


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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/manufacturer/get-manufacturer`);
        setManufacturer(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleChangeA3 = (event: SelectChangeEvent) => {
    setSelectedItemModel(event.target.value as string);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/item-model/get-item_model`);
        setItemModels(response.data.result);
      } catch (error) {
        console.error('Error fetching item models:', error);
      }
    };

    fetchData();
  }, []);


  // -----------------------------------------------------------------------------------------------------------
  const [formData, setFormData] = useState({
    comment1: "",
    comment2: "",
    comment3: "",
    model_name: "",
    serial_code: "",
    posting_group: "",
    phone_number: "",
    property_code: "",
    username: ""

  });

  const handleInputChange = (fieldName: any, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const selectedTypeName = selectedType && data!.find(item => item.type_id === selectedType)?.type_name;
  const selectModeldata = selectedItemModel && itemModels!.find(itemModel => itemModel.item_model_name === selectedItemModel)?.item_model_id;

  const handleSaveData = async () => {
    try {

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
      const response = await axios.post('http://127.0.0.1:7000/api/assets/create-assets', {
        model_name: formData.model_name,
        manufacturer: selectedManufacturer,
        serial_code: formData.serial_code,
        type: selectedTypeName,
        model: selectedItemModel,
        branch: branch,
        username: formData.username,
        property_code: formData.property_code,
        status: selectedStatus,
        group_hardware: selectedGroup,
        group: group,
        user_hardware: hardware,
        phone_number: formData.phone_number,
        posting_group: formData.posting_group,
        responsible_employ: selectEmployee,
        location_code: selectedLocation,
        comment1: formData.comment1,
        comment2: formData.comment2,
        comment3: formData.comment3,
        item_model_id: selectModeldata,
        category_id: category_id,
        user_id: username.user_id

      }).then(async (response) => {
        console.log(response)
        const storyData = {
            assetsstory_name: "เพิ่มรายการ",
            assets_username: username.username,
            user_id: username.user_id,
            assets_id: response.data.result.assets_id,
        };
        const storyResponse = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/assets_story/create-assets_story`, storyData);
        console.log(storyResponse.data);
    })
      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ!',
        text: 'มีการเพิ่มสินทรัพย์ใหม่',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด!',
      text: 'มีข้อผิดพลาดในการเพิ่มสาขา',
    });
    console.error('Error saving data:', error);
  }
};

    
     

  // -----------------------------------------------------------------------------------------------------------

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
    }, 12000);

    return () => clearInterval(intervalId);
  }, [manufacturer, selectedType]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>

        <TextField label="ชื่อ" variant="outlined" fullWidth onChange={(e) => handleInputChange('model_name', e.target.value)} />

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">สาขา-ที่ตั้ง</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={branch}
              label="Age"
              onChange={handleChange}
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
          <BranchMenu />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">กลุ่มที่เปลี่ยนฮาร์ดแวร์</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedGroup}
              label="Age"
              onChange={handleChange6}
            >
              {grouphardware.map(grouphard => (
                <MenuItem key={grouphard.group_id} value={grouphard.group_name}>
                  {grouphard.group_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Group_menu />
        </div>



        <FormControl fullWidth sx={{ marginTop: '30px' }}>
          <InputLabel id="demo-simple-select-label">ผู้ที่เปลี่ยนฮาร์ดแวร์</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={hardware} label="Age" onChange={handleChange5}>
            {employee.map(getresponsible => (
              <MenuItem key={getresponsible.responsible_id} value={getresponsible.responsible_name}>
                {getresponsible.responsible_name} / แผนก {getresponsible.Group.name_group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <TextField label="หมายเลขติดต่อผู้ใช้งาน" variant="outlined" fullWidth sx={{ marginTop: '30px' }} onChange={(e) => handleInputChange('phone_number', e.target.value)} />

        <FormControl fullWidth sx={{ marginTop: '30px' }}>
          <InputLabel id="demo-simple-select-label">ผู้ใช้</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={user} label="Age" onChange={handleChange7}>
            {users.map(user => (
              <MenuItem key={user.user_id} value={user.user_id}>
                {user.username} - {user.firstname} {user.lastname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">กลุ่ม</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={group} label="Age" onChange={handleChange8}>
              {grouphardware.map(grouphard => (
                <MenuItem key={grouphard.group_id} value={grouphard.group_name}>
                  {grouphard.group_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Group_menu />
        </div>

        <TextField label="ชื่อผู้ใช้งาน" variant="outlined" fullWidth sx={{ marginTop: '30px' }} onChange={(e) => handleInputChange('username', e.target.value)} />

        <textarea id="message" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => handleInputChange('comment1', e.target.value)} placeholder="คอมเม้นต์1"></textarea>
        <textarea id="message" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => handleInputChange('comment2', e.target.value)} placeholder="คอมเม้นต์2"></textarea>
        <textarea id="message" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => handleInputChange('comment3', e.target.value)} placeholder="คอมเม้นต์3"></textarea>
      </Grid>

      {/* ส่วนที่ 2 */}
      <Grid item xs={12} md={6}>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedStatus} label="status" onChange={handleChange2}>
              {status.map(getstatus => (
                <MenuItem key={getstatus.status_id} value={getstatus.status_name}>
                  {getstatus.status_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Status_menu />
        </div>


        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth sx={{ marginTop: '30px' }}>
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
          <Type_menu />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth sx={{ marginTop: '30px' }}>
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
                    <MenuItem key={itemmft.manufacturer_id} value={itemmft.manufacturer_name}>
                      ชื่อ: {itemmft.manufacturer_name}
                    </MenuItem>
                  ))
              ) : (
                <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
              )}
            </Select>
          </FormControl>
          <Manufacturer_menu />
        </div>

        <div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth sx={{ marginTop: '30px' }}>
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
                    <MenuItem key={itemModel.item_model_id} value={itemModel.item_model_name}>
                      ชื่อ: {itemModel.item_model_name}
                    </MenuItem>
                  ))
              ) : (
                <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
              )}
            </Select>
          </FormControl>
          <Model_menu />
        </div>

        <TextField label="Serial No" variant="outlined" fullWidth sx={{ marginTop: '30px' }} onChange={(e) => handleInputChange('serial_code', e.target.value)} />
        <TextField label="รหัสทรัพย์สิน" variant="outlined" fullWidth sx={{ marginTop: '30px' }} onChange={(e) => handleInputChange('property_code', e.target.value)} />
        <TextField label="FA-Posting-Group" variant="outlined" fullWidth sx={{ marginTop: '30px' }} onChange={(e) => handleInputChange('posting_group', e.target.value)} />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth sx={{ marginTop: '30px' }}>
            <InputLabel id="demo-simple-select-label">รหัสสถานที่</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedLocation} label="types" onChange={handleChange12}>
              {location.map(getground => (
                <MenuItem key={getground.ground_id} value={getground.ground_id}>
                  {getground.ground_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Ground_menu />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth sx={{ marginTop: '30px' }}>
            <InputLabel id="demo-simple-select-label">พนักงานที่รับผิดชอบ</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectEmployee} label="types" onChange={handleChange13}>
              {employee.map(getresponsible => (
                <MenuItem key={getresponsible.responsible_id} value={getresponsible.responsible_name}>
                  {getresponsible.responsible_name} / แผนก {getresponsible.Group.name_group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Responsible_menu />
        </div>
        <div className='flex justify-center mt-12'>
          <button onClick={handleSaveData} type="button" style={{ backgroundColor: '#01345d' }} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-2.5 text-center me-2 mb-2">บันทึก</button>
        </div>
      
      </Grid>
    </Grid>
  );
}
