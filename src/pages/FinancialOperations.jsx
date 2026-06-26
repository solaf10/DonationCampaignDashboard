import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, IconButton } from "@mui/material";
import { AddRounded, FilterList } from "@mui/icons-material";
import CustomInput from "../components/locations/CustomInput";
import FilterDrawer from "../components/FilterDrawer";
import Title from "../components/Title";
import PageTable from "../components/PageTable";
import usePayments, {
  useFilterPayments,
  useProjects,
  useAllDetails,
} from "../customHooks/queries/usePayments";

export default function FinancialOperations() {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { data: paymentsData } = usePayments();
  const { data: projectsData } = useProjects();
  const { data: allDetailsData } = useAllDetails();
  const {
    mutate: filterPayments,
    data: filteredData,
    reset,
  } = useFilterPayments();

  const navigate = useNavigate();

  const projects = projectsData?.data || [];
  const allDetails = allDetailsData?.data || [];

  // const handleSearch = () => {
  //   if (!searchText.trim()) {
  //     reset();
  //     return;
  //   }

  const search = searchText.trim().toLowerCase();

  const matchedProject = projects.find((p) =>
    p.name.toLowerCase().includes(search),
  );

  const matchedDetail = allDetails.find((d) =>
    d.detail.toLowerCase().includes(search),
  );
  console.log("search:", searchText);
  console.log("projects:", projects);
  console.log("details:", allDetails);
  console.log(projectsData);
  // useEffect(() => {
  //   const search = searchText.trim().toLowerCase();

  //   if (!search) {
  //     reset();
  //     return;
  //   }

  //   const matchedProject = projects.find((p) =>
  //     p.name.toLowerCase().includes(search),
  //   );

  //   const matchedDetail = allDetails.find((d) =>
  //     d.detail.toLowerCase().includes(search),
  //   );

  //   const payload = {};

  //   if (matchedProject) payload.project_uuid = matchedProject.uuid;
  //   if (matchedDetail) payload.detail_uuid = matchedDetail.uuid;

  //   if (Object.keys(payload).length > 0) {
  //     filterPayments(payload);
  //   } else {
  //     reset();
  //   }
  // }, [searchText, projects, allDetails]);

  const sourceData = filteredData ? filteredData?.data : paymentsData?.data;

  const columns = [
    { id: "project_name", label: "اسم المشروع" },
    { id: "detail", label: "المتطلب" },
    { id: "pending_date", label: "تاريخ الاستحقاق" },
    { id: "cost", label: "الكلفة" },
    { id: "paid_amount", label: "المبلغ المدفوع" },
    { id: "remaining_amount", label: "المبلغ المتبقي" },
    { id: "status", label: "الحالة" },
    { id: "edit", label: "الإجراءات" },
  ];

  const rows =
    sourceData?.map((item) => ({
      id: item.uuid,
      project_name: item.project?.name,
      detail: item.detail?.detail,
      pending_date: item.pending_date,
      paid_amount: item.paid_amount,
      cost: item.cost,
      remaining_amount: item.remaining_amount,
      status: parseFloat(item.remaining_amount) === 0 ? "مكتمل" : "غير مكتمل",
    })) || [];

  // console.log("isPending =", isPending);
  // console.log("data =", paymentsData?.data);
  // console.log("error =", paymentsError);
  // const projects = paymentsData?.data || [];
  return (
    <Container className="projects" maxWidth="lg" sx={{ px: 2 }}>
      <Title pageTitle="إدارة العمليات المالية" subtitle="">
        <Link to="/content/financial-operations/add" className="btn">
          <span>إضافة عملية مالية</span>
          <AddRounded />
        </Link>
      </Title>

      <div className="filters-holder">
        <div
          className="input-holder"
          style={{ display: "flex", gap: "12px", alignItems: "center" }}
        >
          <CustomInput
            inputType="textField"
            placeholder="ابحث حسب اسم المشروع أو التفصيل"
            value={searchText}
            setValue={(e) => setSearchText(e.target.value)}
            isNestedState={true}
            styles={{ width: "400px" }}
          />
        </div>

        <IconButton
          onClick={() => setOpenFilter(true)}
          sx={{ backgroundColor: "#eeeeee", borderRadius: 2, m: 1 }}
          className="filter-btn"
        >
          <FilterList className="icon" />
        </IconButton>
      </div>

      <FilterDrawer open={openFilter} onClose={() => setOpenFilter(false)} />

      <PageTable
        columns={columns}
        rows={rows}
        pageLink="/content/financial-operations"
        hasNoResult={rows.length === 0 && !!searchText}
        onEdit={(uuid) =>
          navigate(`/content/financial-operations/edit/${uuid}`)
        }
      />
    </Container>
  );
}
