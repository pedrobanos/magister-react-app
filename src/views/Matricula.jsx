import { Link } from 'react-router-dom'
import magisterLogo from '../assets/images/Captura-de-pantalla-2020-07-16-a-las-16.45.27-removebg-preview.png'

const Matricula = () => {

    return (

        <div className="matricula">
            <div className="container">
                <div className="col mt-5">
                    <img src={magisterLogo} style={{width:'300px', height:'250px'}} alt=""></img>
                </div>
                <div className='col mt-3'>
                    <h1>¡Comencemos con tu matrícula!</h1>
                </div>
                <div className='col mt-3'>
                    <h4>Para comenzar a <br/> especializarte,vamos a <br/>realizar unas preguntas para  <br/>darte el mejor servicio</h4>
                </div>
                <div className='col mt-4' >
                <Link type="button" to='/register'className="btn btn-outline-secondary">Comencemos</Link>
                </div>
                <div className='col mt-3'>
                <Link style={{textDecoration:'none'}} to='/'><span>volver a atrás</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Matricula