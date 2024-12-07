import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import Dashboard from "./Dashboard/Dashboard";
import { useContext, useEffect } from "react";
import { GeneralContext } from "./GeneralContext";


function App() {
  const context = useContext(GeneralContext);
  if (!context) throw new Error("Footer must be used within a ContextProvider");

  const {datas, setDatas} = context;

  useEffect(() => {

    const getStatus = async () => {
      const controller = new AbortController();
    const { signal } = controller;
      try{
          const response = await fetch(
              'https://gibby-app.onrender.com',
              {
                method : 'GET',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json', 'personal' : 'gibby-frontend' },
              signal
              },
            );
            const message = await response.json();
            const status = response.status;
            setDatas({
              ...datas,
              data : {message, status},
              state : 'not loading'
            })
  
      }catch(e:any) {
          setDatas({
            ...datas,
            state : 'error'
          });
      };

      return () => {
        controller.abort();

    };
    };

    getStatus();
}, []);

  if(datas.state === 'loading') {
    return <Loader parentClass="h-screen" childClasses="h-3 w-3 bg-blue-600" />
  };

  if(datas.state === 'error') {
    return (
      <div className="grid grid-cols-1 place-items-center mt-10 text-white text-rose-600 z-10">
            <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
                <span>An error occured while connecting check your network connection..</span>
            </div>
      </div>
    )
  };

  if(!!datas.data && datas.data.status === 309) {
  
    return <Dashboard userData={datas.data} />
  }
  return (
    <Outlet />
  )

}

export default App
