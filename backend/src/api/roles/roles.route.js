import { Router } from "express"
import { createRole } from "./roles.service.js"

export const rolesRouter = Router()

// Создание
rolesRouter.post("/create", async (request, response) => {
    const { name } = request.body

    try {
        const role = await createRole(name)

        response.status(201).json({
            data: role,
            status: "success",
            message: "Role успешно создан!",
        })
    } catch (error) {
        if (error instanceof CustomError) {
            return response.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            })
        }

        response.status(500).json({
            status: "error",
            message: "Server error",
        })
    }
})

// Редактирование
rolesRouter.patch("/:id", async (request, response) => {
    const { id } = request.params
    const { name } = request.body

    try {
        

        const updatedRole = await updateRoleById(id, name)
        response.status(200).json({data: role})

        
    } catch (error) {
        if (error instanceof CustomError) {
            return response.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            })
        }

        response.status(500).json({
            status: "error",
            message: "Server error",
        })
    }
})

// Получить role по id
rolesRouter.get("/:id", async (request, response) => {
    const { id } = request.params
    try {
        const role = await getRoleById(id)

        response.status(200).json({data: role})
    } catch (error) {
        if (error instanceof CustomError) {
            return response.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            })
        }

        response.status(500).json({
            status: "error",
            message: "Server error",
        })
    }
})

// Получить список Role'ей
rolesRouter.get("/", async (request, response) => {
    try {
        const roles = await getRoles() 

        response.status(200).json({data: roles})
    } catch (error) {
        if (error instanceof CustomError) {
            return response.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            })
        }

        response.status(500).json({
            status: "error",
            message: "Server error",
        })
    }
})

// Удаление

rolesRouter.delete("/:id", async (request, response) => {
    const { id } = request.params

    try {
        const deletedRoles = await deleteRoleById(id)

        response.status(200).json({
            data: {
                id,
            },
            status: "success",
            message: "Role успешно удален",
        })
    } catch (error) {
        if (error instanceof CustomError) {
            return response.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            })
        }

        response.status(500).json({
            status: "error",
            message: "Server error",
        })
    }
})