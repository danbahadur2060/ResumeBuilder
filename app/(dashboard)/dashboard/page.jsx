"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CloudUploadIcon, PlusIcon, Edit3, Trash2, XIcon } from "lucide-react";
import { dummyResumeData } from "../../assets/assets";

const Page = () => {
  const router = useRouter();

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editeResumeId, setEditeResumeId] = useState("");

  const fetchResumes = async () => {
    try {
      setAllResumes(dummyResumeData || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const createResume = async (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    // If you want to pass title somewhere, you can add query params or handle creation before redirect
    router.push("/builder/resume123");
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleOpen = (resumeObj) => {
    if (!resumeObj || !resumeObj._id) {
      console.warn("handleOpen: resume or resume.id missing", resumeObj);
      return;
    }
    router.push(`/builder/${resumeObj._id}`);
  };

  // Form submit for editing title
  const handleEdit = async (event) => {
    event.preventDefault();
    // Simulate edit flow: update local state
    if (!editeResumeId) return;

    setLoading(true);
    setAllResumes((prev) =>
      prev.map((r) =>
        r._id === editeResumeId
          ? { ...r, title: title || "Untitled Resume" }
          : r
      )
    );
    // Clear edit modal values
    setEditeResumeId("");
    setTitle("");
    setLoading(false);
  };

  const handleDelete = (resumeObj) => {
    if (!resumeObj || !resumeObj._id) {
      console.warn("handleDelete: no id provided", resumeObj);
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (confirmDelete) {
      setAllResumes((prevResumes) =>
        prevResumes.filter((r) => r._id !== resumeObj._id)
      );
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOpenResume(false);
    // perform upload logic here if needed
    setLoading(false);
    router.push("/builder/resume123");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Resume Workspace
          </h1>
          <p className="text-gray-500 mt-2">
            Create or manage your professional resumes with ease.
          </p>
        </div>

        <div className="flex sm:grid-cols-2 gap-6">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:w-64 h-56 flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-700 
                         hover:border-blue-500 
                         shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              <PlusIcon className="w-6 h-6" />
            </div>
            <p className="mt-3 font-medium text-lg">Create New Resume</p>
          </button>

          <button
            className="w-full sm:w-64 h-56 flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-700 
                         hover:border-red-500 
                         shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => setOpenResume(true)}
          >
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              <CloudUploadIcon className="w-6 h-6" />
            </div>
            <p className="mt-3 font-medium text-lg">Open Existing Resume</p>
          </button>
        </div>

        <hr className="mt-6 border-slate-300" />

        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Created Resumes
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Hover a card to reveal edit or delete options.
              </p>
            </div>
          </div>

          {allResumes && allResumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allResumes.map((resumeItem, index) => (
                <article
                  key={resumeItem._id ?? index}
                  onClick={() => router.push(`/builder/${resumeItem._id}`)}
                  className="group relative w-64 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Hover icons - visible only on hover */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // open edit modal and set fields
                        setEditeResumeId(resumeItem._id);
                        setTitle(resumeItem.title || "");
                      }}
                      className="p-2 rounded-md bg-white/90 hover:bg-white shadow-sm pointer-events-auto"
                      title="Edit"
                      aria-label={`Edit ${resumeItem.title}`}
                    >
                      <Edit3 className="w-4 h-4 text-gray-700" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(resumeItem);
                      }}
                      className="p-2 rounded-md bg-white/90 hover:bg-white shadow-sm pointer-events-auto"
                      title="Delete"
                      aria-label={`Delete ${resumeItem.title}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>

                  {/* Thumbnail / visual header */}
                  <div className="h-32 w-full bg-gradient-to-r from-gray-50 to-white flex items-center justify-center">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-lg">
                      {resumeItem.title?.charAt(0)?.toUpperCase() ?? "U"}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4" onClick={() => handleOpen(resumeItem)}>
                    <h3
                      className="text-md font-semibold text-gray-800 truncate"
                      title={resumeItem.title}
                    >
                      {resumeItem.title || "Untitled Resume"}
                    </h3>

                    <div className="mt-2 text-sm text-gray-500">
                      <div>
                        Created:{" "}
                        <span className="text-gray-700">
                          {resumeItem.createdAt
                            ? new Date(
                                resumeItem.createdAt
                              ).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-8 text-center bg-white">
              <p className="text-gray-600">
                No resumes found. Create or upload one to get started!
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Create Resume Modal */}
      {showCreateResume && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold mb-4">Create New Resume</h2>
              <XIcon
                onClick={() => setShowCreateResume(false)}
                className="text-gray-600 cursor-pointer"
              />
            </div>
            <form onSubmit={createResume} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Resume Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer Resume"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 w-full rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Resume"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Open Resume Modal */}
      {openResume && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold mb-4">
                Open existing Resume
              </h2>
              <XIcon
                onClick={() => setOpenResume(false)}
                className="text-gray-600 cursor-pointer"
              />
            </div>
            <form onSubmit={uploadResume} className="space-y-4">
              <div>
                {resume ? (
                  <p className="text-gray-700 mb-2 p-3">
                    Selected File:{" "}
                    <span className="text-green-600 font-semibold">
                      {" "}
                      {resume.name}
                    </span>
                  </p>
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Resume (PDF, DOCX)
                    </label>

                    <label
                      htmlFor="resume"
                      className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:border-blue-500 transition"
                    >
                      <CloudUploadIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-600">
                        Click to select a file
                      </span>
                    </label>

                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.docx"
                      required
                      onChange={(e) => setResume(e.target.files[0])}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={!resume || loading}
                  className="px-4 cursor-pointer py-2 w-full rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                >
                  {loading ? "Uploading ..." : "Upload Resume"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Resume Modal */}
      {editeResumeId && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={() => setEditeResumeId("")}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold mb-4">Edit Resume Title</h2>
              <XIcon
                onClick={() => {
                  setEditeResumeId("");
                  setTitle("");
                }}
                className="text-gray-600 cursor-pointer"
              />
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Resume Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer Resume"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 w-full rounded-md bg-orange-600 text-white hover:bg-orange-700 transition"
                  disabled={loading}
                >
                  {loading ? "editing..." : "Edit Resume Title"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
