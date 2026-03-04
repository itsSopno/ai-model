// import { Outlet } from "react-router"
// import Sidebar from "../Dashboard/Sidebar/sidebar"
// import { ToastContainer } from "react-toastify"
// const DashboardLayout = () => {
//   return (
//     <div className='relative min-h-screen md:flex   /* Primary Background Layer */
//           bg-[#0f0f1c]
//           border-r border-indigo-500/20 shadow-[0_0_40px_rgba(80,80,255,0.35)]

//           /* Glass Highlight */
//           before:absolute before:inset-0 before:bg-gradient-to-b 
//           before:from-white/10 before:to-transparent before:blur-[90px] 
//           before:opacity-20 before:pointer-events-none'>
        
//      <Sidebar />
//      <ToastContainer></ToastContainer>
//       <div className='flex-1  md:ml-64'>
//         <div className='p-5'>
//           {/* Outlet for dynamic contents */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout
import { Outlet } from "react-router"
import Sidebar from "../Dashboard/Sidebar/sidebar"
import { ToastContainer } from "react-toastify"
import { motion } from 'framer-motion';
const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen bg-[#080808] flex flex-col md:flex-row overflow-x-hidden'>
      
      {/* 1. Structural Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" 
             style={{ backgroundImage: `linear-gradient(#white 1px, transparent 1px), linear-gradient(90deg, #white 1px, transparent 1px)`, 
                     backgroundSize: '100px 100px' }} />
      </div>

      {/* 2. Toast Styling Override */}
      <ToastContainer 
        toastClassName={() => "bg-[#111] border border-white/10 text-white font-mono text-xs rounded-none shadow-2xl p-4"}
        bodyClassName={() => "flex items-center gap-3"}
      />

      {/* 3. Sidebar Component */}
      <Sidebar />

      {/* 4. Main Content Area */}
      <main className='flex-1 relative z-10 w-full min-w-0'>
        {/* Top Decorative Border for Desktop */}
        <div className="hidden md:block absolute top-0 left-0 w-full h-[1px] bg-white/10" />
        
        <div className='p-6 md:p-12 lg:p-16'>
          {/* Outlet for dynamic contents */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            <Outlet />
          </motion.div>
        </div>

        {/* 5. Right-Side Technical Label (Optional Floating Detail) */}
        <div className="fixed bottom-10 right-10 pointer-events-none hidden xl:block">
           <span className="text-[8px] font-mono text-gray-800 uppercase tracking-[0.8em] vertical-text">
             KYMA_SYSTEM_ACTIVE // STABLE_REVISION_2.0
           </span>
        </div>
      </main>

      {/* CSS for Vertical Text */}
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  )
}

export default DashboardLayout