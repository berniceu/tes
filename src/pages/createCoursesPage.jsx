import React, { useEffect, useState } from "react";
import { NavBar, Footer } from "./homePage";
import BASE_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseCard = () => {
    const navigate = useNavigate();

    return (
      <div className="p-4 rounded-lg hover:shadow hover:cursor-pointer" onClick={() => navigate('/courses/:id')}>
        <div className="h-32 bg-pink-200 mb-4 rounded"></div>
        <h3 className="font-bold mb-2">Course Name</h3>
        <p className="text-sm text-gray-600 mb-4">Aliquam in pulvinar ultricies non. Ornare feugiat urna auctor nisi risus. Sed a nulla elit.</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
              <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
            </svg>
            15 hours
          </div>
          <div className="flex items-center">
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
              <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
            </svg>
            Intermediate
          </div>
        </div>
      </div>
    )
  }

  const CoursesGrid = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userRole = localStorage.getItem('role')

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/dashboard/courses/`);
                setCourses(res.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchCourses()
    }, [])
    return (
      <div className="container mx-auto p-10 font-outfit min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Courses Created</h2>
          {userRole === 'staff' && (
            <div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg mr-2">Add New Course</button>
            <button className="bg-primary bg-opacity-30 text-primary px-4 py-2 rounded-lg">Manage Courses</button>
          </div>
          )}
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CourseCard key={index} />
          ))}
        </div>
      </div>
    )
  }
 
const CreateCoursesPage = () => {

    return (
        <>
        <NavBar/>
        <CoursesGrid/>

        <Footer/>
        
        </>
    );
}

export default CreateCoursesPage;