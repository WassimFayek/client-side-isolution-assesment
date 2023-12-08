"use client"
import axios from "axios";
import Table from "@/Components/Table";
import React, {useEffect, useState} from "react";
import ContactForm from "@/Components/ContactForm";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [contacts, setContacts] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

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
            console.log('Contact deleted successfully');
        } catch (error) {
            console.error('Error deleting contact:', error);
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
        </>
    )
}
export default Home
