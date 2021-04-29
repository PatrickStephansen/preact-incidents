import { html } from "htm/preact";
export const IncidentSummary = ({
  incident,
  currencies,
  deleteIncident,
  editIncident
}) => {
  const lossCurrencySymbol = currencies.find(c => c.id == incident.lossCurrency)
    ?.symbol;
  const incidentDate = new Date(incident.incidentDate);
  return html`
    <div class="card">
      <div class="card-body">
        <h2>${incident.shortDescription}</h2>
        <date datetime=${incidentDate.toISOString()}
          >${incidentDate.toLocaleDateString("en-ZA")}</date
        >
        <div>
          Loss: ${lossCurrencySymbol} ${incident.loss.toFixed(2)}
        </div>
        <button
          type="button"
          class="btn btn-secondary mr-2"
          onclick=${() => editIncident(incident.incidentId)}
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onclick=${() => deleteIncident(incident.incidentId)}
        >
          Delete
        </button>
      </div>
    </div>
  `;
};
