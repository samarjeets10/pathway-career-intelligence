import { createBrowserRouter } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import PageNotFound from "../features/auth/pages/PageNotFound"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import Dashboard from "../features/auth/pages/Dashboard"
import Protected from "../features/auth/components/Protected"
import PublicOnly from "../features/auth/components/PublicOnly"
import DashboardLayout from "../components/layout/DashboardLayout";
import InterviewList from "@/features/interview/pages/InterviewList"
import InterviewNew from "@/features/interview/pages/InterviewNew"
import InterviewDetail from "@/features/interview/pages/InterviewDetail"


import ComingSoon from "../components/ComingSoon"

const comingSoon = [
    ["resumes", "My Resumes", "Upload, parse, edit and manage multiple resumes and versions."],
    ["jobs", "Jobs", "Save job descriptions and track application status."],
    ["analysis", "Resume Analysis", "Resume quality, ATS checks and AI improvement suggestions."],
    ["matches", "Job Matches", "Compare a resume with a job: match score, matched and missing skills, skill gaps."],
    ["skills", "Skills", "Track your canonical skills and recurring skill gaps over time."],
    ["tailored", "Tailored Resumes", "Generate a job-tailored resume from a template and download it as a PDF."],
    ["practice", "Practice", "Practice interview questions and get AI feedback, with history and progress."],
].map(([path, title, description]) => ({
    path,
    element: <ComingSoon title={title} description={description} />,
}));


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },

    {
        element: <PublicOnly />,
        children: [
            {
                path: "/login",
                element: <Login />
            },

            {
                path: "/register",
                element: <Register />
            }
        ],
    },

    {
        path: "/dashboard",
        element: (
            <Protected>
            <DashboardLayout />
            </Protected>
        ),
        
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            
            ...comingSoon,

            {
                path: "interviews",
                element: <InterviewList />
            },
            
            {
                path: "interviews/new",
                element: <InterviewNew />
            },

            {
                path: "interviews/:id",
                element: <InterviewDetail />
            },
        ],
    },

    {
        path: "/404Page",
        element: <PageNotFound />
        
    },

    {
        path: "*",
        element: <PageNotFound />
    },

    

]);