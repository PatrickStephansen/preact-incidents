import { html } from "htm/preact";
import { useState } from "preact/hooks";
export const EditIncident = ({ editingIncident, saveIncident }) => {
  const [incidentFormData, setIncidentFormData] = useState(editingIncident);
  const setDescription = event =>
    setIncidentFormData(incident => ({
      ...incident,
      shortDescription: event.target.value
    }));
  const validateIncident = event => ({
    isValid: true,
    errors: {},
    incident: [...new FormData(event.target).entries()].reduce(
      (incident, prop) => (incident[prop.name] = prop.value),
      {}
    )
  });

  const onSubmit = event => {
    const validationResult = validateIncident(event);
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
              id="short-description"
              name="shortDescription"
              value=${incidentFormData.shortDescription}
              oninput=${setDescription}
            />
          </div>
        </form>
      `
    : null;
};
