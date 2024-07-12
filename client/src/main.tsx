import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "~/App.tsx";
import "./index.scss";
import { UserToken } from "~/Hooks";
import store from "~/Redux/store.ts";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserToken>
          <App />
        </UserToken>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
