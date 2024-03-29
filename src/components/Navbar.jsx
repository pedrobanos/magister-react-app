import { Link } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {

    return (
            <nav className="navbar navbar-expand-lg navbar-dark" >
                <div className="container-fluid">
                    <span className="navbar-brand mx-3" >Magister</span>
                    <button className="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" >
                        <div className="navbar-nav" >
                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            <Link className="nav-link " to="/matricula">Matricúlate</Link>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar 