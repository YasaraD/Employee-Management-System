<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    // Fetch all employees
    public function index()
    {
        return response()->json(Employee::all());
    }

    // Store a new employee
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:employees',
        'position' => 'required|string|max:255',
        'salary' => 'required|numeric|min:0',
    ]);

    // Create new employee
    $employee = Employee::create($request->all());

    // Return JSON response with 201 status
    return response()->json([
        'message' => 'Employee added successfully',
        'employee' => $employee
    ], 201);
}

    // Get a single employee
    public function show(Employee $employee)
    {
        return response()->json($employee);
    }

    // Update an employee
    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'position' => 'required|string|max:255',
            'salary' => 'required|numeric|min:0',
        ]);

        $employee->update($request->all());

        return response()->json($employee);
    }

    // Delete an employee
    public function destroy($id)
{
    $employee = Employee::find($id);
    
    if (!$employee) {
        return response()->json(['message' => 'Employee not found'], 404);
    }

    $employee->delete();

    return response()->json(['message' => 'Employee deleted successfully']);
}

}
