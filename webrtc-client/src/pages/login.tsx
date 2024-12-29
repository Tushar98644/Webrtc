import { createWebSocketConnection } from "@/services/webSocketService";
import { useState } from "react";

const Login = () => {
    const [username,setUsername] = useState<string>("");
    const [connectedUser,setconnectedUser] = useState(null);
    const connection = createWebSocketConnection();

    interface Message {
        type: string;
        name?: string;
    }

    const sendMessage = (message: Message) => {
        if (connectedUser) message.name = connectedUser;
      
        connection.send(JSON.stringify(message));
    };

    const handleLogin = ():void => {
        if (username.length> 0) {
            console.log("User trying to login with username:",username);
            sendMessage({
                "type":"login",
                "name":username
            })
        }
    }

    return (
        <form>
            <div className="flex flex-col gap-6 pb-6">
                <h1 className="text-center">Login with an username</h1>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target?.value)} className="login-input" placeholder="Enter an username" />
            </div>
            <div className="w-full flex justify-center">
            <button className="px-10 py-2 rounded-full bg-blue-700 hover:bg-red-900 text-white shadow-xl "onClick={handleLogin}>Login</button>
            </div>
        </form>
    );
}

export default Login;