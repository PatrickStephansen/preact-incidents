import { html } from "htm/preact";
export const IncidentSummary = ({
  incident,
  currencies,
  deleteIncident,
  editIncident
}) => {
  const lossCurrencySymbol = currencies.find(c => c.id == incident.lossCurrency)
    ?.symbol;
  return html`
    <div class="card">
      <div class="card-body">
        <h2>${incident.shortDescription}</h2>
        <date datetime=${incident.incidentDate.format()}
          >${incident.incidentDate.format("yyyy-MM-DD")}</date
        >
        <div>
          Loss: ${lossCurrencySymbol} ${incident.loss}
        </div>
        <button
          type="button"
          class="btn btn-secondary"
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
