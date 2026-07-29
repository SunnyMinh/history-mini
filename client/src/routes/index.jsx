import {
  createFileRoute,
} from "@tanstack/react-router";

import PublicPage from
  "../pages/PublicPage/PublicPage";

export const Route = createFileRoute(
  "/"
)({
  component: PublicPage,
});
