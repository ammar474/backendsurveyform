import express from "express";
import jwt from "jsonwebtoken";
import authenticationToken from "../middleware/middleWare.js";
import { JWT_SECRET } from "../config.js";
import { ClientSurvey } from "../models/clientSurvyForm.js";
import { TenantSurvey } from "../models/tenantSurvey.js";

const formRouter = express.Router();

formRouter.post("/login", async (req, res) => {

   const { email, password } = req.body
   if (!email && !password) {
      return res.status(401).send({ message: "please fill the field" });
   }
   if (email == "xyz@gmail.com" && password == "abc") {
      const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      return res.status(201).send({ message: "login succesful", token: token });
   } else {
      return res.status(401).send({ message: "Invalid Cradential" });
   }
});

formRouter.post("/ClientSurvey", async (req, res) => {
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

formRouter.post("/TenanTsurvey", async (req, res) => {

     const {
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
     } = req.body
   try {
      const newtenantData ={
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
         email,
      }
      const addTenantSurveyData = new TenantSurvey(newtenantData);
       const getTenanTsurvey = await addTenantSurveyData.save();
      res.status(200).send({getTenanTsurvey });
   } catch (error) {
      res.status(500).send({message : error.message});
   }
  

});

formRouter.get("/GetDataClientSurvey", authenticationToken, async (req, res) => {

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

formRouter.get("/GetDataTenantSurvey", authenticationToken, async (req, res) => {

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

formRouter.get("/GetDetails/:id",  authenticationToken , async (req, res) => {
   try {
      const { id } = req.params
      const getClientSurveyById = await ClientSurvey.findById(id);
      const getTenantSurveyById = await TenantSurvey.findById(id);
      if (getClientSurveyById) { return res.status(200).send({ clientSurveyData: getClientSurveyById })}
      else if (getTenantSurveyById) { return res.status(200).send({tenantSurveydata: getTenantSurveyById })}
      else { return res.status(402).send({ message: "data not found" }) }
   }
   catch (error) {
      return res.status(500).send({ message: error.message });
   }
});

formRouter.get("/ItemsClientSurvey" , authenticationToken ,  async (req , res ) => {
      
         const page  = req.query.page;
         const limit = req.query.limit;
         const skip = (page - 1) * limit;
         const searchQuery = req.query.name ;

         try {
              const query = searchQuery ? {name : { $regex: searchQuery, $options: 'i' }} : {};
               const items = await ClientSurvey.find(query , { name : 1 , email: 1 , rating : 1 , created_at : 1 , companyName : 1  }).skip(skip).limit(limit);
               const total = await ClientSurvey.countDocuments(query);
               if(items){ return  res.status(201).send({items,total,})} 
                else{
                  return res.status(401).send({message : "items not found"});
                }
         } catch (error) {
            console.log(error);
            return res.status(500).send({message : error.message});
         }  
});

formRouter.get("/ItemsTenantSurvey" , authenticationToken , async (req , res ) => {
      
   const page  = req.query.page;
   const limit = req.query.limit;
   const skip = (page - 1) * limit;
   const searchQuery = req.query.name;

   try {
         const query = searchQuery ? {name : { $regex: searchQuery, $options: 'i' }} : {};
         const items = await TenantSurvey.find(query , { name : 1 , email: 1 , rating : 1 , created_at : 1  }).skip(skip).limit(limit);
         const total = await TenantSurvey.countDocuments(query);
         if(items){ return  res.status(201).send({items,total})} 
          else{
            return res.status(401).send({message : "items not found"});
          }
   } catch (error) {
      console.log(error);
      return res.status(500).send({message : error.message});
   }  
});


export default formRouter; 

