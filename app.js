import { html } from "htm/preact";
import { ButtonCounter } from "./button-counter";

export const App = () => {
  const onChildClicked = e => {
    console.log("callback from parent triggered", e);
  };

  return html`
    <div class="container pt-2">
      <h1>Preact htm Starter Template</h1>

      <p>
        Simple Preact htm Template with a custom ButtonCounter Component
      </p>

      <${ButtonCounter} name="Preact htm" onClicked=${e => onChildClicked(e)} />
    </div>
  `;
};
