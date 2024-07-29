import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/bookmark')({
  component: () => <div>Hello /bookmark!</div>
})