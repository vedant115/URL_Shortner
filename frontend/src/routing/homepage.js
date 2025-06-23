import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import HomePage from "../pages/HomePage";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  beforeLoad: async ({ context }) => {
    try {
      const { queryClient, store } = context;

      // Try to get current user data
      const response = await queryClient
        .fetchQuery({
          queryKey: ["currentUser"],
          queryFn: getCurrentUser,
          retry: false,
          staleTime: 1000 * 60 * 5, // 5 minutes
        })
        .catch(() => null);

      if (response && response.user) {
        store.dispatch(login(response.user));
        return redirect({ to: "/dashboard" });
      }

      return {};
    } catch (error) {
      console.log("Home auth check failed:", error);
      // Make sure we're not authenticated in the store
      store.dispatch({ type: "auth/logout" });
      return {};
    }
  },
});
