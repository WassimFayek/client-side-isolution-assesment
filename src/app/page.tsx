"use client"
import axios from "axios";
import Table from "@/Components/Table";
import Snackbar from '@mui/material/Snackbar';
import React, {useEffect, useState} from "react";
import ContactForm from "@/Components/ContactForm";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import MuiAlert, {AlertColor} from '@mui/material/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [contacts, setContacts] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

    const [snackbarInfo, setSnackbarInfo] = useState<{
        open: boolean;
        message: string;
        severity: AlertColor;
    }>({
        open: false,
        message: '',
        severity: 'success',
    });


    const handleSnackbarClose = () => {
        setSnackbarInfo((prev) => ({ ...prev, open: false }));
    };

    const handleSnackbar = (message: string, severity: AlertColor) => {
        setSnackbarInfo({
            open: true,
            message,
            severity,
        });
    };
    const handleOpenDialog = () => {
        setDialogOpen(true);
        setUpdateMode(false);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const fetchContacts = async () => {
        try {
            const response = await axios.get(apiUrl + 'list-contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts().then();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(apiUrl + `delete-contacts/${id}`);
            await fetchContacts();
            handleSnackbar('Contact deleted successfully', 'success');
        } catch (error) {
            handleSnackbar('Error deleting contact', 'error');
        }
    };

    const handleUpdate = (contact: object) => {
        setDialogOpen(true);
        setUpdateMode(true);
        setSelectedContact(contact);
    };

    return (
        <>
            <header className={'flex justify-between items-center p-4 '}>
                <h1 className={'text-4xl p-6'}>Contact List</h1>
            </header>
            <ContactForm
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                isUpdateMode={isUpdateMode}
                selectedContact={selectedContact}
                onReload = {fetchContacts}
                handleSnackBar={handleSnackbar}
            />
            <div>
                <div className="flex justify-end pr-32">
                    <button
                        onClick={handleOpenDialog}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Contact
                    </button>
                </div>
                <Table contacts={contacts} onDelete={handleDelete} onUpdate={handleUpdate}/>
            </div>

            <Snackbar
                open={snackbarInfo.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackbarInfo.severity}
                    onClose={handleSnackbarClose}
                >
                    {snackbarInfo.message}
                </MuiAlert>
            </Snackbar>
        </>
    )
}
export default Home
