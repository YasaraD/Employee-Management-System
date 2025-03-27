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

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/employees", formData);

            // Check for a successful response (status 200-299)
            if (response.status >= 200 && response.status < 300) {
                setSuccessMessage(" Employee added successfully! Redirecting...");

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    router.visit("/dashboard");
                }, 2000);
            } else {
                setSuccessMessage(" Failed to add employee. Unexpected response.");
            }
        } catch (error: any) {
            console.error("Error adding employee:", error);

            // Check if Laravel sent a validation error message
            if (error.response && error.response.data) {
                setSuccessMessage(` ${error.response.data.message || "Failed to add employee."}`);
            } else {
                setSuccessMessage(" Failed to add employee. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Add New Employee</h2>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-4 text-center font-semibold text-green-600">
                        {successMessage}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter full name" 
                            className="w-full border border-black rounded-md p-3 text-black focus:ring-2 focus:ring-black focus:border-black"
                            value={formData.name}  
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter work email" 
                            className="w-full border border-black rounded-md p-3 text-black focus:ring-2 focus:ring-black focus:border-black"
                            value={formData.email}  
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Job Position</label>
                        <input 
                            type="text" 
                            name="position" 
                            placeholder="Enter job position" 
                            className="w-full border border-black rounded-md p-3 text-black focus:ring-2 focus:ring-black focus:border-black"
                            value={formData.position}  
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Salary (USD)</label>
                        <input 
                            type="number" 
                            name="salary" 
                            placeholder="Enter monthly salary" 
                            className="w-full border border-black rounded-md p-3 text-black focus:ring-2 focus:ring-black focus:border-black"
                            value={formData.salary}  
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-md transition duration-200"
                    >
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;
