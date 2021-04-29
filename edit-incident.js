import { html } from "htm/preact";
export const EditIncident = ({
  editingIncident,
  saveIncident,
  setEditingIncident
}) => {
  const setDescription = event =>
    setEditingIncident(incident => ({
      ...incident,
      shortDescription: event.target.value
    }));
  const validateIncident = event => ({
    isValid: true,
    errors: {},
    incident: Array.from(new FormData(event.target).entries()).reduce(
      (incident, [key, value]) => {
        incident[key] = value;
        return incident;
      },
      editingIncident
    )
  });

  const onSubmit = event => {
    event.preventDefault();
    const validationResult = validateIncident(event);
    console.log(validationResult, [...new FormData(event.target).entries()]);
    if (validationResult.isValid) {
      saveIncident(validationResult.incident);
    }
  };
  return editingIncident
    ? html`
        <form onsubmit=${onSubmit}>
          <h2>${editingIncident.incidentId ? "Edit" : "New"} Incident</h2>
          <div class="form-group">
            <label for="short-description">Short Description</label>
            <input
              class="form-control"
              id="short-description"
              name="shortDescription"
              value=${editingIncident.shortDescription}
              oninput=${setDescription}
            />
          </div>
        </form>
      `
    : null;
};
