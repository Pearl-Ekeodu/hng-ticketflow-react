import { useState, useEffect, useCallback } from 'react';
import type { Ticket, TicketFormData } from '../types';
import {
  getAllTickets,
  getTicketById,
  createTicket as createTicketAPI,
  updateTicket as updateTicketAPI,
  deleteTicket as deleteTicketAPI,
} from '../utils/tickets';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(() => {
    try {
      const allTickets = getAllTickets();
      setTickets(allTickets);
      setError(null);
    } catch (err) {
      setError('Failed to load tickets');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const createTicket = async (data: TicketFormData) => {
    setLoading(true);
    setError(null);
    try {
      await createTicketAPI(data);
      fetchTickets();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create ticket';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id: string, data: Partial<TicketFormData>) => {
    setLoading(true);
    setError(null);
    try {
      await updateTicketAPI(id, data);
      fetchTickets();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update ticket';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTicketAPI(id);
      fetchTickets();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete ticket';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const getTicket = (id: string) => {
    return getTicketById(id);
  };

  return {
    tickets,
    loading,
    error,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicket,
    refreshTickets: fetchTickets,
  };
};

