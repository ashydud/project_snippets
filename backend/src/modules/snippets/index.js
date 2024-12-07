import { Router } from "express"
import { middlewareVerifyToken } from "../token/index.js"
import { createSnippet, editSnippet, deleteSnippet, getAllSnippets, getSnippetById } from "./service.js"

export const snippetsRouter = Router()

// Создание
snippetsRouter.post("/create", middlewareVerifyToken, async (request, response) => {
	const { title, description, language_id, snippet, tag_ids } = request.body
	const { id } = request.user
	if (!title || !snippet || !language_id) {
		return response.status(400).json({
			status: "error",
			message: "Не передны обязательные поля: title, snippet и language_id!",
		})
	}

	try {
		const newSnippet = await createSnippet({
			user_id: id,
			title,
			description: description || null,
			snippet,
			language_id,
			tag_ids: tag_ids || [],
		})
		response.status(201).json({
			data: newSnippet,
			status: "success",
			message: "Snippet успешно создан!",
		})
	} catch (error) {
		console.log("Ошибка при создании snippet: ", error)
		response.status(500).json({
			status: "error",
			message: "Ошибка при создании snippet",
		})
	}
})

// Редактирование
snippetsRouter.patch("/:id", middlewareVerifyToken, async (request, response) => {
	const { id } = request.params
	const { id: user_id } = request.user
	const { title, description, snippet, language_id, tag_ids} = request.body

	try {
		const updateSnippet = await editSnippet({
			user_id,
			snippet_id: id,
			title,
			description,
			snippet,
			language_id,
			tag_ids
		})

		response.status(201).json({
			data: updateSnippet,
			status: "success",
			message: "Snippet успешно обновлен",
		})
	} catch (error) {
		console.log(error)
		response.status(400).json({
			status: "error",
			message: "Ошибка при изменении сниппета",	
		})
	}
})

// Удаление
snippetsRouter.delete("/:id", middlewareVerifyToken, async (request, response) => {
	const { id } = request.params
	const { id: user_id } = request.user
	
	try {
		const result = await deleteSnippet({user_id, snippet_id: id})

		response.status(200).json({
			data: {
				id: result,
			},
			status: "success",
			message: "Snippet успешно удален",
		})
	} catch (error) {
		console.log("Ошибка при удалении snippet: ", error)
		response.status(400).json({
			status: "error",
			message: error,
		})
	}
})

// Получение одной записи по id
snippetsRouter.get("/:id", async (request, response) => {
	const { id } = request.params
	try {
		const snippet = await getSnippetById(id)
		response.status(200).json({
			status: "success",
			data: snippet,
		})
	} catch (error) {
		response.status(400).json({
			status: "error",
			message: "Ошибка при получении записей",
		})
	}
})

// Получение всех записей
snippetsRouter.get("/", async (request, response) => {
	try {
		const snippets = await getAllSnippets()
		response.status(200).json({
			status: "success",
			data: snippets,
		})
	} catch (error) {
		response.status(400).json({
			status: "error",
			message: "Ошибка при получении записей",
		})
	}
})
