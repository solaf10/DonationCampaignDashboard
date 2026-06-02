import React, { useState } from 'react';
import SuccessMessageDialog from './SuccessMessageDialog';
import useDelete from '../customHooks/mutations/useDelete';
import { toast } from 'react-toastify';
import { controlSuccessDialog } from '../redux/slices/ModalContollerSlice';
import { useDispatch } from 'react-redux';

const DeleteItemLogic = ({ deletedItemTitle, baseQuery, url, onSuccess }) => {
  const dispatch = useDispatch();
  const [deleteError, setDeleteError] = useState(null);

  const { mutate: deleteItem, isPending: isDeleting } = useDelete(baseQuery);

  const handleDelete = () => {
    setDeleteError(null);

    deleteItem(url, {
      onSuccess: () => {
        dispatch(controlSuccessDialog(null));
        toast.success(`تم حذف ${deletedItemTitle} بنجاح!`);
        onSuccess();
      },
      onError: (err) => {
        setDeleteError(err?.message || `حدث خطأ أثناء حذف ${deletedItemTitle}`);
      },
    });
  };
  const onClearError = () => setDeleteError(null);

  return (
    <SuccessMessageDialog
      type='warning'
      title='تأكيد الحذف'
      desc={`هل أنت متأكد أنك تريد حذف هذا ${deletedItemTitle}؟`}
      btnTitle='حذف'
      onConfirm={handleDelete}
      isLoading={isDeleting}
      error={deleteError}
      onClearError={onClearError}
    />
  );
};

export default DeleteItemLogic;
