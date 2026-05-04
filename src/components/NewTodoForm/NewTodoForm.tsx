/* eslint-disable */

import React from 'react';
import type { Todo } from '../../types/Todo';

type Props = {
  onAdd : (value : Todo[]) => void;
  onError : () => void;
}

export const NewTodoForm: React.FC<Props> = ({onAdd, onError}) => {
  const handleSubmit = {async(event) => {
    event.preventDefault();
    // 1. Validate
    if (!title.trim()) {
      setError('Title should not be empty');
      return;
    }
    // 2. Clear previous error
    setError('');
    setErrorStatus(false);
  }}>

  return{
    onSubmit=
    <input
      data-cy="NewTodoField"
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      value={title}
      onChange={event => setTitle(event.target.value)}
    />
  }
}
