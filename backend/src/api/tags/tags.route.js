import { request, response, Router } from "express"
// import { middlewareVerifyToken } from "../token/index.js"
import { createTag,getTags,  deleteTagById, updateTagById, getTagById } from "./tags.service.js"
import { CustomError,  ValidationError } from "../../utils/handlerErrors.js"

export const tagsRouter = Router()

// Создание
tagsRouter.post("/create", async (request, response) => {
	const { name } = request.body

	try {
		const tag = await createTag(name)

		response.status(201).json({
			data: tag,
			status: "success",
			message: "Tag успешно создан!",
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
tagsRouter.patch("/:id", async (request, response) => {
	const { id } = request.params
	const { name } = request.body

	try {

		const updatedTag = await updateTagById(id, name)
		response.status(200).json({data: tag})
		
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

// Получить tag по id
tagsRouter.get("/:id", async (request, response) => {
	const { id } = request.params
	try {
		const tag = await getTagById(id)

		response.status(200).json({data: tag})
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

// Получить список Tag'ов
tagsRouter.get("/", async (request, response) => {
	try {
		const tags = await getTags() 

		response.status(200).json({data: tags})
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

tagsRouter.delete("/:id", async (request, response) => {
	const { id } = request.params

	try {
		const deletedTag = await deleteTagById(id)

		response.status(200).json({
			data: {
				id,
			},
			status: "success",
			message: "Tag успешно удален",
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

// // Редактирование
// tagsRouter.patch("/:id", middlewareVerifyToken, async (request, response) => {
// 	const { id } = request.params
// 	const { title } = request.body

// 	if (!title) {
// 		return response.status(400).json({
// 			status: "error",
// 			message: "Не передан title",
// 		})
// 	}

// 	try {
// 		const updateTag = await editTag(id, title)
// 		response.status(201).json({
// 			data: updateTag,
// 			status: "success",
// 			message: "Tag успешно обновлен!",
// 		})
// 	} catch (error) {
// 		console.log("Ошибка при обновлении tag: ", error)
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при обновлении tag!",
// 		})
// 	}
// })

// Удаление
// tagsRouter.delete("/:id", middlewareVerifyToken, async (request, response) => {
// 	const { id } = request.params

// 	try {
// 		const result = await deleteTag(id)

// 		response.status(200).json({
// 			data: {
// 				id: result,
// 			},
// 			status: "success",
// 			message: "Tag успешно удален",
// 		})
// 	} catch (error) {
// 		console.log("Ошибка при удалении tag: ", error)
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при удалении tag!",
// 		})
// 	}
// })

// // Получение одной записи по id
// tagsRouter.get("/", async (request, response) => {
// 	try {
// 		const tags = await getAllTags()
// 		response.status(200).json({
// 			status: "success",
// 			data: tags,
// 		})
// 	} catch (error) {
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при получении записей",
// 		})
// 	}
// })

// // Получение всех записей
// tagsRouter.get("/:id", async (request, response) => {
// 	const { id } = request.params
// 	try {
// 		const tag = await getTagById(id)
// 		response.status(200).json({
// 			status: "success",
// 			data: tag,
// 		})
// 	} catch (error) {
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при получении записей",
// 		})
// 	}
// })
