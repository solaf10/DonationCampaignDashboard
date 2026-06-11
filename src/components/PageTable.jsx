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
import { useEffect, useState } from 'react';
import './PageTable.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  controlControlLocationModal,
  openMoreInfoMenu,
} from '../redux/slices/ModalContollerSlice';
import {
  EditCalendarRounded,
  RecyclingRounded,
  VerifiedOutlined,
} from '@mui/icons-material';
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
  renderCell,
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

  useEffect(() => {
    const totalPages = Math.ceil((rows?.length || 0) / rowsPerPage);

    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }

    if (totalPages === 0) {
      setPage(0);
    }
  }, [rows?.length, rowsPerPage, page]);

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
                      width: column?.width,
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
                        ) : column.id === 'edit' || column.id === 'verify' ? (
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
                        pageLink
                          ? navigate(
                              pageLink +
                                `/${pageLink.includes('donars') ? row?.user?.uuid : row.uuid}`,
                            )
                          : null
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
                        } else if (column.id === 'edit') {
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
                        } else if (
                          column.id === 'verify' &&
                          row['status'] === 'قيد التدقيق' &&
                          row['pending'] === 'مدفوع'
                        ) {
                          return (
                            <TableCell key={column.id + row.uuid}>
                              <Button
                                className='button'
                                onClick={(e) => {
                                  e.stopPropagation();

                                  dispatch(
                                    controlControlLocationModal({
                                      type: 'verify',
                                      id: row?.uuid,
                                    }),
                                  );
                                }}
                              >
                                <VerifiedOutlined className='icon' />
                                <span>تحقق</span>
                              </Button>
                            </TableCell>
                          );
                        }

                        if (column.id === 'status' || column.id === 'pending') {
                          let status = '';
                          if (row[column.id] === 'قيد التدقيق') {
                            status =
                              row['method'] === 'تبرع'
                                ? 'تدقيق مباشر'
                                : 'تدقيق غير مباشر';
                          }

                          return (
                            <TableCell key={column.id + row.uuid}>
                              <Chip
                                label={row[column.id]}
                                className={
                                  'status-conditions ' +
                                  getStatusColor(
                                    status ? status : row[column.id],
                                  )
                                }
                              />
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell
                            key={column.id + row.uuid}
                            sx={
                              column?.width && {
                                width: column.width,
                                maxWidth: column.width,
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                              }
                            }
                          >
                            {row[column.id] === null ||
                            row[column.id] === undefined ? (
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
