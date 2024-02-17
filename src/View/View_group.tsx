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
import axios from 'axios';

interface Column {
    id: 'group_name' | 'created_at';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'group_name', label: 'ชื่อกลุ่ม', minWidth: 170 },
    { id: 'created_at', label: 'Created At', minWidth: 170 },
];

interface Data {
    group_name: string;
    created_at: string;
}

function View_group() {
    const [group_name, setGroup_name] = useState<Data[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchSubnets = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/group/get-group`);
            const responseData = response.data;

            if (responseData.status === 'success' && Array.isArray(responseData.result)) {
                const data = responseData.result.map((item: any) => ({
                    group_name: item.group_name,
                    created_at: item.created_at,
                }));
                setGroup_name(data);
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

    return (
        <div>
            <Container maxWidth="xl">
                <div>
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-4">
                        <AddIcon /> เพิ่ม
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
                                {group_name
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isGrayRow = index % 2 === 0;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.group_name}
                                                sx={{ background: isGrayRow ? '#ffffff' : '#f0f0f0' }}
                                            >
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ fontWeight: 'bold' }}
                                                    >
                                                        {row[column.id]}
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
                        count={group_name.length}
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

export default View_group;
