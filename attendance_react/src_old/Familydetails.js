
import React , { useState,useEffect }  from 'react';
import { Card, CardContent, FormControl, Grid, TextField } from '@mui/material';
import server from './server/server';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Familydetails = ({setActiveItem,setOpen,values,SetValues}) => {
  
  const [fathno,setFathno]=useState(false)
  const [spono,setSpono]=useState(false)
  const [showDiv, setShowDiv] = useState(true);
  const [showData, setShowData] = useState(true);

useEffect(() => {
  const handle=()=>{
  setOpen(true);
  }
  handle();
  },
  //eslint-disable-next-line
  []) 
  const employee=sessionStorage.getItem("emp_id")
  console.log(employee);


  const handleChange = (e) => {
    const { name, value } = e.target;
    SetValues({
      ...values,
      [name]: value,
    });
  };


 // Function to handle the select change
 const handleSelectChange = (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === 'single') {
    setShowDiv(false);
  } else {
    setShowDiv(true);
  }

  if(selectedValue === 'separated' || selectedValue === 'divorced'){
    setShowData(false);
  }else {
    setShowData(true);
  }
  SetValues({ ...values, marital_status: selectedValue });

};

  const handleInputChange = (e) => {
    setFathno(false)
    // Allow only numbers (0-9) and prevent input of other characters
    const numericInput = e.target.value.replace(/\D/g, '');
    SetValues({ ...values, father_no: numericInput });
  };

  const handleFathNoChange = (e) => {

    
    e.preventDefault()
        
    const inputNumber = e.target.value;
    console.log(inputNumber.toString())
    if ((inputNumber.length===10)) {
      // Input is a 10-digit number
      SetValues({ ...values, father_no: inputNumber });
      setFathno(false)
    } else {
      SetValues({ ...values, father_no: '' });
      setFathno(true)
      // Input is not a 10-digit number, clear the input field
      // alert('Please enter a 10-digit mobile number.');
      
    }
      };
      
      const handleSpoChange = (e) => {
        setSpono(false)
        // Allow only numbers (0-9) and prevent input of other characters
        const numericInput = e.target.value.replace(/\D/g, '');
        SetValues({ ...values, spouse_no: numericInput });
      };
      const handleSpouseNoChange = (e) => {
            e.preventDefault()
        const inputNumber = e.target.value;
        console.log(inputNumber.toString())
        if ((inputNumber.length===10)) {
          // Input is a 10-digit number
          SetValues({ ...values, spouse_no: inputNumber });
          setSpono(false)
        } else {
          SetValues({ ...values, spouse_no: '' });
          setSpono(true)
        }
          };
          
  //   const handlesubmit = (e) => {
  //   e.preventDefault();
  //   console.log(values);
  //   //setActiveItem(Personaldetais);

  // };
  const [errorMessage, setErrorMessage] = useState({});

  const [successMessage, setSuccessMessage] = useState({});

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values.kid_name);
      const response = await server.put('/familydetails',values);
      
      console.log(response.data); // Assuming backend sends back updated data
      setSuccessMessage({...successMessage,msg:'Data stored successfully!'});
      setTimeout(() => {
        setSuccessMessage({...successMessage,msg:""});
        setErrorMessage({...errorMessage,msg:""});
        setActiveItem("Correspondence Details");
      }, 3000); // Clear the message after 3 seconds
      
    } catch (error) {
      console.error('Error updating data:', error);
      setErrorMessage({...errorMessage,msg:'Incorrect To Stored!'});
    }
  };


  const [addplus, setAddPlus] = useState([]);


  const handleAddField = () => {
    setAddPlus(prevState => [...prevState, {}]);
  };

  const handleRemoveField = index => {
    setAddPlus(prevState => prevState.filter((_, i) => i !== index));
  };


    return (
        <>

<Card >
          <CardContent>
          <form onSubmit={handlesubmit}>
              <div class="grid gap-6  md:grid-cols-2">

              <div>
                  <label for="Marital Status" class="block mb-2 text-sm font-medium text-gray-900 ">Marital Status
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <select id="Marital Status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="marital_status"  onChange={handleSelectChange}
                  value={values.marital_status}
                  required
                  >
                    <option selected>-- SELECT --</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="separated">Separated</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed"> Widowed</option>
                  </select>
                </div>

                {showDiv && (
                <>

                <div>
                  <label for="Anniversary " class="block mb-2 text-sm font-medium text-gray-900">Anniversary 
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <input type="date" id="Anniversary" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="anniversary"  onChange={handleChange}
                  value={values.anniversary} required
                     />
                </div>

{showData && (
  <>
                <div>
                  <label for="Spouse's Name " class="block mb-2 text-sm font-medium text-gray-900">Spouse's Name
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <input type="text" id="Spouse's Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="spouse_name"  onChange={handleChange}
                  value={values.spouse_name} required
                     />
                </div>


                <div>
                  <label for="Spouse's Job " class="block mb-2 text-sm font-medium text-gray-900">Spouse's Job 
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <input type="text" id="Spouse's Job" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="spouse_job"  onChange={handleChange}
                  value={values.spouse_job} required
                     />
                </div>

                <div>
                  <label for="Spouse's No" class="block mb-2 text-sm font-medium text-gray-900">Spouse's No
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>

                  {spono?
                  <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="spouse_no"  onChange={handleSpoChange}
                  maxLength={10}
                  onBlur={handleSpouseNoChange}
                  value={values.spouse_no}
                     />
                     <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                    </>
                    :<input type="tel" id="Spouse's No" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="spouse_no"  onChange={handleSpoChange}
                    maxLength={10}
                    onBlur={handleSpouseNoChange}
                    value={values.spouse_no} 
                    required
                       />}
                </div>
                </>
)}



<div>
<label for="Kid Name " class="block mb-2 text-sm font-medium text-gray-900">Kid Name&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                    <input type="text" id="Kid Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="kid_name" onChange={(e)=> SetValues({...values, kid_name:[...values.kid_name,e.target.value]})}
                    defaultvalue={values.kid_name}
                    
                    required
                    />


                    
                  </div>




<Grid container spacing={2}>
                <Grid item xs={10} sm={10} md={10} lg={10}  xl={10}>
                <label for="Kid Dob " class="block mb-2 text-sm font-medium text-gray-900">Kid DOB&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                    <input type="date" id="Kid Dob" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="kid_dob" //onChange={handleChange}
                    onChange={(e)=> SetValues({...values, kid_dob:[...values.kid_dob,e.target.value]})}
                   // value={values.kid_dob}
                    required
                    />
                  </Grid>
         
                  <Grid item sm={2} xs={2}>
                    <AddIcon onClick={handleAddField} style={{ color: '#0072bc', marginTop: '35px' }} />
                  </Grid>
                  {addplus.map((_, index) => (
                    <React.Fragment key={index}>
  
                      <Grid item sm={10} xs={10}>
                        <label for="kidname" class="block mb-2 text-sm font-medium text-gray-900 ">Kid Name </label>
                        <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 
             dark:focus:ring-blue-500 dark:focus:border-blue-500"
             onChange={(e)=> SetValues({...values, kid_name:[...values.kid_name,e.target.value]})}
                          placeholder="" name="kid_name"  id={`kid_name ${index + 1}`} label={`Kid Name ${index + 1}`} />
                      </Grid>
  
                      <Grid item sm={10} xs={10}>
  
  
                        <label for="koddob" class="block mb-2 text-sm font-medium text-gray-900 ">Kid DOB</label>
                        <input type="date"  class="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full  p-2.5  dark:border-gray-600 
              dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border
              -blue-500" 
              //onChange={handleChange}
              onChange={(e)=> SetValues({...values, kid_dob:[...values.kid_dob,e.target.value]})}
              name  ="kid_dob"
                          id={`kid_dob ${index + 1}`} label={`Kid DOB ${index + 1}`} />
                      </Grid>
  
  
                      <Grid item sm={2} xs={2}>
                        <RemoveIcon onClick={() => handleRemoveField(index)} style={{ color: '#0072bc', marginTop: '35px' }} />
                      </Grid>
  
  
                    </React.Fragment>
                  ))}
  
           </Grid>

                  

                   
              <div>
                <label for="Nominee Name " class="block mb-2 text-sm font-medium text-gray-900">Nominee Name&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Nominee Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="nomine_name" onChange={handleChange}
                value={values.nomine_name} required
                />
                    </div>         
              
              <div>
                <label for="Nominee Relationship" class="block mb-2 text-sm font-medium text-gray-900">Nominee Relationship&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Nominee Relationship" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="nomine_relat" onChange={handleChange}
                value={values.nomine_relat} 
                required
                />
              </div>




                </>

)}

                <div>
                  <label for="Father's Name " class="block mb-2 text-sm font-medium text-gray-900">Father's Name&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Father's Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="father_name"  onChange={handleChange}
                  value={values.father_name}
                  required
                     />
                </div>


                <div>
                  <label for="Father's Job" class="block mb-2 text-sm font-medium text-gray-900">Father's Job&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Father's Job" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="job"  onChange={handleChange}
                  value={values.job}
                  required
                     />
                </div>

                <div>
                  <label for="Father's No" class="block mb-2 text-sm font-medium text-gray-900">Father's No&nbsp;<span  class="text-red-600 text-xl">*</span></label>

                  {fathno?
                <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="father_no"  onChange={handleInputChange}
                  onBlur={handleFathNoChange}
                  maxLength={10}
                  value={values.father_no}
                    />
                    <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                    </>
                    :<input type="tel" id="Father's No" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="father_no"  onChange={handleInputChange}
                    maxLength={10}
                    onBlur={handleFathNoChange}
                    value={values.father_no}
                    required
                       />}
                </div>

                <div>
                <label for="Family Income in L " class="block mb-2 text-sm font-medium text-gray-900">Family Income P/M in Rs&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Family Income in L" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="fam_income" onChange={handleChange}
                value={values.fam_income}
                required
                />
              </div>

              <div>
                <label for="Family Liabilities in Lakhs" class="block mb-2 text-sm font-medium text-gray-900">Family Liability P/M in Rs&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Family Liabilities in Lakhs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="fam_liabilities" onChange={handleChange}
                value={values.fam_liabilities}
                required
                />
              </div>

              <div>
                <label for="Family Net Worth in Lakhs" class="block mb-2 text-sm font-medium text-gray-900">Networth in L&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Family Net Worth in Lakhs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="fam_worth" onChange={handleChange}
                value={values.fam_worth}
                required
                />
              </div>
              
              <div>
                <label for="House" class="block mb-2 text-sm font-medium text-gray-900 ">House&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <select id="House" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="house" onChange={handleChange}
                value={values.house}
                required
                >
                  <option selected>-- SELECT --</option>
                  <option value="Own">Own</option>
                  <option value="Rental">Rental</option>
                  <option value="Lease">Lease</option>
                
                </select>
              </div>

               


  </div>
  <br></br>
            <Grid container spacing={2}>

              <Grid item xs={6} sm={6}>

                <button type="button" onClick={() => setActiveItem("Personal Details")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ fontSize: '13px' }}>
                  &lt; PREVIOUS</button>

              </Grid>

              <Grid item xs={6} sm={6}>
                <button type="submit" onClick={() => setActiveItem("Family Details")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ float: 'right' }}>
                  NEXT &gt;</button>
              </Grid>
            </Grid>


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

export default Familydetails;
