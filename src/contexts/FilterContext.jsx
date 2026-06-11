import { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [campaignFilters, setCampaignFilters] = useState({
    name: '',
    government: '',
    city: '',
    district_uuid: '',
    project_uuid: '',
    status: [],
  });

  const [projectFilters, setProjectFilters] = useState({
    name: '',
    government: '',
    city: '',
    district_uuid: '',

    sector: '',
    funding_source: '',

    status: [],
    progress_percentage: 0,
  });
  const [donarFilters, setDonarFilters] = useState({
    name: '',
    pending: '',
    status: '',
    currency_type: '',
  });

  return (
    <FiltersContext.Provider
      value={{
        campaignFilters,
        setCampaignFilters,

        projectFilters,
        setProjectFilters,

        donarFilters,
        setDonarFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }

  return context;
};
