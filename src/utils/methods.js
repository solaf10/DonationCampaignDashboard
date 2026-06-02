export const formatArabicDate = (dateStr) => {
  if (!dateStr) return '-';

  const date = new Date(dateStr);

  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
export const formatArabicTime = (timeStr) => {
  if (!timeStr) return '-';

  const [h, m] = timeStr.split(':');

  const date = new Date();
  date.setHours(h);
  date.setMinutes(m);

  return new Intl.DateTimeFormat('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};
// Campaigns only
export const getStatusColor = (status) => {
  switch (status) {
    case 'نشطة':
      return 'success-status';

    case 'مكتملة':
      return 'completed-status'; // نفس الأخضر بس ممكن أقوى بالCSS لاحقاً

    case 'منتهية':
      return 'error-status';

    case 'متوقفة':
      return 'warning-status';

    case 'جديدة':
      return 'draft-status';

    default:
      return 'draft-status';
  }
};
export const getCampaignStatusText = (campaign) => {
  if (!campaign) return null;

  const today = new Date();
  const start = new Date(campaign.start_date);
  const end = new Date(campaign.end_date);

  // توحيد الحساب على بداية اليوم
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const status = campaign.status;

  const msPerDay = 1000 * 60 * 60 * 24;

  const daysToStart = Math.floor((start - today) / msPerDay);
  const daysToEnd = Math.floor((end - today) / msPerDay);

  switch (status) {
    case 'جديدة':
      return {
        type: 'upcoming',
        text:
          daysToStart > 1
            ? `تبدأ خلال ${daysToStart} أيام`
            : daysToStart === 1
              ? 'تبدأ غداً'
              : 'تبدأ اليوم',
      };

    case 'نشطة':
      return {
        type: 'ongoing',
        text:
          daysToEnd > 1
            ? `متبقي ${daysToEnd} أيام`
            : daysToEnd === 1
              ? 'متبقي يوم واحد'
              : 'تنتهي اليوم',
      };

    case 'متوقفة':
      return {
        type: 'paused',
        text: 'الحملة متوقفة حالياً',
      };

    case 'مكتملة':
      return {
        type: 'finished',
        text: 'تمت الحملة بنجاح',
      };

    case 'منتهية':
      return {
        type: 'finished',
        text: 'انتهت الحملة',
      };

    default:
      return {
        type: 'default',
        text: '',
      };
  }
};
