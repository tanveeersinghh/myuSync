import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";
import './OnlineUsers.css'

export default function OnlineUsers() {
const { isPending, documents, error } = useCollection("users");

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {isPending && <div>Loading Users...</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}


