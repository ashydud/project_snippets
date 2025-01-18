import { rolesModel } from "./roles.model.js"
import { RoleNotFoundError, ValidationError } from "../../utils/handlerErrors.js"

export const createRole = async (name) => {
	if (!name) {
		throw new ValidationError("Имя Role'и обязательное для заполнения!")
	}

	try {
		const isRole = await rolesModel.findOne({ name })
		if (isRole) {
			throw new ValidationError("Role с таким именем уже существует!")
		}

		const newRole = rolesModel({ name })
		const createRole = await newRole.save()

		return createRole
	} catch (error) {
		throw new ValidationError("Ошбика при создании Role")
	}
}

export const getRoleById = async (id) => {
    try {
        const isRole = await rolesModel.findById({ id })

        if (!isRole) {
            return "error"
        }

        return isRole
    } catch (error) {
        throw new ValidationError("Role не найден")
    }
}

export const getRoles = async () => {
    try {
        const roles = rolesModel.find()

        return roles
    } catch (error) {
        throw new RoleNotFoundError("Role'и не найдены")
    }
}

export const updateRoleById = async (id, name) => {
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        throw new ValidationError("Имя роли обязательное и должно быть строкой")
    }

    try {
        const updatedRole = await rolesModel.findByIdAndUpdate(id, { name }, { new: true })

        if (!updatedRole) {
            throw new ValidationError("Role не найден!")
        }

        return updatedRole
    } catch (error) {
        throw new ValidationError("Ошибка при обновлении Role!")
    }
}

export const deleteRoleById = async (id) => {
    try {
        const deletedRole = await rolesModel.findByIdAndDelete(id)
        if (!deletedRole) {
            throw new RoleNotFoundError("Role не найден!")
        }
        return deletedRole
    } catch (error) {
        throw new RoleNotFoundError("Ошибка при удалении Role")
    }
}
