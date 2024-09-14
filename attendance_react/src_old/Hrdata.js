import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid} from '@mui/material';
import server from './server/server';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Hrdata = ({ setActiveItem, setOpen,values,SetValues}) => {

  useEffect(() => {
    const handle = () => {
      setOpen(true);
    }
    handle();
  },
    //eslint-disable-next-line
    [])
  const employee = sessionStorage.getItem("emp_id")
  console.log(employee);
 


  const handleInputAlt1Change = (e) => {
    // Allow only numbers (0-9) and prevent input of other characters
    const numericInput = e.target.value.replace(/\D/g, '');
    SetValues({ ...values, referer_no: numericInput });
  };


  const [altone,setaltone]=useState(false)


  const handleAlt1NoChange = (e) => {
    e.preventDefault()
        const inputNumber = e.target.value;
        console.log(inputNumber.toString())
        if ((inputNumber.length===10)) {
          // Input is a 10-digit number
          SetValues({ ...values, referer_no: inputNumber });
          setaltone(false)
        } else {
          SetValues({ ...values, referer_no: '' });
          setaltone(true)
          
        }
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetValues({
      ...values,
      [name]: value,
    });
  };

  //   const handlesubmit = (e) => {
  //   e.preventDefault();
  //   console.log(values);
  //   //setActiveItem("Hr Data");

  // };
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState({});

  const [showDiv, setShowDiv] = useState(true);
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'no') {
      setShowDiv(false);
    } else {
      setShowDiv(true);
    }
  
 
    SetValues({ ...values, marital_status: selectedValue });
  
  };



  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file); // Directly append the file to FormData
    // formData.append('customer_id', reportdata.customer_id);
    console.log(e.target.name);
    
   await server.post('/upload1', formData)
    .then((res) => {

      console.log(res.data.filename);
      // Assuming res.data contains the uploaded file information
     // const uploadedFile = res.data.file; // Adjust this according to your server response

      console.log(res.data);
        SetValues((p)=>({
          ...p,
          [e.target.name]:res.data.filename,
        }));
     
        // Handle case where uploadedFile or its filename is null or undefined
       // console.log('Uploaded file or filename is null or undefined');
      
    })
      .catch((err) => {
        console.log(err);
      });
  };








  const handlesubmit = async (e) => {

    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        formData.append(key, val);
      });

      const response = await server.put('/hrdetails',values);
      console.log(response.data); // Assuming backend sends back updated data
      setSuccessMessage({ ...successMessage, msg: 'Data stored successfully!' });
      sessionStorage.clear();
      setTimeout(() => {
        setSuccessMessage({ ...successMessage, msg: "" });
        setErrorMessage({ ...errorMessage, msg: "" });
        setActiveItem("Hr Data", response)
        SetValues({});
        setActiveItem("Admission Details")
      }, 3000); // Clear the message after 3 seconds

    } catch (error) {
      console.error('Error updating data:', error);
      setErrorMessage({ ...errorMessage, msg: 'Incorrect To Stored!' });
    }
  };



  return (
    <>
      <Card >
        <CardContent>
          <form onSubmit={handlesubmit}>
            <div class="grid gap-6  md:grid-cols-2">



            <div>
                <label for="Higher Secondary Board" class="block mb-2 text-sm font-medium text-gray-900">Higher Secondary Board&nbsp;<span  class="text-red-600 text-xl">*</span></label>


                <select
                  id="Higher Secondary Board" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="hsc" onChange={handleChange}
                  value={values.hsc}
                  required
                >
                  <option selected>-- SELECT --</option>
                  <option value="StateBoard">State Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="Matric">Matric</option>
                  <option value="ICSE">ICSE</option>
                
                </select>
              </div>

              <div>
                <label for="UG Qualification " class="block mb-2 text-sm font-medium text-gray-900">HSC Percentage&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="UG Percentage " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="hsc_percentage" onChange={handleChange} required
                   />
              </div>

        
              <div>
                <label for="UG Qualification & Branch" class="block mb-2 text-sm font-medium text-gray-900">UG Qualification & Branch</label>
                <input type="text" id="UG Qualification & Branch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="ug_qualification" onChange={handleChange}
                   />
              </div>

              <div>
                <label for="UG Qualification " class="block mb-2 text-sm font-medium text-gray-900">UG Percentage</label>
                <input type="text" id="UG Percentage " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="ug_qualification_percentage" onChange={handleChange}
                   />
              </div>


              {/* <div>
                <label for="PG Qualification & Branch" class="block mb-2 text-sm font-medium text-gray-900">PG Qualification & Branch</label>
                <input type="text" id="PG Qualification & Branch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="PG Qualification & Branch" onChange={handleChange}
                   />
              </div> */}



              <div>
                <label for="Qualification" class="block mb-2 text-sm font-medium text-gray-900">Pg Qualification & Branch</label>
                <input type="text" id="Qualification" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="pg_qualification" onChange={handleChange}
                value={values.qualification}
                   />
              </div>

              <div>
                <label for="PG Qualification " class="block mb-2 text-sm font-medium text-gray-900">PG Percentage</label>
                <input type="text" id="PG Percentage " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="pg_qualification_percentage" onChange={handleChange}
                   />
              </div>


              <div>
                <label for="Certificate Course" class="block mb-2 text-sm font-medium text-gray-900">Certificate Course&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="text" id="Certificate Course" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="certificate_course" onChange={handleChange}
                value={values.certificate_course}
                   />
              </div>

              <div>
                  <label for="experience" class="block mb-2 text-sm font-medium text-gray-900 ">Experience
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <select id="experience" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="experience"  onChange={handleSelectChange}
                  // value={values.marital_status}
                  required
                  >
                    <option selected>-- SELECT --</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  </select>
                </div>

{showDiv &&(
  <>
              <div>
                <label for="Experience (Yrs)" class="block mb-2 text-sm font-medium text-gray-900">Experience (Yrs)&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="number" id="Experience (Yrs)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="exp_years" onChange={handleChange}
                value={values.exp_years}
                   />
              </div>


              <div>
                <label for="pf_uan_no" class="block mb-2 text-sm font-medium text-gray-900">UAN No&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="text" id="pf_uan_no" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="pf_uan_no" onChange={handleChange}
                value={values.pf_uan_no}
                   />
              </div>

              <div>
                <label for="esi" class="block mb-2 text-sm font-medium text-gray-900">ESI No&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="text" id="esi" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="esi" onChange={handleChange}
                value={values.esi}
                   />
              </div>



              <div>
                <label for="Last Employer" class="block mb-2 text-sm font-medium text-gray-900">Last Job / Max Exp. Employer Name&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="text" id="Last Employer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="last_employer" onChange={handleChange}
                value={values.last_employer}
                   />
              </div>

              <div>
                <label for="Last Job" class="block mb-2 text-sm font-medium text-gray-900">Last Job / Max Exp. Job Nature&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="text" id="Last Job" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="last_jobnature" onChange={handleChange}
                value={values.last_jobnature}
                   />
              </div>


              <div>
                <label for="Previous Exp Certificate" class="block mb-2 text-sm font-medium text-gray-900">Previous Exp Certificate&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="file" id="Previous Exp Certificate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="pre_exp" onChange={(e) => handleFileChange(e, 'pre_exp')}
                // value={values.pre_exp}
                   />
              </div>


</>
)}

              {/* <div>
                <label for="Salary" class="block mb-2 text-sm font-medium text-gray-900">Salary</label>
                <input type="text" id="Salary" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="salary" onChange={handleChange}
                value={values.salary}
                   />
              </div> */}

              <div>
                <label for="Inias bought by Me" class="block mb-2 text-sm font-medium text-gray-900">Inias bought by Me&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="text" id="Inias bought by Me" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="inias_bought" onChange={handleChange}
                value={values.inias_bought}
                   />
              </div>


              <div>
                <label for="Reference" class="block mb-2 text-sm font-medium text-gray-900">Referred by&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Reference" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Intech/LinkedIn/Naukri" name="reference" onChange={handleChange}
                value={values.reference} required
                   />
              </div>


              <div>
                <label for="Referer's Detail " class="block mb-2 text-sm font-medium text-gray-900">Referer / Referree Realtionship to Intech &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Referer's Detail " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="referer_det" onChange={handleChange}
                value={values.referer_det} required
                   />
              </div>

              <div>
                <label for="Referer's No " class="block mb-2 text-sm font-medium text-gray-900">Reference Contact No &nbsp;<span  class="text-red-600 text-xl"></span></label>
             
                    {altone?
                  <>
                  <input type="tel" id="username-error" class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500" name="referer_no"
                  onChange={handleInputAlt1Change}
                  value={values.referer_no}
                  maxLength={10}
                  onBlur={handleAlt1NoChange}
                   />
                  <span class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter Correct Digits!</span>
                  </>:<input type="tel" id="Alt Contact No: 1 " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="referer_no"
                  onChange={handleInputAlt1Change}
                  value={values.referer_no}
                  maxLength={10}
                  onBlur={handleAlt1NoChange}
                   />}
              </div>



              {/* <div>
                <label for="Bio-data" class="block mb-2 text-sm font-medium text-gray-900">Bio-data</label>
                <input type="file" id="Bio-data" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="bio_data" onChange={(e) => handleFileChange(e, 'bio_data')}
                   />
              </div> */}



              <div>
                <label for="Certificates PDF" class="block mb-2 text-sm font-medium text-gray-900">Colleage Certificate PDF&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="file" id="Certificates PDF" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="certificate" onChange={(e) => handleFileChange(e, 'certificate')}
                // value={values.certificate}
                   />
              </div>

              <div>
                <label for="E-Aadhaar" class="block mb-2 text-sm font-medium text-gray-900">E-Aadhaar&nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="file" id="E-Aadhaar" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="aadhar_img" onChange={(e) => handleFileChange(e, 'aadhar_img')}
                required
                // value={values.aadhar_img}
                   />
              </div>


              <div>
                <label for="Pan" class="block mb-2 text-sm font-medium text-gray-900">Pan Card &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="file" id="Pan" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="pan_img" onChange={(e) => handleFileChange(e, 'pan_img')}
                required
                // value={values.pan_img}
                   />
              </div>

              <div>
                <label for="Driving License" class="block mb-2 text-sm font-medium text-gray-900">Driving License &nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="file" id="Driving License" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="driving_img" onChange={(e) => handleFileChange(e, 'driving_img')}
                // value={values.driving_img}
                   />
              </div>

              {/* <div>
                <label for="Passport" class="block mb-2 text-sm font-medium text-gray-900">Passport</label>
                <input type="file" id="Passport" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="passport_img" onChange={(e) => handleFileChange(e, 'passport_img')}
                // value={values.passport_img}
                   />
              </div> */}

              <div>
                <label for="Induction Form" class="block mb-2 text-sm font-medium text-gray-900">Induction Form&nbsp;<span  class="text-red-600 text-xl"></span></label>
                <input type="file" id="Induction Form" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="induction_form" onChange={(e) => handleFileChange(e, 'induction_form')}
                // value={values.induction_form}
                   />
              </div>

              {/* <div>
                <label for="Latest Appraisal Form" class="block mb-2 text-sm font-medium text-gray-900">Latest Appraisal Form</label>
                <input type="file" id="Latest Appraisal Form" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="last_appraisal" onChange={(e) => handleFileChange(e, 'last_appraisal')}
                // value={values.last_appraisal}
                   />
              </div> */}

              
              
              <div>
                <label for="Career plan for Next 3 years" class="block mb-2 text-sm font-medium text-gray-900">Career plan for Next 3 years &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="text" id="Career plan for Next 3 years" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="career_plan" onChange={handleChange}
                value={values.career_plan} required
                   />
              </div>




              <div>
                <label for="Sign Image" class="block mb-2 text-sm font-medium text-gray-900" style={{ color: "#0072bc", fontSize: "17px" }}>Employee Sign Image &nbsp;<span  class="text-red-600 text-xl">*</span></label>
                <input type="file" id="Sign Image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="employee_sign" onChange={(e) => handleFileChange(e, 'employee_sign')} required
                // value={values.employee_sign}
                   />
              </div>




            </div>
            <br></br>
            <Grid container spacing={2}>

              <Grid item xs={6} sm={6}>

                <button type="submit" onClick={() => setActiveItem("Correspondence Details")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
              sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ fontSize: '13px' }}>
                  &lt; PREVIOUS</button>

              </Grid>

              <Grid item xs={6} sm={6} >
                <button type="submit" onClick={() => setActiveItem("Hr Data")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
              sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ float: 'right' }}>
                  Finish &gt; </button>
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

export default Hrdata;
