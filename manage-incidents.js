import { html } from "htm/preact";
import { useState, useCallback } from "preact/hooks";
import moment from "moment";

import { IncidentSummary } from "./incident-summary";
import { EditIncident } from "./edit-incident";

const probe = (label, value) => (console.log(label, value), value);

export const ManageIncidents = ({}) => {
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
      loss: 300,
      lossCurrency: 2
    }
  ]);

  const [currencies, setCurrencies] = useState([
    { id: 1, name: "South African Rands", symbol: "R", code: "ZAR" },
    { id: 2, name: "Botswana Pula", symbol: "P", code: "BWP" },
    { id: 3, name: "Namibian Dollars", symbol: "N$", code: "NAD" }
  ]);

  const [editingIncident, setEditingIncident] = useState(null);

  const saveIncident = useCallback(
    incident => {
      if (incident.incidentId) {
        setIncidents(incidents => {
          const incidentIndex = incidents.findIndex(
            i => i.incidentId == incident.incidentId
          );
          if (incidentIndex > -1) {
            return [
              ...incidents.slice(0, incidentIndex),
              incident,
              ...incidents.slice(incidentIndex + 1)
            ];
          }
          return [...incidents, { ...incident, incidentId: incidents.length }];
        });
      }
    },
    [setIncidents]
  );

  const deleteIncident = useCallback(
    incidentId =>
      setIncidents(incidents =>
        incidents.filter(i => i.incidentId != incidentId)
      ),
    [setIncidents]
  );

  const editIncident = incidentId =>
    setEditingIncident(
      probe(
        "edit this",
        incidents.find(i => i.incidentId == incidentId) ?? {
          incidentId: null,
          shortDescription: "",
          incidentDate: moment(),
          loss: 0,
          lossCurrency: 1
        }
      )
    );

  return html`
    <div class="container pt-2">
      <h1>Incident Management</h1>
      <pre>${JSON.stringify(editingIncident, null, 2)}</pre>
      <${EditIncident}
        editingIncident=${editingIncident}
        saveIncident=${saveIncident}
      />
      <h2>Your Incidents</h2>
      <div class="container-fluid">
        <div class="row">
          ${incidents.map(
            i =>
              html`
                <div class="col-6">
                  <${IncidentSummary}
                    key=${i.incidentId}
                    currencies=${currencies}
                    incident=${i}
                    deleteIncident=${deleteIncident}
                    editIncident=${editIncident}
                  />
                </div>
              `
          )}
        </div>
      </div>
    </div>
  `;
};
