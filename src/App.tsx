import { Outlet } from "react-router-dom";

function App() {

  // if (datas.state === 'error') {
  //   return (
  //     <div className="grid grid-cols-1 place-items-center mt-10 text-white text-rose-600 z-10">
  //       <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
  //         <span>An error occured while connecting check your network connection..</span>
  //       </div>
  //     </div>
  //   )
  // };

  return <Outlet />;
}

export default App;
