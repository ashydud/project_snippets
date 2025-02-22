import { request, response, Router } from "express"
import { loginUser, registrationUser } from "./users.service.js"
import { CustomError,  ValidationError } from "../../utils/handlerErrors.js"
import { generateToken } from "../token/token.route.js"

export const userRouter = Router()

// Регистрация
userRouter.post("/registration", async (request, response) => {
	const { firstname, lastname, email, password } = request.body

	try {
		const userId = await registrationUser(firstname, lastname, email, password)

		response.status(201).json({
			data: userId,
			status: "success",
			message: "Пользователь успешно создан!",
		})
	} catch (error) {
		if (error instanceof CustomError) {
			return response.status(error.statusCode).json({
				status: error.status,
				message: error.message,
			})
		}
		console.log("Ошибка при регистрации: ", error)
		response.status(400).json({
			status: "error",
			message: "Ошибка при регистрации!",
		})
	}
})


// Login
userRouter.post("/login", async (request, response) => {
	const { email, password } = request.body

	try {
		const user = await loginUser(email, password)

		if (user) {
			const token = generateToken(user)

			response.status(201).json({
				status: "success",
				data: {
					id: user.id,
					username: user.username,
					email: user.email,
					token,
				},
			})
		} else {
			response.status(500).json({
				status: "error",
				message: "Ошибка!",
			})
		}
	} catch (error) {
		response.status(400).json({ status: "error", message: error })
	}
})

userRouter.post("/check", async (request, respone) => {})
