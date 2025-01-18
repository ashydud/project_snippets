import { languagesModel } from "./languages.model.js"
import { LanguageNotFoundError, ValidationError } from "../../utils/handlerErrors.js"

export const createLanguage = async (name) => {
	if (!name) {
		throw new ValidationError("Имя Language обязательное для заполнения!")
	}

	try {
		const isLanguage = await languagesModel.findOne({ name })
		if (isLanguage) {
			throw new ValidationError("Language с таким именем уже существует!")
		}

		const newLanguage = languagesModel({ name })
		const createLanguage = await newLanguage.save()

		return createLanguage
	} catch (error) {
		throw new ValidationError("Ошибка при создании Language")
	}
}

export const getLanguageById = async (id) => {
    try {
        const isLanguage = await languagesModel.findById({ id })

        if (!isLanguage) {
            return "error"
        }

        return isLanguage
    } catch (error) {
        throw new ValidationError("Language не найден")
    }
}

export const getLanguage = async () => {
    try {
        const languages = languagesModel.find()

        return languages
    } catch (error) {
        throw new LanguageNotFoundError("Language'и не найдены")
    }
}

export const updateLanguageById = async (id, name) => {
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        throw new ValidationError("Название языка обязательное и должно быть строкой")
    }

    try {
        const updatedLanguage = await languagesModel.findByIdAndUpdate(id, { name }, { new: true })

        if (!updatedLanguage) {
            throw new ValidationError("Language не найден!")
        }

        return updatedLanguage
    } catch (error) {
        throw new ValidationError("Ошибка при обновлении Language!")
    }
}

export const deleteLanguageById = async (id) => {
    try {
        const deletedLanguage = await languagesModel.findByIdAndDelete(id)
        if (!deletedLanguage) {
            throw new LanguageNotFoundError("Language не найден!")
        }
        return deletedLanguage
    } catch (error) {
        throw new LanguageNotFoundError("Ошибка при удалении Language")
    }
}
