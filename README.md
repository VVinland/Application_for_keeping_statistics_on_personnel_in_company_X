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

Обзор приложения

Application Overview

Зайдя первый раз перед пользователем будет окно авторизации

Upon logging in for the first time, the user will be presented with an authorization window
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/5c797688-7149-496e-a55d-c0b6658ef55c)

Если зайдёт пользователь с должностью не "HR-manager", то для такого пользователя будут отображаться только данные о сотрудниках

If a user with a non-"HR-manager" position enters, then only employee data will be displayed for such a user
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/2b89f618-76cf-40ee-a85e-ebe8a8d44375)

Если в приложение зайдёт пользователь с должностью "HR-manager", то для такого пользователя добавятся возможности удалять, добавлять и изменять сотрудников. 
А также в навигационном меню появится новая вкладка "Статистика по персоналу".

If a user with the position "HR-manager" enters the application, then for such a user the ability to delete, add and change employees will be added.
And also in the navigation menu there will be a new tab "Personnel Statistics".
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/6e4c75cc-dea0-4283-987e-dcb89a6f2144)

Добавить сотрудника 

Add employee
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/5a9f2385-592a-44a9-91cf-36e3ff3fb56b)

После того как пользователь добавит сотрудника, сгенерируется ссылка по которой новому сотруднику нужно будет перейти. На странице нужно будет ввести емаил и пароль, после чего пользователь окончательно зарегистрируется и сразу же авторизуется

After the user adds an employee, a link will be generated that the new employee will need to follow. On the page, you will need to enter an email and password, after which the user will finally register and immediately log in
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/680d91f9-8bab-426f-9c55-17869bf1463f)
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/97366c23-191e-4134-8cae-da45b3742cf9)
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/86d4fed3-f09a-4788-8e2c-30e1ead2b25a)

Удалить сотрудника

Delete employee
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/7957ad45-9ae4-4572-8eac-004c5dca02c2)

Изменить данные о сотруднике

Change employee details

![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/ec38e200-850c-4ab7-af99-3da55bc98871)

Перейдя на страницу "Статистика по персоналу" пользователь может выбрать метрику для статистики.

By going to the "Personnel statistics" page, the user can select a metric for statistics.
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/28f20c65-1dbf-489b-aa67-9ca8c11035d4)


![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/b034b7ef-778d-45ba-b07f-4abe741b7fdb)
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/87e0b8a3-c271-4738-8ed8-375c95637a11)

График для ожидаемых зарплат был реализован при помощи библиотеки chart js

The chart for expected salaries was implemented using the chart js library
![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/53b50beb-05c0-40e2-b7b4-48ca06a2a8c0)

![image](https://github.com/VVinland/Application_for_keeping_statistics_on_personnel_in_company_X/assets/114589631/8590b85f-0237-4743-aa53-5858536afcf9)








