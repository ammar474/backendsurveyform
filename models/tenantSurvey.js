import mongoose  from "mongoose";

const TenantSurveyScehma =   mongoose.Schema({
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

export const TenantSurvey = mongoose.model('TenantSurvey' , TenantSurveyScehma);