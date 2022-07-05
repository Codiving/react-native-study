import { RefObject } from "react";
import WebView from "react-native-webview";

export type WebViewRef = RefObject<WebView<{}>>;

export interface Message {
  type: string;
  data?: any;
}

interface SendReactMessage extends Message {
  webViewRef: WebViewRef;
}

export const sendReactMessage = (message: SendReactMessage) => {
  const { webViewRef, type, data } = message;

  if (!webViewRef.current) return;

  const jsonData = JSON.stringify({ type, data });
  webViewRef.current.postMessage(jsonData);
};
