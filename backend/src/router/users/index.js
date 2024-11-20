import { Router } from "express"
import { loginUser, registrationUser } from "./service.js"
export const userRouter = Router()

userRouter.post("/registration", async (request, response) => {
    const {
        username,
        email,
        password
    } = request.body

    try {
        const userId = await registrationUser(username, email, password)
        response.status(201).json({
            data: userId,
            status: "success",
            message: "Пользователь успешно создан!"
        })
    } catch (error) {
        console.log("Ошибка при регистрации: ", error)
        response.status(400).json({
            status: "error",
            message: "Ошибка при регистрации!"
        })
    }
})

userRouter.post("/login", async (request, response) => {
    const {email, password} = request.body

    try {
        const message = await loginUser(email, password)
        response.status(201).json({status: "success", message})
    } catch (error) {
        response.status(400).json({status: "error", message: error})
    }
})
