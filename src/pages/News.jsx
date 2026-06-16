import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import {
  AddRounded,
  DeleteOutlineOutlined,
  EditOutlined,
  FilterAltOutlined,
  RecyclingRounded,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import MoreMenu from '../components/MoreMenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeMoreInfoMenu,
  controlControlLocationModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';
import { Box, Button, IconButton, MenuItem } from '@mui/material';
import PageTable from '../components/PageTable';
import '../components/ContentWithTable.css';
import DeleteItemLogic from '../components/DeleteItemLogic';
import config from '../constants/enviroment';
import { useFilters } from '../contexts/FilterContext';
import useRestore from '../customHooks/mutations/useRestore';
import FilterCampaignsDrawer from '../components/FilterCampaignDrawer';
import FilterDrawer from '../components/FilterDrawer';
import useGetNewsLogic from '../customHooks/useGetNewsLogic';
import FilterNewsDrawer from '../components/FilterNewsDrawer';

const columns = [
  { id: 'title', label: 'الاسم' },
  { id: 'cover_image', label: 'الصورة' },
  { id: 'category', label: 'التصنيف' },
  { id: 'publish_date', label: 'تاريخ النشر' },
  { id: 'actions', label: '' },
];

const News = ({ isTrash = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedNewsId = useSelector(
    (state) => state.modalController.selectedMoreInfoModal,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { newsFilters, setNewsFilters } = useFilters();

  const isFiltered =
    !!newsFilters?.title ||
    !!newsFilters?.method ||
    !!newsFilters?.category?.length > 0;

  const {
    rows,
    isFiltering,
    filterNewsError,
    isLoading,
    fetchingError,
    refilterNews,
  } = useGetNewsLogic(isTrash);

  const actions = [
    {
      label: 'عرض التفاصيل',
      icon: <VisibilityOutlined fontSize='small' />,
      onClick: () => navigate(`/content/news/${selectedNewsId}`),
    },

    {
      label: 'تعديل',
      icon: <EditOutlined fontSize='small' />,
      onClick: () => navigate(`/content/news/edit/${selectedNewsId}`),
    },

    {
      label: 'حذف',
      icon: <DeleteOutlineOutlined fontSize='small' />,
      onClick: () =>
        dispatch(
          controlSuccessDialog({
            type: 'delete',
            id: selectedNewsId,
          }),
        ),
      danger: true,
    },
  ];

  const deletedItemID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );

  const deletedItemUrl = `/${config.news.delete}/${deletedItemID}`;

  const { mutate: restore, isPending: isRestoring } = useRestore(['news']);

  const handleRestore = (id) => {
    restore(`/${config.news.restore}/${id}`);
  };

  useEffect(() => {
    refilterNews();
  }, [newsFilters, refilterNews]);

  const handleReset = () => {
    setNewsFilters((prev) => ({
      ...prev,
      category: [],
      method: '',
    }));
  };

  return (
    <PageContainer>
      <Title
        pageTitle={isTrash ? 'سلة مهملات آخر الأخبار' : 'إدارة آخر الأخبار'}
        subtitle={isTrash ? 'يمكنك استعادة أو حذف العناصر نهائياً' : null}
      >
        {!isTrash && (
          <Link to='/content/news/add' className='btn'>
            <span>إضافة خبر</span>
            <AddRounded />
          </Link>
        )}
      </Title>
      {/* filter & table */}
      {!isTrash && (
        <div className='table-content news'>
          {/* filter holder */}
          <div className='filters-holder'>
            <div className='input-holder'>
              <CustomInput
                inputType='textField'
                placeholder='ابحث حسب الاسم'
                styles={{
                  width: '400px',
                  height: 'auto',
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--main-color)', // لون اللابل عند focus
                  },
                }}
                value={newsFilters.title}
                setValue={(value) =>
                  setNewsFilters((prev) => ({
                    ...prev,
                    title: value,
                  }))
                }
              />

              <p style={{ fontSize: '14px' }}>عدد الأخبار: {rows?.length}</p>
            </div>
            {/* filter Model btn */}
            <IconButton
              className='filter-btn'
              onClick={() =>
                dispatch(controlControlLocationModal({ type: 'filter' }))
              }
            >
              <FilterAltOutlined className='icon' />
            </IconButton>
          </div>
        </div>
      )}

      <PageTable
        rows={rows}
        columns={columns}
        pageLink={!isTrash ? '/content/news' : null}
        isLoading={isLoading || isFiltering || (isTrash && isRestoring)}
        setAnchorEl={setAnchorEl}
        hasNoResult={isFiltered && rows?.length === 0}
        error={fetchingError?.message}
        handleRestore={isTrash && handleRestore}
      />

      {/* MoreInfoMenu */}
      {!isTrash && (
        <MoreMenu
          menuId={selectedNewsId}
          handleCloseMenu={() => {
            dispatch(closeMoreInfoMenu());
            setAnchorEl(null);
          }}
          actions={actions}
          anchorEl={anchorEl}
        />
      )}
      {/* DeleteDialog */}
      <DeleteItemLogic
        deletedItemTitle='الخبر'
        baseQuery={['news']}
        url={deletedItemUrl}
      />
      <FilterDrawer title='تصفية الأخبار' onReset={handleReset}>
        <FilterNewsDrawer
          refilterNews={refilterNews}
          filterNewsError={fetchingError}
          isFiltering={isFiltering}
        />
      </FilterDrawer>
    </PageContainer>
  );
};

export default News;
