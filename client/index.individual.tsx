import * as React from "react"
import { render } from "react-dom";
import { ReferentialStore } from "./stores/store.referential";
import { IndividualApp } from "./components/IndividualApp";

const referentialStore = new ReferentialStore();
render(
  <IndividualApp referentialStore={referentialStore} />,
  document.getElementById("individual-app"));
