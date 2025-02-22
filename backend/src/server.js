import express from "express"
import { userRouter } from "./api/users/users.route.js"
import { tagsRouter } from "./api/tags/tags.route.js"
import { configENV } from "./config.js"
import { snippetsRouter } from "./api/snippets/snippets.route.js"
import { languagesRouter } from "./api/languages/languages.route.js"
import { rolesRouter } from "./api/roles/roles.route.js"
import mongoose from "mongoose"

const app = express()
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/tags", tagsRouter)
app.use("/api/languages", languagesRouter)
app.use("/api/snippets", snippetsRouter)
app.use("/api/roles", rolesRouter)

app.use((request, response, next) => {
	response.status(404).json({
		status: "error",
		message: "Ошибся адресом!",
	})
})

app.use((error, request, response, next) => {
	console.error(error)

	response.status(500).json({
		status: "error",
		message: "Я лежу!",
	})
})

try {
	mongoose.connect(`mongodb://localhost:27017/snippets`)
	app.listen(5000, () => {
		console.log(`Сервер запущен на http://localhost:${configENV.port}`)
	})
} catch (error) {
	console.error("Ошибка при запуске сервера: ", error)
}
