import Joi from "joi";

export const register= Joi.object({
    username: Joi.string().min(3).max(20).required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().required()
})

export const login= Joi.object({
    usernameOrMobile: Joi.string().required(),
    password: Joi.string().required()
})
