import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Authcontext";
import { Link, useNavigate } from "react-router"; // <-- FIXED
import "./Model.css";

const Model = () => {
  const { modelData } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [framework, setFramework] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // <-- FIXED

  // CATEGORY: Dynamic framework list from server
  const frameworks = ["All", ...new Set(modelData.map((item) => item.framework))];

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

 
  const filteredModels = modelData
    ?.filter((item) => item.createdAt)
    ?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.useCase.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((item) =>
      framework === "All" ? true : item.framework === framework
    );

  return (
    <section className="meet-experts w-full min-h-screen  p-6">
      <h2 className="section-title text-white text-3xl font-bold mb-6">
        Meet POPULAR MODEL
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg outline-none border border-gray-600 bg-gray-900 text-white placeholder-gray-400"
        />
      </div>

      {/* Framework Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="p-3 w-full max-w-xs rounded-lg bg-gray-900 text-white border border-gray-600"
        >
          {frameworks.map((fw) => (
            <option key={fw}>{fw}</option>
          ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg text-[#92afcf"></span>
        </div>
      )}

      {/* Model Cards / 404 */}
      {!loading && (
        <>
          {filteredModels?.length > 0 ? (
            <div className="expert-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredModels.map((expert) => (
                <Link
                  to={`/MODEL/${expert._id}`}
                  key={expert._id || expert.id}
                  className="expert-card bg-gray-800 rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform"
                >
                  <img
                    src={expert.image || "/default-model.png"}
                    alt={expert.name}
                    className="expert-image w-32 h-32 object-contain rounded-lg mb-3"
                  />
                  <h3 className="expert-name text-green-400 font-semibold text-lg">
                    {expert.name}
                  </h3>
                  <p className="expert-title text-gray-300 text-sm">
                    {expert.useCase}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{expert.framework}</p>
                </Link>
              ))}
            </div>
          ) : (
            // 404 Section
            <div className="w-full h-screen  flex flex-col justify-center items-center text-center p-6">
              <h1 className="text-9xl font-extrabold text-[#92afcf]">404</h1>
              <p className="text-xl text-gray-300 mt-4">
                Oops! No models found.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3 bg-[white] hover:bg-[#92afcf] text-black font-semibold rounded-lg transition"
              >
                Go Back
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Model;
