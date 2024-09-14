import React , { useState,useEffect }  from 'react';
import { Card, CardContent, FormControl, Grid, TextField } from '@mui/material';
import server from './server/server';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Correspondencedetails = ({setActiveItem,setOpen,values,SetValues}) => {

const [altone,setaltone]=useState(false)
const [alt2,setalt2]=useState(false)
const [alt3,setalt3]=useState(false)


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

 

  const handleAltNoChange = (e) => {
    e.preventDefault();
    const inputNumber = e.target.value;
    const fieldName = e.target.name;
  
    // Check if the input number is already present in any other contact field
    const isDuplicate = [
      values.alt_contno1,
      values.alt_contno2,
      values.alt_contno3,
      values.alt_contno4,
      values.alt_contno5,
    ].includes(inputNumber);
  
    if (inputNumber.length === 10 && !isDuplicate) {
      SetValues({ ...values, [fieldName]: inputNumber });
      //setaltone(false);
      console.log(true);
    } else {
      SetValues({ ...values, [fieldName]: '' });
      e.target.value = '';
      //setaltone(true);
      console.log(false);
    }
  };





  const handleChangeSameAs = (e) => {
    const { checked } = e.target;
    SetValues((prevValues) => ({
      ...prevValues,
      present_address: checked ? prevValues.permanent_address : '',
      present_address_verified: checked,
    }));
  };


  //   const handlesubmit = (e) => {
  //   e.preventDefault();
  //   console.log(values);
  //   //setActiveItem("Hr Data");

  // };
  const [errorMessage, setErrorMessage] = useState({});

  const [successMessage, setSuccessMessage] = useState({});

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await server.put('/correspondingdetails',values);
      console.log(response.data); // Assuming backend sends back updated data
      setSuccessMessage({...successMessage,msg:'Data stored successfully!'});
      setTimeout(() => {
        setSuccessMessage({...successMessage,msg:""});
        setErrorMessage({...errorMessage,msg:""});
        setActiveItem("Hr Data");
      }, 3000); // Clear the message after 3 seconds
      
    } catch (error) {
      console.error('Error updating data:', error);
      setErrorMessage({...errorMessage,msg:'Incorrect To Stored!'});
    }
  };
  function handleKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9]*$/;
  
    if (!numericRegex.test(keyValue)) {
      event.preventDefault();
    }
  }

    return (
        <>
            <Card >
          <CardContent>
          <form onSubmit={handlesubmit}>
              <div class="grid gap-6  md:grid-cols-2">

                    <div>
        <label for="Present Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Present Address&nbsp;<span  class="text-red-600 text-xl">*</span></label>
         <textarea id="Present Address" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 
         focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
       placeholder="" name="permanent_address"
       value={values.permanent_address} onChange={handleChange} required></textarea>
  
                    </div>


              
                    <div class="flex items-center mb-0">
                  <input id="default-checkbox" type="checkbox" value="Yes" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="present_address_verified" onChange={handleChangeSameAs} />
                  <label for="default-checkbox" class="block mb-0 text-sm font-medium text-gray-900 "> &nbsp; &nbsp; Same as</label>
                </div>


                <div>
        <label for="Permanent Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Permanent Address&nbsp;<span  class="text-red-600 text-xl">*</span></label>
         <textarea id="Permanent Address" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 
         focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
       placeholder="" name="present_address"
       value={values.present_address}
       onChange={handleChange}
       disabled={values.present_address_verified} required></textarea>
  
                    </div>


                  <div>
                  <label for="Alt Contact 1 " class="block mb-2 text-sm font-medium text-gray-900">Emergency Contact Name 1 
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <input type="text" id="Alt Contact 1 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contname1"
                   onChange={handleChange}
                   value={values.alt_contname1}
                   required
                   />
                </div>


                <div>
                  <label for="Relationship 1 " class="block mb-2 text-sm font-medium text-gray-900">Relationship
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <input type="text" id="Relationship 1 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_realtion1"
                   onChange={handleChange}
                   value={values.alt_realtion1}
                   required
                   />
                </div>


                <div>
                  <label for="Alt Contact No: 1 " class="block mb-2 text-sm font-medium text-gray-900">Contact No &nbsp;<span  class="text-red-600 text-xl">*</span></label>

                  {altone?
                  <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="alt_contno1"
                  //onChange={handleInputAltChange}
                  // value={values.alt_contno1}
                  
                  defaultvalue={values.alt_contno1}
                  maxLength={10}
                  onKeyPress={handleKeyPress}
                  onBlur={handleAltNoChange}
                  required
                   />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                  </>:<input type="tel" id="Alt Contact No: 1 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contno1"
                  //onChange={handleInputAltChange}
                  // value={values.alt_contno1}
                  placeholder="Repeated Value Not Allowed"
                  defaultvalue={values.alt_contno1}
                  maxLength={10}
                  onKeyPress={handleKeyPress}
                  onBlur={handleAltNoChange}
                  required
                   />}
                </div>


                <div>
                  <label for="Alt Contact 2 " class="block mb-2 text-sm font-medium text-gray-900">Emergency Contact Name 2 &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Alt Contact 2 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contname2"
                   onChange={handleChange}
                   value={values.alt_contname2}
                   required
                   />
                </div>

                <div>
                  <label for="Relationship 1 " class="block mb-2 text-sm font-medium text-gray-900">Relationship&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Relationship 1 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_realtion2"
                   onChange={handleChange} value={values.alt_realtion2} required />
                </div>

                <div>
                  <label for="Alt Contact No: 2 " class="block mb-2 text-sm font-medium text-gray-900">Contact No &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  {alt2?
                  <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="alt_contno2"
                 //  onChange={handleInputAltChange}
                  // value={values.alt_contno2}
                  defaultvalue={values.alt_contno2}
                  maxLength={10}
                  
                  onKeyPress={handleKeyPress}
                  onBlur={handleAltNoChange}   />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                  </>
                  : <input type="tel" id="Alt Contact No:2 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contno2"
                  // onChange={handleInputAltChange}
                  // value={values.alt_contno2}
                  placeholder="Repeated Value Not Allowed"
                  defaultvalue={values.alt_contno2}
                  maxLength={10}
                  
                  onKeyPress={handleKeyPress}
                  onBlur={handleAltNoChange}  required />}
                </div>

                <div>
                  <label for="Alt Contact 3 " class="block mb-2 text-sm font-medium text-gray-900">Emergency Contact Name 3 &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Alt Contact 3 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contname3"
                  onChange={handleChange}
                  value={values.alt_contname3}
                  required
                  />
                </div>

                <div>
                  <label for="Relationship 1 " class="block mb-2 text-sm font-medium text-gray-900">Relationship &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Relationship 1 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_realtion3"
                   onChange={handleChange} value={values.alt_realtion3} required/>
                </div>


                <div>
                  <label for="Alt Contact No: 3 " class="block mb-2 text-sm font-medium text-gray-900">Contact No&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  {alt3?
                  <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="alt_contno3"
                  //onChange={handleInputAltChange}
                  // value={values.alt_contno3}
                  placeholder="Repeated Value Not Allowed"
                  onKeyPress={handleKeyPress}
                  maxLength={10}
                  defaultvalue={values.alt_contno3}
                  onBlur={handleAltNoChange} required />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                  </>
                  :<input type="tel" id="Alt Contact No: 3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contno3"
                  //onChange={handleInputAltChange}
                  // value={values.alt_contno3}
                  onKeyPress={handleKeyPress}
                  placeholder="Repeated Value Not Allowed"
                  defaultvalue={values.alt_contno3}
                  maxLength={10}
                  onBlur={handleAltNoChange}  required/>}
                </div>



                <div>
                  <label for="Alt Contact 4 " class="block mb-2 text-sm font-medium text-gray-900">Emergency Contact Name 4 &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Alt Contact 4 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contname4"
                   onChange={handleChange}
                   value={values.alt_contname4}
                   required
                   />
                </div>

                <div>
                  <label for="Relationship 1 " class="block mb-2 text-sm font-medium text-gray-900">Relationship&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Relationship 4 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_realtion4"
                   onChange={handleChange} value={values.alt_realtion4} required />
                </div>

                <div>
                  <label for="Alt Contact No: 4 " class="block mb-2 text-sm font-medium text-gray-900">Contact No &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  {alt2?
                  <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="alt_contno4"
                  //onChange={handleInputAltChange}
                  //value={values.alt_contno4}
                  onKeyPress={handleKeyPress}
                  defaultvalue={values.alt_contno4}
                  maxLength={10}
                  onBlur={handleAltNoChange}   />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                  </>
                  : <input type="tel" id="Alt Contact No:2 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contno4"
                  //onChange={handleInputAltChange}
                  //value={values.alt_contno4}
                  placeholder="Repeated Value Not Allowed"
                  onKeyPress={handleKeyPress}
                  defaultvalue={values.alt_contno4}
                  maxLength={10}
                  onBlur={handleAltNoChange}  required />}
                </div>





                <div>
                  <label for="Alt Contact 4 " class="block mb-2 text-sm font-medium text-gray-900">Emergency Contact Name 5 &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Alt Contact 5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contname5"
                   onChange={handleChange}
                   value={values.alt_contname5}
                   required
                   />
                </div>

                <div>
                  <label for="Relationship 5" class="block mb-2 text-sm font-medium text-gray-900">Relationship &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  <input type="text" id="Relationship 5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_realtion5"
                   onChange={handleChange} value={values.alt_realtion5} required />
                </div>

                <div>
                  <label for="Alt Contact No: 5" class="block mb-2 text-sm font-medium text-gray-900">Contact No &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                  {alt2?
                  <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="alt_contno5"
                 // onChange={handleInputAltChange}
                  //value={values.alt_contno5}
                  placeholder="Repeated Value Not Allowed"
                  onKeyPress={handleKeyPress}
                  defaultvalue={values.alt_contno5}
                  maxLength={10}
                  onBlur={handleAltNoChange}   />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                  </>
                  : <input type="tel" id="Alt Contact No:2 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="alt_contno5"
                 // onChange={handleInputAltChange}
                 // value={values.alt_contno5}
                 placeholder="Repeated Value Not Allowed"
                 onKeyPress={handleKeyPress}
                 defaultvalue={values.alt_contno5}
                  maxLength={10}
                  onBlur={handleAltNoChange}   required/>}
                </div>


                </div>
                <br></br>
                <Grid container spacing={2}>

                <Grid item xs={6} sm={6}>

                <button type="button" onClick={()=>setActiveItem("Family Details")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
                sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            &lt; &lt; PREVIOUS</button>

                </Grid>

                <Grid item xs={6} sm={6}>
                <button type="submit" onClick={()=>setActiveItem("Correspondence Details")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
                sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                NEXT &gt; &gt;</button>
                </Grid>
                </Grid>

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

export default Correspondencedetails;
