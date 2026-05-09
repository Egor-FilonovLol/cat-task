## Тестовое задание

Веб-приложение для заводчиков котов. Позволяет управлять информацией о котах и общаться с другими заводчиками в реальном времени через WebSocket.


http://checkcheckcheck.duckdns.org

http://checkcheckcheck.duckdns.org/api/

## Функционал
Регистрация и авторизация пользователей (JWT)

Управление котами (CRUD): создание, просмотр, редактирование, удаление

Каждый пользователь видит только своих котов

Чат в реальном времени через WebSocket

Полная Docker контейнеризация

## Технологии
 Бекенд
``` 
Django 4.2
   
Django REST Framework
   
Django Channels
   
PostgreSQL
   
Redis
 
JWT аутентификация
```

Фронтенд

```
Angular
    
Angular Router
    
WebSocket client

```

Инфраструктура

```
Docker & Docker Compose
    
Nginx
    
Daphne
```


## Запуск проекта
Требования

   Docker
   
   Node.js 18+
   
   Python 3.11+

Быстрый запуск
# 1. Клонировать репозиторий
```

git clone https://github.com/Egor-FilonovLol/cat-task.git

cd cat-task

```

2. Собрать фронтенд

```
cd frontend
npm install
npm run build -- --configuration production
cd ..

```
Создать .env файл

```

DB_NAME=catdb

DB_USER=catuser

DB_PASSWORD=catpass123

SECRET_KEY=your-secret-key-change-this

DEBUG=False

ALLOWED_HOSTS=localhost,127.0.0.1

```

4. Запустить Docker

```

cd infra

docker-compose up -d --build

```
5. Применить миграции
```
docker exec -it cat_backend python manage.py makemigrations api
docker exec -it cat_backend python manage.py makemigrations api
docker exec -it cat_backend python manage.py migrate
docker exec -it cat_backend python manage.py collectstatic --noinput

```


