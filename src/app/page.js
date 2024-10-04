'use client'
import { useState } from 'react'
import LoginLinks from '@/app/LoginLinks'
import axios from '@/lib/axios'


const Home = () => {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [results, setResults] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        const apiUrl = `/api/positions/search?job_title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`

        try {
            const response = await axios.get(apiUrl)
            const data = response.data
            setResults(data) // Assuming the API returns an array of job objects
        } catch (error) {
            console.error('Error fetching jobs:', error)
            setResults([]) // Clear results on error
        }
    }

    return (
        <>
            <div className="relative flex flex-col items-center justify-center min-h-screen sm:items-center sm:pt-0 bg-gray-100">
                <LoginLinks />
                <form onSubmit={handleSearch} className="flex flex-col space-y-4 p-4 bg-white rounded shadow-md">
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Search
                    </button>
                </form>
                <div className="mt-6">
                    {results.map(job => (
                        <div key={job.id} className="p-4 m-2 bg-white rounded shadow-md">
                            <h3 className="text-lg font-semibold">{job.job_title}</h3>
                            <p className="text-gray-600">{job.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
