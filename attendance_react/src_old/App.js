import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Breadcrumbs from '@mui/material/Breadcrumbs'
import {  Grid } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MenuBookIcon from '@mui/icons-material/MenuBook';
//import AddIcon from '@mui/icons-material/Add';
//import RemoveIcon from '@mui/icons-material/Remove';
import Addmissiondetails from './Addmissiondetails';
import Personaldetais from './Personaldetais';
import Familydetails from './Familydetails';
import Correspondencedetails from './Correspondencedetails';
import Hrdata from './Hrdata';
function App() {
 

  const [activeItem, setActiveItem] = useState("Admission Details");

  const drawerWidth = 0;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })
  (({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));





  const [values, SetValues] = useState({
    emp_id: '',
    employee_id: '',
    company_id: '',
    emp_name: '',
    initial: '',
    direct_no: '',
    number_verified: false,
    bank_ac: '',
    bank_details: '',
    bank_ifsc:'',
    pan_no: '',
    passport_no: '',
    aadhar_no: '',
    aadhar_name:'',
    aadhar_linkedno:'',
    facility: '',
    facility_type:'',
    photo: undefined, // Change to undefined  as we'll handle the file separately
    dob: "",
    certificate_dob:"",
    age: "",
    sex: "",
    blood_group: "",
    alergies: "",
    height: "",
    weight: "",
    eye_powerR:"",
    eye_powerL:"",
    sugar:"",
    cholestral:"",
    alcohol:"",
    smoking:"",
    hospital_details:"",
    languages: [] ||'',
    native_tongue: "",
    personal_no: "",
    personal_email: "",
    facebook: "",
    linkedin: "",
    marital_status: '',
    anniversary: '',
    spouse_name: '',
    spouse_job: '',
    kid_name:[] ||'',
    kid_dob:[] ||'',
    nomine_name:'',
    nomine_relat:'',
    father_name: '',
    job: '',
    father_no: '',
    spouse_no: '',
    fam_income:'',
    fam_liabilities:'',
    fam_worth:'',
    house:'',
    present_address:'',
    present_address_verified: false, // Default value for checkbox
    permanent_address:'',
    alt_contname1:'',
    alt_contno1: '',
    alt_realtion1:'',
    alt_contname2:'',
    alt_realtion2: '',
    alt_contno2: '',
    alt_contname3:'',
    alt_realtion3: '',
    alt_contno3: '',
    hsc:'',
    hsc_percentage: '',
    ug_qualification: '',
    pg_qualification: '',
    ug_qualification_percentage:'',
    pg_qualification_percentage:'',
    certificate_course: '',
    exp_years: '',
    pf_uan_no:'',
    esi : '',
    last_employer: '',
    last_jobnature:'',
    salary: '',
    inias_bought: '',
    reference: '',
    referer_det: '',
    referer_no: '',
    pan_img: undefined , // Initialize as undefined 
    driving_img: undefined , // Initialize as undefined 
    passport_img: undefined , // Initialize as undefined 
    induction_form: undefined , // Initialize as undefined 
    last_appraisal: undefined , // Initialize as undefined 
    pre_exp: undefined , // Initialize as undefined 
    bio_data: undefined , // Initialize as undefined 
    certificate: undefined , // Initialize as undefined 
    aadhar_img: undefined , // Initialize as undefined 
    employee_sign: undefined , // Initialize as undefined 
    career_plan: ''
  });








  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [color, setcolor] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(false);
    setcolor(true)
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };
  console.log(activeItem)
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={open} style={{ backgroundColor: 'white' }}>

      <Toolbar>
        {open ?
          <IconButton
            color="rgba(0, 0, 0, 0.54)"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              // ...(!open && { display: 'none' }),
            }}
          >
            <MenuIcon />

          </IconButton>

          : <IconButton> <ChevronLeftIcon onClick={handleDrawerClose} style={{ color: 'rgba(0, 0, 0, 0.54' }} />  </IconButton>
        }

        <Grid container spacing={2}>


        <Grid   item xs={3} sm={3} md={3} lg={3} xl={3}>
          </Grid>
          <Grid   item xs={6} sm={6} md={6} lg={6} xl={6} style={{display:'flex' , justifyContent:'center'}}>
                {open? <img src="intech-erp-logo.png" alt="Logo"  style={{height:"30px" , marginRight:'70px'}}  />: <img src="intech-erp-logo.png" alt="Logo"  style={{height:"30px"}}  />}     
                </Grid>
                <Grid  item xs={3} sm={3} md={3} lg={3} xl={3}>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton >
          <div>
            <img src="cis-logo-icon.png" alt="Logo" style={{ borderStyle: 'none', height: '30px', margin: '0px 5px -6px 0px' }} />
            <img src="IntechERP.png" alt="Logo" style={{ borderStyle: 'none', height: '15px' }} /></div>
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {/* 'Starred', 'Send email', 'Drafts' */}
        {[{ value: 'Admission Details', icon: <AdminPanelSettingsIcon sx={activeItem === "Admission Details" ? { color: '#0072bc' } : ''} /> },
        { value: 'Personal Details', icon: <AssignmentIndIcon sx={activeItem === "Personal Details" ? { color: '#0072bc' } : ''} /> },
        { value: 'Family Details', icon: <PeopleIcon sx={activeItem === 'Family Details' ? { color: '#0072bc' } : ''} /> },
        { value: 'Correspondence Details', icon: <ContactPageIcon sx={activeItem === 'Correspondence Details' ? { color: '#0072bc' } : ''} /> },
        { value: 'Hr Data', icon: <MenuBookIcon sx={activeItem === 'Hr Data' ? { color: '#0072bc' } : ''} /> },
        ].map((text, index) => (
          <ListItem key={text.vale} disablePadding sx={{ display: 'block' }} onClick={() => setActiveItem(text.value)}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open && 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open && 'auto',
                  // justifyContent: 'center',
                }}
              >
                {text.icon}
              </ListItemIcon>
              {/* <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        < Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Typography variant="h6" style={{ color: '#0072BC' }}>IntechERP</Typography>
  
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="inherit" href="/" >
                Employee DB
              </Typography>
              <Typography color="#0072bc">{activeItem}</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
  
        <br></br>
  {activeItem==="Admission Details" && <Addmissiondetails DrawerHeader={DrawerHeader} values={ values} SetValues={ SetValues} setActiveItem={setActiveItem} setOpen={setOpen}/>} 
  
  {activeItem==="Personal Details" && <Personaldetais  DrawerHeader={DrawerHeader} values={ values} SetValues={ SetValues} setActiveItem={setActiveItem}  setOpen={setOpen}/>} 

  {activeItem==="Family Details" && <Familydetails  DrawerHeader={DrawerHeader} values={ values} SetValues={ SetValues} setActiveItem={setActiveItem}  setOpen={setOpen}/>} 

  {activeItem==="Correspondence Details" && <Correspondencedetails  DrawerHeader={DrawerHeader} values={ values} SetValues={ SetValues} setActiveItem={setActiveItem}  setOpen={setOpen}/>} 

  {activeItem==="Hr Data" && <Hrdata  DrawerHeader={DrawerHeader} values={ values} SetValues={ SetValues} setActiveItem={setActiveItem}  setOpen={setOpen}/>} 
  </Box></Box>
  );
}


export default App;
