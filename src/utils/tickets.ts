// Ticket management utilities

import type { Ticket, TicketFormData, DashboardStats } from '../types';

const TICKETS_KEY = 'ticketapp_tickets';

// Initialize with some demo tickets
const INITIAL_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Setup project repository',
    description: 'Create initial project structure and setup Git repository',
    status: 'closed',
    priority: 'high',
    createdAt: new Date('2025-10-20').toISOString(),
    updatedAt: new Date('2025-10-21').toISOString(),
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create wireframes and mockups for the landing page',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date('2025-10-22').toISOString(),
    updatedAt: new Date('2025-10-23').toISOString(),
  },
  {
    id: '3',
    title: 'Implement authentication',
    description: 'Add login and signup functionality with form validation',
    status: 'open',
    priority: 'medium',
    createdAt: new Date('2025-10-23').toISOString(),
    updatedAt: new Date('2025-10-23').toISOString(),
  },
];

// Get all tickets from localStorage
export const getAllTickets = (): Ticket[] => {
  const ticketsStr = localStorage.getItem(TICKETS_KEY);
  
  if (!ticketsStr) {
    // Initialize with demo tickets
    localStorage.setItem(TICKETS_KEY, JSON.stringify(INITIAL_TICKETS));
    return INITIAL_TICKETS;
  }
  
  try {
    return JSON.parse(ticketsStr);
  } catch {
    return INITIAL_TICKETS;
  }
};

// Save all tickets to localStorage
const saveAllTickets = (tickets: Ticket[]): void => {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

// Get a single ticket by ID
export const getTicketById = (id: string): Ticket | null => {
  const tickets = getAllTickets();
  return tickets.find((ticket) => ticket.id === id) || null;
};

// Create a new ticket
export const createTicket = async (
  data: TicketFormData
): Promise<Ticket> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newTicket: Ticket = {
    id: `ticket_${Date.now()}`,
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const tickets = getAllTickets();
  tickets.unshift(newTicket); // Add to beginning
  saveAllTickets(tickets);

  return newTicket;
};

// Update an existing ticket
export const updateTicket = async (
  id: string,
  data: Partial<TicketFormData>
): Promise<Ticket> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const tickets = getAllTickets();
  const ticketIndex = tickets.findIndex((t) => t.id === id);

  if (ticketIndex === -1) {
    throw new Error('Ticket not found');
  }

  const updatedTicket: Ticket = {
    ...tickets[ticketIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  tickets[ticketIndex] = updatedTicket;
  saveAllTickets(tickets);

  return updatedTicket;
};

// Delete a ticket
export const deleteTicket = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const tickets = getAllTickets();
  const filteredTickets = tickets.filter((t) => t.id !== id);

  if (filteredTickets.length === tickets.length) {
    throw new Error('Ticket not found');
  }

  saveAllTickets(filteredTickets);
};

// Get dashboard statistics
export const getDashboardStats = (): DashboardStats => {
  const tickets = getAllTickets();

  return {
    totalTickets: tickets.length,
    openTickets: tickets.filter((t) => t.status === 'open').length,
    inProgressTickets: tickets.filter((t) => t.status === 'in_progress').length,
    closedTickets: tickets.filter((t) => t.status === 'closed').length,
  };
};

