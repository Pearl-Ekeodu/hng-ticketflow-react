import React from 'react';
import type { TicketStatus } from '../types';
import './StatusBadge.css';

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  return (
    <span className={`status-badge status-${status} ${className}`}>
      {STATUS_LABELS[status]}
    </span>
  );
};

