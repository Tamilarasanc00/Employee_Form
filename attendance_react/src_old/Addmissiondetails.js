import React, {useEffect, useState } from 'react';
import { Card, CardContent, FormControl, Grid, TextField,Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import server from './server/server';
import Box from '@mui/material/Box';
//import SuccessModal from './SuccessModal'; // Import your SuccessModal component
//import { useHistory } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Addmissiondetails = ({DrawerHeader,setActiveItem, setOpen,history,values,SetValues}) => {

const [mob,setmob]=useState(false)
const [acc,setacc]=useState(false)
const [pan,setpan]=useState(false)
const [pass,setpass]=useState(false)
const [aadhar,setaadhar]=useState(false)

  //const history = useHistory();

    const [addplus,setAddPlus] = useState([]);

    

    const handleAddField = () => {
      setAddPlus(prevState => [...prevState, {}]);
    };
  
    const handleRemoveField = index => {
      setAddPlus(prevState => prevState.filter((_, i) => i !== index));
    };






useEffect(() => {
const handleclose=()=>{
setOpen(true);
}
handleclose();
},
//eslint-disable-next-line
[]) 
  const id=localStorage.getItem('emp_id');
  console.log(id);
      

      
     // const [modalIsOpen, setModalIsOpen] = useState(false);
    
      const handleFileChange = (e) => {


        const file = e.target.files[0]
        const newfile = new File([file],"photo", { type: file.type })
        const formData = new FormData();
        formData.append('file', newfile);
        // formData.append('customer_id', reportdata.customer_id);
        console.log(formData);
         server.post('/upload', formData).then((res) => {
          console.log(res.data.filename);
        SetValues({
          ...values,
          photo: res.data.filename, // Store the selected file in state
        });
      }).catch((err) => { console.log(err); });
      };

      const [addFacilities, setAddFacilities] = useState({
        facility: [], // Initialize an array to hold checked values
        facility_type: [], // Initialize an array to hold checked values
      });

    const  handlefacilityTypeChange = (e) =>{
      

      const value = e.target.value;

      setAddFacilities({
        ...addFacilities,
        //facility: [...addFacilities.facility, value],
        facility_type: [...addFacilities.facility_type, value]
      });
    }




    
      const handleCheckboxChange = (e) => {
        //const value = e.target.value;
       // const isChecked = e.target.checked;
       const { name, value, checked } = e.target;
    
       console.log(value);

  if (checked) {
    // If checkbox is checked, add the value to the array
    setAddFacilities({
      ...addFacilities,
      facility: [...addFacilities.facility, value],
    });
  } else {
    // If checkbox is unchecked, remove the value from the array
    setAddFacilities({
      ...addFacilities,
      facility: addFacilities.facility.filter((facility) => facility !== value),
    });
  }
      };


      const [successMessage, setSuccessMessage] = useState({});

      const [errorMessage, setErrorMessage] = useState({});

      const handlesubmit = (e) => {
        e.preventDefault();
    

       console.log(values.aadhar_linkedno);
      
console.log(addFacilities.facility);

       values['facility']=addFacilities.facility;
       
       values['facility_type']=addFacilities.facility_type;
       

server.post('/students',{...values})
          .then((res) => {
            console.log(res);
      
            setSuccessMessage({...successMessage,msg:'Data stored successfully!'});

            //sessionStorage.setItem("emp_id", values.emp_id+1);
         
      setTimeout(() => {
        setSuccessMessage({...successMessage,msg:""});
        setErrorMessage({...errorMessage,msg:""});
        setActiveItem("Personal Details");
      }, 2000); // Clear the message after 3 seconds
            console.log('File uploaded successfully');
          })
          .catch((err) => {console.log(err);
          setErrorMessage({...errorMessage,msg:'Incorrect To Stored!'});
          }
        );
          
      };
    
      const [lastEmployeeId, setLastEmployeeId] = useState(null);
      const [current_id, setCurrent_id] = useState({
        employee_id: '', // Initialize the state for employee_id
        // Other fields...
      });
    

     
  const handleDirectNoChange = (e) => {

e.preventDefault()
    
    const inputNumber = e.target.value;
    console.log(inputNumber.toString())
    if ((inputNumber.length === 10)) {
      // Input is a 10-digit number
      SetValues({ ...values, direct_no: inputNumber });
      SetValues({ ...values, aadhar_linkedno: inputNumber });
      setmob(false)
    } else {
      //SetValues({ ...values, direct_no: '' });
      setmob(true)
      // Input is not a 10-digit number, clear the input field
      // alert('Please enter a 10-digit mobile number.');
      
    }
  };


  const handleInputChange = (e) => {
    setmob(false)
    // Allow only numbers (0-9) and prevent input of other characters
    const numericInput = e.target.value.replace(/\D/g, '');
    SetValues({ ...values, direct_no: numericInput });
  };

  const handleInputAccChange = (e) => {
    // Allow only numbers (0-9) and prevent input of other characters
    const numericInput = e.target.value.replace(/\D/g, '');
    SetValues({ ...values, bank_ac: numericInput });
  };

  

  const handleAccNoChange = (e) => {

    e.preventDefault()
        
        const inputNumber = e.target.value;
        console.log(inputNumber.toString())
        if ((inputNumber.length<=14)) {
          // Input is a 10-digit number
          SetValues({ ...values, bank_ac: inputNumber });
          setacc(false)
        } else {
          SetValues({ ...values, bank_ac: '' });
          // Input is not a 10-digit number, clear the input field
         // alert('Please enter a Account number.');
         setacc(true)
        }
      };
      
      const handlePANNoChange = (e) => {

        e.preventDefault()
            
            const inputNumber = e.target.value;
            console.log(inputNumber.toString())
            if ((inputNumber.length === 10)) {
              // Input is a 10-digit number
              SetValues({ ...values, pan_no: inputNumber });
              setpan(false)
            } else {
              SetValues({ ...values, pan_no: '' });
              // Input is not a 10-digit number, clear the input field
              //alert('Please enter a PAN number.');
              setpan(true)
              
            }
          };



 const handlePassNoChange = (e) => {

  e.preventDefault()
      
      const inputNumber = e.target.value;
      console.log(inputNumber.toString())
      if ((inputNumber.length === 8)) {
        // Input is a 10-digit number
        SetValues({ ...values, passport_no: inputNumber });
        setpass(false)
      } else {
        SetValues({ ...values, passport_no: '' });
        // Input is not a 10-digit number, clear the input field
        //alert('Please enter a PAN number.');
        setpass(true)
        
      }
    };
    
    const handleAadharNoChange = (e) => {

      e.preventDefault()
          
          const inputNumber = e.target.value;
          console.log(inputNumber.toString())
          if ((inputNumber.length <= 16)) {
            // Input is a 10-digit number
            SetValues({ ...values, aadhar_no: inputNumber });
            setaadhar(false)
          } else {
            SetValues({ ...values, aadhar_no: '' });
            // Input is not a 10-digit number, clear the input field
            //alert('Please enter a PAN number.');
            setaadhar(true)
            
          }
        };

 const handleAadharInput = (e) => {
   setmob(true)

   // Allow only numbers (0-9) and prevent input of other characters
   const numericInput = e.target.value.replace(/\D/g, '');
   SetValues({ ...values, aadhar_no: numericInput });
 };



 useEffect(() => {
      
  server.get('/employees').then((res) => {
      const nextEmployeeId = res.data.employeeData[0].employee_id + 1;  // Calculate the next ID

      
      //console.log(nextEmployeeId);
      setLastEmployeeId(nextEmployeeId);

      const new_employee = res.data.newEmployeeData[0].employee_id; 
      
      const nextNewEmployeeId = new_employee + 1; 
//console.log(res.data.newEmployeeData[0].employee_id);
if (!nextNewEmployeeId) {
  //console.log(nextEmployeeId);
        setCurrent_id({ ...current_id, employee_id: nextEmployeeId.toString() });
        SetValues({...values, employee_id:current_id.employee_id,emp_id: res.data.newEmployeeData[0].emp_id}) ;
      }else{
        
        setCurrent_id({ ...current_id, employee_id: nextNewEmployeeId.toString() });
        SetValues({...values, employee_id:current_id.employee_id,emp_id: res.data.newEmployeeData[0].emp_id}) ;
      }
     
    })
    .catch((err) => console.log(err));
}, []);

function handleKeyPress(event) {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);
  const numericRegex = /^[0-9]*$/;

  if (!numericRegex.test(keyValue)) {
    event.preventDefault();
  }
}

