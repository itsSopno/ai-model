import React, { useContext } from "react";
import { AuthContext } from "../../Authcontext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
const Purchased = () => {
  const { user, buyerData, setBuyerData } = useContext(AuthContext);

  if (!user) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">Access Denied. Please Login.</p>
    </div>
  );

  const userModels = buyerData?.filter((item) => item.buyerEmail === user.email) || [];

 

  const handleDelete = async (id) => {
   
    
    if (!window.confirm("Are you sure you want to remove this asset?")) return;

    const toastId = toast.loading("Processing request..."); // Loading state শুরু

    try {
      const res = await fetch(
        `https://server-3-smoky.vercel.app/buyerdata/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.deletedCount > 0 || data.success) {
        // Success Toast
        toast.update(toastId, { 
          render: "Asset removed successfully! 🗑️", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });
        
        setBuyerData((prev) => prev.filter((item) => item._id !== id));
      } else {
       
        toast.update(toastId, { 
          render: "Failed to delete asset!", 
          type: "error", 
          isLoading: false, 
          autoClose: 3000 
        });
      }
    } catch (err) {
      console.error(err);
      
      toast.update(toastId, { 
        render: "Network error! Try again.", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };



  return (
    <div className="p-6 md:p-12  min-h-screen text-white">
      {/* HEADER SECTION */}
      <div className="mb-16">
        <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4">
          Vault / Collections
        </h2>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            PURCHASED <span className="text-[#d0ff00] font-light italic">MODEL</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium border-l border-white/10 pl-4">
            Showing {userModels.length} active licenses in your repository.
          </p>
        </div>
      </div>

      {/* ASSETS GRID */}
      {userModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {userModels.map((buyer, index) => (
              <motion.div
                key={buyer._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500"
              >
                {/* Image Overlay/Container */}
                <div className="aspect-square w-full overflow-hidden bg-[#11111a] relative">
                  <img
                    src={buyer.image}
                    alt={buyer.modelName}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-80" />
                  
                  {/* Floating Price Tag */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                    <span className="text-[10px] font-black text-indigo-400 tracking-tighter">${buyer.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-white mb-1 uppercase truncate">
                      {buyer.modelName}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                      ID: {buyer._id.slice(-8)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/5">
                    <button className="flex-grow py-2.5 bg-white text-black text-[10px] font-black tracking-widest uppercase rounded-lg hover:bg-indigo-500 hover:text-white transition-all">
                      Purchased Models
                    </button>
                    <button
                      onClick={() => handleDelete(buyer._id)}
                      className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
          <p className="text-gray-600 font-black tracking-[0.3em] uppercase text-xs mb-4">Library is Empty</p>
          <button className="text-indigo-500 font-bold hover:underline">Browse Market</button>
        </div>
      )}
    </div>
  );
};

export default Purchased;