const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'thisismysecretuniquekeywithjsonwebtoken';

// Middleware: verify JWT from Authorization header
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Route: GET /api/patient/report - Generate patient report PDF
router.get('/report', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Build PDF document
        const doc = new PDFDocument({ size: 'A4', margin: 50 });

        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=patient-report-${user.name.replace(/\s+/g, '_')}.pdf`);

        doc.pipe(res);

        // ---- Header ----
        doc.fontSize(22).font('Helvetica-Bold').fillColor('#2190ff').text('StayHealthy', { align: 'center' });
        doc.fontSize(12).font('Helvetica').fillColor('#666').text('Medical Appointment Booking & Patient Report', { align: 'center' });
        doc.moveDown();

        // Report title
        doc.fontSize(16).font('Helvetica-Bold').fillColor('#000').text('Patient Medical Report', { align: 'center' });
        doc.moveDown();

        // Generated date
        doc.fontSize(10).font('Helvetica').fillColor('#666').text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.moveDown(1.5);

        // ---- Patient Information section ----
        doc.fontSize(14).font('Helvetica-Bold').fillColor('#2190ff').text('Patient Information', { underline: true });
        doc.moveDown(0.5);

        const patientInfo = [
            ['Name', user.name || 'N/A'],
            ['Email', user.email || 'N/A'],
            ['Phone', user.phone || 'N/A'],
            ['Patient ID', user._id.toString()],
            ['Member Since', user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'],
        ];

        patientInfo.forEach(([label, value]) => {
            doc.fontSize(11).font('Helvetica-Bold').fillColor('#000').text(`${label}: `, { continued: true });
            doc.fontSize(11).font('Helvetica').fillColor('#333').text(value);
        });

        doc.moveDown(1);

        // ---- Appointment History section ----
        doc.fontSize(14).font('Helvetica-Bold').fillColor('#2190ff').text('Appointment History', { underline: true });
        doc.moveDown(0.5);

        // Try to load Appointment model if it exists
        let appointments = [];
        try {
            if (mongoose.modelNames().includes('Appointment')) {
                const Appointment = mongoose.model('Appointment');
                appointments = await Appointment.find({ patientId: userId }).sort({ date: -1 });
            }
        } catch (e) {
            appointments = [];
        }

        if (appointments.length === 0) {
            doc.fontSize(11).font('Helvetica').fillColor('#666').text('No appointments on record.');
        } else {
            const colX = [50, 150, 250, 350, 450];
            const headers = ['Date', 'Doctor', 'Speciality', 'Time Slot', 'Status'];

            // Table header
            doc.fontSize(10).font('Helvetica-Bold').fillColor('#fff');
            headers.forEach((h, i) => {
                doc.rect(colX[i], doc.y, 100, 20).fill('#2190ff');
                doc.text(h, colX[i] + 5, doc.y + 5, { width: 90 });
            });
            doc.moveDown(0.3);

            appointments.forEach((appt, idx) => {
                const rowY = doc.y;
                const isEven = idx % 2 === 0;
                doc.rect(50, rowY, 400, 22).fill(isEven ? '#fafafa' : '#fff');

                const rowData = [
                    appt.date || 'N/A',
                    appt.doctorName || 'N/A',
                    appt.doctorSpeciality || 'N/A',
                    appt.selectedSlot || 'N/A',
                    appt.status || 'Booked',
                ];

                rowData.forEach((val, i) => {
                    doc.fontSize(9).font('Helvetica').fillColor('#000').text(val, colX[i] + 5, rowY + 5, { width: 90 });
                });
                doc.moveDown(0.35);
            });
        }

        doc.moveDown(1.5);

        // ---- Footer ----
        doc.fontSize(9).font('Helvetica').fillColor('#999').text('StayHealthy — Medical Appointment Booking', { align: 'center' });
        doc.fontSize(9).font('Helvetica').fillColor('#999').text('This report is generated for personal medical records.', { align: 'center' });

        doc.end();
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to generate report' });
        }
    }
});

module.exports = router;
