import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { gsap } from "gsap";
import "./edit.css";
import { AuthContext } from "../../Authcontext";

const EditModel = () => {
  const { id } = useParams();
  const [model, setModel] = useState({});
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
const {theme} = useContext(AuthContext)
  //  Fetch data
  useEffect(() => {
    fetch(`https://server-3-smoky.vercel.app/users/${id}`)
      .then((res) => res.json())
      .then((data) => setModel(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  //  GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: -80,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        delay: 0.5,
        duration: 1.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedModel = {
      name: form.name.value,
      image: form.image.value,
      useCase: form.useCase.value,
      dataset: form.dataset.value,
      description: form.description.value,
    };

    const res = await fetch(`https://server-3-smoky.vercel.app/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedModel),
    });

    if (res.ok) {
      Swal.fire("Updated!", "Model updated successfully.", "success");
      form.reset();
    }
  };

  return (
    <div ref={sectionRef} className="edit-container">
      <h1 ref={headingRef} className="user-h1 ">06</h1>

      <div className="edit-main">
        <h2 className="user-h2">YOU CAN EDIT YOUR MODEL DATA</h2>

        <form
          ref={formRef}
          onSubmit={handleUpdate}
          className="edit-form"
          required
        >
          <input
            defaultValue={model.name}
            name="name"
            placeholder="Name"
            className="input"
            required
          />
          <input
            defaultValue={model.image}
            name="image"
            placeholder="Image"
            className="input"
            required
          />
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

          <button className="update-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
