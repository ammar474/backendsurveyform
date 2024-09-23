import mongoose  from "mongoose";

const ClientSurveySchema = mongoose.Schema({
    companyName: String,
    servicesGiven: String,
    date: String,
    completedAsRequested: Boolean,
    completedOnTime: Boolean,
    knowledgeableTechnician: Boolean,
    politeTechnician: Boolean,
    unfinishedWork: Boolean,
    cleanedUp: Boolean,
    rating: Number,
    issueDescription: String,
    changesSuggested: String,
     name: String,
     email: String,
     created_at : {
        type : Date,
        default:Date.now
     }


})

export const  ClientSurvey   = mongoose.model('ClientSurvey' ,  ClientSurveySchema);
