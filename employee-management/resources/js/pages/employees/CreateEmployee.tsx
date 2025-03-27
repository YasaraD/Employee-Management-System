import React, { useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

const CreateEmployee: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        salary: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/employees", formData);
            router.visit("/dashboard"); // Redirect to dashboard
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-md">
                <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
                <input type="text" name="name" placeholder="Name" className="border p-2 w-full mb-2" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-2" onChange={handleChange} required />
                <input type="text" name="position" placeholder="Position" className="border p-2 w-full mb-2" onChange={handleChange} required />
                <input type="number" name="salary" placeholder="Salary" className="border p-2 w-full mb-2" onChange={handleChange} required />
                <button type="submit" className="px-4 py-2 bg-black text-white rounded-md w-full">Submit</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
