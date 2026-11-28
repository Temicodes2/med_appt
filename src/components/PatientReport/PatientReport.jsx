import React, { useState } from 'react';
import { API_URL } from '../../config';
import './PatientReport.css';

const PatientReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(false);

  const downloadReport = async () => {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      setError('Please log in to view your patient report.');
      return;
    }

    setLoading(true);
    setError('');
    setGenerated(false);

    try {
      const res = await fetch(`${API_URL}/api/patient/report`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate report');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'patient-report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setGenerated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-report">
      <div className="report-card">
        <h2 className="report-title">Patient Report</h2>
        <p className="report-subtitle">
          Download your personal medical report including patient details and
          appointment history as a PDF.
        </p>

        {error && <div className="error-msg">{error}</div>}

        {generated && (
          <div className="success-msg">
            Success: Your patient report PDF has been downloaded.
          </div>
        )}

        <button
          className="download-btn"
          onClick={downloadReport}
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : 'Download Patient Report PDF'}
        </button>

        <p className="report-hint">
          Requires login. The report includes your name, email, phone, patient ID,
          and appointment history.
        </p>
      </div>
    </div>
  );
};

export default PatientReport;

