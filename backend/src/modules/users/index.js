import { Router } from "express"
import { loginUser, registrationUser } from "./service.js"
import { generateToken } from "../token/index.js"
export const userRouter = Router()

userRouter.post("/registration", async (request, response) => {
	const { username, email, password } = request.body

	try {
		const userId = await registrationUser(username, email, password)
		response.status(201).json({
			data: userId,
			status: "success",
			message: "Пользователь успешно создан!",
		})
	} catch (error) {
		console.log("Ошибка при регистрации: ", error)
		response.status(400).json({
			status: "error",
			message: "Ошибка при регистрации!",
		})
	}
})

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

userRouter.post("/check", async (request, respone) => {

})
