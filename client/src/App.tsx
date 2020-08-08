import React from "react";
import { HomePage } from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import { HabitPage } from "./pages/HabitPage";
import { CreateHabitPage } from "./pages/CreateHabitPage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/habit/create">
            <CreateHabitPage />
          </Route>
          <Route path="/habit/:id">
            <HabitPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
