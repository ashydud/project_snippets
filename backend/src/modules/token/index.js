import { configENV } from "../../config.js"
import jwt from "jsonwebtoken"

export const generateToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
		},
		configENV.jwt,
		{ expiresIn: "1h" },
	)
}

export const middlewareVerifyToken = (request, response, next) => {
	const authHeader = request.headers["authorization"]
	if (authHeader) {
		const token = authHeader.split(" ")[1]
		if (!token) {
			return response.status(401).json({
				status: "error",
				message: "Ошибка аутентификации!",
			})
		}

		try {
			const decoded = jwt.verify(token, configENV.jwt)
			request.user = decoded
			next()
		} catch (error) {
			return response.status(403).json({
				status: "error",
				message: "Неверный токен!",
			})
		}
	} else {
		return response.status(401).json({
			status: "error",
			message: "Ошибка аутентификации!",
		})
	}
}
