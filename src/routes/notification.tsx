import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/notification')({
  component: Notification
});

function Notification() {
  return (
    <div></div>
  );
}
