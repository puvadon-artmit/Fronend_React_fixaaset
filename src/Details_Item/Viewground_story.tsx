import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import * as XLSX from 'xlsx';
import Excel from '../image/Microsoft_Excel-Logo.wine_.png'

interface Column {
  id: 'ground_name' | 'groundstory_name' | 'ground_details' | 'created_at' | 'ground_username';
  label: string;
  minWidth?: number;
  align?: 'left' | 'right';
}

const columns: readonly Column[] = [
  { id: 'ground_name', label: 'ชื่อห้อง', minWidth: 170, align: 'left' },
  { id: 'groundstory_name', label: 'สถานะ', minWidth: 170, align: 'left' },
  { id: 'ground_details', label: 'รายละเอียด', minWidth: 170, align: 'left' },
  { id: 'ground_username', label: 'ชื่อผู้อัพเดท', minWidth: 170, align: 'left' },
  { id: 'created_at', label: 'เวลาที่ทำการ', minWidth: 170, align: 'right' },
];

interface Story {
  ground_story_id: string;
  ground_name: string;
  ground_username: string;
  ground_details: string;
  groundstory_name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  ground_id: string;
  Ground: {
    ground_id: string;
    ground_name: string;
  };
}

export default function Viewground_story() {
  const { ground_id } = useParams<{ ground_id: string }>();

  const [storyCount, setStoryCount] = useState<number>(0);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };




  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(stories);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ground Stories');
    XLSX.writeFile(wb, 'ground_stories.xlsx');
  };



  useEffect(() => {
    const fetchStoryCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/ground_story/get-ground-story`);
        const stories = response.data.result;

        const filteredStories = stories.filter((story: Story) => story.Ground.ground_id === ground_id);

        const searchedStories = filteredStories.filter((story: Story) =>
          Object.values(story).some(value =>
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );

        if (selectedStatus) {
          const filteredByStatus = searchedStories.filter((story: Story) => story.groundstory_name === selectedStatus);
          setStoryCount(filteredByStatus.length);
          setStories(filteredByStatus);
        } else {
          setStoryCount(searchedStories.length);
          setStories(searchedStories);
        }
      } catch (error) {
        console.error('Error fetching story count:', error);
      }
    };

    fetchStoryCount();
  }, [ground_id, selectedStatus, searchTerm]);

  return (
    <div>
      <h1 className='flex justify-center mb-6 text-xl'>ประวัติการอัพเดท <p className='ml-2 mr-2 text-green-600'> {storyCount}</p> รายการ</h1>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-200" />

      <Container maxWidth="xl">
        <div>
          <div className='flex justify-center'>
            <TextField
              variant="outlined"
              onChange={handleSearch}
              placeholder="ค้นหา"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: '16px',
                borderRadius: '50%',
                '& input': {
                  padding: '10px',
                },
              }}
            />
          </div>
          <div className='flex items-center mb-2'>
            <button className="flex items-center text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 me-2 " onClick={handleExportToExcel}>
              <img src={Excel} height={40} width={40} alt="" className="mr-2" />
              Export to Excel
            </button>



            <div className="relative inline-flex">
              <svg className="w-2  absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                <path d="M412 0L206 232 0 0z" fill="#4E4E4E" />
              </svg>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value as string)} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option disabled selected value="">เลือกสถานะ</option>
                <option value="">ทั้งหมด</option>
                <option value="เพิ่มรายการ">เพิ่มรายการ</option>
                <option value="แก้ไขรายการ">แก้ไขรายการ</option>
              </select>
            </div>

          </div>
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 500, background: '#f0f0f0', overflowX: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isGrayRow = index % 2 === 0;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.ground_story_id}
                        sx={{ background: isGrayRow ? '#ffffff' : '#f0f0f0' }}
                      >
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                          >
                            {column.id === 'ground_name' ? row.Ground.ground_name : row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={stories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </div>
  );
}
