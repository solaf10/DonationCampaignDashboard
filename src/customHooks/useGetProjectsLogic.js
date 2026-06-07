import { useFilters } from '../contexts/FilterContext';
import useProjects, {
  useFilterProjects,
  useProjectsTrash,
} from './queries/useProjects';

const useGetProjectsLogic = (isTrash) => {
  const { projectFilters } = useFilters();
  const {
    data: projectsData,
    isPending: isFetchingProjects,
    error: projectsError,
  } = useProjects();

  const {
    data: projectsTrashData,
    isFetching: isFetchingProjectsTrash,
    error: projectsTrashError,
  } = useProjectsTrash();

  const allProjects = isTrash
    ? projectsTrashData?.data
    : projectsData?.data || [];

  const {
    data: filteredProjectsData,
    isPending: isFiltering,
    refetch,
    error: filterProjectsError,
  } = useFilterProjects(projectFilters, false);
  const filteredProjects = filteredProjectsData?.data || [];

  const hasFilters =
    projectFilters.name ||
    projectFilters.government ||
    projectFilters.city ||
    projectFilters.district_uuid ||
    projectFilters.sector ||
    projectFilters.funding_source ||
    projectFilters.progress_percentage ||
    projectFilters.status.length > 0;

  const projects = hasFilters ? filteredProjects : allProjects;

  return {
    projects,
    isFiltering,
    isFetchingProjects: isTrash ? isFetchingProjectsTrash : isFetchingProjects,
    projectsError: isTrash ? projectsTrashError : projectsError,
    filterProjectsError,
    refetch,
    hasFilters,
  };
};

export default useGetProjectsLogic;
