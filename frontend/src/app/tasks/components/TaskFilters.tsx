import { Button, Group, TextInput, Select } from "@mantine/core";
import { IconPlus, IconSearch, IconSortDescending } from "@tabler/icons-react";

export type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

interface TaskFiltersProps {
  onAddTask: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function TaskFilters({ 
  onAddTask, 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange 
}: TaskFiltersProps) {
  const sortOptions = [
    { value: 'newest', label: 'Сначала новые' },
    { value: 'oldest', label: 'Сначала старые' },
    { value: 'title-asc', label: 'По названию (А-Я)' },
    { value: 'title-desc', label: 'По названию (Я-А)' },
  ];

  return (
    <Group justify="space-between" mb="xl" wrap="wrap">
      <Group>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={onAddTask}
          color="dark"
        >
          Add Task
        </Button>
      </Group>
      
      <Group>
        <TextInput
          placeholder="Поиск по названию..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          style={{ minWidth: 200 }}
        />
        
        <Select
          placeholder="Сортировка"
          leftSection={<IconSortDescending size={16} />}
          data={sortOptions}
          value={sortBy}
          onChange={(value) => onSortChange(value as SortOption)}
          style={{ minWidth: 150 }}
        />
      </Group>
    </Group>
  );
} 