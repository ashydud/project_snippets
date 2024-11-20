import express from "express"
import { userRouter } from "./router/users/index.js";
import { configENV } from "./config.js";


const app = express()
app.use(express.json())

app.use("/api/users", userRouter)

app.use((request, response, next) => {
  response.status(404).json({
    status: "error",
    message: "Ошибся адресом!"
  })
})

app.use((error, request, response, next) => {
  console.error(error)

  response.status(500).json({
    status: "error",
    message: "Я лежу!"
  })
})

try {
  app.listen(5000, () => {
    console.log(`Сервер запущен на http://localhost:${configENV.port}`)
  })
} catch (error) {
  console.error("Ошибка при запуске сервера: ", error)
}

