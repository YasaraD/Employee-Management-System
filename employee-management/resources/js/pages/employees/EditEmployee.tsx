import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

interface Employee {
    id: number;
    name: string;
    email: string;
    position: string;
    salary: number;
}

interface Props extends PageProps {
    employee: Employee;
}

const EditEmployee: React.FC = () => {
    const { employee } = usePage<Props>().props; // Get employee data from Inertia
    const [formData, setFormData] = useState(employee);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/employees/${employee.id}`, formData, {
            onSuccess: () => {
                setSuccessMessage("✅ Employee updated successfully! Redirecting...");
                setTimeout(() => {
                    router.visit("/dashboard"); // Redirect to dashboard
                }, 2000);
            },
            onError: () => {
                setSuccessMessage("❌ Failed to update employee. Please try again.");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Edit Employee</h2>

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
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