const handleChangeSameAs = (e) => {
  const { checked } = e.target;
  SetValues((prevState) => ({
    ...prevState,
    number_verified: checked,
    aadhar_linkedno: checked ? prevState.direct_no : prevState.aadhar_linkedno,
  }));
};


 console.log(lastEmployeeId);


    return (
        
  <>
  
        <Card >
          <CardContent>
  

  
          <form onSubmit={handlesubmit}>
              <div class="grid gap-6  md:grid-cols-2">
                <div>
                  <label for="Employee Code" class="block mb-2 text-sm font-medium text-gray-900 ">Employee ID&nbsp;<span  class="text-red-600 text-xl"></span></label>
                  
                  <input type="text" id="employee_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="employee_id"  value={current_id.employee_id} onBlur={(e)=> SetValues({...values, employee_id:e.target.value})}  />
                  
                </div>
              

                <div>
                  <label for="Name" class="block mb-2 text-sm font-medium text-gray-900">Name &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="company_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" value={values.emp_name}  onChange={(e)=> SetValues({...values,employee_id:current_id.employee_id, emp_name:e.target.value})} required
                      />
                </div>
                <div>
                  <label for="Initial" class="block mb-2 text-sm font-medium text-gray-900">Initial &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" value={values.initial} onChange={(e)=> SetValues({...values, initial:e.target.value})}required
                      />
                </div>

                <div>
      
      {/* {red?<Typography className="block mb-2 text-sm font-medium text-gray-900" style={{color:"red", fontSize:"8px"}}><p>Please Type Correct</p></Typography>:''}  */}



      {/* <label htmlFor="CUG Mobile" className="block mb-2 text-sm font-medium text-gray-900">
        Mobile No  
      </label> */}
 
 <label htmlFor="CUG Mobile" className="block mb-2 text-sm font-medium text-gray-900">
Mobile No &nbsp;<span  class="text-red-600 text-xl">*</span></label>

     { mob?   
     <>
    <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" value={values.direct_no}
        onChange={handleInputChange}
        maxLength={10}
        onBlur={handleDirectNoChange}></input><span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter 10 Digits!</span>
    </>
:

 <input type="tel" id="CUG Mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={values.direct_no}
 maxLength={10}
onChange={handleInputChange}
onBlur={handleDirectNoChange} required />}
      
    </div>


    <Grid item xs={4} sm={4} md={4} lg={4}  xl={4}>

<div class="flex items-center mb-5"  style={{marginTop:"25px"}}>
    <input id="default-checkbox" type="checkbox" value="Yes" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="number_verified"
    onChange={handleChangeSameAs} // Add onChange event handler here
    />
    <label for="default-checkbox" class="block mb-0 text-sm font-medium text-gray-900 "> &nbsp; &nbsp; Same as Number</label>
  </div>

  </Grid>




    <div >
                  <label for="Aadhaar No" class="block mb-2 text-sm font-medium text-gray-900">Aadhar Linked Mobile No&nbsp;<span  class="text-red-600 text-xl">*</span></label>

                  <input type="text" id="Name as per Aadhaar" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"  name="aadhar_linkedno"
                  //value={values.aadhar_linkedno}

                  defaultvalue={values.number_verified ? values.direct_no : values.aadhar_linkedno}
                  maxLength={10}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => SetValues({ ...values, aadhar_linkedno: e.target.value })}
                  disabled={values.number_verified}
                  required
                  />
                </div>





                <div >
                  <label for="Bank Acc No" class="block mb-2 text-sm font-medium text-gray-900">Bank Acc No&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  { acc? <><input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500"
                   value={values.bank_ac}
                   maxLength={14}
                  onChange={handleInputAccChange}
                  onBlur={handleAccNoChange}  />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span> </>
                  :<input type="tel" id="CUG Mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""           value={values.bank_ac}
                  maxLength={14}
                  onChange={handleInputAccChange}
                  onBlur={handleAccNoChange} required />}
                </div>

                <div >
                  <label for="Bank Details" class="block mb-2 text-sm font-medium text-gray-900">Bank Name &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="CUG Mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" value={values.bank_details} placeholder="" onChange={(e)=> SetValues({...values,  bank_details:e.target.value})} required  />
                </div>


                <div >
                  <label for="Bank Details" class="block mb-2 text-sm font-medium text-gray-900">IFSC Code&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="CUG Mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
                  value={values.bank_ifsc}
                  onChange={(e)=> SetValues({...values,  bank_ifsc:e.target.value})}  required/>
                </div>


                <div >
                  <label for="PAN No " class="block mb-2 text-sm font-medium text-gray-900">PAN No &nbsp;<span  class="text-red-600 text-xl">*</span></label>


                  {pan?<><input type="text" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500"
                  onChange={(e)=> SetValues({...values, pan_no:e.target.value})} 
                  value={values.pan_no}
                  maxLength={10}
                  onBlur={handlePANNoChange}
                  /> 
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span></>
                  :
                  <input type="text" id="CUG Mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  onChange={(e)=> SetValues({...values, pan_no:e.target.value})} 
                  value={values.pan_no}
                  maxLength={10}
                  onBlur={handlePANNoChange} required
                  />
                  }
                </div>
                
                <div >
                  <label for="Passport No " class="block mb-2 text-sm font-medium text-gray-900">Passport No &nbsp;<span  class="text-red-600 text-xl">*</span></label>

                  {pass? <>
                  <input type="text" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" 
                  onChange={(e)=> SetValues({...values, passport_no:e.target.value})}
                  value={values.passport_no}
                  maxLength={8}
                  onBlur={handlePassNoChange}
                  />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Length Mismatched Digits!</span></>
                  :<input type="text" id="CUG Mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
                  onChange={(e)=> SetValues({...values, passport_no:e.target.value})}
                  value={values.passport_no}
                  maxLength={8}
                  onBlur={handlePassNoChange} required
                  />}
                </div>

                <div >
                  <label for="Aadhaar No" class="block mb-2 text-sm font-medium text-gray-900">Aadhaar No &nbsp;<span  class="text-red-600 text-xl">*</span></label>

                  {aadhar?<><input type="text" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500"  
                  onChange={handleAadharInput}
                  value={values.aadhar_no}
                  maxLength={16}
                  onBlur={handleAadharNoChange}
                  />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span></>
                  :<input type="text" id="CUG Mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={handleAadharInput}
                  value={values.aadhar_no}
                  maxLength={16}
                  onBlur={handleAadharNoChange} required
                  />}


                </div>


                <div >
                  <label for="Aadhaar No" class="block mb-2 text-sm font-medium text-gray-900">Name as per Aadhaar &nbsp;<span  class="text-red-600 text-xl">*</span></label>

                  <input type="text" id="Name as per Aadhaar" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="aadhar_name"
                  value={values.aadhar_name}
                  onChange={(e)=> SetValues({...values,  aadhar_name:e.target.value})} required
                  />

                </div>


                

                <div >
                  <label for="Photo " class="block mb-2 text-sm font-medium text-gray-900">Photo &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="file" id="photo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleFileChange}  accept="image/jpeg,image/png" name="image" required />
                </div>




