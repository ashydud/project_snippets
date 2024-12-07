import bcrypt from "bcryptjs"
import db from "../../db.js"

export const registrationUser = async (username, email, password) => {
	const hashedPassword = await bcrypt.hash(password, 10)
	return new Promise((resolve, reject) => {
		db.run(
			`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
			[username, email, hashedPassword],
			function (error) {
				if (error) {
					reject(error)
				} else {
					resolve(this.lastID)
				}
			},
		)
	})
}

export const loginUser = async (email, password) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM users WHERE email = ?`, [email], async (error, user) => {
			if (error || !user) {
				return reject("Пользователь не найден")
			} else {
				if (password) {
					const match = await bcrypt.compare(password, user.password)
					if (match) {
						return resolve(user)
					} else {
						return reject("Не правильный пароль")
					}
				} else {
					return reject("Пароль не думал передать?!")
				}
			}
		})
	})
}
