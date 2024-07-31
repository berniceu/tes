import React, { useState, useEffect} from "react";
import { NavBar } from "./homePage";
import { Footer } from "./homePage";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

    const handleEnrollClick = () => {
      setShowConfirmModal(true);
    };
  
    const handleConfirmEnroll = () => {
      setIsEnrolled(true);
      setShowConfirmModal(false);
    };

    const handleCancelEnroll = () => {
      setShowConfirmModal(false);
    };

    if (!course) return <div>Loading...</div>;


    return (
      <div className="max-w-6xl mx-auto p-6 mt-5 font-sans min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{course.name}</h1>

        </div>
        
        <div className="flex gap-8">
          <div className="">
            <h2 className="text-lg font-semibold mb-3">About the course</h2>
            <p className="text-gray-600 mb-6 w-2/3">
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
              <div className="w-1/3 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Your Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div className=" h-2.5 rounded-full  "></div>
              0%
            </div>
            
            {isEnrolled ? (
            <div className="mb-6">
              <p className="text-green-600 font-semibold">You are enrolled in this course</p>
              <button className="w-full bg-primary text-white py-2 rounded-full mt-2">
                Start Learning
              </button>
            </div>
          ) : (
            <button
              className="w-full bg-primary text-white py-2 rounded-full mb-6"
              onClick={handleEnrollClick}
            >
              Enroll in Course
            </button>
          )}
            
          </div>
              {/* <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <ul className="space-y-1 text-sm text-gray-600">
  {Array.isArray(course.skills) && course.skills.length > 0 ? (
    course.skills.map((skill, index) => (
      <li key={index}>{skill}</li>
    ))
  ) : (
    <li>No skills listed</li>
  )}
</ul>
              </div> */}
            </div>
          </div>
          
          
        </div>
        {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Enrollment</h2>
            <p className="mb-4">Are you sure you want to enroll in this course?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={handleCancelEnroll}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={handleConfirmEnroll}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
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