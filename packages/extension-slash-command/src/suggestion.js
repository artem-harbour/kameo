import { computePosition, flip, shift } from '@floating-ui/dom';
import { posToDOMRect, kameoHelpers } from '@kameo/core';
import { suggestionItems } from './suggestionItems.js';
import { SlashMenuName } from './ui/SlashMenu.js';

const { updateDOMProps } = kameoHelpers;

export const createSuggestionItems = (items) => ({ query }) => {
  return items.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()));
};

const updatePosition = (editor, element) => {
  const virtualElement = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  };

  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content';
    element.style.position = strategy;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
};

const createSlashMenu = (props) => {
  const menu = document.createElement(SlashMenuName);
  menu.classList.add('km-slash-menu');
  menu.dataset.slashMenu = '';  
  return menu;
};

const renderItems = () => {
  let element;

  return {
    onStart: (props) => {  
      element = createSlashMenu(props);

      if (!props.clientRect) {
        return;
      }

      updateDOMProps(element, {
        items: props.items,
        query: props.query,
        command: props.command,
      });

      element.style.position = 'absolute';
      document.body.append(element);
      updatePosition(props.editor, element);
    },

    onUpdate(props) {
      updateDOMProps(element, {
        items: props.items,
        query: props.query,
        command: props.command,
      });
      
      if (!props.clientRect) {
        return;
      }

      updatePosition(props.editor, element);
    },

    onKeyDown(props) {
      if (props.event.key === 'Escape') {
        element.destroy?.();
        element.remove();
        return true;
      }
      return element.onKeyDown?.(props);
    },

    onExit() {
      element.destroy?.();
      element.remove();
    },
  };
};

export const suggestion = {
  items: createSuggestionItems(suggestionItems),
  render: renderItems,
};
