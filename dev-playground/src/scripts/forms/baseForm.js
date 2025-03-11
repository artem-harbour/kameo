export const baseForm = `
  <p>Base form</p>

  <wa-input
    id="first_name"
    name="first_name"
    value="Joe"
    label="First name"
    placeholder="Enter your first name" 
    type="text"
    required
    data-type="formInputName">
  </wa-input>

  <wa-input
    id="last_name"
    name="last_name"
    value="Doe"
    label="Last name"
    placeholder="Enter your last name" 
    type="text"
    data-type="formInputName">
  </wa-input>

  <wa-input
    id="base_text"
    name="base_text"
    label="Text field"
    placeholder="Enter your info" 
    type="text"
    data-type="formInputText">
  </wa-input>

  <p>Some content</p>

  <wa-button
    id="submit"
    variant="brand"
    data-text="Submit"
    data-type="formSubmit">
  </wa-input>
`;