<div class="flex items-center mb-4">
                  
                  <input
    id="licence"
    type="checkbox"
    value="licence_vechicle"
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    onChange={handleCheckboxChange}
    name = "licence"
    checked={addFacilities.facility.includes('licence_vechicle')}
  />
  
  <label htmlFor="licence" className="block text-sm font-medium text-gray-900">
    &nbsp; Licence
  </label>
                  </div>
                {addFacilities.facility.includes('licence_vechicle') && (
 <div className="flex items-right mb-4">
 <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
   <label>
     <input
       type="checkbox"
       name="facility_type"
       value="twoWheeler"
      // checked={facilityTypes.twoWheeler}
       onChange={handlefacilityTypeChange}
     />&nbsp;
     Two Wheeler
   </label>
   &nbsp;&nbsp;
   <label>
     <input
       type="checkbox"
       name="facility_type"
       value="fourWheeler"
       //checked={facilityTypes.fourWheeler}
       onChange={handlefacilityTypeChange}
     />&nbsp;
     Four Wheeler
   </label>
   &nbsp;&nbsp;
   <label>
     <input
       type="checkbox"
       name="facility_type"
       value="heavyvehicles"
       //checked={facilityTypes.fourWheeler}
       onChange={handlefacilityTypeChange}
     />&nbsp;
     Heavy Vehicles
   </label>
 </div>
</div>

)}



                
<div class="flex items-center mb-4">
                  <input id="laptop" type="checkbox" value="laptop" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleCheckboxChange}
                  name = "laptop"
          checked={addFacilities.facility.includes('laptop')} />
                  <label for="laptop" class="block  text-sm font-medium text-gray-900 ">&nbsp; Laptop</label>
                </div>

                {addFacilities.facility.includes('laptop') && (
  <div className="flex items-right mb-4">
    <input type="text" placeholder="Enter Laptop Model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    //onChange={(e)=> SetValues({...values,laptop_type:e.target.value})} 
    onBlur={handlefacilityTypeChange}
    />
  </div>
)}







