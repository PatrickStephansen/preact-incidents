import { render } from "preact";
import { html } from "htm/preact";
import { App } from "./app";
import "./style";

render(
  html`
    <${App} />
  `,
  document.body
);
