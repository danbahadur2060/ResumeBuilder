"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../../../assets/assets";
import PersonalInfoForm from "../../_components/PersonalInfoForm";
import TemplateSelector from "../../_components/TemplateSelector";
import ColorPicker from "../../_components/ColorPicker";
import ProfessionalSummaryForm from "../../_components/ProfessionalSummaryForm";
import ExperienceForm from "../../_components/ExperienceForm";
import EducationForm from "../../_components/EducationForm";
import ProjectForm from "../../_components/ProjectForm";
import SkillsForm from "../../_components/SkillsForm";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  Folder,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import ResumePreview from "../../_components/ResumePreview";

const Page = () => {
  const { resumeid } = useParams();
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project:[],
    skills: [],
    templates: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async (id) => {
    try {
      const resume = dummyResumeData.find((res) => res._id === id);
      
      if (resume) {
        setResumeData(resume);
        document.title = resume.title;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Professional Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Projects", icon: Folder },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    if (resumeid) {
      loadExistingResume(resumeid);
    }
  }, [resumeid]);

  const changeResumeVisibility = async()=>{
    setResumeData({...resumeData , public: !resumeData.public})
  }
  const handleShare= ()=>{
    const frontendUrl = window.location.href.split("/builder/")[0];
    const reusmeUrl = frontendUrl+'/view/'+resumeid;
    
    if(navigator.share){
      navigator.share({url:reusmeUrl, text: "My Resume",})
    }else{
      alert("Share not supported on this browser.")
    }
  }

  const downloadResume = (selector = "#resume-preview") => {
    const el = document.querySelector(selector);
    if (!el) return alert("Nothing to print.");

    const style = document.createElement("style");
    style.id = "tmp-print-style";
    style.innerHTML = `
      @page { size: letter; margin: 0; }
      @media print {
        html, body {
          width: 8.5in;
          height: 11in;
          overflow: hidden;
        }
        body * {
          visibility: hidden !important;
        }
        ${selector}, ${selector} * {
          visibility: visible !important;
        }
        ${selector} {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
          background: white !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
      const s = document.getElementById("tmp-print-style");
      if (s) s.remove();
    }, 1000);
  };


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href={"/dashboard"}>
        <button className="text-sm w-fit flex">
          <ArrowLeft className="w-6 h-6 text-gray-500 hover:text-gray-800 " />
          Back to Dashboard
        </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-7">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 border-none"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                  background:
                    "linear-gradient(to right, rgb(16 185 129), rgb(16 163 127))",
                  transitionProperty: "width",
                  transitionDuration: "2000ms",
                }}
              />

              {/* section Navigation */}
              <div className="flex items-center mb-6 justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.templates}
                    onChange={(template) =>
                      setResumeData((prev) => ({
                        ...prev,
                        templates: template,
                      }))
                    }
                  />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData((prev) => ({ ...prev, accent_color: color }))} />
                </div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center cursor-pointer gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center cursor-pointer gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <div>
                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  </div>
                )}

                {
                  activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data)=>setResumeData(prev =>({...prev,professional_summary:data}))} setResumeData={setResumeData} />
                  )
                }

                {
                  activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data)=>setResumeData(prev=>({...prev,experience:data}))} />
                  )
                }
                {
                  activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data)=>setResumeData(prev=>({...prev,education:data}))} />
                  )
                }
                {
                  activeSection.id === 'project' && (
                    <ProjectForm data={resumeData.project} onChange={(data)=>setResumeData(prev=>({...prev,project:data}))} />
                  )
                }
                {
                  activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data)=>setResumeData(prev=>({...prev,skills:data}))} />
                  )
                }
               
               
              </div>
              <button className="bg-gradient-to-br from-green-50 to-green-100 ring-green-400 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm cursor-pointer">Save Changes</button>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {
                  resumeData.public && (
                    <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
                      <Share2Icon className="size-4"/>Share
                    </button>
                  )
                }
                <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors">
                  {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                  {
                    resumeData.public ? "public" :"private"
                  }
                </button>
                <button onClick={()=>downloadResume("#resume-preview")} className="flex items-center gap-2 px-6 py-2 text-sm bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"><DownloadIcon className="size-4" /> Download</button>
              </div>
            </div>

            {/* resume preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.templates}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
