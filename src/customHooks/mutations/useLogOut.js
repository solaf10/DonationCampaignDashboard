import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { controlSuccessDialog } from '../../redux/slices/ModalContollerSlice';
import { useDispatch } from 'react-redux';

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['user'],
    mutationFn: logout,
    onSuccess: () => {
      dispatch(controlSuccessDialog({ type: 'logout', id: null }));
      queryClient.invalidateQueries({ queryKey: ['user'] });
      localStorage.removeItem('token');
      navigate('/');
    },
  });
};

export default useLogin;
