import React, { useState, useEffect } from "react";
import { Card, CardContent,  Grid} from "@mui/material";
import server from './server/server';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
//import { useLocation } from 'react-router-dom';

const Personaldetais = ({ setActiveItem, setOpen,values,SetValues }) => {
  const [personal, setpersonal] = useState(false);

  useEffect(
    () => {
      const handle = async () => {
        setOpen(true);
        
        server.get('/employees').then((res) => {
          sessionStorage.setItem("emp_id", res.data.newEmployeeData[0].emp_id);
          const emp_id = sessionStorage.getItem("emp_id");
          SetValues({ ...values, emp_id: emp_id });
        });
      };
      handle();
    },
    //eslint-disable-next-line
    []
  );
  const emp_id = sessionStorage.getItem("emp_id");
  console.log(emp_id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetValues({
      ...values,
      [name]: value,
    });
    
  };

  
  const handleChangeSameAs = (e) => {
    const { name, value, type, checked } = e.target;
    SetValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? (checked ? values.dob : '') : value,
    }));
  };

  const handleInputChange = (e) => {
    setpersonal(false);
    // Allow only numbers (0-9) and prevent input of other characters
    const numericInput = e.target.value.replace(/\D/g, "");
    SetValues({ ...values, personal_no: numericInput });
  };

  const handlepersonalNoChange = (e) => {
    e.preventDefault();

    const inputNumber = e.target.value;
    console.log(inputNumber.toString());
    if (inputNumber.length === 10) {
      // Input is a 10-digit number
      SetValues({ ...values, personal_no: inputNumber });
      setpersonal(false);
    } else {
      SetValues({ ...values, personal_no: "" });
      setpersonal(true);
      // Input is not a 10-digit number, clear the input field
      // alert('Please enter a 10-digit mobile number.');
    }
  };
  const [languages, setLanguages] = useState([]);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setLanguages([...languages, value]);
      SetValues({ ...values, languages: [...values.languages, value] });
    } else {
      SetValues({
        ...values,
        languages: values.languages.filter((item) => item !== value),
      });
      setLanguages(languages.filter((lang) => lang !== value));
    }
  };
  console.log(values);

  const [langbox, setlangbox] = useState({open: false});
  const [age, setAge] = useState();

  //console.log(age);
  useEffect(() => {
    const btdate = () => {
      const dob = values.dob;
      // console.log(dob);
      if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          calculatedAge--;
        }

        setAge(calculatedAge.toString());
        SetValues({
          ...values,
          age: calculatedAge.toString(),
        });
        
      }
    };
    btdate();
  }, [values.dob]);

  const [errorMessage, setErrorMessage] = useState({});

  const [successMessage, setSuccessMessage] = useState({});

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(values);
      const response = server.put('/personaldetails',values);
      console.log(response.data); // Assuming backend sends back updated data
      setSuccessMessage({
        ...successMessage,
        msg: "Data stored successfully!",
      });
      setTimeout(() => {
        setSuccessMessage({ ...successMessage, msg: "" });
        setErrorMessage({ ...errorMessage, msg: "" });
        setActiveItem("Family Details");
      },2000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Error updating data:", error);
      setErrorMessage({ ...errorMessage, msg: "Incorrect To Stored!" });
    }
  };

  // const { search } = useLocation();
  // const queryParams = new URLSearchParams(search);
  // const isSuccess = queryParams.get('success');

  return (
    <>
      <Card>
        <CardContent>
          {/* {isSuccess && <p>Data stored successfully!</p>} */}

          <form onSubmit={handlesubmit}>
            <div class="grid gap-6  md:grid-cols-2">

              <div>
                <label
                  for="Date of Birth "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Date of Birth{" "}
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <input
                  type="date"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  required
                />
              </div>



              <Grid container spacing={2}>

              <Grid item xs={12} sm={12} md={4} lg={4}  xl={4}>

              <div class="flex items-center mb-5"  style={{marginTop:"25px"}}>
                  <input id="default-checkbox" type="checkbox" value="Yes" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="dob_verified"
                  onChange={handleChangeSameAs} // Add onChange event handler here
                  />
                  <label for="default-checkbox" class="block mb-0 text-sm font-medium text-gray-900 "> &nbsp; &nbsp; Same as Dob</label>
                </div>

                </Grid>

                
                <Grid item  xs={12} sm={12} md={8} lg={8} xl={8}>
                <label
                  for="Date of Birth "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                 Certificate DOB{" "}
                 &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="certificate_dob"
                  value={values.dob_verified ? values.dob : values.certificate_dob}
                  onChange={handleChange}
                  disabled={values.dob_verified}// Disable if checkbox is checked
                  required
                />
              </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <label
                    for="Age "
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Age
                    &nbsp;<span  class="text-red-600 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    id="Age"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={age}
                    name="age"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <div class="flex">
                    <div
                      class="flex items-center me-4"
                      style={{ marginTop: "30px" }}
                    >
                      
                      <input
                        id="inline-radio"
                        type="radio"
                        value="Male"
                        name="sex"
                        checked={values.sex === 'Male'}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleChange}
                      />
                      <label
                        for="inline-radio"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Male
                      </label>
                    </div>
                    &nbsp; &nbsp;
                    <div
                      class="flex items-center me-4 "
                      style={{ marginTop: "30px" }}
                    >
                      <input
                        id="inline-2-radio"
                        type="radio"
                        value="Femail"
                        name="sex"
                        checked={values.sex === 'Femail'}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleChange}
                      />
                      <label
                        for="inline-2-radio"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <div>
                <label
                  for="Blood Group"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Blood Group
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <select
                  id="Blood Group"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="blood_group"
                  value={values.blood_group}
                  onChange={handleChange}
                  required
                >
                  <option selected>-- SELECT --</option>
                  <option value="O Positive">O Positive</option>
                  <option value="O Negative">O Negative</option>
                  <option value="A Positive">A Positive</option>
                  <option value="A Negative">A Negative</option>
                  <option value="B Positive">B Positive</option>
                  <option value="B Negative">B Negative</option>
                  <option value="AB Positive">AB Positive</option>
                  <option value="AB Negative">AB Negative</option>
                  <option value="A1 Negative">A1 Negative</option>
                  <option value="A1 Positive">A1 Positive</option>
                  <option value="A1B Negative">A1B Negative</option>
                  <option value="A1B Positive">A1B Positive</option>
                  <option value="A2 Negative">A2 Negative</option>
                  <option value="A2 Positive">A2 Positive</option>
                  <option value="A2B Negative">A2B Negative</option>
                  <option value="A2B Positive">A2B Positive</option>
                  <option value="B1 Positive">B1 Positive</option>
                </select>
              </div>

              <div>
                <label
                  for="Allergies "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Allergies
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <input
                  type="text"
                  id="Allergies"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="alergies"
                  value={values.alergies}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  for="Height (cm) "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Height (cm)
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <input
                  type="text"
                  id="Height (cm)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="height"
                  value={values.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  for="Weight in KG "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                 Weight in (KG)
                 &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <input
                  type="text"
                  id="Weight in (KG)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="weight"
                  value={values.weight}
                  onChange={handleChange}
                  required
                />
              </div>


<Grid container spacing={2}>
  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}> 
              
                <label
                  for="Eye Power "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Eye Power (Right)

                </label>
                <input
                  type="text"
                  id="Eye Power"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="eye_powerR"
                  value={values.eye_power}
                  onChange={handleChange}
                />
              
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}> 


              
              <label
                  for="Eye Power "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Eye Power (Left)
                </label>
                <input
                  type="text"
                  id="Eye Power"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="eye_powerL"
                  //value={values.eye_power}
                  onChange={handleChange}
                />
                </Grid>


              </Grid>
              <div>
                <label
                  for="Sugar Level"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                 Sugar Level
                </label>
                <select
                  id="Sugar Level"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="sugar"
                  value={values.sugar}
                  onChange={handleChange}
                >
                  <option selected>-- SELECT --</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                
                </select>
              </div>


              <div>
                <label
                  for="Cholestral Level"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                Cholestral Level
                </label>
                <select
                  id="Cholestral Level"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="cholestral"
                  value={values.cholestral}
                  onChange={handleChange}
                >
                  <option selected>-- SELECT --</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                
                </select>
              </div>

        


              <div>
                <label
                  for="Alcohol Habbit"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                 Alcohol Habbit
                 &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <select
                  id="Alcohol Habbit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="alcohol"
                  value={values.alcohol}
                  onChange={handleChange}
                  required
                >
                  <option selected>-- SELECT --</option>
                  <option value="No">No</option>
                  <option value="Occassional">Occassional</option>
                  <option value="Regular">Regular</option>
                
                </select>
              </div>


              <div>
                <label
                  for="Smoking Habbit"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
               Smoking Habbit
                </label>
                <select
                  id="Smoking Habbit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="smoking"
                  onChange={handleChange}
                  value={values.smoking}
                >
                  <option selected>-- SELECT --</option>
                  <option value="No">No</option>
                  <option value="Occassional">Occassional</option>
                  <option value="Regular">Regular</option>
                
                
                </select>
              </div>

                    
              <div>
                <label
                  for="Hospitalisation Details if any "
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Hospitalisation Details if any Surgery
                </label>
                <input
                  type="text"
                  id="Hospitalisation Details if any Surgery"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="hospital_details"
                  value={values.hospital_details}
                  onChange={handleChange}
                />
              </div>





              <div onMouseLeave={()=>setlangbox((p)=>({...p,open:false}))}>
                <label for="Spoken Languages" class="block mb-2 text-sm font-medium text-gray-900 ">Spoken Languages
                &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <input type="text" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                   value={values.languages ?values.languages: languages.join(', ')}   onClick={()=>setlangbox((p)=>({...p,open:true}))} required/>
               {langbox.open&& <div >
                  <label>
                    <input type="checkbox" value="Tamil" checked={values.languages.includes('Tamil')} onChange={handleCheckboxChange} />
                    Tamil
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="English" checked={values.languages.includes('English')}  onChange={handleCheckboxChange} />
                    English
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Malayalam" checked={values.languages.includes('Malayalam')}  onChange={handleCheckboxChange} />
                    Malayalam
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Telugu" checked={values.languages.includes('Telugu')}  onChange={handleCheckboxChange} />
                    Telugu
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Kannada" checked={values.languages.includes('Kannada')} onChange={handleCheckboxChange} />
                    Kannada
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Hindi" checked={values.languages.includes('Hindi')} onChange={handleCheckboxChange} />
                    Hindi
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Others" checked={values.languages.includes('Others')} onChange={handleCheckboxChange} />
                    Others Languages
                  </label>
                  <br />
                  
                </div>}
                
              </div>

              <div>
                <label
                  for="Native Tongue"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mother Tongue
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>

                <select
                  id="Native Tongue"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="native_tongue"
                  value={values.native_tongue}
                  onChange={handleChange} required
                >
                  <option >-- SELECT --</option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Others">Others</option>
                </select>
                
              </div>

              <div>
                <label
                  for="Personal No"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Personal No
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>

                {personal ? (
                  <>
                    <input
                      type="tel"
                      id="username-error"
                      class="bg-red-50 border border-red-300 text-red-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-600 dark:placeholder-red-400  dark:focus:ring-red-500 dark:focus:border-red-500"
                      name="personal_no"
                      maxLength={10}
                      onChange={handleInputChange}
                      onBlur={handlepersonalNoChange}
                      value={values.personal_no}
                    />{" "}
                    <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span class="font-medium">Oops!</span> Enter Correct
                      Digits!
                    </span>
                  </>
                ) : (
                  <input
                    type="tel"
                    id="Personal No"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="personal_no"
                    onBlur={handlepersonalNoChange}
                    maxLength={10}
                    onChange={handleInputChange}
                    value={values.personal_no}
                    required
                  />
                )}
              </div>

              <div>
                <label
                  for="Personal Email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Personal Email
                  &nbsp;<span  class="text-red-600 text-xl">*</span>
                </label>
                <input
                  type="email"
                  id="Personal Email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="personal_email"
                  value={values.personal_email} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  for="Facebook"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Facebook
                </label>
                <input
                  type="text"
                  id="Facebook"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="facebook"
                  value={values.facebook} 
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  for="Linkedin"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Linkedin
                </label>
                <input
                  type="text"
                  id="Linkedin"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="linkedin"
                  value={values.linkedin} 
                  onChange={handleChange}
                />
              </div>

            </div>

            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <button
                  type="button"
                  onClick={() => setActiveItem("Admission Details")}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
                sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ fontSize: "13px" }}
                >
                  &lt; PREVIOUS
                </button>
              </Grid>

              <Grid item xs={6} sm={6}>
                <button
                  type="submit"
                  onClick={() => setActiveItem("Personal Details")}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full
                sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ float: "right" }}
                >
                  NEXT &gt;{" "}
                </button>
              </Grid>
            </Grid>

            <Stack sx={{ width: "100%" }} spacing={2}>
              {successMessage.msg && (
                <Alert severity="success">
                  {successMessage.msg && <p>{successMessage.msg}</p>}
                </Alert>
              )}
              {errorMessage.msg && (
                <Alert severity="error">
                  {errorMessage.msg && <p>{errorMessage.msg}</p>}
                </Alert>
              )}
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Personaldetais;
