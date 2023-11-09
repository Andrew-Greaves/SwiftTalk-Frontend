/* eslint-disable no-unused-vars */
import React, { useState,useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AddUserModal() {
    const inputRef=useRef();
    const userName=useSelector((state) => state.auth.username);
    const [contactName,setContactName]=useState("");
    const handleAdd = () =>{
        axios.post('http://localhost:3001/addContact',{userName:userName,contactUserName:contactName})
        .then(response => {
            alert(response.data.message);
            inputRef.current.value="";
        })
        .catch(error => {
            console.error("Error adding contact:", error);
            alert(error.response.data.message);
            inputRef.current.value="";
        })
    }
    return (
        <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control" placeholder="Enter Username" onChange={(event) => setContactName(event.target.value)} ref={inputRef}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" style={{backgroundColor:"orange",borderColor:"orange"}} onClick={handleAdd}>Add</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;