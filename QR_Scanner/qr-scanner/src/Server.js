const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'sihdbconnection.cvu4owusgq3p.ap-south-1.rds.amazonaws.com',
    user: 'sih2024',
    password: 'sih12345.', // Change this to your MySQL password
    database: 'Travel_Chatbot',
    port: 3306
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Endpoint to check QR code status
app.post('/check-status', (req, res) => {
    const { ticket_id } = req.body;
    if (!ticket_id) {
        console.log("No ticket_Id provided");
        return res.status(400).json({ status: 'error', message: 'No ticket_Id provided' });
    }

    const query = 'SELECT status, name, no_of_adults, no_of_children, no_of_foreigners, events FROM Ticket WHERE ticket_id = ?';
    console.log('Executing query:', query);
    console.log('Query parameters:', ticket_id);
    connection.query(query, [ticket_id], (error, results) => {
        console.log('Query results:', results);

        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).json({ status: 'error', message: 'Database error' });
        }

        if (results.length === 0) {
            console.log('No results found for ticket_Id:', ticket_id);
            return res.status(404).json({ status: 'not found', message: 'Ticket not found' });
        }

        const { status, name, no_of_adults, no_of_children, no_of_foreigners, events } = results[0];

        if (status === 'allowed') {
            console.log("allowed");
            // Update status to 'not allowed'
            const updateQuery = 'UPDATE Ticket SET status = "not allowed" WHERE ticket_id = ?';
            connection.query(updateQuery, [ticket_id], (updateError) => {
                if (updateError) {
                    console.error('Error updating database:', updateError);
                    return res.status(500).json({ status: 'error', message: 'Database update error' });
                }
                res.json({ status: 'allowed', name, no_of_adults, no_of_children, no_of_foreigners, events });
            });
        } else {
            console.log("status not allowed");
            res.json({ status: 'not allowed', name, no_of_adults, no_of_children, no_of_foreigners, events });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
