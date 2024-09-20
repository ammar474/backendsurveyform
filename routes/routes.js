import express from "express";
import jwt from "jsonwebtoken";
import authenticationToken from "../middleware/middleWare.js";
import { JWT_SECRET } from "../confige.js";
import { ClientSurvey } from "../models/clientSurvyForm.js";
import { TenantSurvey } from "../models/tenantSurvey.js";

const formRouter = express.Router();

formRouter.post("/login", async (req, res) => {

   const { email, password } = req.body
   if (!email || !password) {
      return res.status(401).send({ message: "please fill the field" });
   }
   if (email == "xyz@gmail.com" || password == "abc") {
      const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      return res.status(201).send({ message: "login succesful", token: token });
   } else {
      return res.status(401).send({ message: "Invalid Cradential" });
   }
});

formRouter.post("/clientsurvey", async (req, res) => {
   const {
      companyName,
      servicesGiven,
      date,
      completedAsRequested,
      completedOnTime,
      knowledgeableTechnician,
      politeTechnician,
      unfinishedWork,
      cleanedUp,
      rating,
      issueDescription,
      changesSuggested,
      name,
      email } = req.body
   try {
      const newData = {
         companyName,
         servicesGiven,
         date,
         completedAsRequested,
         completedOnTime,
         knowledgeableTechnician,
         politeTechnician,
         unfinishedWork,
         cleanedUp,
         rating,
         issueDescription,
         changesSuggested,
         name,
         email
      }

      const feedbackData = new ClientSurvey(newData);
      await feedbackData.save();
      res.status(200).send('Feedback submitted successfully');
   } catch (error) {
      res.status(500).send('Error submitting feedback');
   }
   console.log(req.body);
});

formRouter.post("/tenantsurvey", async (req, res) => {
   try {
      const feedbackData2 = new TenantSurvey(req.body);
      await feedbackData2.save();
      res.status(200).send('Feedback submitted successfully');
   } catch (error) {
      res.status(500).send('Error submitting feedback');
   }
   console.log(req.body);

});

formRouter.get("/getdataclientsurvey", authenticationToken, async (req, res) => {

   try {
     
      const data = await ClientSurvey.find();
      if (!data ) { return res.status(401).send({ message: "data not found" }) }
      else {
         res.status(201).send({ clientSurvey: data })
      }
   } catch (error) {
      return res.status(500).send({ message: error.message });
   }
});

formRouter.get("/getdatatenantsurvey", authenticationToken, async (req, res) => {

   try {
      const tenantData = await TenantSurvey.find();

      if (!tenantData) { return res.status(401).send({ message: "data not found" }) }
      else {
         res.status(201).send({ tenantSurvey: tenantData });
      }
   } catch (error) {
      return res.status(500).send({ message: error.message });
   }
});

formRouter.get("/getdetails/:id",  authenticationToken , async (req, res) => {
   try {
      const { id } = req.params
      const getClientSurveyById = await ClientSurvey.findById(id);
      const getTenantSurveyById = await TenantSurvey.findById(id);
      if (getClientSurveyById) { return res.status(200).send({ data: getClientSurveyById })}
      else if (getTenantSurveyById) { return res.status(200).send({ data: getTenantSurveyById })}
      else { return res.status(402).send({ message: "data not found" }) }
   }
   catch (error) {
      return res.status(500).send({ message: error.message });
   }
});

export default formRouter; 
