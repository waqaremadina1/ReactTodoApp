import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';  // Ensure to import the context if not already

export default function Hero() {
  const { isAuthenticated } = useAuthContext(); // Get isAuthenticated from context

  return (
    <>
      <div className="hero-container text-center text-white d-flex align-items-center">
        <div className="container">
          {/* Welcome Section */}
          <h1 className="display-5 fw-bold mb-4">Welcome to My Todos App</h1>
          <p className="mt-3 mb-4 fs-6">
            Organize your tasks effortlessly with a sleek and intuitive interface. 
            Stay on top of your schedule, whether you're at home or on the go.
          </p>

          {/* Call to Action */}
          <div className="mt-4">
            {isAuthenticated 
              ? <Link to="/add" className="btn btn-primary btn-sm mx-2">Get Started</Link> 
              : <Link to="/authentication/login" className="btn btn-primary btn-sm mx-2">Get Started</Link>
            }
            <Link to='https://waqarjs.web.app' target='_blank' className="btn btn-outline-light btn-sm mx-2">Learn More</Link>
          </div>
        </div>
      </div>

      {/* Styling */}
      <style>
        {`
        .hero-container {
          height: 100vh;
          background: linear-gradient(to bottom right, #007bff, #6610f2); /* Blue-to-purple gradient */
          font-family: 'Arial', sans-serif;
        }

        h1 {
          font-size: 2rem;
          line-height: 1.3;
        }

        p {
          font-size: 1rem;
          line-height: 1.6;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.9rem;
          font-weight: bold;
          border-radius: 6px;
        }

        .btn-outline-light {
          border: 2px solid white;
          color: white;
        }

        .btn-outline-light:hover {
          background-color: white;
          color: #007bff;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          p {
            font-size: 0.9rem;
          }

          .btn-sm {
            font-size: 0.85rem;
          }
        }
        `}
      </style>
    </>
  );
}
