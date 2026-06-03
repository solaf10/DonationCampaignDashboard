import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import {
  AddRounded,
  DeleteOutline,
  EditOutlined,
  FilterAltOutlined,
  PauseCircleOutline,
  RecyclingRounded,
  VisibilityOutlined,
} from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link, useNavigate } from 'react-router-dom';
import MoreMenu from '../components/MoreMenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeMoreInfoMenu,
  controlControlLocationModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';
import { IconButton } from '@mui/material';
import useGetCampaignsLogic from '../customHooks/useGetCampaignsLogic';
import PageTable from '../components/PageTable';
import '../components/ContentWithTable.css';
import FilterCampaignsModal from '../components/FilterCampaignsModal';
import DeleteItemLogic from '../components/DeleteItemLogic';
import config from '../constants/enviroment';
import useControlState from '../customHooks/mutations/useControlState';
import { toast } from 'react-toastify';
import { useFilteredCampaigns } from '../contexts/FilterCampaignsContext';

const columns = [
  { id: 'name', label: 'اسم الحملة' },
  { id: 'projectsNum', label: 'عدد المشاريع' },
  { id: 'target_amount', label: 'المبلغ المستهدف' },
  { id: 'collected_amount', label: 'المبلغ المجموع' },
  { id: 'end_date', label: 'تاريخ النهاية' },
  { id: 'status', label: 'الحالة' },
  { id: 'actions', label: '' },
];

const Campaigns = ({ isTrash = false }) => {
  const [searchedKey, setSearchedKey] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedCampaignId = useSelector(
    (state) => state.modalController.selectedMoreInfoModal,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFiltered, setIsFiltered, setFormData, formData } =
    useFilteredCampaigns();

  const {
    rows,
    isSearching,
    isFiltering,
    filterCampaignsError,
    isFilterSuccess,
    isLoading,
    fetchingError,
    refilterCampaigns,
  } = useGetCampaignsLogic(isTrash);

  const isSelectedCampaignNew =
    rows?.find((row) => row.uuid === selectedCampaignId)?.status === 'جديدة';
  const isSelectedCampaignStopped =
    rows?.find((row) => row.uuid === selectedCampaignId)?.status === 'متوقفة';

  const { mutate: stopCampaign, isPending: isStopping } = useControlState(
    `/${config.campaigns.stop}/${selectedCampaignId}`,
    ['campaigns'],
  );
  const { mutate: resumeCampaign, isPending: isResumming } = useControlState(
    `/${config.campaigns.resume}/${selectedCampaignId}`,
    ['campaigns'],
  );

  const actions = [
    // 👇 يظهر فقط إذا الحملة جديدة
    ...(isSelectedCampaignNew
      ? [
          {
            label: 'إيقاف مؤقت للحملة',
            icon: <PauseCircleOutline fontSize='small' />,
            onClick: () =>
              stopCampaign(undefined, {
                onSuccess: () => {
                  toast.success('تم إيقاف الحملة بنجاح!');
                },
                onError: (err) => {
                  toast.error(err?.message || `حدث خطأ أثناء إيقاف الحملة`);
                },
              }),
            warning: true,
          },
        ]
      : []),
    ...(isSelectedCampaignStopped
      ? [
          {
            label: 'استئناف الحملة',
            icon: <PlayCircleOutlineIcon fontSize='small' />,
            onClick: () =>
              resumeCampaign(undefined, {
                onSuccess: () => {
                  toast.success('تم اسئناف الحملة بنجاح!');
                },
                onError: (err) => {
                  toast.error(err?.message || `حدث خطأ أثناء استئناف الحملة`);
                },
              }),
            success: true,
          },
        ]
      : []),

    {
      label: 'عرض التفاصيل',
      icon: <VisibilityOutlined fontSize='small' />,
      onClick: () => navigate(`/content/campaigns/${selectedCampaignId}`),
    },

    {
      label: 'تعديل',
      icon: <EditOutlined fontSize='small' />,
      onClick: () => navigate(`/content/campaigns/edit/${selectedCampaignId}`),
    },

    {
      label: 'حذف',
      icon: <DeleteOutline fontSize='small' />,
      onClick: () => dispatch(controlSuccessDialog(selectedCampaignId)),
      danger: true,
    },
  ];

  const deletedItemID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );

  const deletedItemUrl = `/${config.campaigns.delete}/${deletedItemID}`;

  useEffect(() => {
    if (searchedKey != '') {
      setFormData((prev) => ({ ...prev, name: searchedKey }));
      refilterCampaigns();
      setIsFiltered(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        name: '',
      }));

      setIsFiltered(false);
    }
  }, [searchedKey, setIsFiltered, refilterCampaigns, setFormData]);

  return (
    <PageContainer>
      <Title
        pageTitle={isTrash ? 'سلة مهملات الحملات' : 'إدارة الحملات'}
        subtitle={isTrash ? 'يمكنك استعادة أو حذف العناصر نهائياً' : null}
      >
        {!isTrash && (
          <Link to='/content/campaigns/add' className='btn'>
            <span>إضافة حملة</span>
            <AddRounded />
          </Link>
        )}
      </Title>
      {/* filter & table */}
      <div className='table-content campaigns'>
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
              value={searchedKey}
              setValue={setSearchedKey}
            />

            <p style={{ fontSize: '14px' }}>عدد الحملات: {rows?.length}</p>
          </div>
          {/* filter Model btn */}
          <IconButton
            className='filter-btn'
            onClick={() =>
              dispatch(controlControlLocationModal({ type: 'add', id: 'null' }))
            }
            disabled={isFiltered && isFiltering && searchedKey !== ''}
          >
            <FilterAltOutlined className='icon' />
          </IconButton>
        </div>
      </div>

      <PageTable
        rows={rows}
        columns={columns}
        pageLink={!isTrash ? '/content/campaigns' : null}
        isLoading={
          isSearching ||
          isLoading ||
          isStopping ||
          isResumming ||
          (isFiltered && isFiltering)
        }
        setAnchorEl={setAnchorEl}
        hasNoResult={isFiltered && rows?.length === 0}
        error={fetchingError?.message}
      />

      {/* MoreInfoMenu */}
      <MoreMenu
        menuId={selectedCampaignId}
        handleCloseMenu={() => {
          dispatch(closeMoreInfoMenu());
          setAnchorEl(null);
        }}
        actions={actions}
        anchorEl={anchorEl}
      />
      {/* DeleteDialog */}
      <DeleteItemLogic
        deletedItemTitle='الحملة'
        baseQuery={['campaigns']}
        url={deletedItemUrl}
        /* onSuccess={() => {
          setPage((prev) => {
            const newTotal = Math.ceil((projects.length - 1) / itemsPerPage);
            return prev > newTotal - 1 ? Math.max(newTotal - 1, 0) : prev;
          });
        }} */
      />
      <FilterCampaignsModal
        refilterCampaigns={refilterCampaigns}
        isFiltering={isFiltering}
        filterCampaignsError={filterCampaignsError}
        isFilterSuccess={isFilterSuccess}
      />
    </PageContainer>
  );
};

export default Campaigns;
