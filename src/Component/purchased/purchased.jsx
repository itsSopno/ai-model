import React, { useContext } from "react";
import { AuthContext } from "../../Authcontext";
import { motion } from "framer-motion";

const Purchased = () => {
  const { user, buyerData, setBuyerData } = useContext(AuthContext);

  if (!user) return <p>Please login to see your purchased models.</p>;

  const userModels = buyerData?.filter(
    (item) => item.buyerEmail === user.email
  ) || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(
        `https://server-3-smoky.vercel.app/buyerdata/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.deletedCount > 0 || data.success) {
        alert("Item deleted successfully!");
        setBuyerData((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting item!");
    }
  };

  return (
    <div className="pt-10 px-4 md:px-8 min-h-screen ">
      <h1 className="pt-[20px]text-3xl md:text-4xl font-extrabold mb-12 text-center text-[#92afcf] tracking-tight border-b-2 pb-2">
        Your Purchased Apps
      </h1>

      {userModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userModels.map((buyer, index) => (
            <motion.div
              key={buyer._id}
              className="bg-[#11190c] border border-[#92afcf]/30 rounded-2xl p-4 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img
                src={buyer.image}
                alt={buyer.modelName}
                className="w-32 h-32 object-contain rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-[#92afcf]">
                {buyer.modelName}
              </h2>
              <p className="text-sm text-gray-400 mb-2">{buyer.buyerName}</p>
              <p className="text-sm text-[#92afcf] mb-4">Price: ${buyer.price}</p>
              <button
                onClick={() => handleDelete(buyer._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#92afcf] text-xl mt-10">
          You have not purchased any models yet.
        </p>
      )}
    </div>
  );
};

export default Purchased;
