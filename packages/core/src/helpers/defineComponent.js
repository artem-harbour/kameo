export function defineComponent(name, elementConstructor, options = {}) {
  const currentlyRegisteredConstructor = window.customElements.get(name);
  
  if (!currentlyRegisteredConstructor) {
    try {
      window.customElements.define(name, elementConstructor, options);
    } catch (err) {
      console.error(err);
    }
  }
}
