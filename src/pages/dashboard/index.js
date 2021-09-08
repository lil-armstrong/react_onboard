import { useContext } from "react";
import { AuthContext } from "../../context";
import { useHistory, Link } from "react-router-dom";

export default function DashboardPage() {
  const { session, setSession } = useContext(AuthContext);
  const history = useHistory();
  console.log({session})
  return (
    <div>
      

      <div>
        <h3>Welcome <strong className="accent">{session?.username}</strong>, to your dashboard</h3>
        <p>This is a protected Page</p>
      </div>
    </div>
  );
}
