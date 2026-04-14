import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Slider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useState } from "react";

export default function FilterDrawer({ open, onClose }) {
 
  const [progress, setProgress] = useState([0, 100]);


  const [status, setStatus] = useState({
    done: false,
    inProgress: false,
    planned: false,
    stopped: false
  });

 const [filters, setFilters] = useState({
  governorate: "",
  city: "",
  region: "",
  sector: ""
});

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckbox = (key) => {
    setStatus((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleReset = () => {
    setProgress([0, 100]);
    setStatus({
      done: false,
      inProgress: false,
      planned: false,
      stopped: false
    });
    setFilters({
  governorate: "",
  city: "",
  region: "",
  sector: ""
});

  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 220, p: 2 }}>

        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between",  }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <FilterListIcon />
        </Box>

        {/*  الموقع */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">الموقع</Typography>
          </AccordionSummary>

          <AccordionDetails>

            {/* المحافظة */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography sx={{ mb: 0.5, fontSize: 16 }}>
                المحافظة
              </Typography>

              <Select
                value={filters.governorate}
                onChange={(e) => handleChange("governorate", e.target.value)}
                variant="standard"
                disableUnderline
                displayEmpty
              >
                <MenuItem value="">اختر المحافظة</MenuItem>
                <MenuItem value="دمشق">دمشق</MenuItem>
                <MenuItem value="حلب">حلب</MenuItem>
                <MenuItem value="حمص">حمص</MenuItem>
              </Select>
            </FormControl>

            {/* المدينة */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography sx={{ mb: 0.5, fontSize: 16 }}>
                المدينة
              </Typography>

              <Select
                value={filters.city}
                onChange={(e) => handleChange("city", e.target.value)}
                variant="standard"
                disableUnderline
                displayEmpty
              >
                <MenuItem value="">اختر المدينة</MenuItem>
                <MenuItem value="حمص المدينة">حمص المدينة</MenuItem>
                <MenuItem value="الريف الجنوبي">الريف الجنوبي</MenuItem>
                <MenuItem value="الريف الشمالي">الريف الشمالي</MenuItem>
              </Select>
            </FormControl>

            {/* المنطقة */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography sx={{ mb: 0.5, fontSize: 16 }}>
                المنطقة
              </Typography>

              <Select
                value={filters.region}
                onChange={(e) => handleChange("region", e.target.value)}
                variant="standard"
                disableUnderline
                displayEmpty
              >
                <MenuItem value="">اختر المنطقة</MenuItem>
                <MenuItem value="جورة الشياح">جورة الشياح</MenuItem>
                <MenuItem value="الغوطة">الغوطة</MenuItem>
                <MenuItem value="الخالدية">الخالدية</MenuItem>
              </Select>
            </FormControl>

          </AccordionDetails>
        </Accordion>

       {/*  القطاع */}
<Accordion 
  onChange={(e, expanded) => setSectorOpen(expanded)}
  sx={{
    "&:before": {
      display: "none"   
    },
    pb:1
  }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
   <Typography fontWeight="bold">
  {filters.sector ? (
    <>
      القطاع: <span style={{ color: "var(--main-color)" }}>{filters.sector}</span>
    </>
  ) : (
    "القطاع"
  )}
</Typography>
  </AccordionSummary>

  <AccordionDetails sx={{ p: 0 }}>

    {/* القائمة مباشرة */}
    <Box>
      <MenuItem onClick={() => handleChange("sector", "تعليمي")}>
        تعليمي
      </MenuItem>

      <MenuItem onClick={() => handleChange("sector", "صحي")}>
        صحي
      </MenuItem>

      <MenuItem onClick={() => handleChange("sector", "إنشائي")}>
        إنشائي
      </MenuItem>

      <MenuItem onClick={() => handleChange("sector", "خدمي")}>
        خدمي
      </MenuItem>

      <MenuItem onClick={() => handleChange("sector", "زراعي")}>
        زراعي
      </MenuItem>
    </Box>

  </AccordionDetails>
</Accordion>



        {/*  حالة المشروع */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">حالة المشروع</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <FormControlLabel
              control={
                <Checkbox
                  checked={status.done}
                  onChange={() => handleCheckbox("done")}
                  
                />
              }
              label="مكتمل"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={status.inProgress}
                  onChange={() => handleCheckbox("inProgress")}
                />
              }
              label="قيد التنفيذ"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={status.planned}
                  onChange={() => handleCheckbox("planned")}
                />
              }
              label="مخطط له"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={status.stopped}
                  onChange={() => handleCheckbox("stopped")}
                />
              }
              label="متوقف"
            />
          </AccordionDetails>
        </Accordion>

        {/*  نسبة الإنجاز */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">نسبة الإنجاز</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Slider
              value={progress}
              onChange={(e, newValue) => setProgress(newValue)}
              valueLabelDisplay="auto"
              sx={{ color: "var(--main-color)"}}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>0%</Typography>
              <Typography>100%</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* الجهة الممولة */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">الجهة الممولة</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>اختر جهة</Typography>
          </AccordionDetails>
        </Accordion>

        {/*  الأزرار */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={handleReset} sx={{color:"#666"}}>
            إعادة تعيين
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor:  "var(--main-color)" }}
          >
            تطبيق
          </Button>
        </Box>

      </Box>
    </Drawer>
  );
}
