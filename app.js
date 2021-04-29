import { html } from "htm/preact";

import { ManageIncidents } from "./manage-incidents";

export const App = () =>
  html`
    <${ManageIncidents} />
  `;
