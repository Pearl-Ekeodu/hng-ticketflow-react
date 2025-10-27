import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { login, signup } from '../utils/auth';
import { loginSchema, signupSchema } from '../utils/validation';
import type { LoginFormData, SignupFormData } from '../utils/validation';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Footer } from '../components/Footer';
import './LandingPage.css';

export function LandingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login: setAuth } = useAuth();
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Check URL params on mount to open modals
  useEffect(() => {
    const authParam = searchParams.get('auth');
    if (authParam === 'login') {
      setIsLoginModalOpen(true);
      // Clean up URL
      searchParams.delete('auth');
      setSearchParams(searchParams, { replace: true });
    } else if (authParam === 'signup') {
      setIsSignupModalOpen(true);
      // Clean up URL
      searchParams.delete('auth');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isSubmitting: isSubmittingLogin },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Signup form
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup, isSubmitting: isSubmittingSignup },
    reset: resetSignup,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const sessionData = await login(data.email, data.password);
      setAuth(sessionData.user, sessionData.token);
      toast.success('Welcome back!');
      setIsLoginModalOpen(false);
      resetLogin();
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      const sessionData = await signup(data.name, data.email, data.password);
      setAuth(sessionData.user, sessionData.token);
      toast.success('Account created successfully!');
      setIsSignupModalOpen(false);
      resetSignup();
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      toast.error(message);
    }
  };

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="landing-page">
      {/* Hero Section with Wavy Background and Decorative Elements */}
      <section className="hero-section">
        <div className="hero-decorative-circle-1"></div>
        <div className="hero-decorative-circle-2"></div>
        <div className="hero-decorative-dot-1"></div>
        <div className="hero-decorative-dot-2"></div>
        
        <div className="hero-container container">
          <div className="hero-badge">Seamless Ticket Management</div>
          <h1 className="hero-title">
            Organize Everything<br />Effortlessly
          </h1>
          <p className="hero-description">
            The modern way to track, manage, and resolve tickets. Beautiful interface, powerful features, zero complexity.
          </p>
          <div className="hero-buttons">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setIsSignupModalOpen(true)}
            >
              Get Started Free
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Wave SVG at bottom */}
        <div className="wave-background">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose TicketFlow?</h2>
          <p className="section-subtitle">
            Everything you need to manage tickets like a pro
          </p>

          <div className="features-grid">
            <Card className="card-hoverable">
              <div className="feature-icon-wrapper">
                <span>📊</span>
              </div>
              <h3 className="feature-title">Real-time Analytics</h3>
              <p className="feature-description">
                Track ticket status and performance with beautiful dashboards and instant insights.
              </p>
            </Card>

            <Card className="card-hoverable">
              <div className="feature-icon-wrapper">
                <span>⚡</span>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Create, update, and resolve tickets in seconds with our intuitive interface.
              </p>
            </Card>

            <Card className="card-hoverable">
              <div className="feature-icon-wrapper">
                <span>✅</span>
              </div>
              <h3 className="feature-title">Stay Organized</h3>
              <p className="feature-description">
                Priority levels, status tracking, and smart filtering keep everything in order.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        {/* Decorative Circle for CTA Section */}
        <div className="cta-decorative-circle"></div>
        
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Transform Your Workflow?</h2>
            <p className="cta-description">
              Join thousands of teams already using TicketFlow to streamline their operations
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => setIsSignupModalOpen(true)}
            >
              Start Free Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          resetLogin();
        }}
        title="Welcome Back"
        description="Log in to your account to continue"
      >
        <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="modal-form" noValidate>
          <Input
            id="login-email"
            label="Email Address"
            type="email"
            placeholder="demo@ticketflow.com"
            error={errorsLogin.email?.message}
            {...registerLogin('email')}
            required
            autoComplete="email"
          />

          <Input
            id="login-password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errorsLogin.password?.message}
            {...registerLogin('password')}
            required
            autoComplete="current-password"
          />

          <div className="modal-actions">
            <Button type="submit" fullWidth isLoading={isSubmittingLogin}>
              Log In
            </Button>
          </div>

          <p className="auth-link-text">
            Don't have an account?{' '}
            <button type="button" onClick={switchToSignup} className="auth-link">
              Sign up
            </button>
          </p>
        </form>
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={isSignupModalOpen}
        onClose={() => {
          setIsSignupModalOpen(false);
          resetSignup();
        }}
        title="Create Account"
        description="Sign up to get started with TicketFlow"
      >
        <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="modal-form" noValidate>
          <Input
            id="signup-name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            error={errorsSignup.name?.message}
            {...registerSignup('name')}
            required
            autoComplete="name"
          />

          <Input
            id="signup-email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            error={errorsSignup.email?.message}
            {...registerSignup('email')}
            required
            autoComplete="email"
          />

          <Input
            id="signup-password"
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            error={errorsSignup.password?.message}
            {...registerSignup('password')}
            required
            autoComplete="new-password"
          />

          <Input
            id="signup-confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            error={errorsSignup.confirmPassword?.message}
            {...registerSignup('confirmPassword')}
            required
            autoComplete="new-password"
          />

          <div className="modal-actions">
            <Button type="submit" fullWidth isLoading={isSubmittingSignup}>
              Create Account
            </Button>
          </div>

          <p className="auth-link-text">
            Already have an account?{' '}
            <button type="button" onClick={switchToLogin} className="auth-link">
              Log in
            </button>
          </p>
        </form>
      </Modal>
    </div>
  );
}
