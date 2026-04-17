import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import CustomPagination from './CustomPagination';
import './PageTable.css';
import { useNavigate } from 'react-router-dom';
import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import MoreMenu from './MoreMenu';

const actions = [
  {
    label: 'عرض التفاصيل',
    icon: <VisibilityOutlined fontSize='small' />,
    onClick: () => console.log('view'),
  },
  {
    label: 'تعديل',
    icon: <EditOutlined fontSize='small' />,
    onClick: () => console.log('edit'),
  },
  {
    label: 'حذف',
    icon: <DeleteOutline fontSize='small' />,
    onClick: () => console.log('delete'),
    danger: true,
  },
];

const PageTable = ({ columns, rows, pageLink }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
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
                      }

                      return (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='عدد الصفوف'
            labelDisplayedRows={({ from, to, count }) =>
              `عرض العناصر من ${from} إلى ${to} من أصل ${count} عنصر`
            }
          /> */}
        <CustomPagination
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* MoreInfoMenu */}
      <MoreMenu
        isOpen={open}
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        actions={actions}
      />
    </div>
  );
};

export default PageTable;
