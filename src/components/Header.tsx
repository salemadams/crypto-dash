import {Link} from "react-router";

function Header() {
    return <div className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </div>
}
export default Header;