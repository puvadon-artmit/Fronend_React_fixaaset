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
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ImgAssets from '../image/A_5-.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Excel from '../image/Microsoft_Excel-Logo.wine_.png'
import { useParams } from 'react-router-dom';


interface Column {
    id: 'model_name' | 'manufacturer' | 'type' | 'model' | 'branch' | 'created_at';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'model_name', label: 'ชื่อรุ่น', minWidth: 170 },
    { id: 'manufacturer', label: 'ผู้ผลิต', minWidth: 170 },
    { id: 'type', label: 'ประเภท', minWidth: 170 },
    { id: 'model', label: 'รุ่น', minWidth: 170 },
    { id: 'branch', label: 'สาขา', minWidth: 170 },
    { id: 'created_at', label: 'เวลาที่เพิ่ม', minWidth: 170 },

];

interface AssetsData {
    assets_id: string;
    model_name: string;
    created_at: string;
    manufacturer: string;
    type: string;
    model: string;
    branch: string;
}

export default function View_specificdata() {
    const { category_id } = useParams();
    const [groundData, setAssetsData] = useState<AssetsData[]>([]);
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
    };;



    const fetchAssetsData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/assets/get-assets`);
            const responseData = response.data;

            if (responseData.status === 'success' && Array.isArray(responseData.result)) {
                const data = responseData.result
                    .filter((item: any) => item.Category?.category_id === category_id)  // กรองเฉพาะข้อมูลที่มี category_id ตรงกับที่เราส่งมา
                    .map((item: any) => ({
                        assets_id: item.assets_id,
                        model_name: item.model_name,
                        created_at: item.created_at,
                        manufacturer: item.manufacturer,
                        type: item.type,
                        model: item.model,
                        branch: item.branch,
                    }));
                setAssetsData(data);
            } else {
                console.error("Invalid response format or missing 'result' array:", responseData);
            }
        } catch (error) {
            console.error("Error while fetching ground data:", error);
        }
    };

    useEffect(() => {
        fetchAssetsData();
    }, []);

    const filteredAssetsData = groundData.filter((row) => {
        const searchText = searchTerm.toLowerCase();
        return Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchText)
        );
    });

    const handleExportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(groundData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'สินทรพย์');
        XLSX.writeFile(wb, 'สินทรพย์.xlsx');
    };


    return (
        <div>
            <Container maxWidth="xl">

                <h1 className='text-center text-3xl'>จัดการสินทรัพย์</h1>
                <div className='flex justify-center'>
                </div>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-300" />

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
                <div className="flex mt-8 space-x-2">
                    <Link to={`/template_data/${category_id}`}>
                    <button className="flex items-center text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1.5 me-2 mb-2">
                        <img src={ImgAssets} height={30} width={30} alt="ImgAssets" className='mr-2' />
                        นำเข้าสินทรัพย์
                    </button>
                    </Link>

                    <button className="flex items-center text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 me-2 mb-2" onClick={handleExportToExcel}>
                        <img src={Excel} height={40} width={40} alt="" />
                        Export to Excel
                    </button>
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
                                {filteredAssetsData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isGrayRow = index % 2 === 0;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.model_name}
                                                sx={{ background: isGrayRow ? '#ffffff' : '#f0f0f0' }}
                                            >
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ color: column.id === 'model_name' ? '#015ea9' : 'inherit' }}>
                                                        {column.id === 'model_name' ? (
                                                            <Link to={`/specific_assets/specific-data/${row.assets_id}`}>
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
                        count={filteredAssetsData.length}
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
