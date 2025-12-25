import React, { useEffect, useRef, useContext, useState } from 'react';
import gsap from 'gsap';
import { useParams, Link } from 'react-router';
import { AuthContext } from '../../Authcontext';
import './model.css';
import { toast } from "react-toastify";

const ModelDetail = () => {
  const { id } = useParams();
  const { modelData, user, setModelData } = useContext(AuthContext);
  const [model, setModel] = useState(null);

  const card = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const listRef = useRef(null);
  const btnRef = useRef(null);

  // Fetch single model from context
  useEffect(() => {
    const foundModel = modelData.find((m) => m._id === id);
    setModel(foundModel);
  }, [id, modelData]);

  // GSAP Animation
  useEffect(() => {
    if (!card.current) return;
    gsap.set([card.current, imgRef.current, titleRef.current, descRef.current, listRef.current, btnRef.current], { opacity: 0, y: 40 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 }, delay: 0.2 });
    tl.to(card.current, { opacity: 1, y: 30 })
      .to(imgRef.current, { opacity: 1, scale: 1, y: 0, duration: 1 }, "-=0.3")
      .to(titleRef.current, { opacity: 1, y: 0 }, "-=0.6")
      .to(descRef.current, { opacity: 1, y: 0 }, "-=0.6")
      .to(listRef.current, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.5")
      .to(btnRef.current, { opacity: 1, y: 0 }, "-=0.5");
    return () => tl.kill();
  }, [id]);

  // Handle Purchase
  const handlePurchase = async () => {
    if (!user) return toast.error("You need to login to purchase.");

    const buyerInfo = {
      buyerEmail: user.email,
      buyerName: user.displayName || user.name,
      modelId: model._id,
      modelName: model.name,
      image: model.image,
      price: model.purchased || "Free",
    };

    try {
      const res = await fetch("https://server-3-smoky.vercel.app/buyerdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buyerInfo),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Purchase successful!");
      } else {
        toast.error(data.message || "Purchase failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while saving buyer data!");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`https://server-3-smoky.vercel.app/buyerdata/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.deletedCount > 0 || data.success) {
        toast.success("Item deleted successfully!");
        setModelData((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Delete failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting item!");
    }
  };

  if (!model) {
    return (
      <div className="text-center text-white p-10">
        <h2>Model not found!</h2>
        <Link to="/MODEL" className="text-blue-400 underline mt-4 inline-block">
          ← Back to all models
        </Link>
      </div>
    );
  }

  return (
    <section ref={card} className="min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#11190c] backdrop-blur-md border border-[#92afcf] rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-center bg-gray-100/5 rounded-xl">
          <img ref={imgRef} src={model.image} alt={model.name} className="object-contain w-full h-[400px] rounded-lg" />
        </div>

        <div className="flex flex-col justify-center text-[#92afcf] p-4">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-[#92afcf] mb-4">{model.name}</h2>
          <p ref={descRef} className="text-[#92afcf] mb-4 text-lg">{model.useCase}</p>
          <p className="text-[#92afcf] mb-6">{model.description}</p>

          <ul ref={listRef} className="list-disc pl-6 space-y-2 text-[#92afcf]">
            <li>Framework: {model.framework}</li>
            <li>Created By: {model.createdBy}</li>
            <li>Dataset: {model.dataset}</li>
            <li>Date: {model.createdAt}</li>
            <li>Price: {model.purchased}</li>
          </ul>

          <div ref={btnRef} className="mt-8 flex flex-wrap gap-4">
            {user ? (
              <button
                onClick={handlePurchase}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105"
              >
                Purchase
              </button>
            ) : (
              <h1 className="text-red-500">Need to login</h1>
            )}

            <Link
              to="/MODEL"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-105"
            >
              ← Back to Models
            </Link>

            {user && user.email === model.createdBy ? (
              <button
                onClick={() => handleDelete(model._id)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105"
              >
                🗑 DELETE
              </button>
            ) : (
              <h1 className="text-gray-400">Only Publisher can delete</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelDetail;
