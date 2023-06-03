import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
  Cache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
const token = localStorage.getItem("token");
import { serverURL, serverURLWS } from "./utils/serveUrl";
//import * as Sentry from "@sentry/react";
import "./config/i18n.js";
import Loading from "./components/commons/Loading";
 
// Sentry.init({
//   dsn: "https://f621acf936184f969eb546eb77e81f21@o4505182716690432.ingest.sentry.io/4505182719442944",
//   integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

console.log( serverURL+"/graphql");

const httpLink = createHttpLink({
  uri: serverURL+"/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

console.log(serverURL+"/graphql/ws");

const wsLink = new GraphQLWsLink(
  createClient({
    url: serverURLWS+"/graphql/ws",
    connectionParams: {
      authToken: token,
    },
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Suspense fallback={Loading}>
        <App />
      </Suspense>
    </ApolloProvider>
  </React.StrictMode>
);
