import { useEffect } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { WSResponse } from "./chat";

export function useWebSocketPing(interval: number) {

    const { socket, isConnected, sendMessage } = useWebSocket();

    useEffect(() => {

        if (!socket || !isConnected) {
            return;
        }

        const pingTimer = setInterval(() => {
            sendMessage({ type: "PING" });
        }, interval);

        const onMessage = (event: MessageEvent) => {

            const response: WSResponse = JSON.parse(event.data);
            console.log(response.type);

            if (response.type === "PONG") {
                console.log("WebSocket: PONG");
            }
        };

        socket.addEventListener("message", onMessage);
        return () => {
            clearInterval(pingTimer);
            socket.removeEventListener("message", onMessage);
        };

    }, [socket, isConnected, sendMessage, interval]);

}