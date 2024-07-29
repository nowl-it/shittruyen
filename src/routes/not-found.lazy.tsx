import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/not-found')({
  component: () => <div>Hello /not-found!</div>
})