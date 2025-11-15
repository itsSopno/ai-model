import React, { useContext } from 'react';
import { AuthContext } from '../../Authcontext';

const Profile = () => {
  const { user, } = useContext(AuthContext); // ✅ need setBuyerData to update UI

  // Filter models purchased by the current user
 

  return (
    <section className="py-10 pt-[100px]">
      {user ? (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#11190c] backdrop-blur-md border border-green-800 rounded-2xl shadow-2xl overflow-hidden p-6">
             <h1 className='text-[#7AF201] text-xl font-semibold flex justify-center **text-center**'>{user.displayName}</h1>
          {/* User Image */}
          <div className="flex items-center justify-center bg-gray-100/5 rounded-xl">
       
            <img
              src={user?.photoURL || user?.photo || '/default-user.png'}
              alt={user?.displayName || 'User'}
              className="object-contain w-full h-[300px] md:h-[400px] rounded-lg"
            />
          </div>

          {/* User Info and Purchased Models */}
        </div>
      ) : (
        <div className="text-center text-gray-400">No user found</div>
      )}
    </section>
  );
};

export default Profile;
