import SideBar from "./components/SideBar";

export default function Chats() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <p>Chats For each user seperately and created with web socket</p>
    </div>
  );
}
