import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useTickets } from '../hooks/useTickets';
import { ticketSchema } from '../utils/validation';
import type { TicketFormDataValidated } from '../utils/validation';
import type { Ticket } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Select } from '../components/Select';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { Footer } from '../components/Footer';
import './TicketsPage.css';

export const TicketsPage: React.FC = () => {
  const { tickets, loading, createTicket, updateTicket, deleteTicket } = useTickets();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate, isSubmitting: isSubmittingCreate },
    reset: resetCreate,
  } = useForm<TicketFormDataValidated>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      status: 'open',
    },
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isSubmitting: isSubmittingEdit },
    reset: resetEdit,
  } = useForm<TicketFormDataValidated>({
    resolver: zodResolver(ticketSchema),
  });

  useEffect(() => {
    if (selectedTicket && isEditModalOpen) {
      resetEdit({
        title: selectedTicket.title,
        description: selectedTicket.description || '',
        status: selectedTicket.status,
        priority: selectedTicket.priority,
      });
    }
  }, [selectedTicket, isEditModalOpen, resetEdit]);

  const onCreateSubmit = async (data: TicketFormDataValidated) => {
    const result = await createTicket(data);
    if (result.success) {
      toast.success('Ticket created successfully!');
      setIsCreateModalOpen(false);
      resetCreate();
    }
  };

  const onEditSubmit = async (data: TicketFormDataValidated) => {
    if (!selectedTicket) return;

    const result = await updateTicket(selectedTicket.id, data);
    if (result.success) {
      toast.success('Ticket updated successfully!');
      setIsEditModalOpen(false);
      setSelectedTicket(null);
      resetEdit();
    }
  };

  const handleDelete = async () => {
    if (!selectedTicket) return;

    const result = await deleteTicket(selectedTicket.id);
    if (result.success) {
      toast.success('Ticket deleted successfully!');
      setIsDeleteModalOpen(false);
      setSelectedTicket(null);
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDeleteModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="tickets-page">
      {/* Decorative Circles for Tickets Page */}
      <div className="tickets-decorative-circle-1"></div>
      <div className="tickets-decorative-circle-2"></div>
      
      <div className="tickets-content-wrapper">
      <div className="tickets-header-section">
        <div className="container">
          <div className="tickets-header-content">
            <div className="tickets-title-section">
              <h1 className="tickets-title">Ticket Management</h1>
              <p className="tickets-subtitle">Create, view, edit, and manage all your tickets</p>
            </div>
            <Button 
              variant="primary"
              size="lg"
              onClick={() => setIsCreateModalOpen(true)}
            >
              + Create Ticket
            </Button>
          </div>
        </div>
      </div>

      <main className="tickets-main">
        <div className="container">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h2 className="empty-title">No tickets yet</h2>
              <p className="empty-description">
                Get started by creating your first ticket
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Create Your First Ticket
              </Button>
            </div>
          ) : (
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <Card key={ticket.id} hoverable>
                  <div className="ticket-card">
                    <div className="ticket-header">
                      <h3 className="ticket-title">{ticket.title}</h3>
                      <StatusBadge status={ticket.status} />
                    </div>

                    {ticket.description && (
                      <p className="ticket-description">{ticket.description}</p>
                    )}

                    <div className="ticket-meta">
                      <span className="ticket-date">
                        Created: {formatDate(ticket.createdAt)}
                      </span>
                      {ticket.priority && (
                        <span className={`ticket-priority priority-${ticket.priority}`}>
                          {ticket.priority}
                        </span>
                      )}
                    </div>

                    <div className="ticket-actions">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(ticket)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(ticket)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Ticket Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetCreate();
        }}
        title="Create New Ticket"
      >
        <form onSubmit={handleSubmitCreate(onCreateSubmit)} className="ticket-form">
          <Input
            id="create-title"
            label="Title"
            placeholder="Enter ticket title"
            error={errorsCreate.title?.message}
            {...registerCreate('title')}
            required
          />

          <Textarea
            id="create-description"
            label="Description"
            placeholder="Enter ticket description (optional)"
            error={errorsCreate.description?.message}
            {...registerCreate('description')}
            rows={4}
          />

          <Select
            id="create-status"
            label="Status"
            error={errorsCreate.status?.message}
            {...registerCreate('status')}
            options={[
              { value: 'open', label: 'Open' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'closed', label: 'Closed' },
            ]}
            required
          />

          <Select
            id="create-priority"
            label="Priority"
            error={errorsCreate.priority?.message}
            {...registerCreate('priority')}
            options={[
              { value: '', label: 'Select priority (optional)' },
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />

          <div className="modal-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetCreate();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmittingCreate}>
              Create Ticket
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Ticket Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTicket(null);
          resetEdit();
        }}
        title="Edit Ticket"
      >
        <form onSubmit={handleSubmitEdit(onEditSubmit)} className="ticket-form">
          <Input
            id="edit-title"
            label="Title"
            placeholder="Enter ticket title"
            error={errorsEdit.title?.message}
            {...registerEdit('title')}
            required
          />

          <Textarea
            id="edit-description"
            label="Description"
            placeholder="Enter ticket description (optional)"
            error={errorsEdit.description?.message}
            {...registerEdit('description')}
            rows={4}
          />

          <Select
            id="edit-status"
            label="Status"
            error={errorsEdit.status?.message}
            {...registerEdit('status')}
            options={[
              { value: 'open', label: 'Open' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'closed', label: 'Closed' },
            ]}
            required
          />

          <Select
            id="edit-priority"
            label="Priority"
            error={errorsEdit.priority?.message}
            {...registerEdit('priority')}
            options={[
              { value: '', label: 'Select priority (optional)' },
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />

          <div className="modal-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedTicket(null);
                resetEdit();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmittingEdit}>
              Update Ticket
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTicket(null);
        }}
        title="Delete Ticket"
      >
        <div className="delete-modal">
          <p className="delete-message">
            Are you sure you want to delete this ticket? This action cannot be undone.
          </p>
          {selectedTicket && (
            <div className="delete-ticket-preview">
              <strong>{selectedTicket.title}</strong>
            </div>
          )}
          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedTicket(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={loading}>
              Delete Ticket
            </Button>
          </div>
        </div>
      </Modal>
      </div>

      <Footer />
    </div>
  );
};

