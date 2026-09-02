'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Application Error | Postal Life Insurance</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <style>{`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f1f5f9;
            color: #334155;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1.5rem;
          }
          .error-card {
            background: #ffffff;
            border-radius: 1.5rem;
            max-width: 32rem;
            width: 100%;
            padding: 2.5rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            text-align: center;
            border: 1px solid #e2e8f0;
          }
          .error-icon {
            width: 4.5rem;
            height: 4.5rem;
            background: #d9233b;
            color: #ffffff;
            border-radius: 1.25rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 2.25rem;
            margin-bottom: 1.5rem;
          }
          .title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #1a202c;
            margin-bottom: 0.5rem;
          }
          .subtitle {
            font-size: 0.875rem;
            color: #64748b;
            margin-bottom: 2rem;
            line-height: 1.5;
          }
          .btn-primary {
            background-color: #d9233b;
            color: #ffffff;
            border: none;
            padding: 0.875rem 2rem;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: opacity 0.2s;
          }
          .btn-primary:hover {
            opacity: 0.9;
          }
        `}</style>
      </head>
      <body>
        <div className="error-card">
          <div className="error-icon">
            <i className="ri-error-warning-fill"></i>
          </div>
          <h1 className="title">System Recovery</h1>
          <p className="subtitle">
            A critical application exception occurred. Your calculation parameters and session remain secure under Government of India data integrity guidelines.
          </p>
          <button onClick={() => reset()} className="btn-primary">
            Reload Portal
          </button>
        </div>
      </body>
    </html>
  );
}
