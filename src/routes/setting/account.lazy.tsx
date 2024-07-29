import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/setting/account')({
  component: () => <div>Hello /setting/account!</div>
})