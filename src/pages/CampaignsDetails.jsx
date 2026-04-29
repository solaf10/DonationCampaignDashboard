import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import {
  AccountBalanceWalletOutlined,
  AddRounded,
  ArrowBackOutlined,
  CalendarTodayOutlined,
  Delete,
  EditCalendarRounded,
  FlagOutlined,
  GroupOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import "./CampaignsDetails.css";
import { Box, Grid } from "@mui/material";
import Title from "../components/Title";
import AddModal from "../components/AddModal";
import { useDispatch } from "react-redux";
import { controlAddProjectModal } from "../redux/slices/ModalContollerSlice";

/* const getStatus = (startDate, endDate) => {
  const now = new Date();

  if (now < new Date(startDate)) return 'upcoming';
  if (now > new Date(endDate)) return 'finished';
  return 'ongoing';
}; */
const relatedProjects = [
  {
    id: 1,
    name: "مشروع التعليم الرقمي",
    location: "دمشق، المزة",
  },
  {
    id: 2,
    name: "منصة التبرعات الذكية",
    location: "حلب، الفرقان",
  },
  {
    id: 3,
    name: "إعادة تأهيل المدارس",
    location: "حمص، الوعر",
  },
];

const CampaignsDetails = () => {
  const dispatch = useDispatch();
  const rows =
    relatedProjects.length > 0 ? (
      <>
        {relatedProjects.map((project) => (
          <Link
            to={`/content/projects/${project.id}`}
            className="table-row"
            key={project.id}
          >
            <div className="name">{project.name}</div>
            <div className="location">📍 {project.location}</div>
          </Link>
        ))}
        <button
          className="add-row"
          onClick={() => dispatch(controlAddProjectModal())}
        >
          <AddRounded className="icon" />
          <span>إضافة مشروع</span>
        </button>
      </>
    ) : (
      <div className="empty-projects">
        <div className="text">لا توجد مشاريع مرتبطة بهذه الحملة</div>
        <button
          className="empty-btn"
          onClick={() => dispatch(controlAddProjectModal())}
        >
          <AddRounded className="icon" />
          إضافة أول مشروع
        </button>
      </div>
    );
  const remainingDays = 3;
  const status = "upcoming";
  return (
    <div className="campaign-details">
      <PageContainer>
        <Title pageTitle="حملة التعليم" subtitle="نشطة" status="ongoing">
          <div className="btns">
            <Link to="/content/campaigns/edit/1" className="button">
              <EditCalendarRounded className="icon" />
              <span>تعديل</span>
            </Link>
            <button className="button delete">
              <Delete className="icon" />
              <span>حذف</span>
            </button>
          </div>
        </Title>
        <div className="campaign-date">
          <span className="date-item">
            <CalendarTodayOutlined className="icon" />
            <span>من: 12 مايو 2026، 10:00 ص</span>
          </span>

          <span className="date-separator">
            <ArrowBackOutlined className="arrow-icon" />
          </span>

          <span className="date-item">
            <CalendarTodayOutlined className="icon" />
            <span>إلى: 20 مايو 2026، 6:00 م</span>
          </span>
        </div>
        <Grid container spacing={3}>
          <Grid size={6} className="image-wrapper">
            <img
              src="/image 6.png"
              alt=""
              style={{ width: "100%", minHeight: "475px", borderRadius: "8px" }}
            />
            {/* 🔥 badge */}
            {status === "ongoing" && remainingDays > 0 && (
              <span className="remaining-badge">
                متبقي {remainingDays} أيام
              </span>
            )}

            {status === "upcoming" && (
              <span className="remaining-badge upcoming">
                تبدأ خلال {remainingDays} أيام
              </span>
            )}
          </Grid>
          <Grid size={6}>
            {/* target */}
            <Box className="box desc" marginBottom={3}>
              <img src="/Goal.png" alt="goal" className="icon" />
              <p>
                تهدف الحملة الى إعادة إعمار سوريا عملية ضخمة ومتعددة الأوجه
                تتطلب استثمارات تقدر بمئات المليارات من الدولارات (تقديرات البنك
                الدولي تشير إلى 216 مليار دولار كحد أدنى، بينما التوقعات قد تصل
                إلى 900 مليار دولار)، وتشمل بناء البنية التحتية (مدارس،
                مستشفيات، طرق، شبكات كهرباء ومياه)، وتطوير الاقتصاد والقطاعات
                الإنتاجية (صناعة وزراعة)، وإعادة بناء النسيج الاجتماعي .
              </p>
            </Box>
            {/* info */}
            <Grid className="infos-holder" container spacing={2}>
              <Grid size={6}>
                <Box className="box">
                  <FlagOutlined className="icon" />
                  <div className="text">
                    <h4>المبلغ المستهدف</h4>
                    <p>500000000 ل.س</p>
                  </div>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box className="box">
                  <AccountBalanceWalletOutlined className="icon" />
                  <div className="text">
                    <h4>المبلغ المجموع</h4>
                    <p>500000000 ل.س</p>
                  </div>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box className="box">
                  <GroupOutlined className="icon" />
                  <div className="text">
                    <h4>عدد المتبرعين</h4>
                    <p>500</p>
                  </div>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box className="box">
                  <TrendingUpOutlined className="icon" />
                  <div className="text">
                    <h4>نسبة الإنجاز</h4>
                    <p>100%</p>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* related projects */}
        <Box className="related-projects">
          <div className="section-header">
            <h3>المشاريع المرتبطة</h3>
          </div>

          <div className="projects-table">{rows}</div>
        </Box>
      </PageContainer>
      <AddProjectsModal />
    </div>
  );
};

export default CampaignsDetails;
