import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const ContactFormDialog = ({isOpen, onClose, isUpdateMode, selectedContact, onReload}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (isUpdateMode && selectedContact) {
            setFormData({
                firstName: selectedContact.first_name || '',
                lastName: selectedContact.last_name || '',
                email: selectedContact.email || '',
                phoneNumber: selectedContact.phone_number || '',
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            });
        }
    }, [isUpdateMode, selectedContact]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSave = async () => {
        let url = ''
        if (!isUpdateMode) {
            url = `http://localhost:8000/api/store-contacts/`
        } else {
            url = `http://localhost:8000/api/update-contacts/${selectedContact.id}`
        }
        try {
            await axios.post(url, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone_number: formData.phoneNumber
            });
            onReload()
            console.log('Contact added successfully');
        } catch (error) {
            console.error('Error while adding new contact:', error);
        }
        onClose();
    };


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Contact Form</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill in the details for the new contact.
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    type="text"
                    id="firstName"
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    value={formData.firstName}
                />
                <TextField
                    fullWidth
                    type="text"
                    id="lastName"
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    value={formData.lastName}
                />
                <TextField
                    fullWidth
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    margin="dense"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    type="tel"
                    margin="dense"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {
                    isUpdateMode ?
                        <Button onClick={handleSave} autoFocus>
                            Update
                        </Button>
                        :
                        <Button onClick={handleSave} autoFocus>
                            Save
                        </Button>
                }
            </DialogActions>
        </Dialog>
    );
};

export default ContactFormDialog;
