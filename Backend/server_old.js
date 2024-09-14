const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static('upload'))

const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"erp_live"
    }
)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      var gy=file.mimetype.split('/')
      cb(null, file.fieldname + '_' + Date.now() +'.'+  gy[1]);
    },
  });
  const upload = multer({ storage: storage });
//const upload = multer({ dest: 'uploads/' }); // Specify the upload directory


app.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.body);
  res.send(req.file);
}
)


const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/document');
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Get the file extension
    cb(null, file.fieldname + '_' + Date.now() + fileExtension);
  },
});
const upload1 = multer({ storage: storage1 });
app.post('/upload1', upload1.single('file'), async (req, res) => {
  res.send(req.file);
});





app.post('/students', (req, res) => {
    
    console.log(req.body.facility);

    let facility = '';
    let facility_type = '';
    if (req.body.facility && req.body.facility.length > 0) {
      const commaSeparatedValues = req.body.facility.join(' ');
      facility = commaSeparatedValues.replace(/ /g, "_");

      const commafacility_typeValues = req.body.facility_type.join(' ');
      facility_type = commafacility_typeValues.replace(/ /g, "_");
    }
    




    console.log(facility);
    const photoPath = req.body.photo; // This gives you the path where the file is stored


    const sql = "INSERT INTO `new_employee`(`employee_id`, `company_id`, `emp_name`, `initial`, `photo`, `direct_no`, `bank_ac`, `bank_details`,`bank_ifsc`, `pan_no`, `aadhar_no`,`aadhar_name`,`aadhar_linkedno`, `passport_no`, `facility`,`facility_type`) VALUES (?)";

    const values = [
        req.body.employee_id,
        req.body.company_id,
        req.body.emp_name,
        req.body.initial,
        req.body.photo, 
        req.body.direct_no,
        req.body.bank_ac,
        req.body.bank_details,
        req.body.bank_ifsc,
        req.body.pan_no,
        req.body.aadhar_no,
        req.body.aadhar_name,
        req.body.aadhar_linkedno,
        req.body.passport_no,
        facility,
        facility_type,
        
    ];
    db.query(sql, [values], (err, result) => {
        console.log(err, result);
        if (err) return res.json(result);
        // Handle successful insertion
        res.json({ message: 'Data inserted successfully' });
      });
});



// Route to fetch all employees
app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employee ORDER BY employee_id DESC LIMIT 1';
  const sql2 = 'SELECT * FROM new_employee ORDER BY emp_id DESC LIMIT 1';

  db.query(sql, (err, results) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Failed to fetch employee data' });
      }

      db.query(sql2, (err, result2) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Failed to fetch new_employee data' });
          }

          // Combine the results from both queries into a single JSON response
          const combinedResults = {
              employeeData: results,
              newEmployeeData: result2
          };

          res.json(combinedResults); // Send the combined data as JSON response
      });
  });
});



// Update route
app.put('/personaldetails', (req, res) => {
   
    const dataToUpdate = req.body;
    const lang=dataToUpdate.languages.join(',');
 //console.log(lang);
    // console.log(dataToUpdate) // Assuming data is sent as JSON
    console.log(req.body);
    const idToUpdate = req.body.emp_id; // Provide the ID of the record you want to update
  
    
    const sql = ` UPDATE new_employee 
SET 
    dob = '${req.body.dob}',
    certificate_dob = '${req.body.certificate_dob}',
    age = '${req.body.age}', 
    sex = '${req.body.sex}', 
    blood_group = '${req.body.blood_group}', 
    alergies = '${req.body.alergies}', 
    height = '${req.body.height}', 
    weight = '${req.body.weight}', 
    eye_power = '${req.body.eye_powerR}'||'${req.body.eye_powerL}', 
    sugar = '${req.body.sugar}',
    cholestral = '${req.body.cholestral}', 
    smoking = '${req.body.smoking}', 
    alcohol = '${req.body.alcohol}', 
    hospital_details = '${req.body.hospital_details}',
    languages = '${lang}',
    native_tongue = '${req.body.native_tongue}',
    personal_no ='${req.body.personal_no}', 
    personal_email = '${req.body.personal_email}',
    facebook = '${req.body.facebook}',
    linkedin = '${req.body.linkedin}'
WHERE 
    emp_id = '${idToUpdate}' `;

console.log(sql);

    db.query(
      sql,
      (error, results) => {
        if (error) {
          console.error('Error updating data:', error);
          res.status(500).json({ error: 'Error updating data' });
          return;
        }
        console.log(sql);
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
      }
    );
  });




