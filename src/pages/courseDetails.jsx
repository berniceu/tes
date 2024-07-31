import React, { useState, useEffect} from "react";
import { NavBar } from "./homePage";
import { Footer } from "./homePage";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/dashboard/courses/${id}/`);
                setCourse(response.data.course);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
      <div className="max-w-6xl mx-auto p-6 mt-5 font-sans min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{course.name}</h1>

        </div>
        
        <div className="flex gap-8">
          <div className="w-2/3">
            <h2 className="text-lg font-semibold mb-3">About the course</h2>
            <p className="text-gray-600 mb-6">
              {course.description}
            </p>
            
            <div className="flex gap-12 mb-6">
              <div>
                <h3 className="font-semibold mb-2">More about the course</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>Level: {course.level}</li>
                  <li>Duration: {course.hours} hours</li>
                  <li>lessons: {course.lessons}</li>
                  <li>exercises: {course.exercises}</li>
                  <li>projects: {course.projects}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                {/* <ul className="space-y-1 text-sm text-gray-600">
                                {course.skills && course.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul> */}
              </div>
            </div>
          </div>
          
          <div className="w-1/3 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Your Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div className="bg-primary h-2.5 rounded-full w-1/3"></div>
            </div>
            
            <button className="w-full bg-primary text-white py-2 rounded-full mb-6">
              Start Learning
            </button>
            
            <h4 className="font-semibold mb-3">Lessons</h4>
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((lesson) => (
                <li key={lesson} className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 mr-2 rounded-full border border-pink-400 flex items-center justify-center">
                    {lesson <= 2 && <span className="w-2 h-2 bg-pink-400 rounded-full"></span>}
                  </span>
                  Lesson {lesson}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  

const CourseDetailPage = () => {

    


    return(
        <>
        <NavBar />
        <CourseDetails/>
        <Footer />
        </>
    )
}

export default CourseDetailPage;