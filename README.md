# project_snippets




Проект с выводом набор сниппетов для VS Code
req (запрос) и res (ответ) являются теми же объектами, которые предоставляет Node, поэтому можно вызвать req.pipe(), req.on('data', 
callback) и выполнить любые другие действия, не требующие участия Express.

$ node app.js
http://localhost:3000/

app.METHOD(PATH, HANDLER)

app - это экземпляр express.
METHOD - метод запроса HTTP.
PATH - путь на сервере.
HANDLER - функция, выполняемая при сопоставлении маршрута.