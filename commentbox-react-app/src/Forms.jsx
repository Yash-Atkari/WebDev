import { useState } from "react";

export default function Form() {
    let [formData, setFormData] = useState({
        fullName: "", 
        username: "",
        password: "",
    });

    let handleInputChange = (event) => {
        let fieldName = event.target.name;
        let newValue = event.target.value;

        setFormData((currData) => {
            return { ...currData, [fieldName]: newValue }; // using variable instead of key thats why []
        });
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({
            fullName: "", 
            username: "",
            password: "",
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name: </label>
            <input
            placeholder="enter full name"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            id="fullName"
            name="fullName"
            />
            <br />
            <label htmlFor="username">Username: </label>
            <input
            placeholder="enter username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            id="username"
            name="username"
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input
            placeholder="enter password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            id="password"
            name="password"
            />
            <br />
            <button>Submit</button>
        </form>
    );
}

