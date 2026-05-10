/* eslint-disable */

import React from 'react';
import type { Todo } from '../../types/Todo';

type Props = {
  key: number;
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ key, todo }) => (
  <>
    <div data-cy="Todo">
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/*
        <label className="todo__status-label">
          completed
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked
          />


          An active todo //////////////////////////////////////
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />

          Being edited ///////////////////////////////////////
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />

          Is in loading state //////////////////////////////////////
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />

        </label>

      */}
    </div>
  </>
);
