import React, { useState, useEffect, SyntheticEvent } from "react";
import { useUser } from "../context/user";
import { firebase, firestore } from "../services/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Message } from "./Message";
import { IMessage } from "../models/message";

const messagesRef = firestore.collection("messages");
const messagesQuery = messagesRef.orderBy("createdAt", "desc").limit(100);
// document.getElementById("channel")?.scrollTo(0,document.getElementById("channel")?.scrollHeight || 0);

export const Channel = () => {
  const [text, setText] = useState("");

  const { logout, user } = useUser();

  const [messages] = useCollectionData<IMessage>(messagesQuery, {
    idField: "id",
  });
  
  const sendByKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      sendMessage();
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.getElementById("channel")?.scrollTo(0, document.getElementById("channel")?.scrollHeight!);
    return () => {};
  }, [messages?.length]);

  const sendByButton = (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (text.length > 0) {
      if (user) {
        const { displayName, photoURL, uid, email } = user;
        messagesRef.add({
          text: text.replaceAll("\n", "_nL"),
          uid,
          photoURL,
          displayName,
          email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
      setText("");
    }
  };

  return (
    <section>
      <button onClick={logout} className="button top-right">Logout <i className="fas fa-sign-out-alt"></i></button>
      <section className="channel my-scroll" id="channel">
        {messages &&
          messages.map((m) => <Message message={m} key={m.id} />).reverse()}
      </section>
      <footer>
        <form className="chat" onKeyDown={sendByKey}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Presiona Shift+Enter para enviar el mensaje"
            className="my-scroll"
          ></textarea>
          <button className="send" onClick={sendByButton}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </footer>
    </section>
  );
};
