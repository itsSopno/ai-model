import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import "react-toastify/dist/ReactToastify.css";
import "./edit.css";

const EditModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const imgbbAPIKey = "4c8ddf7ff8e6cc2277a637b2f504274a"; 

  // Fetch model data
  useEffect(() => {
    setLoading(true);
    fetch(`https://server-3-smoky.vercel.app/users/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => setModel(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch model data!");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: -80,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        });
      }

      if (formRef.current) {
        gsap.from(formRef.current.children, {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          delay: 0.5,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle local image upload to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setModel((prev) => ({ ...prev, image: data.data.url }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("ImgBB upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setImgUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const updatedModel = {
      name: form.name.value,
      image: model.image, // URL from ImgBB
      useCase: form.useCase.value,
      dataset: form.dataset.value,
      description: form.description.value,
    };

    try {
      const res = await fetch(`https://server-3-smoky.vercel.app/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedModel),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Update failed: ${text}`);
      }

      toast.success("Model updated successfully!");
      navigate(`/MODEL/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update model!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-white">Loading model...</div>;
  }

  return (
    <div ref={sectionRef} className="edit-container p-4 md:p-8">
      <h1 ref={headingRef} className="user-h1">Edit Model</h1>

      <div className="edit-main">
        <h2 className="user-h2 mb-4">Update your AI model data</h2>

        <form ref={formRef} onSubmit={handleUpdate} className="edit-form">
          <input
            defaultValue={model.name}
            name="name"
            placeholder="Name"
            className="input"
            required
          />

          <div>
            <label className="text-white mb-1 block">Model Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imgUploading}
              className="input-file"
            />
            {imgUploading && <p className="text-gray-300 text-sm mt-1">Uploading...</p>}
            {model.image && (
              <img src={model.image} alt="model" className="w-32 h-32 object-contain mt-2 rounded-lg" />
            )}
          </div>

          <input
            defaultValue={model.useCase}
            name="useCase"
            placeholder="Use Case"
            className="input"
            required
          />
          <input
            defaultValue={model.dataset}
            name="dataset"
            placeholder="Dataset"
            className="input"
            required
          />
          <textarea
            defaultValue={model.description}
            name="description"
            placeholder="Description"
            className="textarea"
            required
          ></textarea>

          <button className="update-btn" type="submit" disabled={updating || imgUploading}>
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
