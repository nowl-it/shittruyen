import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/search')({
  component: () => <div>Hello /search!</div>
})