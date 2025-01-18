import { Router } from "express"
// import { middlewareVerifyToken } from "../token/index.js"
import { createLanguage } from "./languages.service.js"

export const languagesRouter = Router()

// Создание
languagesRouter.post("/create", async (request, response) => {
	const { name } = request.body

	try {
		const language = await createLanguage(name)

		response.status(201).json({
			data: language,
			status: "success",
			message: "Language успешно создан!",
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
languagesRouter.patch("/:id", async (request, response) => {
	const { id } = request.params
	const { name } = request.body

	try {
		

		const updatedLanguage = await updateLanguageById(id, name)
		response.status(200).json({data: language})

		
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

// Получить language по id
languagesRouter.get("/:id", async (request, response) => {
	const { id } = request.params
	try {
		const language = await getLanguageById(id)

		response.status(200).json({data: language})
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

// Получить список Языков
languagesRouter.get("/", async (request, response) => {
	try {
		const languages = await getLanguages() 

		response.status(200).json({data: languages})
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

languagesRouter.delete("/:id", async (request, response) => {
	const { id } = request.params

	try {
		const deletedLanguages = await deleteLanguageById(id)

		response.status(200).json({
			data: {
				id,
			},
			status: "success",
			message: "Language успешно удален",
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
// languagesRouter.patch("/:id", middlewareVerifyToken, async (request, response) => {
// 	const { id } = request.params
// 	const { title } = request.body

// 	if (!title) {
// 		return response.status(400).json({
// 			status: "error",
// 			message: "Не передан title",
// 		})
// 	}

// 	try {
// 		const updateLanguage = await editLanguage(id, title)
// 		response.status(201).json({
// 			data: updateLanguage,
// 			status: "success",
// 			message: "Language успешно обновлен!",
// 		})
// 	} catch (error) {
// 		console.log("Ошибка при обновлении language: ", error)
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при обновлении language!",
// 		})
// 	}
// })

// // Удаление
// languagesRouter.delete("/:id", middlewareVerifyToken, async (request, response) => {
// 	const { id } = request.params

// 	try {
// 		const result = await deleteLanguage(id)

// 		response.status(200).json({
// 			data: {
// 				id: result,
// 			},
// 			status: "success",
// 			message: "Language успешно удален",
// 		})
// 	} catch (error) {
// 		console.log("Ошибка при удалении language: ", error)
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при удалении language!",
// 		})
// 	}
// })

// // Получение одной записи по id
// languagesRouter.get("/", async (request, response) => {
// 	try {
// 		const languages = await getAllLanguages()
// 		response.status(200).json({
// 			status: "success",
// 			data: languages,
// 		})
// 	} catch (error) {
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при получении записей",
// 		})
// 	}
// })

// // Получение всех записей
// languagesRouter.get("/:id", async (request, response) => {
// 	const { id } = request.params
// 	try {
// 		const language = await getLanguageById(id)
// 		response.status(200).json({
// 			status: "success",
// 			data: language,
// 		})
// 	} catch (error) {
// 		response.status(400).json({
// 			status: "error",
// 			message: "Ошибка при получении записей",
// 		})
// 	}
// })
