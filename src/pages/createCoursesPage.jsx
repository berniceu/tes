import React, { useEffect, useState } from "react";
import { NavBar, Footer } from "./homePage";
import BASE_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-lg hover:shadow hover:cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
      <div className="h-32 bg-pink-200 mb-4 rounded"></div>
      <h3 className="font-bold mb-2">{course.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
          </svg>
          {course.hours} hours
        </div>
        <div className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
          </svg>
          {course.level}
        </div>
      </div>
    </div>
  )
}

const CourseModal = ({ isOpen, onClose, onSubmit, newCourse, setNewCourse}) => {
  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form onSubmit={onSubmit}>
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="text"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                />
                <textarea
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Course Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                />
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="text"
                    placeholder="Course Link"
                    value={newCourse.source_link}
                    onChange={(e) => setNewCourse({...newCourse, source_link: e.target.value})}
                />
                <select
                    className="w-full mb-2 p-2 border rounded"
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="number"
                    placeholder="Course Hours"
                    value={newCourse.hours}
                    onChange={(e) => setNewCourse({...newCourse, hours: parseInt(e.target.value)})}
                />
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Add Course</button>
                </div>
            </form>
        </div>
    </div>
  );
}
  const CoursesGrid = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCourse, setNewCourse] = useState({ name: '', description: '', source_link: '', level: 'beginner', hours: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userRole = localStorage.getItem('role')

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const res = await axios.get(`${BASE_URL}/dashboard/courses/`);
            console.log('Fetched courses:', res.data);
            if (res.data.courses && Array.isArray(res.data.courses)) {
                setCourses(res.data.courses);
            } else {
                console.error('Unexpected data structure:', res.data);
                setCourses([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError(error.message);
            setLoading(false);
        }
        }

        fetchCourses()
    }, [])

    const handleAddCourse = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${BASE_URL}/dashboard/posts/new_course`, newCourse);
          setCourses(prevCourses => Array.isArray(prevCourses) ? [...prevCourses, res.data] : [res.data]);
          setNewCourse({ title: '', description: '' });
          setIsModalOpen(false);
          toast.success('Course added successfully');
      } catch (error) {
          setError(error.message);
          toast.error('Failed to add course');
      }
  };
  return (
    <div className="container mx-auto p-10 font-outfit min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courses Created</h2>
        {userRole === 'staff' && (
          <div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg mr-2" onClick={() => setIsModalOpen(true)}>Add New Course</button>
          </div>
        )}
      </div>
      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
      <CourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddCourse} newCourse={newCourse} setNewCourse={setNewCourse}/>
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