import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Select from '../../../components/ui/Select';
import type { Goal } from '../../../types';

export interface GoalFormData {
  title: string;
  description: string;
  type: 'short-term' | 'long-term';
  status: 'active' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  progress: number;
}

interface GoalFormProps {
  goal?: Goal | null;
  onSave: (data: GoalFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const GoalForm: React.FC<GoalFormProps> = ({ goal, onSave, onCancel, isSaving = false }) => {
  const [title, setTitle] = useState(goal?.title ?? '');
  const [description, setDescription] = useState(goal?.description ?? '');
  const [type, setType] = useState<'short-term' | 'long-term'>(goal?.type ?? 'short-term');
  const [status, setStatus] = useState<'active' | 'completed' | 'failed'>(goal?.status ?? 'active');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(goal?.priority ?? 'medium');
  const [deadline, setDeadline] = useState(goal?.deadline ?? '');
  const [progress, setProgress] = useState(goal?.progress ?? 0);

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description ?? '');
      setType(goal.type);
      setStatus(goal.status);
      setPriority(goal.priority);
      setDeadline(goal.deadline);
      setProgress(goal.progress);
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;
    onSave({ title: title.trim(), description, type, status, priority, deadline, progress });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Goal title"
        required
        autoFocus
      />

      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your goal..."
        rows={3}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value as 'short-term' | 'long-term')}
          options={[
            { value: 'short-term', label: 'Short Term' },
            { value: 'long-term', label: 'Long Term' },
          ]}
        />
        <Select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'active' | 'completed' | 'failed')}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
            { value: 'failed', label: 'Failed' },
          ]}
        />
        <Input
          label="Deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Progress: {progress}%
        </label>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isSaving} disabled={!title.trim() || !deadline}>
          {goal ? 'Save Changes' : 'Create Goal'}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;