// Update route
app.put('/familydetails', (req, res) => {
    console.log(req.body);
    //const dataToUpdate = req.body; // Assuming data is sent as JSON
    const idToUpdate = req.body.emp_id;  // Provide the ID of the record you want to update
  const kid_dob= req.body.kid_dob.reduce((item,acc)=>item+'/'+acc)
   // console.log(dataToUpdate);
    const sql = ` UPDATE new_employee 
    SET 
    marital_status = '${req.body.marital_status}', 
    anniversary = '${req.body.anniversary}', 
    spouse_name = '${req.body.spouse_name}', 
    spouse_job = '${req.body.spouse_job}', 
    kid_name = '${req.body.kid_name}',
    kid_dob = '${kid_dob}',
    nomine_name = '${req.body.nomine_name}',
    nomine_relat = '${req.body.nomine_relat}',
    father_name = '${req.body.father_name}', 
    job = '${req.body.job}', 
    father_no = '${req.body.father_no}', 
    spouse_no = '${req.body.spouse_no}',
    fam_income = '${req.body.fam_income}',
    fam_liabilities = '${req.body.fam_liabilities}',
    fam_worth = '${req.body.fam_worth}',
    house = '${req.body.house}'
    WHERE 
        emp_id = '${idToUpdate}' `;
    
    db.query(
      sql,
      (error, results) => {
       
        if (error) {
          console.error('Error updating data:', error);
          res.status(500).json({ error: 'Error updating data' });
          return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
      }
    );
  });



// Update route
app.put('/correspondingdetails', (req, res) => {
    console.log(req.body);
    const  {present_address,present_address_verified,permanent_address,permanent_address_verified,permanent_address_proof,alt_contname1,alt_realtion1,alt_contno1,alt_contname2,alt_realtion2,alt_contno2,alt_contname3,alt_realtion3,alt_contno3,alt_contname4,alt_realtion4,alt_contno4,alt_contname5,alt_realtion5,alt_contno5}=req.body;


    const dataToUpdate = req.body; // Assuming data is sent as JSON
    const idToUpdate = req.body.emp_id;  // Provide the ID of the record you want to update
  
    const sql = `UPDATE new_employee SET present_address= '${present_address}',permanent_address='${permanent_address}',alt_contname='${alt_contname1}|${alt_contname2}|${alt_contname3}|${alt_contname4}|${alt_contname5}',alt_realtion ='${alt_realtion1}|${alt_realtion2}|${alt_realtion3}|${alt_realtion4}|${alt_realtion5}',alt_contno='${alt_contno1}|${alt_contno2}|${alt_contno3}|${alt_contno4}|${alt_contno5}'  WHERE emp_id = '${idToUpdate}'`;

    db.query(
      sql,
      (error, results) => {
        if (error) {
          console.error('Error updating data:', error);
          res.status(500).json({ error: 'Error updating data' });
          return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
      }
    );
  });




// Update route
app.put('/hrdetails', (req, res) => {
  console.log(req.body);
  const formData = req.body;
  const files = req.files;
  const {
    hsc,hsc_percentage,ug_qualification,pg_qualification,ug_qualification_percentage,pg_qualification_percentage, certificate_course, exp_years, last_employer,last_jobnature, salary, reference,pf_uan_no,esi,
    referer_det, referer_no, bio_data, certificate, emp_contract, employee_sign,pan_img,aadhar_img,
    driving_img, passport_img, induction_form, last_appraisal, pre_exp,inias_bought,career_plan
  } = req.body;

  const sql = `UPDATE new_employee SET
    hsc = '${hsc || ''}|${hsc_percentage || ''}',
    qualification = '${ug_qualification || ''}|${pg_qualification || ''}',
    qualification_percentage = '${ug_qualification_percentage || ''}|${pg_qualification_percentage || ''}',
    certificate_course = '${certificate_course || ''}',
    exp_years = '${exp_years || ''}',
    pf_uan_no = '${pf_uan_no || ''}',
    esi = '${esi || ''}',
    last_employer = '${last_employer || ''}',
    last_job_nature = '${last_jobnature || ''}',
    salary = '${salary || ''}',
    reference = '${reference || ''}',
    referer_det = '${referer_det || ''}',
    referer_no = '${referer_no || ''}',
    bio_data = '${bio_data || ''}',
    pan_img = '${pan_img || ''}',
    aadhar_img = '${aadhar_img || ''}',
    inias_bought = '${inias_bought || ''}',
    certificate = '${certificate || ''}',
    employee_sign = '${employee_sign || ''}',
    driving_img = '${driving_img || ''}',
    passport_img = '${passport_img || ''}',
    induction_form = '${induction_form || ''}',
    last_appraisal = '${last_appraisal || ''}',
    pre_exp = '${pre_exp || ''}',
    career_plan = '${career_plan || ''}'
  WHERE emp_id = '${req.body.emp_id}'`;

 // console.log(sql);

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data');
    }
    console.log('Data updated successfully:', result);
    res.send('Data updated successfully');
  });
});




app.listen(8081,()=>{
    console.log("listening on port8081");
})