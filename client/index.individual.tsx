import * as React from "react"
import { render } from "react-dom";
import { ReferentialStore } from "./stores/store.referential";
import { IndividualApp } from "./components/IndividualApp";

async function main()
{
  const referentialStore = new ReferentialStore();
  await referentialStore.refresh();
  render(
    <IndividualApp referentialStore={referentialStore} />,
    document.getElementById("individual-app"));
}
