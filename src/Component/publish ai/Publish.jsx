import React from 'react';
import Swal from "sweetalert2";   
import './publish.css'
import { Link } from 'react-router';

const Publish = () => {

  const handleEmailLogin = async(e) => {
    e.preventDefault();

    const form = e.target;
    const createdBy = form.email.value;
    const name = form.name.value;
    const image = form.image.value;
    const frameork = form.framework.value;
    const useCase = form.useCase.value;
    const description = form.description.value;
    const dataset = form.dataset.value;

    const newData = { name, frameork, useCase, dataset, description, image, createdBy };

    try {
      const response = await fetch('https://server-3-smoky.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });

      const result = await response.json();
      console.log("Saved:", result);

      Swal.fire({
        title: "Successfully Published!",
        text: "Your model has been uploaded.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      form.reset();

    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        title: "Something went wrong!",
        text: "Please try again.",
        icon: "error"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  gap-9 px-4 md:px-8">

      
    <div className="text-center pt-[30px] mb-8 px-4 sm:px-6 md:pt-[20px]">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#92afcf] leading-tight">
    Publish Your AI Model
  </h1>

  <p className="text-gray-300 mt-4 text-base sm:text-lg md:text-xl max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
    Share your machine learning model with the world. Provide clear details, upload your image link, 
    and help developers discover, test, and build with your model.
  </p>
</div>

      <fieldset className="bg-[#92afcf] border-base-300 rounded-box w-full max-w-sm border p-6 shadow-md text-[#11190c]">
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">

          <label className="label">Email</label>
          <input type="email" name="email" placeholder="EMAIL" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Dataset</label>
          <input type="text" name="dataset" placeholder="Dataset Name" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Model Name</label>
          <input type="text" name="name" placeholder="MODEL NAME" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Hosted Image URL</label>
          <input type="text" name="image" placeholder="IMAGE URL" className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Framework</label>
          <input type="text" name="framework" placeholder="TensorFlow, PyTorch etc." className="input input-bordered bg-[#92afcf]" required />

          <label className="label">Use Case</label>
          <input type="text" name="useCase" placeholder="Example: Image Classification" className="input input-bordered bg-[#92afcf]" required />

          <textarea className="textarea textarea-ghost bg-[#7af201]" name="description" placeholder="Description"></textarea>

          <button type="submit" className="btn btn-neutral mt-4 rounded-tr-4xl rounded-tl-4xl">
            PUBLISH
          </button>

        </form>
      </fieldset>
    </div>
  );
};

export default Publish;
