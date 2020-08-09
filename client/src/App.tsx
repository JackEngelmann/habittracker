import React from "react";
import { HomePage } from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import { HabitPage } from "./pages/HabitPage";
import { CreateHabitPage } from "./pages/CreateHabitPage";
import { ApiContext, RestApi } from "./api/ApiContext";

function App() {
  return (
    <div className="App">
      <ApiContext.Provider value={RestApi}>
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
      </ApiContext.Provider>
    </div>
  );
}

export default App;
