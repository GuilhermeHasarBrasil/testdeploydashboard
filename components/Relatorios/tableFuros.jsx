import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { CloseCircleSharp, CheckmarkCircleSharp } from 'react-ionicons'

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };
    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };
    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function TableFuro({ furos }) {
    dayjs.locale("pt-br");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - furos.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const firstVisibleRowIndex = page * rowsPerPage + 1;
    const lastVisibleRowIndex = Math.min((page + 1) * rowsPerPage, furos.length);
    const totalRows = furos.length;

    function formatTimestamp(timestamp) {
        const seconds = timestamp.seconds;
        const nanoseconds = timestamp.nanoseconds;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertendo nanossegundos para milissegundos
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
        return formattedDate;
    }

    return (
        <TableContainer sx={{ width: 900 }} component={Paper}>
                        <Table sx={{ width: 900 }} aria-label="custom pagination table">
                <TableHead style={{backgroundColor:'#D9D9D9'}} >
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }} >{<text style={{color:'#D9D9D9'}} >__</text>} Furo</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Projeto</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Finalizado</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Conferido</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} > {<text style={{color:'#D9D9D9'}} >_</text>} Data de {<br/>} importação</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Quantidade {<br/>}{<text style={{color:'#D9D9D9'}} >.</text>} de caixas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? furos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : furos
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.numero}</TableCell>
                            <TableCell> {<text style={{color:'white'}} >_</text>} {row.projeto}</TableCell>
                            <TableCell> {<text style={{color:'white'}} >____</text>} 
                            {
                                    !row.dataFinalizado ?
                                        <CloseCircleSharp
                                            color={'red'}
                                            title={''}
                                            height="20px"
                                            width="20px"
                                            style={{ marginTop: -13, marginLeft: 20 }}
                                        />
                                        :
                                        <CheckmarkCircleSharp
                                            color={'green'}
                                            title={''}
                                            height="20px"
                                            width="20px"
                                            style={{ marginTop: -13, marginLeft: 20 }}
                                        />
                                }
                            </TableCell>
                            <TableCell> {<text style={{color:'white'}} >____</text>}
                            {
                                    !row.conferido ?
                                        <CloseCircleSharp
                                            color={'red'}
                                            title={'   aaaa'}
                                            height="20px"
                                            width="20px"
                                            style={{ marginTop: -13, marginLeft: 20 }}
                                        />
                                        :
                                        <CheckmarkCircleSharp
                                            color={'green'}
                                            title={'asda'}
                                            height="20px"
                                            width="20px"
                                            style={{ marginTop: -13, marginLeft: 20 }}
                                        />
                                }
                            </TableCell>
                            <TableCell>{dayjs(row.dt).utc().format("DD/MM/YYYY")}</TableCell>
                            <TableCell>{<text style={{color:'white'}} >____</text>}{row.profundidade}</TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={5} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={furos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage={`Furos por página:`}
                            labelDisplayedRows={({ from, to, count }) => `${firstVisibleRowIndex}-${lastVisibleRowIndex} de ${totalRows}`}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}