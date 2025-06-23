import "./index.css";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routing/routeTree.js";
import { Provider } from "react-redux";
import store from "./store/store.js";

// Create query client once
export const queryClient = new QueryClient();

// Create router once
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store,
  },
  defaultPreload: "intent",
});

// Ensure we only create the root once
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
