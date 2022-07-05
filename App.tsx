import React, { useEffect, useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { sendReactMessage, WebViewRef } from "./utils/reactMessage";

const uri = "http://10.0.2.2:3000";
// const uri = "http://localhost:3000";

const onMessage = (webViewRef: WebViewRef) => (e: WebViewMessageEvent) => {
  const { data: _data } = e.nativeEvent;

  const { data, type } = JSON.parse(_data);

  if (type === "NOTIFICATION") {
    sendReactMessage({ webViewRef, type: "NOTIFICATION", data: data });
  }
};

export default function App() {
  const webViewRef = useRef(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri }}
      onMessage={onMessage(webViewRef)}
    />
  );
}
