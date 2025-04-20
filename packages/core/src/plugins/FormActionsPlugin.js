
import { Plugin, PluginKey } from '@tiptap/pm/state';

export const FormActionsPluginKey = new PluginKey('FormActions');

// for reference.
// https://github.com/NiclasDev63/tiptap-extension-global-drag-handle/blob/master/src/index.ts
// https://github.com/bangle-io/bangle-io/tree/main/packages/js-lib/banger-editor/src/drag
export const FormActionsPlugin = ({ 
  editor,
  horizontalOffset = 50, 
} = {}) => {
  let formActionsElements = [];
  let currentFormActions = null;

  const findFormActions = () => {
    formActionsElements = [...document.querySelectorAll('[data-form-actions]')];
  };

  const hideFormActions = ({ 
    skipCurrent = false, 
    skipActiveCheck = false, 
  } = {}) => {
    if (!skipActiveCheck && checkSomeActive()) return;
    formActionsElements.forEach((el) => {
      if (skipCurrent && el === currentFormActions) return;
      el.classList.add('hide');
    });
  };

  const checkSomeActive = () => {
    return formActionsElements.some((el) => el.hasAttribute('data-active'));
  };

  const showCurrentFormActions = () => {
    currentFormActions?.classList.remove('hide');
  };

  const hideFormActionsOnEditorOut = (event) => {
    if (event.target instanceof Element) {
      // Check if still inside the editor.
      let relatedTarget = event.relatedTarget;
      while (relatedTarget) {
        if (
          relatedTarget?.classList?.contains('kameo') ||
          relatedTarget?.classList?.contains('km-form-actions')
        ) {
          return;
        }
        relatedTarget = relatedTarget.parentNode;
      }
    }
    hideFormActions();
  }

  return new Plugin({
    key: FormActionsPluginKey,
    view: (view) => {
      // We use `setTimeout` because formActions are added dynamically.
      setTimeout(() => {
        findFormActions();
        hideFormActions();
      });
      
      view?.dom?.parentElement?.addEventListener('mouseout', hideFormActionsOnEditorOut);

      return {
        update: (view, oldState) => {
          const { isEditable } = editor;
          setTimeout(() => {  
            findFormActions();
            if (!isEditable) hideFormActions();
          });
        },
        destroy: () => {
          formActionsElements = [];
          currentFormActions = null;
          view?.dom?.parentElement?.removeEventListener('mouseout', hideFormActionsOnEditorOut);
        },
      };
    },
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {
          if (!editor.isEditable || checkSomeActive()) {
            return;
          }

          let node = nodeDOMAtCoords({ 
            x: event.clientX,
            y: event.clientY,
          });

          if (!node) {
            node = nodeDOMAtCoords({ 
              x: event.clientX + horizontalOffset,
              y: event.clientY,
            });
          }

          const formActions = node?.querySelector('[data-form-actions]');

          if (!(node instanceof Element) || !formActions) {
            hideFormActions();
            currentFormActions = null;
            return;
          }

          currentFormActions = formActions;

          hideFormActions({ skipCurrent: true });
          showCurrentFormActions();
        },
        keydown: () => {
          hideFormActions();
        },
        mousewheel: () => {
          hideFormActions();
        },
        drop: () => {
          hideFormActions();
        },
      },
    },
  });
};

function nodeDOMAtCoords(coords, options) {
  const selectors = ['.km-form-element-view'].join(', ');
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      (elem) =>
        elem.parentElement?.matches?.('.kameo.ProseMirror') &&
        elem.matches(selectors)
    );
}
