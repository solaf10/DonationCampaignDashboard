import React, { useState } from 'react';
import useDeleteProject from '../customHooks/mutations/useDeleteProject';
import { useSelector } from 'react-redux';
import SuccessMessageDialog from './SuccessMessageDialog';

const useDeleteProjectLogic = () => {
  const [deleteError, setDeleteError] = useState(null);
  const deletedProjectID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );

  const { mutate: deleteProject, isPending: isDeleting } =
    useDeleteProject(deletedProjectID);

  const handleDelete = () => {
    setDeleteError(null);

    deleteProject(undefined, {
      onError: (err) => {
        setDeleteError(err?.message || 'حدث خطأ أثناء حذف المشروع');
      },
    });
  };
  const onClearError = () => setDeleteError(null);

  return (
    <SuccessMessageDialog
      type='warning'
      title='تأكيد الحذف'
      desc='هل أنت متأكد أنك تريد حذف هذا المشروع؟'
      btnTitle='حذف'
      onConfirm={handleDelete}
      isLoading={isDeleting}
      error={deleteError}
      onClearError={onClearError}
    />
  );
};

export default useDeleteProjectLogic;
