import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Chip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import './PageTable.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAnchorEl } from '../redux/slices/MenuAnchorElSlice';
import {
  controlControlLocationModal,
  controlMoreInfoMenu,
} from '../redux/slices/ModalContollerSlice';
import { EditCalendarRounded } from '@mui/icons-material';
import CustomTablePagination from './CustomTablePagination';

const getStatusColor = (status) => {
  switch (status) {
    case 'نشطة':
      return '#6B9E8A';

    case 'متوقفة':
      return '#C97B6E';

    case 'مكتملة':
      return '#E8A87C';

    default:
      return '#9A8F87';
  }
};

const PageTable = ({ columns, rows, pageLink }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenMenu = (e) => {
    e.stopPropagation();
    dispatch(setAnchorEl(e.currentTarget));
    dispatch(controlMoreInfoMenu());
  };

  return (
    <div className='table-holder'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      backgroundColor: '#f7f9f9',
                      fontWeight: 600,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows &&
                rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => (
                    <TableRow
                      hover
                      key={index}
                      onClick={() =>
                        pageLink ? navigate(pageLink + `/${index + 1}`) : null
                      }
                      style={{ cursor: pageLink ? 'pointer' : 'unset' }}
                    >
                      {columns.map((column) => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell onClick={handleOpenMenu} key={column.id}>
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          );
                        } else if (column.id === 'action') {
                          return (
                            <TableCell onClick={handleOpenMenu} key={column.id}>
                              <Button
                                className='button'
                                onClick={(e) => {
                                  e.stopPropagation();

                                  dispatch(
                                    controlControlLocationModal({
                                      type: 'edit',
                                      id: row.uuid,
                                    }),
                                  );
                                }}
                              >
                                <EditCalendarRounded className='icon' />
                                <span>تعديل</span>
                              </Button>
                            </TableCell>
                          );
                        }
                        if (column.id === 'status') {
                          return (
                            <TableCell key={column.id}>
                              <Chip
                                label={row[column.id]}
                                sx={{
                                  backgroundColor: getStatusColor(
                                    row[column.id],
                                  ),
                                  color: '#E5E7EB',
                                  fontWeight: 500,
                                  minWidth: '75px',
                                }}
                              />
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id}>
                            {row[column.id] === null ? (
                              <span style={{ color: '#8a8a8a' }}>&mdash;</span>
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <CustomTablePagination
          count={rows?.length || 3}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default PageTable;
