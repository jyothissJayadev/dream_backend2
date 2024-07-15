// Import necessary modules
import express from 'express';
import moment from 'moment';
import Progress from '../schema/ProgressSchema.js'; // Adjust the path as needed

const router = express.Router();

// Get all tasks
// http://localhost:8081/api/gettask
export async function getTask(req, res) {
    try {
        const tasks = await Progress.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getTaskById(req, res) {
    try {
        const { id } = req.params;
        const task = await Progress.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Add a new task
/*
{
    "name":"machine learning",
    "units":"100",
    "endDate":"17/02/2005"
}
    */
// http://localhost:8081/api/addTask

export async function addTask(req, res) {
    try {
        const { name, units, endDate, description, color } = req.body;

        // Check if there is an existing task with the same name
        const existingTask = await Progress.findOne({ name });

        if (existingTask) {
            return res.status(400).json({ error: 'Task with this name already exists' });
        }

        // Parse the endDate using moment.js
        const parsedEndDate = moment(endDate, 'DD/MM/YYYY').toDate();

        const newTask = new Progress({
            name,
            units,
            endDate: parsedEndDate,
            dateOfRecording: new Date(), // Automatically set the current date
            description, // Add description to the new task
            color // Add color to the new task
        });

        const savedTask = await newTask.save();

        // Send back a JSON response with status 201 (Created)
        res.status(201).json(savedTask);
    } catch (err) {
        // Handle errors and send an error response
        console.error('Error adding task:', err);
        res.status(500).json({ error: err.message });
    }
}
// Edit progress
// http://localhost:8081/api/editProgress
export async function editProgress(req, res) {
    try {
        const { id, completedUnits } = req.body;
        const updatedTask = await Progress.findByIdAndUpdate(
          id,
          { completedUnits },
          { new: true }
        );
    
        // Check if updatedTask exists
        if (!updatedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        // Send a single JSON response with updatedTask
        res.status(200).json({ updatedTask });
      } catch (err) {
        console.error('Error updating progress:', err.message);
        res.status(500).json({ error: err.message });
      }
}

// Delete a task
// http://localhost:8081/api/deleteTask
export async function deleteTask(req, res) {
    try {
        const { id } = req.body;
        await Progress.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
