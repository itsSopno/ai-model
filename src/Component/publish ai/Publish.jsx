import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Authcontext";
import { toast } from "react-toastify";
import "./publish.css";

const Publish = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const IMGBB_API_KEY = "4c8ddf7ff8e6cc2277a637b2f504274a";

  // ---------------- IMAGE UPLOAD ----------------
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        document.getElementById("image").value = data.data.url;
        toast.success("Image uploaded successfully ✅");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      toast.error("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  // ---------------- ADD MODEL ----------------
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
      image: form.image.value,
      createdBy: user?.email,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("https://server-3-smoky.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newModel),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Model published successfully 🚀");
      form.reset();
      navigate("/MODEL");
    } catch (err) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-12">

      {/* LEFT INFO */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-[#92afcf]">
          Publish Your AI Model
        </h1>
        <p className="text-gray-300 mt-4">
          Share your AI model with the community. Upload details, image and help
          others build smarter applications.
        </p>
      </div>

      {/* FORM */}
      <fieldset className="bg-[#92afcf] rounded-box w-full max-w-sm p-6 text-[#11190c] shadow-lg">
        <form onSubmit={handleAddModel} className="flex flex-col gap-3">

          <label>Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="input input-bordered bg-[#92afcf]"
          />

          <label>Dataset</label>
          <input
            type="text"
            name="dataset"
            required
            className="input input-bordered bg-[#92afcf]"
          />

          <label>Model Name</label>
          <input
            type="text"
            name="name"
            required
            className="input input-bordered bg-[#92afcf]"
          />

          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input input-bordered bg-[#92afcf]"
          />

          <label>Image URL</label>
          <input
            id="image"
            name="image"
            required
            className="input input-bordered bg-[#92afcf]"
          />

          <label>Framework</label>
          <input
            type="text"
            name="framework"
            required
            className="input input-bordered bg-[#92afcf]"
          />

          <label>Use Case</label>
          <input
            type="text"
            name="useCase"
            required
            className="input input-bordered bg-[#92afcf]"
          />

          <label>Description</label>
          <textarea
            name="description"
            required
            className="textarea textarea-bordered bg-[#92afcf]"
          />

          <button
            disabled={loading || uploading}
            className="btn btn-neutral mt-4"
          >
            {uploading
              ? "Uploading Image..."
              : loading
              ? "Publishing..."
              : "PUBLISH"}
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default Publish;
