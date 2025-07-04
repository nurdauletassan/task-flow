from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import Base, engine
from app.auth import router as auth_router
from app.tasks import router as tasks_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ToDo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks_router, prefix="/api/tasks", tags=["tasks"])
