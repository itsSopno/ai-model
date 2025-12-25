import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Authcontext';
import './user.css';

const Useri = () => {
  const { user, modelData } = useContext(AuthContext);

  if (!user?.email) {
    return (
      <section className="meet-experts w-full min-h-screen bg-[#11190C] flex items-center justify-center text-white">
        <h2>Please login to view your models.</h2>
      </section>
    );
  }

  const userModels = modelData.filter(
    (item) => item.createdBy && item.createdBy === user.email
  );

  return (
    <section className="meet-experts py-16 px-6">

      <div className="expert-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {userModels.length > 0 ? (
          userModels.map((expert) => (
            <div
              key={expert._id || expert.id}
              className="expert-card bg-[#11190C]  rounded-2xl p-6 flex flex-col items-center shadow-[0_0_20px_rgba(74,242,1,0.2)] hover:shadow-[0_0_40px_rgba(74,242,1,0.4)] transition-all duration-300"
            >
              <img
                src={expert.image}
                alt={expert.name}
                className="expert-image w-40 h-40 object-cover rounded-full  mb-4"
              />
              <h3 className="expert-namei text-2xl font-semibold text-[#92afcf] mb-1">
                {expert.name}
              </h3>
              <p className="expert-title text-gray-300 italic mb-3 text-center">
                {expert.useCase}
              </p>
            
              <div className="flex gap-4 flex-wrap justify-center">
                <Link
                  to={`/MODEL/${expert._id}`}
                  className="px-5 py-2 bg-[#92afcf] text-[#11190C] font-semibold rounded-lg hover:bg-[white] transition-colors duration-300"
                >
                  View Details →
                </Link>
                <Link
                  to={`/edit/${expert._id}`}
                  className="px-5 py-2 bg-[#92afcf] text-[#11190C] font-semibold rounded-lg hover:bg-[white] transition-colors duration-300"
                >
                  EDIT DATA
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10 col-span-full">
            You haven’t published any models yet.
          </p>
        )}
      </div>
      {/* {user &&    <h2 className="section-title text-4xl text-[#7AF201] font-bold text-center mb-12">
        Thanks for using us <br></br>{user.displayName}
      </h2>} */}
    </section>
  );
};

export default Useri;
