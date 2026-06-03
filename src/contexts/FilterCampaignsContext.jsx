import { createContext, useContext, useState } from 'react';

const FilterCampaignsContext = createContext(undefined);

const FilterCampaignsProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    government: '',
    city: '',
    district_uuid: '',
    project_uuid: '',
    status: [],
  });
  const [isFiltered, setIsFiltered] = useState(false);
  return (
    <FilterCampaignsContext.Provider
      value={{ formData, setFormData, isFiltered, setIsFiltered }}
    >
      {children}
    </FilterCampaignsContext.Provider>
  );
};

export function useFilteredCampaigns() {
  const context = useContext(FilterCampaignsContext);
  if (context === undefined) {
    throw new Error(
      'useFilterCampaigns must be used within a FilterCampaignsProvider',
    );
  }
  return context;
}

export default FilterCampaignsProvider;
