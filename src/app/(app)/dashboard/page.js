'use client';
import { useEffect, useState } from 'react';
;
import Header from '@/app/(app)/Header';
import axios from '@/lib/axios'


const Dashboard = () => {
    const [positions, setPositions] = useState([]);
    const [formData, setFormData] = useState({ job_title: '', location: '', job_type: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const response = await axios.get('/api/positions');
            setPositions(response.data);
        } catch (error) {
            console.error('Error fetching positions:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/api/positions/${editingId}`, formData);
            } else {
                await axios.post('/api/positions', formData);
            }
            setFormData({ job_title: '', location: '', job_type: '' });
            setEditingId(null);
            fetchPositions();
        } catch (error) {
            console.error('Error saving position:', error);
        }
    };

    const handleEdit = (position) => {
        setFormData(position);
        setEditingId(position.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/positions/${id}`);
            fetchPositions();
        } catch (error) {
            console.error('Error deleting position:', error);
        }
    };

    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Job Positions</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="job_title"
                                    placeholder="Job Title"
                                    value={formData.job_title}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded"
                                    required
                                />
                                <select
                                    name="job_type"
                                    value={formData.job_type}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="full-time">Full-Time</option>
                                    <option value="part-time">Part-Time</option>
                                    <option value="contract">Contract</option>
                                </select>
                                <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    {editingId ? 'Update Position' : 'Add Position'}
                                </button>
                            </form>
                            <ul className="mt-6">
                                {positions.map(position => (
                                    <li key={position.id} className="flex justify-between items-center p-4 border-b">
                                        <div>
                                            <h3 className="font-semibold">{position.job_title}</h3>
                                            <p>{position.location} - {position.job_type}</p>
                                        </div>
                                        <div>
                                            <button onClick={() => handleEdit(position)} className="text-blue-500 hover:underline">Edit</button>
                                            <button onClick={() => handleDelete(position.id)} className="ml-4 text-red-500 hover:underline">Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
