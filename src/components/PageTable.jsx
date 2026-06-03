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
  Skeleton,
  Box,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from 'react';
import './PageTable.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  controlControlLocationModal,
  openMoreInfoMenu,
} from '../redux/slices/ModalContollerSlice';
import { EditCalendarRounded, RecyclingRounded } from '@mui/icons-material';
import CustomTablePagination from './CustomTablePagination';
import { getStatusColor } from '../utils/methods';
import TableMessage from './TableMessage';

const PageTable = ({
  columns,
  rows,
  pageLink,
  isLoading,
  setAnchorEl,
  hasNoResult,
  error,
  handleRestore,
}) => {
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

  const handleOpenMenu = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    dispatch(openMoreInfoMenu(id));
  };

  return (
    <div className='table-holder'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ height: 425 }}>
          <Table
            stickyHeader
            aria-label='sticky table'
            sx={{ height: (isLoading || error) && '100%' }}
          >
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
                    {handleRestore && column.id === 'actions'
                      ? 'الإجراءات'
                      : column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent!important',
                      },
                    }}
                  >
                    {columns.map((column, i) => (
                      <TableCell key={column.id + i}>
                        {column.id === 'status' ? (
                          <Skeleton
                            variant='rounded'
                            width={80}
                            height={32}
                            sx={{ mx: 'auto', borderRadius: '999px' }}
                          />
                        ) : column.id === 'actions' && handleRestore ? (
                          <Skeleton
                            variant='rounded'
                            width={90}
                            height={36}
                            sx={{ mx: 'auto', borderRadius: '999px' }}
                          />
                        ) : column.id === 'actions' ? (
                          <Skeleton
                            variant='circular'
                            width={32}
                            height={32}
                            sx={{ mx: 'auto' }}
                          />
                        ) : column.id === 'action' ? (
                          <Skeleton
                            variant='rounded'
                            width={90}
                            height={36}
                            sx={{ mx: 'auto', borderRadius: '999px' }}
                          />
                        ) : (
                          <Skeleton
                            variant='text'
                            width='80%'
                            height={28}
                            sx={{ mx: 'auto' }}
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : hasNoResult ? (
                <TableMessage
                  message='لا توجد نتائج مطابقة'
                  columnsLength={columns.length}
                />
              ) : error ? (
                <TableMessage
                  message={error}
                  columnsLength={columns.length}
                  isError={true}
                />
              ) : (
                rows &&
                rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <TableRow
                      hover
                      key={row.uuid}
                      onClick={() =>
                        pageLink ? navigate(pageLink + `/${row.uuid}`) : null
                      }
                      style={{ cursor: pageLink ? 'pointer' : 'unset' }}
                      sx={{
                        '&:hover': {
                          backgroundColor: !pageLink && 'transparent!important',
                        },
                      }}
                    >
                      {columns.map((column) => {
                        if (column.id === 'actions' && handleRestore) {
                          return (
                            <TableCell key={column.id + row.uuid}>
                              <Button
                                className='button restore'
                                onClick={() => handleRestore(row.uuid)}
                              >
                                <RecyclingRounded className='icon' />
                                <span>استعادة</span>
                              </Button>
                            </TableCell>
                          );
                        } else if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id + row.uuid}>
                              <IconButton
                                onClick={(e) => handleOpenMenu(e, row.uuid)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          );
                        } else if (column.id === 'action') {
                          return (
                            <TableCell key={column.id + row.uuid}>
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
                            <TableCell key={column.id + row.uuid}>
                              <Chip
                                label={row[column.id]}
                                className={
                                  'status-conditions ' +
                                  getStatusColor(row[column.id])
                                }
                              />
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id + row.uuid}>
                            {row[column.id] === null ? (
                              <span style={{ color: '#8a8a8a' }}>&mdash;</span>
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
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
