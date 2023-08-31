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
import "dayjs/locale/pt-br"; // Importe o local desejado, nesse caso, português do Brasil
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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

export default function TableFuro({ furo, caixas }) {
    dayjs.locale("pt-br");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - caixas.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const firstVisibleRowIndex = page * rowsPerPage + 1;
    const lastVisibleRowIndex = Math.min((page + 1) * rowsPerPage, caixas.length);
    const totalRows = caixas.length;

    return (
        <TableContainer sx={{ width: 900 }} component={Paper}>
            <div style={{display:'flex', flexDirection:'row'}} >
                <text style={{marginRight:14, fontSize:18, fontWeight:'bold', marginLeft:20}} >Furo: {furo.furo}</text>
                <text style={{marginRight:14, fontSize:18, fontWeight:'bold'}} >|   Projeto: {furo.projeto}</text>
                <text style={{marginRight:14, fontSize:18, fontWeight:'bold'}} >|   Quantidade de caixas: {furo.profundidade}</text>
            </div>

            <Table sx={{ width: 900 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }} >Caixa</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Sonda</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Data</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >De</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Ate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? caixas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : caixas
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.cx.toString().padStart(3,'0')}</TableCell>
                            <TableCell>{row.sonda}</TableCell>
                            <TableCell>{dayjs(row.dt).utc().format("DD/MM/YYYY")}</TableCell>
                            <TableCell>{row.de.toFixed(2).toString().padStart(6,'0')}</TableCell>
                            <TableCell>{row.ate.toFixed(2).toString().padStart(6,'0')}</TableCell>
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
                            count={caixas.length}
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
                            labelRowsPerPage={`Linhas por página:`}
                            labelDisplayedRows={({ from, to, count }) => `${firstVisibleRowIndex}-${lastVisibleRowIndex} de ${totalRows}`}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}



// export default function TableFuro({ furo, caixas }) {
//     dayjs.locale("pt-br");

//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);

//     // Avoid a layout jump when reaching the last page with empty rows.
//     const emptyRows =
//         page > 0 ? Math.max(0, (1 + page) * rowsPerPage - caixas.length) : 0;

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const firstVisibleRowIndex = page * rowsPerPage + 1;
//     const lastVisibleRowIndex = Math.min((page + 1) * rowsPerPage, caixas.length);
//     const totalRows = caixas.length;

//     return (
//         <TableContainer style={{ width: 500 }} component={Paper}>
//             <div style={{ display: 'flex', flexDirection: 'row' }} >

//             </div>

//             <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
//                 <TableHead>
//                     <TableRow style={{display:'flex', justifyContent:'space-between'}}>
//                         <TableCell style={{ width: 50, fontSize: 18, fontWeight: 'bold' }} >Cx</TableCell>
//                         <TableCell style={{ width: 80, fontSize: 18, fontWeight: 'bold' }} >Sonda</TableCell>
//                         <TableCell style={{ width: 80, fontSize: 18, fontWeight: 'bold' }} >Data</TableCell>
//                         <TableCell style={{ width: 80, fontSize: 18, fontWeight: 'bold' }} >De</TableCell>
//                         <TableCell style={{ width: 80, fontSize: 18, fontWeight: 'bold' }} >Ate</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {(rowsPerPage > 0
//                         ? caixas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         : caixas
//                     ).map((row) => (
//                         <TableRow style={{display:'flex', justifyContent:'space-between'}} key={row.name}>
//                             <TableCell style={{ width: 50, fontSize: 16, fontWeight: 'lighter' }} component="th" scope="row">
//                                 {row.cx}
//                             </TableCell>
//                             <TableCell style={{ width: 80, fontSize: 16, fontWeight: 'lighter' }} component="th" scope="row">
//                                 {row.sonda}
//                             </TableCell>
//                             <TableCell style={{ width: 80, fontSize: 16, fontWeight: 'lighter', }} align="right">
//                                 {dayjs(row.dt).utc().format("DD/MM/YYYY")}
//                             </TableCell>
//                             <TableCell style={{ width: 80, fontSize: 16, fontWeight: 'lighter' }} align="right">
//                                 {row.de}
//                             </TableCell>
//                             <TableCell style={{ width: 80, fontSize: 16, fontWeight: 'lighter' }} align="right">
//                                 {row.ate}
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                     {emptyRows > 0 && (
//                         <TableRow style={{ height: 53 * emptyRows }}>
//                             <TableCell colSpan={6} />
//                         </TableRow>
//                     )}
//                 </TableBody>
//                 <TableFooter>
//                     <TableRow>
//                         <TablePagination

//                             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                             colSpan={3}
//                             count={caixas.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             SelectProps={{
//                                 inputProps: {
//                                     'aria-label': 'rows per page',
//                                 },
//                                 native: true,
//                             }}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                             ActionsComponent={TablePaginationActions}
//                             labelRowsPerPage={`Linhas por página:`}
//                             labelDisplayedRows={({ from, to, count }) => `${firstVisibleRowIndex}-${lastVisibleRowIndex} de ${totalRows}`}
//                         />
//                     </TableRow>
//                 </TableFooter>
//             </Table>
//         </TableContainer>
//     );
// }