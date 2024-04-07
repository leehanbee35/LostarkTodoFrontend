import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "../../style/Friends.css";
import SearchIcon from '@mui/icons-material/Search';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import {Button} from "@mui/material";

const columns = [
    { id: 'username', label: '회원 이메일', minWidth: 170 },
    { id: 'mainCharacter', label: '대표 캐릭터', minWidth: 170 },
    { id: 'baltan', label: '발탄', minWidth: 50 },
    { id: 'biacKiss', label: '비아키스', minWidth: 50 },
    { id: 'koukuSaiton', label: '쿠크세이튼', minWidth: 50 },
    { id: 'abrelshud', label: '아브렐슈드', minWidth: 50 },
    { id: 'kayangel', label: '카양겔', minWidth: 50 },
    { id: 'illiakan', label: '일리아칸', minWidth: 50 },
    { id: 'ivoryTower', label: '상아탑', minWidth: 50 },
    { id: 'kamen', label: '카멘', minWidth: 50 },
    { id: 'echidna', label: '에키드나', minWidth: 50 },
];

function createData(username, mainCharacter) {
    const baltan = Math.floor(Math.random() * 7);
    const biacKiss = Math.floor(Math.random() * 7);
    const koukuSaiton = Math.floor(Math.random() * 7);
    const abrelshud = Math.floor(Math.random() * 7);
    const kayangel = Math.floor(Math.random() * 7);
    const illiakan = Math.floor(Math.random() * 7);
    const ivoryTower = Math.floor(Math.random() * 7);
    const kamen = Math.floor(Math.random() * 7);
    const echidna = Math.floor(Math.random() * 7);

    return { username, mainCharacter, baltan, biacKiss, koukuSaiton, abrelshud,
        kayangel, illiakan, ivoryTower, kamen, echidna};
}

const rows = [
    createData('India@******', 'IN'),
    createData('China@******', 'CN'),
    createData('Italy@******', 'IT'),
    createData('United States@******', 'US'),
    createData('Canada@******', 'CA'),
    createData('Australia@******', 'AU'),
    createData('Germany@******', 'DE'),
    createData('Ireland@******', 'IE'),
    createData('Mexico@******', 'MX'),
    createData('Japan@******', 'JP'),
    createData('France@******', 'FR'),
    createData('United Kingdom@******', 'GB'),
    createData('Russia@******', 'RU'),
    createData('Nigeria@******', 'NG'),
    createData('Brazil@******', 'BR'),
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="wrap friends">
            <div className="friends-button-group">
                <div className="friends-button-box">
                    <Button variant="none" className="add-button" startIcon={<GroupAddIcon />}>깐부 추가</Button>
                    <Button variant="none" className="remove-button" startIcon={<GroupRemoveIcon />}>깐부 삭제</Button>
                </div>
                <div className="friends-search-box">
                    <input type="text" placeholder="이메일 또는 캐릭터 검색" />
                    <Button variant="none" className="search-button"><SearchIcon /></Button>
                </div>
            </div>
            <TableContainer className="friend-table-container">
                <Table stickyHeader className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2} sx={{background:"#dddddd"}}>
                                깐부 정보
                            </TableCell>
                            <TableCell align="center" colSpan={9} sx={{background:"#dddddd"}}>
                                주간 레이드
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align="center"
                                    style={{ minWidth: column.minWidth }}
                                    sx={{background:"#dddddd"}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center" sx={{cursor:"pointer"}}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="table-pagination-container">
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}