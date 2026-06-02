import { useState } from 'react';
import CustomInput from '../../locations/CustomInput';
import useCampaigns, {
  useSearchCampaigns,
} from '../../../customHooks/queries/useCampaigns';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const LinkToCampaigns = () => {
  const [searchedKey, setSearchedKey] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const {
    data: campaignsData,
    isPending: isGettingCampaigns,
    error: campaignsError,
  } = useCampaigns();
  const {
    data: filteredCampaignsData,
    isPending: isFiltering,
    error: filterError,
  } = useSearchCampaigns(searchedKey);

  const campaigns = searchedKey
    ? (filteredCampaignsData?.data ?? [])
    : (campaignsData?.data ?? []);

  const handleSelectProject = (project) => {
    setSelectedProjects((prev) => {
      const exists = prev.find((p) => p.uuid === project.uuid);

      if (exists) {
        return prev.filter((p) => p.uuid !== project.uuid);
      } else {
        return [...prev, project];
      }
    });
  };

  const cards = campaigns.map((campaign) => (
    <Grid
      size={12}
      key={campaign.uuid}
      className={`project-card ${
        selectedProjects.find((p) => p.uuid === campaign.uuid) ? 'selected' : ''
      }`}
      onClick={() => handleSelectProject(campaign)}
    >
      <h4 className='name' style={{ marginBottom: '0px' }}>
        {campaign.name}
      </h4>
    </Grid>
  ));

  const noAddedCampaigns = (
    <div className='empty-projects'>
      <p className='empty-text'>لا توجد حملات حالياً</p>

      <Link to='/content/campaigns/add' className='empty-projects-action'>
        إضافة حملة
      </Link>
    </div>
  );
  const noSearchRes = (
    <div className='empty-text'>لا توجد نتائج بهذا الاسم</div>
  );

  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      <CustomInput
        inputType='input'
        label={`ابحث عن حملات`}
        placeholder={`اكتب اسم الحملة...`}
        value={searchedKey}
        setValue={setSearchedKey}
        styles={{ marginBottom: '16px' }}
      />
      <div className='project-section'>
        <h3 className='project-title'>اختر الحملات</h3>

        {campaigns.length === 0 && !searchedKey ? (
          noAddedCampaigns
        ) : campaigns.length === 0 && searchedKey ? (
          noSearchRes
        ) : (
          <Grid container spacing={2}>
            {cards}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default LinkToCampaigns;
