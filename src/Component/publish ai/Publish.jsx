import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Authcontext";
import './publish.css';

const Publish = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ImgBB API key
  const IMGBB_API_KEY = "4c8ddf7ff8e6cc2277a637b2f504274a"; // <-- replace with your key

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
        document.getElementById("image-url").value = data.data.url;
        Swal.fire({
          title: "Image Uploaded!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("ImgBB upload failed");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Upload Failed",
        text: "Please try again",
        icon: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddModel = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const createdBy = user?.email || form.email.value;
    const name = form.name.value;
    const image = form.image.value;
    const framework = form.framework.value;
    const useCase = form.useCase.value;
    const description = form.description.value;
    const dataset = form.dataset.value;

    const newData = { name, framework, useCase, dataset, description, image, createdBy };

    try {
      const response = await fetch("https://server-3-smoky.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      console.log("Saved:", result);

      Swal.fire({
        title: "Successfully Published!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
      navigate("/ALL-MODELS");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-9 px-4 md:px-8 py-12 bg-black text-white">

      {/* Info Section */}
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#92afcf] leading-tight">
          Publish Your AI Model
        </h1>
        <p className="text-gray-300 mt-4 text-base sm:text-lg md:text-xl leading-relaxed">
          Share your machine learning model with the world. Provide clear details, upload your image, 
          and help developers discover and build with your model.
        </p>
      </div>

      {/* Form Section */}
      <fieldset className="bg-[#92afcf] border-base-300 rounded-box w-full max-w-sm border p-6 shadow-md text-[#11190c]">
        <form onSubmit={handleAddModel} className="flex flex-col gap-3">

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            className="input input-bordered bg-[#92afcf]"
            required
            defaultValue={user?.email}
            disabled={!!user?.email}
          />

          <label className="label">Dataset</label>
          <input type="text" name="dataset" placeholder="Dataset Name" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Model Name</label>
          <input type="text" name="name" placeholder="MODEL NAME" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input input-bordered bg-[#92afcf]" />
          <p className="text-sm text-gray-700 mt-1">Image URL will be auto-filled below after upload</p>

          <label className="label">Image URL</label>
          <input id="image-url" type="text" name="image" placeholder="IMAGE URL" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Framework</label>
          <input type="text" name="framework" placeholder="TensorFlow, PyTorch etc." className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Use Case</label>
          <input type="text" name="useCase" placeholder="Example: Image Classification" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Description</label>
          <textarea className="textarea textarea-ghost bg-[#7af201]" name="description" placeholder="Description" required></textarea>

          <button
            type="submit"
            className="btn btn-neutral mt-4 rounded-tr-4xl rounded-tl-4xl flex justify-center items-center"
            disabled={loading || uploading}
          >
            {loading ? "Publishing..." : uploading ? "Uploading Image..." : "PUBLISH"}
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default Publish;
