import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/sign-in')({
  component: () => <div>Hello /auth/sign-in!</div>
})