<div class="flex items-center mb-4">
                  <input id="vehicle" type="checkbox" value="vehicle" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name = "vehicle" onChange={handleCheckboxChange}
          checked={addFacilities.facility.includes('vehicle')}  />
                  <label for="vehicle" class="block  text-sm font-medium text-gray-900 "> &nbsp;Vehicle</label>
                </div>
                {addFacilities.facility.includes('vehicle') && (
   <div className="flex items-right mb-4">
   <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
     <label>
       <input
         type="checkbox"
         name="facility_type"
         value="twoWheeler"
         //checked={facilityTypes.twoWheeler}
         onChange={handlefacilityTypeChange}
       />&nbsp;
       Two Wheeler
     </label>
     &nbsp;&nbsp;
     <label>
       <input
         type="checkbox"
         name="facility_type"
         value="fourWheeler"
         //checked={facilityTypes.fourWheeler}
         onChange={handlefacilityTypeChange}
       />&nbsp;
       Four Wheeler
     </label>
   </div>
 </div>
)}




                

 </div>
 <br></br>

            <Grid container spacing={2}>


              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>

                <button type="submit" class="text-white bg-blue-700 w-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
                sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  NEXT &gt;</button>
              </Grid>
            </Grid>
       


            <br></br>
             <br></br>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {successMessage.msg && (
              <Alert severity="success">{successMessage.msg && <p>{successMessage.msg}</p>}</Alert>
            )}
            {errorMessage.msg && (
              <Alert severity="error">{errorMessage.msg && <p>{errorMessage.msg}</p>}</Alert>
            )}
          </Stack>
          
          </form>
        </CardContent>
      </Card>
        </>
    );
}

export default Addmissiondetails;
