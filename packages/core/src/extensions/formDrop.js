import { Plugin, PluginKey } from '@kameo/pm/state';
import { Extension } from '@tiptap/core';

export const FormDrop = Extension.create({
  name: 'formDrop',

  addOptions() {
    return {
      handleDropOutside: false,
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;
    const { documentMode } = editor;

    return [
      new Plugin({
        key: new PluginKey('formDrop'),
    
        props: {
          handleDrop: (view, event, slice, moved) => {
            if (moved || documentMode !== 'edit') {
              return false;
            }
    
            const formField = event?.dataTransfer.getData('formField');
    
            if (formField) {
    
              if (this.options.handleDropOutside) {
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
      })
    ];
  },
});

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
