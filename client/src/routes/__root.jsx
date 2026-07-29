import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,

  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return <Outlet />;
}

function NotFoundPage() {
  return (
    <main>
      <h1>404</h1>
      <p>Trang bạn đang tìm không tồn tại.</p>
    </main>
  );
}