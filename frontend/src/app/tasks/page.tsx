"use client";

import { useDisclosure } from "@mantine/hooks";
import { AuthGuard } from "@/components/AuthGuard";
import { PageLayout } from "@/components/layout";
import { PageHeader, LoadingState, ErrorState } from "@/components/ui";
import { TaskFilters } from "./components/TaskFilters";
import { TaskList } from "./components/TaskList";
import { NewTaskModal, EditTaskModal } from "./components/TaskModalsManager";
import { useTaskActions } from "./hooks/useTaskActions";

function TasksPageContent() {
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  
  const {
    tasks,
    isLoading,
    error,
    newTask,
    setNewTask,
    editTask,
    editTaskData,
    setEditTaskData,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleUpdateTask,
    handleToggleComplete,
    resetForms,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useTaskActions();

  const handleOpenAddModal = () => {
    resetForms();
    openAddModal();
  };

  const handleCloseEditModal = () => {
    resetForms();
  };

  if (isLoading) {
    return (
      <PageLayout>
        <LoadingState />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <ErrorState error={error} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader 
        title="Tasks" 
        description="Manage your tasks and stay organized" 
      />

      <TaskFilters 
        onAddTask={handleOpenAddModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        onAddTask={handleOpenAddModal}
      />

      <NewTaskModal
        opened={addModalOpened}
        onClose={closeAddModal}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
      />

      <EditTaskModal
        editTask={editTask}
        onClose={handleCloseEditModal}
        editTaskData={editTaskData}
        setEditTaskData={setEditTaskData}
        handleUpdateTask={handleUpdateTask}
      />
    </PageLayout>
  );
}

export default function TasksPage() {
  return (
    <AuthGuard>
      <TasksPageContent />
    </AuthGuard>
  );
} 