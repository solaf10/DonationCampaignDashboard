import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { controlSuccessDialog } from '../../redux/slices/ModalContollerSlice';
import { deletedProject } from '../../services/projects';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useDeleteProject = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const id = useSelector((state) => state.modalController.clickedDialogID);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['projects', 'delete'],
    mutationFn: () => deletedProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      dispatch(controlSuccessDialog(null));
      toast.success('تم حذف المشروع بنجاح!');
      navigate('/content/projects');
    },
  });
};

export default useDeleteProject;
