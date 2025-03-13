import cron from 'node-cron';
import Event from '../models/event.js';
import nodemailer from 'nodemailer';

const sendReminder = async () => {
    const events = await Event.find({ reminder: true });
    const now = new Date();

    events.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate - now <= 3600000) { // 1 hour before the event
            // Send email reminder
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: event.user.email,
                subject: `Reminder for your event: ${event.name}`,
                text: `You have an upcoming event: ${event.name} at ${event.time} on ${event.date}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
};

cron.schedule('* * * * *', sendReminder); // Run every minute