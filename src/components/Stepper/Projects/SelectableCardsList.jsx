import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomInput from '../../locations/CustomInput';

const SelectableCardsList = ({
  items = [],
  type = 'items', // campaigns | projects | anything
  title = 'العناصر',
  searchPlaceholder = 'ابحث...',
  addLink = '#',
  getName = (item) => item.name,
  allowMultiple = true,
  setFormData,
}) => {
  const [searchedKey, setSearchedKey] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.uuid === item.uuid);

      if (allowMultiple) {
        if (exists) {
          return prev.filter((p) => p.uuid !== item.uuid);
        }

        return [...prev, item];
      }

      // اختيار عنصر واحد فقط
      return exists ? [] : [item];
    });
  };

  useEffect(() => {
    if (setFormData) {
      setFormData((prev) => ({ ...prev, [type]: selectedItems }));
    }
  }, [selectedItems, setFormData, type]);

  const filteredItems = items.filter((item) =>
    getName(item).toLowerCase().includes(searchedKey.toLowerCase()),
  );

  const cards = filteredItems.map((item) => (
    <Grid
      item
      xs={12}
      key={item.uuid}
      className={`project-card ${
        selectedItems.find((p) => p.uuid === item.uuid) ? 'selected' : ''
      }`}
      onClick={() => handleSelect(item)}
    >
      <h4 className='name' style={{ marginBottom: 0 }}>
        {getName(item)}
      </h4>
    </Grid>
  ));

  const emptyState =
    !searchedKey || items.length === 0 ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          textAlign: 'center',
          color: '#8c9ea0',
        }}
      >
        {/* icon placeholder */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: '#eef3f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            fontSize: 22,
          }}
        >
          📦
        </Box>

        <Typography fontWeight={600} mb={1}>
          لا توجد {type === 'projects' ? 'مشاريع' : 'حملات'} حالياً
        </Typography>

        <Link
          to={addLink}
          className='empty-projects-action'
          style={{
            color: 'var(--secondary-color)',
            fontSize: '13px',
            opacity: '0.8',
            textDecoration: 'underline',
          }}
        >
          إضافة {type === 'projects' ? 'مشروع جديد' : 'حملة جديدة'}
        </Link>
      </Box>
    ) : (
      <div className='empty-text'>لا توجد نتائج بهذا الاسم</div>
    );

  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      <CustomInput
        inputType='input'
        label={`ابحث عن ${title}`}
        placeholder={searchPlaceholder}
        value={searchedKey}
        setValue={setSearchedKey}
        styles={{ marginBottom: '16px' }}
      />

      <div className='project-section'>
        <h3 className='project-title'>اختر {title}</h3>

        {filteredItems.length === 0 ? (
          emptyState
        ) : (
          <Grid container spacing={2}>
            {cards}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default SelectableCardsList;
