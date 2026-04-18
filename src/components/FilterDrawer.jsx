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
  MenuItem,
  TextField,
  List,
  ListItem
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';

export default function FilterDrawer({ open, onClose }) {

  // ✔️ خليت progress لحاله (كما هو عندك)
  const [progress, setProgress] = useState(0);

  const [status, setStatus] = useState({
    done: false,
    inProgress: false,
    planned: false,
    stopped: false,
  });

  // ❌ شلت التكرار داخل filters (كان فيه خربطة)
  const [filters, setFilters] = useState({
    governorate: "",
    city: "",
    region: "",
    sector: "",
    executor: ""   // ✔️ أضفناها فقط
  });

  const [funders, setFunders] = useState({
    businessmen: false,
    associations: false
  });

  const [search, setSearch] = useState("");

  // ✔️ نفس فكرتك لكن من المشاريع لاحقاً
  const executors = [
    "شركة البناء الحديثة",
    "مؤسسة التطوير",
    "شركة الإعمار",
    "جمعية الأمل",
  ];

  const filteredExecutors = executors.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckbox = (key) => {
    setStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckboxChange = (event) => {
    setFunders({
      ...funders,
      [event.target.name]: event.target.checked,
    });
  };

  const handleReset = () => {
    setProgress(0);

    setStatus({
      done: false,
      inProgress: false,
      planned: false,
      stopped: false,
    });

    setFilters({
      governorate: "",
      city: "",
      region: "",
      sector: "",
      executor: ""
    });

    setFunders({
      businessmen: false,
      associations: false
    });

    setSearch("");
  };

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={{ width: 220, p: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <FilterListIcon />
        </Box>

        {/* الموقع */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight='bold'>الموقع</Typography>
          </AccordionSummary>

          <AccordionDetails>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography>المحافظة</Typography>
              <Select
                value={filters.governorate}
                onChange={(e) => handleChange('governorate', e.target.value)}
                variant='standard'
                disableUnderline
                displayEmpty
              >
                <MenuItem value=''>اختر المحافظة</MenuItem>
                <MenuItem value='دمشق'>دمشق</MenuItem>
                <MenuItem value='حلب'>حلب</MenuItem>
                <MenuItem value='حمص'>حمص</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography>المدينة</Typography>
              <Select
                value={filters.city}
                onChange={(e) => handleChange('city', e.target.value)}
                variant='standard'
                disableUnderline
                displayEmpty
              >
                <MenuItem value="">اختر المدينة</MenuItem>
                <MenuItem value="حمص المدينة">حمص المدينة</MenuItem>
                <MenuItem value="الريف الجنوبي">الريف الجنوبي</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography>المنطقة</Typography>
              <Select
                value={filters.region}
                onChange={(e) => handleChange('region', e.target.value)}
                variant='standard'
                disableUnderline
                displayEmpty
              >
                <MenuItem value=''>اختر المنطقة</MenuItem>
                <MenuItem value='جورة الشياح'>جورة الشياح</MenuItem>
                <MenuItem value='الغوطة'>الغوطة</MenuItem>
                <MenuItem value='الخالدية'>الخالدية</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        {/* القطاع */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">القطاع</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <MenuItem onClick={() => handleChange("sector", "تعليمي")}>تعليمي</MenuItem>
            <MenuItem onClick={() => handleChange("sector", "صحي")}>صحي</MenuItem>
            <MenuItem onClick={() => handleChange("sector", "إنشائي")}>إنشائي</MenuItem>
            <MenuItem onClick={() => handleChange("sector", "خدمي")}>خدمي</MenuItem>
          </AccordionDetails>
        </Accordion>

        {/* حالة المشروع */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight='bold'>حالة المشروع</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <FormControlLabel
              control={<Checkbox checked={status.done} onChange={() => handleCheckbox("done")} />}
              label="مكتمل"
            />
            <FormControlLabel
              control={<Checkbox checked={status.inProgress} onChange={() => handleCheckbox("inProgress")} />}
              label="قيد التنفيذ"
            />
            <FormControlLabel
              control={<Checkbox checked={status.planned} onChange={() => handleCheckbox("planned")} />}
              label="مخطط"
            />
            <FormControlLabel
              control={<Checkbox checked={status.stopped} onChange={() => handleCheckbox("stopped")} />}
              label="متوقف"
            />
          </AccordionDetails>
        </Accordion>

        {/* نسبة الإنجاز */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight='bold'>نسبة الإنجاز</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Slider
              value={progress}
              onChange={(e, newValue) => setProgress(newValue)}
              valueLabelDisplay="auto"
              sx={{ color: "var(--main-color)" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
               <Typography>0%</Typography>
                <Typography>100%</Typography> </Box>

          </AccordionDetails>
        </Accordion>

        {/* الجهة المنفذة */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">الجهة المنفذة</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <TextField
              fullWidth
              placeholder="ابحث..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />

            <List>
              {filteredExecutors.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleChange("executor", item)}
                >
                  {item}
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* الجهة الممولة */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight='bold'>الجهة الممولة</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <FormControlLabel
              control={<Checkbox checked={funders.businessmen} onChange={handleCheckboxChange} name="businessmen" />}
              label="رجال الأعمال"
            />
            <FormControlLabel
              control={<Checkbox checked={funders.associations} onChange={handleCheckboxChange} name="associations" />}
              label="الجمعيات"
            />
          </AccordionDetails>
        </Accordion>

        {/* أزرار */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={handleReset} sx={{ color: "#666" }}>
            إعادة تعيين
          </Button>

          <Button variant="contained" sx={{ backgroundColor: "var(--main-color)" }}>
            تطبيق
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
