import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { getDashboardStats, createTicket, getAllTickets } from '../utils/tickets';
import { ticketSchema } from '../utils/validation';
import type { DashboardStats, Ticket } from '../types';
import type { TicketFormDataValidated } from '../utils/validation';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Select } from '../components/Select';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { Footer } from '../components/Footer';
import './DashboardPage.css';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    closedTickets: 0,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TicketFormDataValidated>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      status: 'open',
    },
  });

  useEffect(() => {
    const dashboardStats = getDashboardStats();
    setStats(dashboardStats);
    
    // Load recent tickets for activity tab
    const tickets = getAllTickets();
    const recent = tickets.slice(0, 5); // Get 5 most recent tickets
    setRecentTickets(recent);
  }, []);

  const onCreateSubmit = async (data: TicketFormDataValidated) => {
    try {
      await createTicket(data);
      toast.success('Ticket created successfully!');
      setIsCreateModalOpen(false);
      reset();
      // Refresh stats and recent tickets
      const updatedStats = getDashboardStats();
      setStats(updatedStats);
      const tickets = getAllTickets();
      const recent = tickets.slice(0, 5);
      setRecentTickets(recent);
      // Redirect to tickets page
      navigate('/tickets');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create ticket';
      toast.error(message);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Decorative Circles for Dashboard */}
      <div className="dashboard-decorative-circle-1"></div>
      <div className="dashboard-decorative-circle-2"></div>
      
      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! Here's your ticket overview
            </p>
          </div>

          {/* Dashboard Tabs */}
          <div className="dashboard-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Recent Activity
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <span>🎫</span>
                  </div>
                  <p className="stat-label">Total Tickets</p>
                  <p className="stat-value">{stats.totalTickets}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <span>⚠️</span>
                  </div>
                  <p className="stat-label">Open</p>
                  <p className="stat-value">{stats.openTickets}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <span>🕒</span>
                  </div>
                  <p className="stat-label">In Progress</p>
                  <p className="stat-value">{stats.inProgressTickets}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <span>✅</span>
                  </div>
                  <p className="stat-label">Closed</p>
                  <p className="stat-value">{stats.closedTickets}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="actions-section">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate('/tickets')}
                  >
                    Manage Tickets
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Create New Ticket
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'activity' && (
            <div className="activity-section">
              <h2>Recent Activity</h2>
              <div className="activity-content">
                {recentTickets.length === 0 ? (
                  <div className="empty-activity">
                    <div className="empty-activity-icon">📝</div>
                    <h3>No recent activity</h3>
                    <p>Create your first ticket to see activity here</p>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                      Create Ticket
                    </Button>
                  </div>
                ) : (
                  <div className="activity-list">
                    {recentTickets.map((ticket) => (
                      <div key={ticket.id} className="activity-item">
                        <div className="activity-item-header">
                          <h4 className="activity-item-title">{ticket.title}</h4>
                          <StatusBadge status={ticket.status} />
                        </div>
                        {ticket.description && (
                          <p className="activity-item-description">
                            {ticket.description.length > 100 
                              ? `${ticket.description.substring(0, 100)}...` 
                              : ticket.description
                            }
                          </p>
                        )}
                        <div className="activity-item-meta">
                          <span className="activity-item-date">
                            Created: {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          {ticket.priority && (
                            <span className={`activity-item-priority priority-${ticket.priority}`}>
                              {ticket.priority}
                            </span>
                          )}
                        </div>
                        <div className="activity-item-actions">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => navigate('/tickets')}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          reset();
        }}
        title="Create New Ticket"
        description="Fill in the details to create a new support ticket."
      >
        <form onSubmit={handleSubmit(onCreateSubmit)} className="modal-form">
          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            placeholder="e.g., Database connection issue"
          />
          <Textarea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
            placeholder="Provide a detailed description of the issue."
          />
          <div className="form-row">
            <Select
              label="Status"
              {...register('status')}
              error={errors.status?.message}
              options={[
                { value: 'open', label: 'Open' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'closed', label: 'Closed' }
              ]}
            />
            <Select
              label="Priority"
              {...register('priority')}
              error={errors.priority?.message}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
              ]}
            />
          </div>
          <div className="modal-actions">
            <Button type="submit" isLoading={isSubmitting}>
              Create Ticket
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsCreateModalOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};
