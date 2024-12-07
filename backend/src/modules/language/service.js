import e from "express"
import db from "../../db.js"

export const createLanguage = async (title) => {
	return new Promise((resolve, reject) => {
		db.run(`INSERT INTO language (title) VALUES (?)`, [title], function (error) {
			if (error) {
				return reject(error)
			} else {
				return resolve(this.lastID)
			}
		})
	})
}

export const editLanguage = async (id, title) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM language WHERE id = ?`, [id], function (error, language) {
			if (error) {
				return reject(error)
			}

			if (!language) {
				return reject("Language не найден")
			}
		})

		db.get(`SELECT * FROM language WHERE title COLLATE NOCASE = ?`, [title], function (error, language) {
			if (error) {
				return reject(error)
			}

			if (language && language.id !== id) {
				return reject("Title должен быть уникальный!")
			}

			db.run("UPDATE language SET title = ? WHERE id = ?", [title, id], function (error) {
				if (error) {
					return reject(error)
				}

				return resolve({ id, title })
			})
		})
	})
}

export const deleteLanguage = async (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM language WHERE id = ?`, [id], function (error, language) {
			if (error || !language) {
				return reject("Language не найден")
			}

			db.run(`DELETE FROM language WHERE id = ?`, [id], function (error) {
				if (error) {
					return reject(error)
				}

				return resolve(id)
			})
		})
	})
}

export const getAllLanguages = async () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM language", [], function (error, languages) {
			if (error) {
				return reject(error)
			}

			return resolve(languages)
		})
	})
}

export const getLanguageById = async (id) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM language WHERE id = ?", [id], function (error, language) {
			if (error || !language) {
				return reject(error)
			}

			return resolve(language)
		})
	})
}
