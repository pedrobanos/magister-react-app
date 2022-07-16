import logo from '../assets/images/magister logo.png'

const MagisterMotto = () => {

    return (
        <div className="container-fluid" style={{height:'500px', backgroundColor: 'white' }}>
            <div className="row align-items-start">
                <div className="col mx-3">
                    <img src={logo} alt="" />
                </div>
                <div className="col">
                    One of three columns
                </div>
                <div className="col mx-5">
                    One of three columns
                </div>
            </div>
        </div>
    )

}

export default MagisterMotto