import React, { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
    id: number;
    name: string;
    email: string;
    position: string;
    salary: number;
}

const EmployeeList: React.FC = () => {
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

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center text-black mb-6">Employee List</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-black shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="border border-white px-6 py-3 text-left">ID</th>
                            <th className="border border-white px-6 py-3 text-left">Name</th>
                            <th className="border border-white px-6 py-3 text-left">Email</th>
                            <th className="border border-white px-6 py-3 text-left">Position</th>
                            <th className="border border-white px-6 py-3 text-left">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr
                                key={employee.id}className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 text-black`}>
                                    <td className="border border-black px-6 py-3">{employee.id}</td>
                                    <td className="border border-black px-6 py-3">{employee.name}</td>
                                    <td className="border border-black px-6 py-3">{employee.email}</td>
                                    <td className="border border-black px-6 py-3">{employee.position}</td>
                                    <td className="border border-black px-6 py-3">${employee.salary}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-black font-medium">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
