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

interface Column {
  id: 'item_model_name' | 'story_name' | 'details' | 'created_at' | 'username';
  label: string;
  minWidth?: number;
  align?: 'left' | 'right';
}

const columns: readonly Column[] = [
  { id: 'item_model_name', label: 'ชื่อรุ่น', minWidth: 170, align: 'left' },
  { id: 'details', label: 'รายละเอียด', minWidth: 170, align: 'left' },
  { id: 'story_name', label: 'ชื่อสถานะ', minWidth: 170, align: 'left' },
  { id: 'username', label: 'ชื่อผู้อัพเดท', minWidth: 170, align: 'left' },
  { id: 'created_at', label: 'เวลาที่ทำการ', minWidth: 170, align: 'right' },
];

interface Story {
  story_id: string;
  story_name: string;
  username: string;
  details: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  item_model_id: string;
  Item_model: {
    item_model_id: string;
    item_model_name: string;
  };
}

export default function View_story() {
  const { item_model_id } = useParams<{ item_model_id: string }>();
 
  
  const [storyCount, setStoryCount] = useState<number>(0);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleEnterPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/story/get-story`);
        const stories = response.data.result;
        const filteredStories = stories.filter((story: Story) =>
          story.item_model_id === item_model_id && story.story_name.includes(searchTerm)
        );

        setStoryCount(filteredStories.length);
        setStories(filteredStories);
      } catch (error) {
        console.error('Error fetching and filtering stories:', error);
      }
    }
  };

  useEffect(() => {
    const fetchStoryCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/story/get-story`);
        const stories = response.data.result;

        const filteredStories = stories.filter((story: Story) => story.item_model_id === item_model_id);

        setStoryCount(filteredStories.length);
        setStories(filteredStories);
      } catch (error) {
        console.error('Error fetching story count:', error);
      }
    };

    fetchStoryCount();
  }, [item_model_id]);

  return (
    <div>
      <h1 className='flex justify-center mb-6 text-xl'>ประวัติการอัพเดท <p className='ml-2 mr-2 text-green-600'> {storyCount}</p> รายการ</h1>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-200"/>
      
      <Container maxWidth="xl">
        <div>
          <div className='flex justify-center'>
            <TextField
              variant="outlined"
              onChange={handleSearch}
              onKeyDown={handleEnterPress}
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
                        key={row.story_id}
                        sx={{ background: isGrayRow ? '#ffffff' : '#f0f0f0' }}
                      >
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            // style={{ fontWeight: 'bold' }}
                          >
                            {column.id === 'item_model_name'
                              ? row.Item_model.item_model_name
                              : column.id === 'story_name'
                                ? row.story_name
                                : row[column.id]}
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
