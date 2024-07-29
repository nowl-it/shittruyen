import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/setting/general')({
  component: () => <div>Hello /setting/general!</div>
})