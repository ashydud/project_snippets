import { tagsModel } from "./tags.model.js"
import { TagNotFoundError, ValidationError } from "../../utils/handlerErrors.js"
export const createTag = async (name) => {
	if (!name) {
		throw new ValidationError("Имя Tag'а обязательное для заполнения!")
	}

	try {
		const isTag = await tagsModel.findOne({ name })

		if (isTag) {
			throw new ValidationError("Tag с таким именем уже существует!")
		}

		const newTag = new tagsModel({ name })
		const createdTag = await newTag.save()

		return createdTag
	} catch (error) {
		throw new ValidationError("Ошбика при создании Tag")
	}
}

export const getTagById = async (id) => {
	try {
		const isTag = await tagsModel.findById({ id })

		if (!isTag) {
			return "error"
		}

		return isTag
	} catch (error) {
		throw new ValidationError("Tag не найден")
	}
}

export const getTags = async () => {
	try {
		const tags = tagsModel.find()

		return tags
	} catch (error) {
		throw new TagNotFoundError("Tag'и не найдены")
	}
}

export const updateTagById = async (id, name) => {
	if (!name || typeof name !== "string" || name.trim().length === 0) {
		throw new ValidationError("Имя тэге обязательное и должно быть строкой")
	}

	try {
		const updatedTag = await tagsModel.findByIdAndUpdate(id, { name }, { new: true })

		if (!updatedTag) {
			throw new ValidationError("Tag не найден!")
		}

		return updatedTag
	} catch (error) {
		throw new ValidationError("Ошибка при обновлении Tag!")
	}
}

export const deleteTagById = async (id) => {
	try {
		const deletedTag = await tagsModel.findByIdAndDelete(id)
		if (!deletedTag) {
			throw new TagNotFoundError("Tag не найден!")
		}
		return deletedTag
	} catch (error) {
		throw new TagNotFoundError("Ошибка при удалении Tag")
	}
}

// tagsRouter.delete("/:id", async (request, response) => {
// 	const { _id } = request.params

// 	try {
// 		const result = await deleteTag(_id)

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
