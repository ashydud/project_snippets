import sqlite3 from "sqlite3"
import { configENV } from "./config.js"

const db = new sqlite3.Database(`./${configENV.db}`, (error) => {
	if (error) {
		return console.error("Ошибка с базой данных: ", error)
	}

	console.log("Подключеник к базе данных успешно!")
})

db.run("PRAGMA foreign_keys = ON;", (error) => {
	if (error) {
		return console.error("Ошибка при включении внешних ключей: ", error)
	}

	console.log("Успешное включение внешних ключей!")
})

const createTables = {
	users: `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `,
	snippets: `
        CREATE TABLE IF NOT EXISTS snippets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL UNIQUE,
            description TEXT,
            snippet TEXT NOT NULL,
            language_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (language_id) REFERENCES language(id) ON DELETE CASCADE
        );
    `,
	language: `
        CREATE TABLE IF NOT EXISTS language (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL UNIQUE
        );    
    `,
	tags: `
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL UNIQUE
        );
    `,
	snippetsTags: `
        CREATE TABLE IF NOT EXISTS snippets_tags (
            snippet_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            FOREIGN KEY (snippet_id) REFERENCES snippets(id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
            PRIMARY KEY (snippet_id, tag_id)
        );
    `,
}

const tableSettings = () => {
	db.run(createTables.users, (error) => {
		if (error) {
			return console.error("Ошибка при создании таблицы users: ", error)
		}

		console.log("Таблица успешно создана: users!")
	})

	db.run(createTables.snippets, (error) => {
		if (error) {
			return console.error("Ошибка при создании таблицы snippets: ", error)
		}

		console.log("Таблица успешно создана: snippets!")
	})

	db.run(createTables.language, (error) => {
		if (error) {
			return console.error("Ошибка при создании таблицы language: ", error)
		}

		console.log("Таблица успешно создана: language!")
	})

	db.run(createTables.tags, (error) => {
		if (error) {
			return console.error("Ошибка при создании таблицы tags: ", error)
		}

		console.log("Таблица успешно создана: tags!")
	})

	db.run(createTables.snippetsTags, (error) => {
		if (error) {
			return console.error("Ошибка при создании таблицы snippetTags: ", error)
		}

		console.log("Таблица успешно создана: snippetTags!")
	})
}

tableSettings()

export default db
