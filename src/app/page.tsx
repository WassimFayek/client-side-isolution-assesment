"use client"
import axios from "axios";
import Table from "@/Components/Table";
import React, {useEffect, useState} from "react";

const Home: React.FC = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/list-contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    return (
        <>
        <header className={'flex justify-between items-center p-4 '}>
            <h1 className={'text-4xl p-6'}>Contact List</h1>
            <button>Add Contact</button>

        </header>
        <div>
            <Table contacts={contacts} onDelete={() => console.log("delete")} onUpdate={() => {console.log("update")}}/>
        </div>
        </>
    )
}
export default Home
