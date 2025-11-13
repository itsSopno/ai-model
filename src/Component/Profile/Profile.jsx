import React, { useContext } from 'react';
import { AuthContext } from '../../Authcontext';

const Profile = () => {
  const { user, buyerdata, setBuyerData } = useContext(AuthContext); // ✅ need setBuyerData to update UI

  // Filter models purchased by the current user
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
    <section className="py-10">
      {user ? (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#11190c] backdrop-blur-md border border-green-800 rounded-2xl shadow-2xl overflow-hidden p-6">
          
          {/* User Image */}
          <div className="flex items-center justify-center bg-gray-100/5 rounded-xl">
            <img
              src={user?.photoURL || user?.photo || '/default-user.png'}
              alt={user?.displayName || 'User'}
              className="object-contain w-full h-[300px] md:h-[400px] rounded-lg"
            />
          </div>

          {/* User Info and Purchased Models */}
          <div className="flex flex-col justify-center text-[#4af201] p-4">
            <h2 className="text-2xl md:text-2xl font-bold text-green-400 mb-4">
              NAME: {user?.name || user?.displayName || 'No Name'}
            </h2>

            <div>
              <h1 className="text-lg font-semibold mb-2">Purchased App :</h1>
              {userModels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userModels.map((buyer, index) => (
                    <div
                      key={buyer._id || index}
                      className="max-w-xs bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 p-4"
                    >
                      <img
                        className="w-full h-32 object-cover rounded-xl"
                        src={buyer.image}
                        alt={buyer.name || 'Card preview'}
                      />
                      <div className="mt-3">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {buyer.title || 'Card Title'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {buyer.description || 'A short description goes here.'}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleDelete(buyer._id)}
                            className="w-1/2 bg-red-600 text-white text-sm font-medium py-1.5 rounded-lg hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="text-red-400 text-xl mt-6">Buy something</h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400">No user found</div>
      )}
    </section>
  );
};

export default Profile;
