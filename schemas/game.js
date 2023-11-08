import yup from "yup";

export const gameNewSchema = yup.object({
    name: yup.string().required(),
    genre: yup.string().required(),
    members: yup.array(yup.string()).required(),
    edition: yup.number().integer().min(1).max(9999).required(),  
    points: yup.number().default(0),
    deleted: yup.boolean().default(false),   
});

export const gameEditSchema = yup.object({
    name: yup.string(),
    genre: yup.string(),
    members: yup.array(yup.string()),
    edition: yup.number().integer().min(1).max(9999),
    deleted: yup.boolean(),   
});