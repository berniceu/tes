import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, formData, process.env.REACT_APP_USER_ID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success("Message sent successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }, (error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <div className="contact-section p-20 bg-white">
      <div className="mb-10 text-center">
        <h3 className="text-2xl font-bold text-gray-800">
          Do you have any questions?
        </h3>
        <p className="text-lg text-gray-500">
          Fill out the form below, our team will get back to you soon
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-10 rounded-lg shadow-md">
        <div className="mb-6">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" 
            required 
          />
        </div>
        <div className="mb-6">
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" 
            required 
          />
        </div>
        <div className="mb-6">
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" 
          />
        </div>
        <div className="mb-6">
          <textarea 
            name="message" 
            placeholder="Your message" 
            value={formData.message} 
            onChange={handleChange} 
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none" 
            rows="5" 
            required 
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-primary text-white p-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:bg-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

const NavBar = () => {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
  return token && name;
  }

  return (
    <>
      <div className="bg-primary text-white min-h-[10vh] text-f flex justify-between items-center px-20">
        <div className="max-w-6">TechEmpower Sisters</div>
        <div>
          <ul className="flex gap-4">
            <li>Home</li>
            <li>Benefits</li>
            <li>Courses</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          {isLoggedIn() ? <Link to='/login' onClick={() => {localStorage.clear(); window.location.reload() }}className="bg-white font-bold text-primary py-2 px-10 rounded-lg" >Sign Out</Link> : (
            <Link
            to="/login"
            className="bg-white font-bold text-primary py-2 px-10 rounded-lg"
          >
            Sign In
          </Link>
          )}
          
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold max-w-64">
            TechEmpower Sisters E-learning Platform
          </h3>
          <p className="text-lg mt-2 max-w-80">
            Our platform is dedicated to providing the best tech-related courses
            and support for women in tech.
          </p>
        </div>
        <div className="flex justify-center md:justify-start">
          <ul className="text-lg ml-10">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Benefits
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10">
        <p>Tech Empower Sisters © 2024</p>
      </div>
    </footer>
  );
};

const Card = ({ imgSrc, title, bgColor }) => {
  return (
    <div
      className={`flex flex-col justify-between items-center ${bgColor} w-64 h-56 p-4 rounded-lg text-white`}
    >
      <div className="flex-grow flex justify-center items-center">
        <img src={imgSrc} alt={title} className="w-20 h-20" />
      </div>
      <div className="text-lg font-semibold mt-4">{title}</div>
    </div>
  );
};


const HomePage = () => {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
  return token && name;
  }
  return (
    <>
      <div className="min-h-screen font-outfit">
        <NavBar />
        <div className="first-section flex justify-between items-center px-20 py-20">
          <div className="flex flex-col justify-center max-w-md">
            <h1 className="text-4xl font-bold  text-primary mb-4">
              Develop Your Skills In Tech Today
            </h1>
            <p className="text-lg text-gray-600">
              Explore a transformative approach to skill development on our
              learning platform.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={`${process.env.PUBLIC_URL}/image.png`}
              alt=""
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="second-section flex justify-between px-20 py-20">
          <div className="flex-shrink-0">
            <img
              src={`${process.env.PUBLIC_URL}/learning.jpg`}
              alt=""
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center max-w-lg">
            <h1 className="text-4xl font-bold  text-primary mb-6">
              Perks From Our E-learning Platform
            </h1>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10"
                  src={`${process.env.PUBLIC_URL}/short-courses.svg`}
                  alt="Short courses"
                />
                <span className="text-lg text-gray-600">Short courses</span>
              </div>
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10"
                  src={`${process.env.PUBLIC_URL}/calendar.svg`}
                  alt="Networking Events Calendar"
                />
                <span className="text-lg text-gray-600">
                  Networking Events Calendar
                </span>
              </div>
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10"
                  src={`${process.env.PUBLIC_URL}/community.svg`}
                  alt="Community forums"
                />
                <span className="text-lg text-gray-600">Community forums</span>
              </div>
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10"
                  src={`${process.env.PUBLIC_URL}/video.svg`}
                  alt="Video courses"
                />
                <span className="text-lg text-gray-600">Video courses</span>
              </div>
            </div>
          </div>
        </div>
        <div className="third-section p-20">
          <div>
            <h1 className="text-2xl font-bold  text-primary pb-10">
              Browse Our Top Learning Courses
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                imgSrc={`${process.env.PUBLIC_URL}/ux.svg`}
                title="UI/UX Design"
                bgColor="bg-brown"
              />
              <Card
                imgSrc={`${process.env.PUBLIC_URL}/web-dev.svg`}
                title="Web Development"
                bgColor="bg-hotPink"
              />
              <Card
                imgSrc={`${process.env.PUBLIC_URL}/digital-marketing.svg`}
                title="Digital Marketing"
                bgColor="bg-green"
              />
              <Card
                imgSrc={`${process.env.PUBLIC_URL}/data-analytics.svg`}
                title="Data Analytics"
                bgColor="bg-navy"
              />
            </div>
          </div>
        </div>
        <ContactForm/>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
