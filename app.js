import { html } from "htm/preact";
import { useState } from "preact/hooks";
import moment from "moment";

import { IncidentSummary } from "./incident-summary";

export const App = () => {
  const [incidents, setIncidents] = useState([
    {
      incidentId: 1,
      shortDescription: "something went wrong",
      incidentDate: moment("2021-04-30"),
      loss: 100,
      lossCurrency: 1
    },
    {
      incidentId: 2,
      shortDescription: "something else went wrong",
      incidentDate: moment("2021-04-29"),
      loss: 200,
      lossCurrency: 1
    },
    {
      incidentId: 3,
      shortDescription: "someone elses problem",
      incidentDate: moment("2021-04-29"),
      loss: 200,
      lossCurrency: 2
    }
  ]);

  const [currencies, setCurrencies] = useState([
    { id: 1, name: "South African Rands", symbol: "R", code: "ZAR" },
    { id: 2, name: "Botswana Pula", symbol: "P", code: "BWP" },
    { id: 3, name: "Namibian Dollars", symbol: "N$", code: "NAD" }
  ]);

  return html`
    <div class="container pt-2">
      <h1>Incidents</h1>
      <div class="container-fluid">
        <div class="row">
          ${incidents.map(
            i =>
              html`
                <div class="col-sm">
                  <${IncidentSummary}
                    key=${i.incidentId}
                    currencies=${currencies}
                    incident=${i}
                  />
                </div>
              `
          )}
        </div>
      </div>
    </div>
  `;
};
