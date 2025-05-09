import { Plugin, PluginKey } from '@tiptap/pm/state';

export const FormDropPlugin = (options = {}) => {
  const { editor } = options;

  return new Plugin({
    key: new PluginKey('formDrop'),

    props: {
      handleDrop(view, event, slice, moved) {
        if (moved) {
          return false;
        }

        const formField = event?.dataTransfer.getData('formField');

        if (formField) {

          if (options.handleDropOutside) {
            handleDropOutside({
              formField,
              editor, 
              view,
              event,
            });
          } else {
            let formFieldData;

            try {
              formFieldData = JSON.parse(formField);
            } catch {
              return false;
            }

            const coordinates = view.posAtCoords({ 
              left: event.clientX,
              top: event.clientY,
            });

            if (coordinates) {
              const { fieldType, attrs } = formFieldData;
              editor.commands.insertFormElement(fieldType, coordinates.pos, { ...attrs });
            }
          }
          
          return true;
        }

        return false;
      },
    },
  });
};

function handleDropOutside({ 
  formField,
  editor, 
  view, 
  event, 
}) {
  let formFieldData;

  try {
    formFieldData = JSON.parse(formField);
  } catch {
    return false;
  }

  let coordinates = view.posAtCoords({ 
    left: event.clientX, 
    top: event.clientY 
  });
  
  if (coordinates) {
    editor.emit('formFieldDropped', {
      editor,
      event,
      data: formFieldData,
      pos: coordinates.pos,
    });
  }
}
