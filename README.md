# TaskFlow: Full-Stack Task Management Application

## 🚀 Getting Started

This project is fully containerized with Docker.

**Prerequisites**:
- You must have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

**Instructions**:
1.  **Clone the repository**:
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Build and Run with Docker Compose**:
    ```sh
    docker-compose up --build
    ```
    This single command builds the images and starts the backend and frontend services.

3.  **Access the Application**:
    -   **Frontend**: [http://localhost:3000](http://localhost:3000)
    -   **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📝 API Request Examples (`curl`)

### 1. Sign Up a New User
```sh
curl -X POST "http://localhost:8000/auth/sign-up" \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}'
```

### 2. Sign In to Get a Token
```sh
curl -X POST "http://localhost:8000/auth/sign-in" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "username=test@example.com&password=password123"
```
*(You will receive an `access_token` in the response.)*

### 3. Create a New Task
Replace `YOUR_JWT_TOKEN` with the token you received in the previous step.
```sh
curl -X POST "http://localhost:8000/tasks/" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "My First Task",
  "description": "A description for my first task.",
  "completed": false
}'
```

### 4. Get All Tasks
```sh
curl -X GET "http://localhost:8000/tasks/" \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Структура проекта

```
testtasks/
├── backend/                 # FastAPI приложение
│   ├── app/
│   │   ├── models.py       # Модели данных
│   │   ├── schemas.py      # Pydantic схемы
│   │   ├── auth.py         # Аутентификация
│   │   ├── tasks.py        # API для задач
│   │   └── main.py         # Главный файл
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # Next.js приложение
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

- `POST /auth/sign-up` - Регистрация
- `POST /auth/sign-in` - Вход
- `GET /tasks/` - Получить задачи
- `POST /tasks/` - Создать задачу
- `PUT /tasks/{id}` - Обновить задачу
- `DELETE /tasks/{id}` - Удалить задачу 

---
## 💻 Local Development (Alternative)

If you prefer to run the services locally without Docker.

### Backend (FastAPI)

1.  Navigate to the `backend` directory.
2.  Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4.  Run the server:
    ```sh
    uvicorn app.main:app --reload
    ```

### Frontend (Next.js)

1.  In a separate terminal, navigate to the `frontend` directory.
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Run the development server:
    ```sh
    npm run dev
    ```

--- 