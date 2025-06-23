import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;

    // Try to get current user data
    const response = await queryClient.fetchQuery({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (!response || !response.user) {
      return redirect({ to: "/auth" });
    }

    // Update Redux store with user data
    store.dispatch(login(response.user));

    return {
      user: response.user,
    };
  } catch (error) {
    console.log("Auth check failed:", error);
    return redirect({ to: "/auth" });
  }
};
