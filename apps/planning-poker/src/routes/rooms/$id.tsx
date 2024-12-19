import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rooms/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>Hello "/rooms/{id}"!</div>;
}
