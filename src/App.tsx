/* eslint-disable */

import React, {useState, useEffect} from 'react';
import { UserWarning } from './UserWarning';
import * as clientMethods from './api/todos';
import type { Todo } from './types/Todo'
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  if (!clientMethods.USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilterLink, setSelectedFilterLink] = useState('all');

  const handleAddTodo = (newTodo : Todo) : void => {
    setTodos([...todos, newTodo]);
  }

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await clientMethods.getTodos();

        setTodos(loadedTodos);
      } catch (err) {
        setError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();

  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }
    const timer = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const allTodosCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  let filteredTodos = todos;

  switch (selectedFilterLink) {
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    default :
      filteredTodos = todos;
      break;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 &&
            <button
              type="button"
              className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          }

          {/* Add a todo on form submit */}
          <NewTodoForm
            onAdd={handleAddTodo}
            onError={setError}
            isLoading={isLoading}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={filteredTodos}
          />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
        <footer className="todoapp__footer"
          data-cy="Footer"
        >
          <span className="todo-count" data-cy="TodosCounter">
            {`${todos.filter(todo => !todo.completed).length } items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${selectedFilterLink === 'all' ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => setSelectedFilterLink('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${selectedFilterLink === 'active' ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => setSelectedFilterLink('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${selectedFilterLink === 'completed' ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => setSelectedFilterLink('completed')}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className={`todoapp__clear-completed
              ${todos.filter(todo => todo.completed).length === 0 ? 'hidden' : ''}`
            }
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error ? `hidden` : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
