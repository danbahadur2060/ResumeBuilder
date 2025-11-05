"use client"
import ResumePreview from "../../(dashboard)/_components/ResumePreview";
import Loader from "../../_components/Loader";
import { dummyResumeData } from "../../assets/assets";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const {resumeid} = useParams();

  const [isLoading, setIsLoading] = useState(true)

  const [resumeDate, setResumeData] = useState(null);


  const loadResume = async ()=>{
    setResumeData(dummyResumeData.find(resume => resume._id === resumeid || null))
    setIsLoading(false)
  }
  useEffect(()=>{
    loadResume()
  },[])
  return resumeDate ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview data={resumeDate} template={resumeDate.template} accentColor={resumeDate.accent_color} />
      </div>
    </div>
  ):(
    <div>
      {
        isLoading ? <Loader /> : (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-center text-6xl text-slate-400 font-medium">Resume not found</p>
            <Link href={"/"} className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 to-indigo-100 ring-green-400 flex items-center transition-colors">
            <ArrowLeft  className="mr-2 size-4"/>
            Go to home page
            </Link>
             </div>
        )
      }
    </div>
  )
};

export default page;
