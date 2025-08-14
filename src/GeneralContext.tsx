import { createContext, useState, useEffect } from "react";
import http from "../config/axios";
import Loader from "./Loader";

interface GeneralContextType {
  datas: any;
  setDatas: any;
}
export const GeneralContext = createContext<GeneralContextType | null>(null);

export function ContextProvider({ children }: { children: any }) {
  const [datas, setDatas] = useState<any>({
    data: null,
    state: "loading",
  });

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await http.get("");
        const message = await response.data;
        // console.log("message", message);
        const status = response.status;
        // console.log("status", status);
        setDatas({
          ...datas,
          data: { message, status },
          state: "not loading",
        });
        if (
          status === 209 &&
          !window.location.pathname.startsWith("/dashboard")
        ) {
          window.location.href = "/dashboard";
        }
      } catch (err) {
        setDatas({
          ...datas,
          state: "not loading",
        });
        console.error("loading user data", err);
      }
    };

    getStatus();
  }, []);

  return (
    <GeneralContext.Provider value={{ datas, setDatas }}>
      {datas.state === "loading" ? (
        <Loader parentClass="h-screen" childClasses="h-3 w-3 bg-blue-600" />
      ) : (
        children
      )}
    </GeneralContext.Provider>
  );
}
