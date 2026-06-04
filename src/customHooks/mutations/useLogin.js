import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['user'],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      navigate('/content');
    },
    onError: () => {
      toast.error(
        'فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور والمحاولة مرة أخرى.',
      );
    },
  });
};

export default useLogin;
