import { html } from "htm/preact";
import { useCallback, useMemo, useState } from "preact/hooks";
export const EditIncident = ({
  editingIncident,
  currencies,
  saveIncident,
  setEditingIncident
}) => {
  const [errors, setErrors] = useState({});
  const currencyOptions = useMemo(
    () =>
      currencies.map(
        c =>
          html`
            <option value=${c.id}>${c.name}</option>
          `
      ),
    [currencies]
  );
  const setFormField = useCallback(
    event => {
      setEditingIncident(values => ({
        ...values,
        [event.target.name]: event.target.value
      }));
    },
    [setEditingIncident]
  );
  const validateIncident = form => {
    const formData = new FormData(form);
    const incident = {
      ...editingIncident,
      shortDescription: formData.get("shortDescription"),
      loss: +formData.get("loss"),
      lossCurrency: formData.get("lossCurrency"),
      incidentDate: formData.get("incidentDate")
    };
    const errors = {};
    const attemptedDate = new Date(incident.incidentDate);
    if (!attemptedDate instanceof Date || isNaN(attemptedDate.valueOf())) {
      errors.incidentDate = "Please enter a date";
    }
    if (!incident.shortDescription) {
      errors.shortDescription = "Short Description is required";
    }
    if (incident.loss < 0) {
      errors.loss = "Please enter a positive loss value";
    }
    setErrors(errors);
    return {
      isValid: !Object.keys(errors).length,
      errors,
      incident
    };
  };

  const onSubmit = event => {
    event.preventDefault();
    const validationResult = validateIncident(event.target);
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
              oninput=${setFormField}
            />
            <span class="text-danger">${errors.shortDescription}</span>
          </div>
          <div class="form-group">
            <label for="incident-date">Incident Date</label>
            <input
              class="form-control"
              id="incident-date"
              name="incidentDate"
              value=${editingIncident.incidentDate}
              oninput=${setFormField}
              type="date"
            />
            <span class="text-danger">${errors.incidentDate}</span>
          </div>
          <div class="form-group">
            <label for="loss-currency">Loss Currency</label>
            <select
              class="form-control"
              id="loss-currency"
              name="lossCurrency"
              value=${editingIncident.lossCurrency}
              oninput=${setFormField}
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
              min="0"
              step="0.01"
              value=${editingIncident.loss}
              oninput=${setFormField}
            />
            <span class="text-danger">${errors.loss}</span>
          </div>
          <button class="btn btn-primary">Save</button>
        </form>
      `
    : null;
};
