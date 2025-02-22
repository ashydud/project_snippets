import { usersModel } from "./users.model.js"
import { UserNotFoundError, ValidationError } from "../../utils/handlerErrors.js"
import { generateToken } from "../token/token.route.js"
import { rolesModel } from "../roles/roles.model.js"
import bcrypt from "bcryptjs"

export const registrationUser = async (firstname, lastname, email, password) => {
	if (!firstname || !lastname || !email || !password) {
		throw new ValidationError("Есть незполненные обязательные поля!")
	}

	const userRole = await rolesModel.findOne({ name: "User" })
	console.log(userRole)
	if (!userRole) {
		throw new ValidationError("Role не найдена")
	}
    
	const isUser = await usersModel.findOne({ email })

	if (isUser) {
		throw new ValidationError("Такой email уже используется!")
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const userId = new usersModel({ firstname, lastname, email, password: hashedPassword, role: userRole._id })

	const createdUser = await userId.save()

    return createdUser
}

export const loginUser = async (email, password) => {}
