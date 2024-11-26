import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";

function App() {

  const getStatus = async () => {
    try{
        const response = await fetch(
            "http://localhost:3001",
            {
              method : 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'personal' : 'gibby-frontend' },
            }
          );
          const message = await response.json();
          const status = response.status;
          return {message, status};

    }catch(e:any) {
        throw new Error(e)
    }
  };
  
  let queryKey = ["getHomeData"];
  const {isPending, error, data} = useQuery({queryKey, queryFn: getStatus});

  if(isPending) {
    return <Loader parentClass="h-screen" childClasses="h-3 w-3 bg-blue-600" />
  };

  if(error) {
    return (
      <div className="grid grid-cols-1 place-items-center mt-10 text-white text-rose-600 z-10">
            <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
                <span>An error occured while connecting check your network connection..</span>
            </div>
      </div>
    )
  }
  if(data && data.status === 309) {
    return <div>{JSON.stringify(data)}</div>
  }
  return (
    <Outlet />
  )
  
  // return <Outlet />

}

export default App
