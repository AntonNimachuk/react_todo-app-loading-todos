/* eslint-disable */

import React, { useState } from 'react';
import type { Todo } from '../../types/Todo';

type Props = {
  onAdd : (value : Todo) => void;
  onError : (message : string) => void;
}

export const NewTodoForm: React.FC<Props> = ({onAdd, onError}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    // 1. Validate
    if (!title.trim()) {
      onError('Title should not be empty');
      return;
    }
    // 2. Clear previous error
    onError('');
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
}
