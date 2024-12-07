import { Router } from "express"
import { middlewareVerifyToken } from "../token/index.js"
import { createLanguage, editLanguage, deleteLanguage, getAllLanguages, getLanguageById } from "./service.js"

export const languagesRouter = Router()

// Создание
languagesRouter.post("/create", middlewareVerifyToken, async (request, response) => {
	const { title } = request.body

	try {
		const language = await createLanguage(title)
		response.status(201).json({
			data: language,
			status: "success",
			message: "Language успешно создан!",
		})
	} catch (error) {
		console.log("Ошибка при создании language: ", error)
		response.status(400).json({
			status: "error",
			message: "Ошибка при создании language!",
		})
	}
})

// Редактирование
languagesRouter.patch("/:id", middlewareVerifyToken, async (request, response) => {
	const { id } = request.params
	const { title } = request.body

	if (!title) {
		return response.status(400).json({
			status: "error",
			message: "Не передан title",
		})
	}

	try {
		const updateLanguage = await editLanguage(id, title)
		response.status(201).json({
			data: updateLanguage,
			status: "success",
			message: "Language успешно обновлен!",
		})
	} catch (error) {
		console.log("Ошибка при обновлении language: ", error)
		response.status(400).json({
			status: "error",
			message: "Ошибка при обновлении language!",
		})
	}
})

// Удаление
languagesRouter.delete("/:id", middlewareVerifyToken, async (request, response) => {
	const { id } = request.params

	try {
		const result = await deleteLanguage(id)

		response.status(200).json({
			data: {
				id: result,
			},
			status: "success",
			message: "Language успешно удален",
		})
	} catch (error) {
		console.log("Ошибка при удалении language: ", error)
		response.status(400).json({
			status: "error",
			message: "Ошибка при удалении language!",
		})
	}
})

// Получение одной записи по id
languagesRouter.get("/", async (request, response) => {
	try {
		const languages = await getAllLanguages()
		response.status(200).json({
			status: "success",
			data: languages,
		})
	} catch (error) {
		response.status(400).json({
			status: "error",
			message: "Ошибка при получении записей",
		})
	}
})

// Получение всех записей
languagesRouter.get("/:id", async (request, response) => {
	const { id } = request.params
	try {
		const language = await getLanguageById(id)
		response.status(200).json({
			status: "success",
			data: language,
		})
	} catch (error) {
		response.status(400).json({
			status: "error",
			message: "Ошибка при получении записей",
		})
	}
})
