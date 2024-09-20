import mongoose  from "mongoose";

const FeedbackSchema2 =   mongoose.Schema({
    completedAsRequested: Boolean,
    completedOnTime: Boolean,
    knowledgeableTechnician: Boolean,
    politeTechnician: Boolean,
    unfinishedWork: Boolean,
    cleanedUp: Boolean,
    rating: Number,
    issueDescription: String,
    changesSuggested: String,
    Name: String,
    Email: String


})

export const TenantSurvey = mongoose.model('TenantSurvey' ,  FeedbackSchema2);