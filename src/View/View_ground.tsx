import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Column {
    id: 'ground_name' | 'location_code' | 'building' | 'floor' | 'room' | 'created_at';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'ground_name', label: 'ชื่อสถานที่', minWidth: 170 },
    { id: 'location_code', label: 'รหัสสถานที่', minWidth: 170 },
    { id: 'building', label: 'ตึก', minWidth: 170 },
    { id: 'floor', label: 'ชั้น', minWidth: 170 },
    { id: 'room', label: 'ห้อง', minWidth: 170 },
    { id: 'created_at', label: 'เวลาที่เพิ่ม', minWidth: 170 },
   
];

interface GroundData {
    ground_id: string;
    ground_name: string;
    created_at: string;
    location_code: string;
    building: string;
    floor: string;
    room: string;
}

export default function ViewGround() {
    const [groundData, setGroundData] = useState<GroundData[]>([]);
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

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('Performing search:', searchTerm);
        }
    };

    const fetchGroundData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/ground/get-ground`);
            const responseData = response.data;

            if (responseData.status === 'success' && Array.isArray(responseData.result)) {
                const data = responseData.result.map((item: any) => ({
                    ground_id: item.ground_id,
                    ground_name: item.ground_name,
                    created_at: item.created_at,
                    location_code: item.location_code,
                    building: item.building,
                    floor: item.floor,
                    room: item.room,
                }));
                setGroundData(data);
            } else {
                console.error("Invalid response format or missing 'result' array:", responseData);
            }
        } catch (error) {
            console.error("Error while fetching ground data:", error);
        }
    };

    useEffect(() => {
        fetchGroundData();
    }, []);

    const filteredGroundData = groundData.filter((row) =>
        row.ground_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Container maxWidth="xl">
                <div>
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-4">
                        <AddIcon /> เพิ่ม
                    </button>
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
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 500, background: '#f0f0f0', overflowX: 'auto' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredGroundData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isGrayRow = index % 2 === 0;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.ground_name}
                                                sx={{ background: isGrayRow ? '#ffffff' : '#f0f0f0' }}
                                            >
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ color: column.id === 'ground_name' ? '#015ea9' : 'inherit' }}>
                                                        {column.id === 'ground_name' ? (
                                                            <Link to={`/assets/view_model/detail_ground/${row.ground_id}`}>
                                                                {row[column.id]}
                                                            </Link>
                                                        ) : (
                                                            row[column.id]
                                                        )}
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
                        count={filteredGroundData.length}
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
