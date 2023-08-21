Данное приложение - внутренний корпоративный сервис для учета персонала X

This application is an internal corporate service for personnel accounting X 

Разверните приложение используя команду npm ci (как для папки client так и для server)

Deploy the application using the npm ci command (for both client and server folders)

Чтобы зарегистрировать первого пользователя необходимо зайти в базу данных. Какие нужно установить таблицы указано в папке server/models. 
Далее создайте первого сотрудника, затем откройте таблицу lastStepOfRegisteringEmployee и внесите данные для колонок id, user_id(id сотрудника) и link_registering.
В link_registering можно внести любой текст. 

Далее для успешной регистрации необходимо зайти в браузер и в строку запроса ввести http://localhost:3000/registration/{link_registering} (link_registering может быть например:
0d1bbcee-9d93-465d-a529-845efc112a32), тогда строка запроса будет выглядить так
http://localhost:3000/registration/0d1bbcee-9d93-465d-a529-845efc112a32 . После чего откроется окно регистрации где нужно будет придумать email и пароль. 
Лишь HR-manager обладает правами добавлять, удалять, изменять и другими административными правами

Next, for successful registration, you need to go to the browser and enter http://localhost:3000/registration/{link_registering} in the query string (link_registering can be, for example:
0d1bbcee-9d93-465d-a529-845efc112a32), then the query string will look like this
http://localhost:3000/registration/0d1bbcee-9d93-465d-a529-845efc112a32 . After that, a registration window will open where you will need to come up with an email and password.
Only HR-manager has the rights to add, delete, change and other administrative rights
