import React from "react";

const Table = ({contacts, onDelete, onUpdate}) => {

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                (contacts &&
                    contacts.length > 0) ?
                    contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.first_name ? contact.first_name : '-'}
                                {" "}
                                {contact.last_name ? contact.last_name : '-'}
                            </td>
                            <td>{contact.email ? contact.email : '-'}</td>
                            <td>{contact.phone_number ? contact.phone_number : '-'}</td>
                            <td>
                                <button onClick={() => onUpdate(contact.id)}>Update</button>
                                <button onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td>{" No Contacts available "}</td>
                    </tr>
            }
            </tbody>
        </table>
    )
}
export default Table