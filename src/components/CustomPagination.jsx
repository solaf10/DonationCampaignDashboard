import { TablePagination, IconButton, Box } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const CustomPagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleClickPage = (newPage) => {
    onPageChange(null, newPage);
  };

  const Actions = () => {
    if (totalPages === 1) {
      return (
        <Box
          sx={{
            minWidth: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 1,
            color: 'var(--secondary-color)',
            fontFamily: 'Cairo',
          }}
        >
          هذه الصفحة الوحيدة
        </Box>
      );
    }
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* سهم الصفحة السابقة */}
        <IconButton
          onClick={() => handleClickPage(page - 1)}
          disabled={page === 0}
          aria-label='previous page'
        >
          <KeyboardArrowRight />
        </IconButton>

        {/* أرقام الصفحات */}
        {[...Array(totalPages)].map((_, index) => (
          <Box
            key={index}
            onClick={() => handleClickPage(index)}
            sx={{
              cursor: 'pointer',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: index === page ? 'var(--main-color)' : 'transparent',
              color: index === page ? 'white' : 'var(--main-color)',
              fontWeight: 500,
              transition: '0.2s',
              '&:hover': {
                bgcolor:
                  index === page ? 'var(--main-color)' : 'rgba(1,74,91,0.1)',
              },
            }}
          >
            {index + 1}
          </Box>
        ))}

        {/* سهم الصفحة التالية */}
        <IconButton
          onClick={() => handleClickPage(page + 1)}
          disabled={page >= totalPages - 1}
          aria-label='next page'
        >
          <KeyboardArrowLeft />
        </IconButton>
      </Box>
    );
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage='عدد الصفوف'
      labelDisplayedRows={() => ''}
      ActionsComponent={Actions} // نعرض أرقام الصفحات هنا
    />
  );
};

export default CustomPagination;
