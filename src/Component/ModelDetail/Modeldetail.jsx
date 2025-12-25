import React, { useEffect, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthContext } from '../../Authcontext';
import './model.css';

gsap.registerPlugin(ScrollTrigger);

const ModelDetail = () => {
  const { id } = useParams();
  const { modelData } = useContext(AuthContext);
  const model = modelData.find((m) => m._id === id);

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const listRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    });

    tl.from(sectionRef.current, { opacity: 0, duration: 0.5 })
      .from(imageRef.current, {
        y: 80,
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
      .from(titleRef.current, { y: 40, opacity: 0, duration: 0.8 }, '-=0.6')
      .from(textRef.current, { y: 40, opacity: 0, duration: 0.6 }, '-=0.5')
      .from(listRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.4,
      })
      .from(buttonsRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      });
  }, []);

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
    <section
      ref={sectionRef}
      className="min-h-screen py-20 bg-[#0f150c] flex items-center justify-center"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-black/40 backdrop-blur-md border border-green-800 rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-center bg-gray-100/5 rounded-xl">
          <img
            ref={imageRef}
            src={model.image}
            alt={model.name}
            className="object-contain w-full h-[400px] rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center text-gray-300 p-4">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-green-400 mb-4"
          >
            {model.name}
          </h2>

          <p ref={textRef} className="text-gray-400 mb-4 text-lg">
            {model.useCase}
          </p>

          <p className="text-gray-500 mb-6">{model.description}</p>

          <ul ref={listRef} className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Framework: {model.framework}</li>
            <li>Created By: {model.createdBy}</li>
            <li>Dataset: {model.dataset}</li>
            <li>Date: {model.createdAt}</li>
            <li>Price: {model.purchased}</li>
          </ul>

          <div ref={buttonsRef} className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105">
              Purchase
            </button>
            <Link
              to="/MODEL"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-105"
            >
              ← Back to Models
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelDetail;
