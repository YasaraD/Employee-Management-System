import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
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

    const handleDelete = (id: number) => {
        router.delete(`/employees/${id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-6 bg-white dark:bg-gray-900">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                {/* Employee List Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex-1 text-center">
                        Employee List
                    </h1>
                    <Link href={route("employees.create")} className="px-4 py-2 bg-black text-white rounded-md">
                        Add Employee
                    </Link>


                </div>

                {/* Employee List Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 shadow-md rounded-lg">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="border px-4 py-2 text-left text-gray-700 dark:text-white">ID</th>
                                <th className="border px-4 py-2 text-left text-gray-700 dark:text-white">Name</th>
                                <th className="border px-4 py-2 text-left text-gray-700 dark:text-white">Email</th>
                                <th className="border px-4 py-2 text-left text-gray-700 dark:text-white">Position</th>
                                <th className="border px-4 py-2 text-left text-gray-700 dark:text-white">Salary</th>
                                <th className="border px-4 py-2 text-center text-gray-700 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="border px-4 py-2 text-gray-700 dark:text-white">{employee.id}</td>
                                        <td className="border px-4 py-2 text-gray-700 dark:text-white">{employee.name}</td>
                                        <td className="border px-4 py-2 text-gray-700 dark:text-white">{employee.email}</td>
                                        <td className="border px-4 py-2 text-gray-700 dark:text-white">{employee.position}</td>
                                        <td className="border px-4 py-2 text-gray-700 dark:text-white">${employee.salary}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <button className="px-4 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-700 transition">
                                                Update
                                            </button>
                                            <button
                                                className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                                                onClick={() => handleDelete(employee.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-300">
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
