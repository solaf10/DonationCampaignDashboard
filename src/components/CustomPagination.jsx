import { Box, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const CustomPagination = ({ count, page, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        mt: 4,
      }}
    >
      {/* السابق */}
      <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 0}>
        <KeyboardArrowRight />
      </IconButton>

      {/* الأرقام */}
      {[...Array(totalPages)].map((_, index) => (
        <Box
          key={index}
          onClick={() => onPageChange(index)}
          sx={{
            cursor: 'pointer',
            width: '34px',
            height: '34px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
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

      {/* التالي */}
      <IconButton
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
      >
        <KeyboardArrowLeft />
      </IconButton>
    </Box>
  );
};

export default CustomPagination;
