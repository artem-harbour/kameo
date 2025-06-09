
export function updateDOMProps(dom, props = {}) {
  Object.entries(props).forEach(([key, value]) => {
    dom[key] = value;
  });
}
