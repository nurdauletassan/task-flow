# ToDo List API (FastAPI + SQLite)

## Запуск backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Переменные окружения (.env)
```
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=supersecretkey
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Примеры запросов

### Регистрация
```
curl -X POST http://localhost:8000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

### Вход (получить JWT)
```
curl -X POST http://localhost:8000/auth/sign-in \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=testpass"
```

### Получить задачи
```
curl -X GET http://localhost:8000/tasks/ \
  -H "Authorization: Bearer <TOKEN>"
```

### Создать задачу
```
curl -X POST http://localhost:8000/tasks/ \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test task", "description": "desc"}'
```

### Обновить задачу
```
curl -X PUT http://localhost:8000/tasks/1 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated", "completed": true}'
```

### Удалить задачу
```
curl -X DELETE http://localhost:8000/tasks/1 \
  -H "Authorization: Bearer <TOKEN>"
```
