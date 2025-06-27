from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas import TaskCreate, TaskUpdate, Task
from app.crud import create_task, get_tasks, get_task, update_task, delete_task
from app.models import SessionLocal, User
from app.auth import get_current_user

router = APIRouter()

def get_db():
    from app.models import SessionLocal
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Task)
def create(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_task(db, task, current_user.id)

@router.get("/", response_model=list[Task])
def read_all(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    return get_tasks(db, current_user.id, skip=skip, limit=limit)

@router.get("/{task_id}", response_model=Task)
def read(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = get_task(db, task_id, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=Task)
def update(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = update_task(db, task_id, current_user.id, task_update)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}")
def delete(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = delete_task(db, task_id, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"ok": True}
