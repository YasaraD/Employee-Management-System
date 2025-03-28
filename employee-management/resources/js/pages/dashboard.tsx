import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from "react";
import axios from "axios";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

interface Employee {
    id: number;
    name: string;
    email: string;
    position: string;
    salary: number;
}

export default function Dashboard() {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("/api/employees");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
    
        try {
            await axios.delete(`/api/employees/${id}`);
            alert("Employee deleted successfully!");
            setEmployees(employees.filter(employee => employee.id !== id)); // Refresh UI
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee.");
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Employee List Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex-1 text-center">
                    Employee List
                </h1>
                <Link href={route("employees.create")} className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    + Add Employee
                </Link>
            </div>

            {/* Employee List Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full border-collapse rounded-lg">
                    <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left border-b">ID</th>
                            <th className="px-6 py-3 text-left border-b">Name</th>
                            <th className="px-6 py-3 text-left border-b">Email</th>
                            <th className="px-6 py-3 text-left border-b">Position</th>
                            <th className="px-6 py-3 text-left border-b">Salary</th>
                            <th className="px-6 py-3 text-center border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr key={employee.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition`}>
                                    <td className="px-6 py-4 border-b text-black">{employee.id}</td>
                                    <td className="px-6 py-4 border-b text-black">{employee.name}</td>
                                    <td className="px-6 py-4 border-b text-black">{employee.email}</td>
                                    <td className="px-6 py-4 border-b text-black">{employee.position}</td>
                                    <td className="px-6 py-4 border-b text-black">${employee.salary}</td>
                                    <td className="px-6 py-4 border-b text-center space-x-2">
                                        {/* Update Button */}
                                        <Link 
                                            href={`/employees/${employee.id}/edit`}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                        >
                                            Update
                                        </Link>
                                        {/* Delete Button */}
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                            onClick={() => handleDelete(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-300">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
