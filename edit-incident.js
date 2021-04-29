import { html } from "htm/preact";
export const EditIncident = ({
  editingIncident,
  currencies,
  saveIncident,
  setEditingIncident
}) => {
  const currencyOptions = currencies.map(
    c =>
      html`
        <option value=${c.id}>${c.name}</option>
      `
  );
  const validateIncident = event => {
    const formData = new FormData(event.target);
    return {
      isValid: true,
      errors: {},
      incident: {
        ...editingIncident,
        shortDescription: formData.get("shortDescription"),
        loss: +formData.get("loss"),
        lossCurrency: formData.get("lossCurrency")
      }
    };
  };

  const onSubmit = event => {
    event.preventDefault();
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
              class="form-control"
              id="short-description"
              name="shortDescription"
              value=${editingIncident.shortDescription}
            />
          </div>
          <div class="form-group">
            <label for="loss-currency">Loss Currency</label>
            <select
              class="form-control"
              id="loss-currency"
              name="lossCurrency"
              value=${editingIncident.lossCurrency}
            >
              ${currencyOptions}
            </select>
          </div>
          <div class="form-group">
            <label for="loss">Loss Amount</label>
            <input
              class="form-control"
              id="loss"
              name="loss"
              type="number"
              step="0.01"
              value=${editingIncident.loss}
            />
          </div>
          <button class="btn btn-primary">Save</button>
        </form>
      `
    : null;
};
