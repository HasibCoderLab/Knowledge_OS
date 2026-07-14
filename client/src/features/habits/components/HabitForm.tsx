import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Select from '../../../components/ui/Select';
import type { Habit } from '../../../types';

export interface HabitFormData {
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
}

interface HabitFormProps {
  habit?: Habit | null;
  onSave: (data: HabitFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const HabitForm: React.FC<HabitFormProps> = ({ habit, onSave, onCancel, isSaving = false }) => {
  const [name, setName] = useState(habit?.name ?? '');
  const [description, setDescription] = useState(habit?.description ?? '');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>(habit?.frequency ?? 'daily');

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description ?? '');
      setFrequency(habit.frequency);
    }
  }, [habit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), description, frequency });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit name"
        required
        autoFocus
      />

      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your habit..."
        rows={3}
      />

      <Select
        label="Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
        options={[
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
        ]}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isSaving} disabled={!name.trim()}>
          {habit ? 'Save Changes' : 'Create Habit'}
        </Button>
      </div>
    </form>
  );
};

export default HabitForm;
