import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
const About = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = 'service_dy0v7n5';
    const templateID = 'template_e76e10b';
    const publicKey = 'OedsHk2YUvPk153Sg';

    const templateParams = {
      name,
      email,
      message,
      title: 'New Inquiry',
      time: new Date().toLocaleString(),
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Email send error:', error);
        alert('Failed to send message. Check the console for details.');
      });
  };

  return (
    <div>
        <Navbar />
        <form onSubmit={handleSubmit} className="emailForm flex flex-col items-center justify-center p-4 border rounded-lg shadow-md max-w-md mx-auto mt-10 h-[80vh]">  
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='mb-4 px-18  border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='mb-4 px-18  border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
      />
      <textarea
        cols={30}
        rows={10}
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className='mb-4 px-10 m-4 h-32 resize-none border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
      ></textarea>
      <button type="submit" className='bg-pink-500 text-white px-6 py-2 rounded-2xl'>Send</button>
    </form>
    </div>
  );
};

export default About;
