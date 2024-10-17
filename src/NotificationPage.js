import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');

        

        // When the WebSocket connection opens
        socket.onopen = () => {
            console.log('Connected to WebSocket');
            
            // Send a message to the server with sellerId
            const sellerData = { sellerId: '10' };
            socket.send(JSON.stringify(sellerData));
        };

        // When a message is received from the WebSocket server
        socket.onmessage = (event) => {
            const newNotification = JSON.parse(event.data);
            console.log(newNotification);
            
            setNotifications((prev) => [...prev, newNotification.message]);
        };

        // Cleanup when the component unmounts
        return () => socket.close();
    });

    return (
        <Box sx={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
                Notifications
            </Typography>
            <List>
                {notifications.map((notification, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={notification}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default NotificationPage;
