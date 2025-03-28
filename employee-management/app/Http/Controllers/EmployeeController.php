<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class EmployeeController extends Controller
{
    // Fetch all employees
    public function index()
    {
        return response()->json(Employee::all());
    }

    // Store a new employee
    public function store(Request $request){
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

    // Show the Edit Employee Page
    public function edit($id)
    {
        $employee = Employee::findOrFail($id);
        return Inertia::render('employees/EditEmployee', ['employee' => $employee]);
    }

    // Update Employee
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $id,
            'position' => 'required|string|max:255',
            'salary' => 'required|numeric|min:0',
        ]);

        $employee = Employee::findOrFail($id);
        $employee->update($request->all());

        return Redirect::route('dashboard')->with('success', 'Employee updated successfully.');
    }

    // Delete an employee
    public function destroy($id){
    $employee = Employee::find($id);
    
    if (!$employee) {
        return response()->json(['message' => 'Employee not found'], 404);
    }

    $employee->delete();

    return response()->json(['message' => 'Employee deleted successfully']);
    }

}
