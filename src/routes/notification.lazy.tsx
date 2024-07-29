import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/notification')({
  component: () => <div>Hello /notification!</div>
})