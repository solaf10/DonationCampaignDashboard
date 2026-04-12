import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Button
} from '@mui/material';


import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <Card
  sx={{
    display: "flex",
    flexDirection: "column",
    height: "100%",      
    minHeight: "300px",  
    width: "100%",
    borderRadius: 2,
   "&:hover": {
  boxShadow: 4
}
    
  }}
>
     
      <CardMedia
        component="img"
        height="180" 
        image={project.image || "https://via.placeholder.com/300"}
        alt="project"
        sx={{
               aspectRatio: "16/11",       
               width: "100%",     
                objectFit: "cover"  
  }}
      />

  
      <CardContent
        sx={{
          p: 2,         
          pb: 1,           
          flex: 1,         
          display: "flex",
          flexDirection: "column",
          gap: 1,        
          textAlign: "right"
        }}
      >
      
       <Typography
  variant="subtitle1"
  fontWeight="bold"
  sx={{
    mb: 0.5,
    minHeight: 42,
    textAlign: "center", 
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: 1.6
  }}
>
          {project.title}
        </Typography>
 <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1, 
            color: "text.secondary", 
            mb: 0.5,
            justifyContent: 'flex-start'
          }}
        >  <LocationOnIcon fontSize="small" sx={{ color: "var(--main-color)" }} />
          <Typography variant="body2" sx={{ fontSize: 16 }}>
            {project.location}
          </Typography>
        
        </Box>

        
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            width: "100%",
            direction: "rtl"
          }}
        >
          <Typography sx={{ color: "#ed6c02", fontWeight: 600, fontSize: 13, textTransform: 'uppercase' }}>
            {project.category}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography fontWeight="bold" fontSize={15}>
              {project.price}
            </Typography>
            <AttachMoneyIcon fontSize="small" />
          </Box>
        </Box>

      
       
       
      <Box sx={{  pt: 2, borderTop: "1px solid #eee", direction: 'rtl' }}>
          <LinearProgress
            variant="determinate"
    
            value={project.progress}
            sx={{
              height: 7,
              borderRadius: 5,
              mb: 0.7,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "var(--main-color)" }
              
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
             % متبقي {100 - project.progress}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
              {project.progress} % نسبة إنجاز المشروع
            </Typography>
            
          </Box>
        </Box>

  
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
          
            borderTop: "1px solid #eeeeee",
            pt: 2,
            direction: 'rtl'
          }}
        >
          {/* أيقونات التعديل والحذف */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small" sx={{ color: "#607d8b", border: '1px solid #e0e0e0' }}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "red", border: '1px solid #ffcccc', backgroundColor: '#fff5f5' }}>
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>

         
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "var(--main-color)",
              color: 'white',
              px: 3,
              borderRadius: 2,
              textTransform: 'none',
              "&:hover": { backgroundColor: "var(--main-color)" },
              fontSize: 13
            }}
          >
            معرفة المزيد
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
}