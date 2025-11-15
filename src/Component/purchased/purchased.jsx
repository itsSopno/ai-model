import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Authcontext';
import './purchased.css'
const Purchased = () => {
      const { user, buyerdata, setBuyerData } = useContext(AuthContext);
     const userModels = buyerdata?.filter(
    (item) => item.buyerEmail && item.buyerEmail === user?.email
  ) || [];
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://server-3-smoky.vercel.app/buyerdata/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.deletedCount > 0 || data.success) {
        alert('Item deleted successfully!');
        // ✅ Update UI instantly
        setBuyerData((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert('Delete failed. Try again.');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item!');
    }
  };
    return (
 <div className='pt'>
  <h1 className="text-2xl font-extrabold mb-6 text-[#4af201] tracking-tight border-b-2 pb-2 inline-block">
Your Purchased Apps
  </h1>

  {userModels.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {userModels.map((buyer, index) => (
        <div
          key={buyer._id || index}
          className="bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-4 group border border-gray-50 transform relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#4af201] rounded-t-xl opacity-70"></div>

          <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video mb-4">
            <img
              src={buyer.image}
              alt={buyer.title || 'App Image'}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
              loading="lazy"
            />
          </div>

          <div className="mt-2">
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition truncate">
              {buyer.title || 'Untitled App'}
            </h2>

            <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[2.5rem]">
              {buyer.description || 'A valuable application purchased for your use.'}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDelete(buyer._id)}
                className="inline-flex items-center justify-center bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-600 transition transform hover:scale-105 shadow-md shadow-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className=" rounded-lg p-8 text-center mt-10 shadow-inner">
      <h1 className="text-red-600 text-xl font-bold mb-2">
        Nothing to see here!
      </h1>
      <p className="text-gray-600 text-lg">
        You need to login for this
      </p>
    </div>
  )}
</div>
    );
};

export default Purchased;