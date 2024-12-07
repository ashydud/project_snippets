import db from "../../db.js"

export const createSnippet = ({ user_id, title, snippet, description, language_id, tag_ids }) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM language WHERE id = ?`, [language_id], function (error, language) {
			if (error) {
				return reject("Ошибка при проверке языка: " + error)
			}
			
			if (!language) {
				return reject("Указанный язык не найден")
			}

			db.run(
				`INSERT INTO snippets (user_id, title, snippet, description, language_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
				[user_id, title, snippet, description, language_id],
				function (error) {
					if (error) {
						return reject("Ошибка при создании сниппета: " + error)
					}

					const snippet_id = this.lastID

					if (!tag_ids || tag_ids.length === 0) {
						return resolve({
							id: snippet_id,
							user_id,
							title,
							snippet,
							description,
							language_id,
							tag_ids: [],
						})
					}

					const tagPromises = tag_ids.map((id) => {
						return new Promise((resolve, reject) => {
							db.run(
								`INSERT INTO snippets_tags (snippet_id, tag_id) VALUES (?, ?)`,
								[snippet_id, id],
								function (error) {
									if (error) {
										return reject("Ошибка при связывании тега: ", error)
									}
									resolve()
								},
							)
						})
					})

					Promise.all(tagPromises)
						.then(() => {
							return resolve({
								id: snippet_id,
								user_id,
								title,
								snippet,
								description,
								language_id,
								tag_ids,
							})
						})
						.catch((error) => {
							return reject("Ошибка:", error)
						})
				},
			)
		})
	})
}

export const editSnippet = async ({user_id, snippet_id, title, description, snippet: mySnippet, language_id, tag_ids}) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM snippets WHERE id = ?", [snippet_id], function (error, snippet) {
			if (error) {
				return reject(error)
			}

			if (!snippet) {
				return reject("Snippet не найден!")
			}

			if (user_id !== undefined && user_id !== snippet.user_id) {
				return reject("Вы не можете редактировать чужой snippet")
			}

			const updates = []
			const params = []

			if (title !== undefined) {
				updates.push("title = ?")
				params.push(title)
			}

			if (description !== undefined) {
				updates.push("description = ?")
				params.push(description)
			}

			if (mySnippet !== undefined) {
				updates.push("snippet = ?")
				params.push(mySnippet)
			}

			if (language_id !== undefined) {
				updates.push("language_id = ?")
				params.push(language_id)
			}

			updates.push("updated_at = ?")
			params.push(new Date().toISOString())

			if (updates.length === 0) {
				return reject({
					id: snippet_id,
					message: `Ничего не изменилось!`
				})
			}
			const updateQuery = `UPDATE snippets SET ${updates.join(", ")} WHERE id = ?`
			params.push(snippet_id)
			
			db.run(updateQuery, params, function (error,test) {
				if (error) {
					return reject(error)
				}
			
				if (tag_ids !== undefined) {
					db.run("DELETE FROM snippets_tags WHERE snippet_id = ?", [snippet_id], function (error) {
						if (error) {
							return reject(error)
						}

						const tagPromises = tag_ids.map((tagId) => {
							return new Promise((resolve, reject) => {
								db.run("INSERT INTO snippets_tags (snippet_id, tag_id) VALUES (?, ?)",
									[snippet_id, tagId],
									function (error) {
										if (error) {
											return reject(error)
										}

										resolve()
									}
								)
							})
						})

						Promise.all(tagPromises).then(() => {
							const getSnippet = getSnippetById(snippet_id)
							return resolve(getSnippet)
						}).catch((error) => {
							return reject(error)
						})
					})
				} else {
					const getSnippet = getSnippetById(snippet_id)
					return resolve(getSnippet)
				}
			})
		})
	})
}

export const deleteSnippet = async ({user_id, snippet_id}) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM snippets WHERE id = ?`, [snippet_id], function (error, snippet) {
			if (error || !snippet) {
				return reject("Snippet не найден")
			}

			
			if (user_id !== undefined && user_id !== snippet.user_id) {
				return reject("Вы не можете удалить чужой snippet")
			}

			db.all(`SELECT * FROM snippets_tags WHERE snippet_id = ?`, [snippet_id], function (error, snippets_tags) {
				if (error || !snippets_tags) {
					return reject(error)
				}

				if (snippets_tags.length > 0) {
					db.run(`DELETE FROM snippets_tags WHERE snippet_id = ?`, [snippet_id], function (error) {
						if (error) {
							return reject(error)
						}

						db.run(`DELETE FROM snippets WHERE id = ?`, [snippet_id], function (error) {
							if (error) {
								return reject(error)
							}

							return resolve(snippet_id)
						})
					})
				} else {
					db.run(`DELETE FROM snippets WHERE id = ?`, [snippet_id], function (error) {
						if (error) {
							return reject(error)
						}

						return resolve(snippet_id)
					})
				}
			})
		})
	})
}

export const getAllSnippets = async () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM snippets", function (error, snippets) {
			if (error) {
				return reject(error)
			}

			if (!snippets || snippets.length === 0) {
				return resolve([])
			}

			const snippetPromises = snippets.map((snippet) => {
				return new Promise((resolveSnippet, rejectSnippet) => {
					db.all(
						`SELECT tags.id, tags.title
						FROM tags
						INNER JOIN snippets_tags ON tags.id = snippets_tags.tag_id
						WHERE snippets_tags.snippet_id = ?`,
						[snippet.id],
						function (error, tag_ids) {
							if (error) {
								return rejectSnippet(error)
							}

							return resolveSnippet({ ...snippet, tag_ids: tag_ids || [] })
						},
					)
				})
			})
			Promise.all(snippetPromises)
				.then((result) => resolve(result))
				.catch(reject)
		})
	})
}

export const getSnippetById = async (snippet_id) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM snippets WHERE id = ?", [snippet_id], function (error, snippet) {
			if (error || !snippet) {
				return reject(error)
			}

			db.all(
				`SELECT tags.id, tags.title
				FROM tags
				INNER JOIN snippets_tags ON tags.id = snippets_tags.tag_id
				WHERE snippets_tags.snippet_id = ?`,
				[snippet_id],
				function (error, tag_ids) {
					if (error) {
						return reject(error)
					}

					return resolve({ ...snippet, tag_ids: tag_ids || [] })
				},
			)
		})
	})
}
