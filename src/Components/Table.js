import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

const Table = ({contacts, onDelete, onUpdate}) => {
    return (
        <div className="container mx-auto p-4">
            <table className="w-full border border-gray-300">
                <thead>
                <tr>
                    <th className="border-b p-2 text-center">ID</th>
                    <th className="border-b p-2 text-center">Name</th>
                    <th className="border-b p-2 text-center">Email</th>
                    <th className="border-b p-2 text-center">Phone</th>
                    <th className="border-b p-2 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    contacts &&
                    contacts.length > 0 ?
                        (
                            contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td className="border-b p-2 text-center">{contact.id}</td>
                                    <td className="border-b p-2 text-center">
                                        {contact.first_name ? contact.first_name : "-"}{" "}
                                        {contact.last_name ? contact.last_name : "-"}
                                    </td>
                                    <td className="border-b p-2 text-center">
                                        {contact.email ? contact.email : "-"}
                                    </td>
                                    <td className="border-b p-2 text-center">
                                        {contact.phone_number ? contact.phone_number : "-"}
                                    </td>
                                    <td className="border-b p-2 text-center">
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className="text-blue-500 cursor-pointer hover:text-blue-700 mr-2"
                                            onClick={() => onUpdate(contact)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-red-500 cursor-pointer hover:text-red-700"
                                            onClick={() => onDelete(contact.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )
                        :
                        (
                            <tr>
                                <td className="border-b p-2 text-center" colSpan="5">
                                    {" No Contacts available "}
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
