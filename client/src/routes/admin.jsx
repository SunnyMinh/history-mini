import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import {
  getStoredToken,
  getStoredUser,
} from "../utils/authStorage";

export const Route =
  createFileRoute("/admin")({
    beforeLoad: () => {
      const token =
        getStoredToken();

      const user =
        getStoredUser();

      if (!token) {
        throw redirect({
          to: "/login",
          replace: true,
        });
      }

      const isAdmin =
        user?.roles?.includes(
          "Admin"
        );

      if (!isAdmin) {
        throw redirect({
          to: "/home",
          replace: true,
        });
      }
    },

    component: AdminLayout,
  });

function AdminLayout() {
  return <Outlet />;
}