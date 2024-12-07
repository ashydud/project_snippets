import db from "../../db.js"

export const createTag = async (title) => {
	return new Promise((resolve, reject) => {
		db.run(`INSERT INTO tags (title) VALUES (?)`, [title], function (error) {
			if (error) {
				return reject(error)
			} else {
				return resolve(this.lastID)
			}
		})
	})
}

export const editTag = async (id, title) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM tags WHERE id = ?`, [id], function (error, tag) {
			if (error) {
				return reject(error)
			}

			if (!tag) {
				return reject("Tag не найден")
			}
		})

		db.get(`SELECT * FROM tags WHERE title COLLATE NOCASE = ?`, [title], function (error, tag) {
			if (error) {
				return reject(error)
			}

			if (tag && tag.id !== id) {
				return reject("Title должен быть уникальный!")
			}

			db.run("UPDATE tags SET title = ? WHERE id = ?", [title, id], function (error) {
				if (error) {
					return reject(error)
				}

				return resolve({ id, title })
			})
		})
	})
}

export const deleteTag = async (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM tags WHERE id = ?`, [id], function (error, tag) {
			if (error || !tag) {
				return reject("Tag не найден")
			}

			db.run(`DELETE FROM tags WHERE id = ?`, [id], function (error) {
				if (error) {
					return reject(error)
				}

				return resolve(id)
			})
		})
	})
}

export const getAllTags = async () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM tags", [], function (error, tags) {
			if (error) {
				return reject(error)
			}

			return resolve(tags)
		})
	})
}

export const getTagById = async (id) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM tags WHERE id = ?", [id], function (error, tag) {
			if (error || !tag) {
				return reject(error)
			}

			return resolve(tag)
		})
	})
}
