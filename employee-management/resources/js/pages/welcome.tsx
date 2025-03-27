import React from "react";
import { Link } from "@inertiajs/react";
import EmployeeList from "../components/EmployeeList";

const Welcome: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
            {/* Navigation */}
            <div className="absolute top-6 right-6 flex space-x-3">
                <Link href="/login" className="px-5 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition">
                    Login
                </Link>
                <Link href="/register" className="px-5 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition">
                    Register
                </Link>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
                    Employee Management System
                </h1>
                
                <div className="overflow-x-auto">
                    <EmployeeList />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
