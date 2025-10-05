import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import {useNavigate } from 'react-router-dom';

const CustomDesign = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        typeOfJewelry: '',
        preferredMetal: '',
        budgetRange: '',
        description: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/designs', formData);
            alert('Form submitted successfully!');
            navigate("/")
            
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return (
        <div>

            <Navbar />
            <div className='grid grid-cols-2 gap-6 rounded-3xl'>
                <div className='rounded-br-2xl rounded-tr-2xl'>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg mx-4 my-4 w-[50vw] items-center rounded-br-2xl rounded-tr-2xl">
                        <h2 className="text-4xl font-bold mb-6">Custom Jewelry Design</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Type of Jewelry</label>
                            <input
                                type="text"
                                name="typeOfJewelry"
                                value={formData.typeOfJewelry}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Preferred Metal</label>
                            <input
                                type="text"
                                name="preferredMetal"
                                value={formData.preferredMetal}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Budget Range</label>
                            <input
                                type="text"
                                name="budgetRange"
                                value={formData.budgetRange}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </form>
                </div>
                <div className='bg-pink-500 my-4 mr-4 rounded-br-2xl rounded-tr-2xl flex items-center justify-center'>
                    <p className='text-white font-bold text-3xl'>Customize your Design | Exclusive @JewelCraft</p>
                </div>
            </div>
        </div>
    );
};

export default CustomDesign;