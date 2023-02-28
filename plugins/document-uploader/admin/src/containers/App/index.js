/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";
import { ApolloProvider } from "@apollo/client";
import client from "../../client";
import ExcelToMongoDB from "../../components/excelToMongoDB";

// Utils
import pluginId from "../../pluginId";
// Containers
import HomePage from "../HomePage";

const App = () => {
  return (
    <div>
      <Switch>
        <ApolloProvider client={client}>
          <Route path={`/plugins/${pluginId}`} component={ExcelToMongoDB} />
          <Route component={NotFound} />
        </ApolloProvider>
      </Switch>
    </div>
  );
};

export default App;
