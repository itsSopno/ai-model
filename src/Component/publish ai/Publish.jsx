import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Authcontext";
import { toast } from "react-toastify";

const Publish = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const IMGBB_API_KEY = "4c8ddf7ff8e6cc2277a637b2f504274a";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image verify done");
      }
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAddModel = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const newModel = {
      name: form.name.value,
      framework: form.framework.value,
      useCase: form.useCase.value,
      dataset: form.dataset.value,
      description: form.description.value,
      image: imageUrl || form.image_url.value,
      createdBy: user?.email,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("https://server-3-smoky.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newModel),
      });

      if (res.ok) {
        toast.success("AI Model is now live!");
        navigate("/MODEL");
      }
    } catch (err) {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-white selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: CONTENT */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-indigo-500 font-black tracking-[0.3em] uppercase text-sm">
              Creator Studio
            </h2>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none">
              PUSH YOUR <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
                AI LIMITS.
              </span>
            </h1>
          </div>
          <p className="text-gray-500 text-lg max-w-md leading-relaxed">
            Deploy your trained models to the AssetVerse ecosystem. Fill in the technical specifications to begin.
          </p>
        </div>

        {/* RIGHT: FORM CARD */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          
          <div className="relative bg-[#0a0a0f] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl">
            <form onSubmit={handleAddModel} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Model Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Model Identity</label>
                  <input name="name" type="text" placeholder="e.g. Neural-X" required 
                    className="bg-transparent border-b border-white/10 py-2 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-700" />
                </div>

                {/* Framework */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Framework</label>
                  <input name="framework" type="text" placeholder="PyTorch / TensorFlow" required 
                    className="bg-transparent border-b border-white/10 py-2 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Use Case */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Primary Use Case</label>
                  <input name="useCase" type="text" placeholder="NLP / Vision" required 
                    className="bg-transparent border-b border-white/10 py-2 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-700" />
                </div>

                {/* Dataset */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Dataset Size</label>
                  <input name="dataset" type="text" placeholder="100B Tokens" required 
                    className="bg-transparent border-b border-white/10 py-2 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-700" />
                </div>
              </div>

              {/* Image Logic */}
              <div className="space-y-4">
                <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase block">Visual Asset</label>
                <div className="flex flex-col md:flex-row gap-4">
                   <div className="relative w-full">
                      <input type="file" onChange={handleImageUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="bg-white/5 border border-dashed border-white/10 py-3 rounded-lg text-center text-xs text-gray-400">
                        {uploading ? "Uploading..." : "Click to drop Image"}
                      </div>
                   </div>
                   <input name="image_url" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="or paste direct URL" 
                    className="bg-transparent border-b border-white/10 py-2 focus:border-indigo-500 outline-none transition-all text-xs w-full" />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Technical Overview</label>
                <textarea name="description" rows="3" required
                  className="bg-white/5 border border-white/5 rounded-lg p-3 focus:border-indigo-500/50 outline-none transition-all resize-none text-sm" />
              </div>

              {/* Submit Button */}
              <button 
                disabled={loading || uploading}
                className={`w-full py-4 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500
                ${loading || uploading 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]"}`}
              >
                {loading ? "Syncing to Server..." : "Deploy Model"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Publish;