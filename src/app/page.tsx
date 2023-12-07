"use client"
import axios from "axios";
import Table from "@/Components/Table";
import React, {useEffect, useState} from "react";
import ContactForm from "@/Components/ContactForm";

const Home: React.FC = () => {
    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/list-contacts');
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
            await axios.delete(`http://localhost:8000/api/delete-contacts/${id}`);
            await fetchContacts();
            console.log('Contact deleted successfully');
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };


    return (
        <>
            <header className={'flex justify-between items-center p-4 '}>
                <h1 className={'text-4xl p-6'}>Contact List</h1>
                <button onClick={() => setShowForm(true)}>Add Contact</button>
            </header>
            {showForm && <ContactForm onSubmit={()=>console.log("add")} />}
            <div>
                <Table contacts={contacts} onDelete={handleDelete} onUpdate={() => {
                    console.log("update")
                }}/>
            </div>
        </>
    )
}
export default Home
