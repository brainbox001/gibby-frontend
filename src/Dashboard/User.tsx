import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../GeneralContext";
import { useNavigate } from "react-router-dom";
import { parseBalance } from "./Dashboard";
import API_URL from "../../config/api_url";
import { RiTelegramFill } from "react-icons/ri";

function User() {
  const context = useContext(GeneralContext);
  if (!context) throw new Error("Footer must be used within a ContextProvider");
  const navigate = useNavigate();
  const [idDetails, setIdDetails] = useState<{
    id: number;
    sender_id: string | undefined;
  }>({ id: 0, sender_id: "" });
  const [status, setStatus] = useState({
    state: "not loading",
    error: "",
  });

  const { datas } = context;

  useEffect(() => {
    if (!datas.data) {
      navigate("/");
    } else {
      setIdDetails({
        id: datas.data.message.id,
        sender_id: datas.data.message.sender_id || undefined,
      });
      alert("say hello to the Telegram bot @gib_bybot to get your id");
    }
  }, []);

  async function updateSenderId(e: any) {
    e.preventDefault();
    try {
      setStatus({ ...status, state: "loading" });
      const response = await fetch(`${API_URL}/transaction/connect_telegram`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          personal: "gibby-frontend",
        },
        body: JSON.stringify({
          user_id: idDetails.id,
          sender_id: idDetails.sender_id,
        }),
      });
      const data = await response.json();
    //   console.log(data);
      if (response.status === 200) {
        console.log(data.message);
        setIdDetails({ ...idDetails, sender_id: data.message.sender_id });
        setStatus({ ...status, state: "not loading" });
        window.location.reload();
      } else {
        setStatus({ state: "not loading", error: data.error });
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating sender ID:", error);
      alert(error);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          personal: "gibby-frontend",
        },
      });
      window.location.href = "/";
    } catch (error: any) {
      window.location.href = "/";
    }
  }

  if (!!datas.data) {
    const date = new Date(datas.data.message.created_at).toDateString();
    return (
      <div className="flex flex-col gap-6 mt-10 px-4 max-w-full overflow-x-hidden">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span>First Name :</span>
          <span>{datas.data.message.firstName}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span>Last Name :</span>
          <span>{datas.data.message.lastName}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span>Email :</span>
          <span className="break-words">{datas.data.message.email}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span>Balance :</span>
          <span>{parseBalance(datas.data.message.balance)}</span>
        </div>

        {/* Telegram Form */}
        <form
          onSubmit={updateSenderId}
          className="flex justify-center items-center gap-2 flex-wrap"
        >
          <input
            className="outline-none rounded-md w-full sm:w-40 h-8 border border-gray-300"
            type="text"
            name="sender_id"
            id="sender_id"
            placeholder="sender Id"
            value={idDetails.sender_id}
            onChange={(e) =>
              setIdDetails({ ...idDetails, sender_id: e.target.value })
            }
          />
          <button
            className={`flex justify-center items-center font-semibold text-white ${
              !!idDetails.sender_id &&
              idDetails.sender_id != datas.data.message.sender_id
                ? "bg-green-400"
                : "bg-gray-200"
            } px-2 py-1 rounded-md`}
            disabled={
              status.state === "loading" ||
              (!!idDetails.sender_id &&
                idDetails.sender_id == datas.data.message.sender_id)
            }
            type="submit"
          >
            {status.state === "loading" ? (
              <span>please wait..</span>
            ) : (
              <>
                <span className="mr-1">Connect</span>
                <RiTelegramFill className="text-2xl text-blue-600 bg-white rounded-full" />
              </>
            )}
          </button>
        </form>

        <div className="flex justify-between items-center flex-wrap gap-2">
          <span>Joined :</span>
          <span>{date}</span>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-rose-600 text-white px-4 py-2 rounded-md w-full sm:w-36"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default User;
