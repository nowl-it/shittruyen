import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/tag')({
  component: () => <div>Hello /tag!</div>
})