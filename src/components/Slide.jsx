import mindFullTeacher from '../assets/images/bcar_mindfulteacher.png'
import studentsPic from '../assets/images/bcar_conted_22_a.jpeg'
import personalStatementPic from '../assets/images/bcar_ug_personal_statement_0.jpeg'

const Slide = () => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={mindFullTeacher} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Lorem Ipsum</h5>
                        <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={studentsPic} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5> Et sollicitudin ac orci phasellus egestas tellus rutrum tellus</h5>
                        <p>Ornare lectus sit amet est placerat in egestas erat imperdiet. Amet consectetur adipiscing elit ut aliquam purus sit. Eu volutpat odio facilisis mauris sit amet</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={personalStatementPic} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Enim diam vulputate ut pharetra sit amet aliquam</h5>
                        <p>Quis commodo odio aenean sed adipiscing diam. Ac turpis egestas maecenas pharetra convallis posuere morbi.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Slide