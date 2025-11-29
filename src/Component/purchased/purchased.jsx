import React, { useContext } from "react";
import { AuthContext } from "../../Authcontext";
import "./purchased.css";

const Purchased = () => {
  const { user, buyerdata, setBuyerData } = useContext(AuthContext);

  const userModels =
    buyerdata?.filter(
      (item) => item.buyerEmail && item.buyerEmail === user?.email
    ) || [];

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://server-3-smoky.vercel.app/buyerdata/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0 || data.success) {
        alert("Item deleted successfully!");

        setBuyerData((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Delete failed. Try again.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Error deleting item!");
    }
  };

  return (
   <div className="pt md :flex flex-col  items-center w-full px-4 md:px-8">
  <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-[#92afcf] tracking-tight border-b-2 pb-2 text-center">
    Your Purchased Apps
  </h1>

  {userModels.length > 0 ? (
    <div className="flex flex-col items-center gap-6 w-full">
      {userModels.map((buyer) => (
        <div
          key={buyer._id}
          className="overflow-x-auto w-full max-w-4xl rounded-xl shadow-xl border p-4 sm:p-6"
        >
          <table className="table-auto w-full min-w-[600px] sm:min-w-full">
        
            <tbody>
              <tr className=" transition-colors">
                {/* Checkbox */}
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>

                {/* NAME + IMAGE */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={buyer.image} alt={buyer.modelName} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-sm sm:text-base">{buyer.modelName}</div>
                      <div className="text-xs sm:text-sm opacity-50">
                        {buyer.country || "Unknown"}
                      </div>
                    </div>
                  </div>
                </td>

                {/* DESCRIPTION */}
                <td className="text-sm sm:text-base">
                  {buyer.description}
                  <br />
                  <span className="badge badge-ghost badge-sm mt-1">Purchased Item</span>
                </td>

                {/* RANDOM COLOR */}
           

                {/* DELETE BUTTON */}
                <td>
                  <button
                    onClick={() => handleDelete(buyer._id)}
                    className="btn btn-ghost btn-xs sm:btn-sm text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  ) : (
    <div className="rounded-lg p-8 text-center mt-10 shadow-inner max-w-sm mx-auto">
      <h1 className="text-red-600 text-xl font-bold mb-2">Nothing to see here!</h1>
      <p className="text-gray-600 text-lg">You need to login for this</p>
    </div>
  )}
</div>

  );
};

export default Purchased;
