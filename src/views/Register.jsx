import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../components/InputComponent'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react"
import db from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import transition1 from '../assets/images/secuencia.png'
import transition2 from '../assets/images/secuencia(2).png'
import transition3 from '../assets/images/secuencia(3).png'
import transition4 from '../assets/images/secuencia (4).png'
import transition5 from '../assets/images/secuencia(5).png'
import transition6 from '../assets/images/secuencia(6).png'

import FooterPic1 from '../assets/images/undraw_reading_0re1 1.png'
import FooterPic2 from '../assets/images/undraw_Scrum_board_re_wk7v.png'
import FooterPic3 from '../assets/images/undraw_predictive_analytics_kf9n.png'
import FooterPic4 from '../assets/images/undraw_teacher_35j2.png'
import FooterPic5 from '../assets/images/undraw_environmental_study_skau.png'
import FooterPic6 from '../assets/images/undraw_transfer_money_rywa.png'



const schema1 = yup.object({
    rama: yup.string().required('Please selec one option'),
    alumni: yup.string().required('field required'),
    provinciaEstudio: yup.string().required('Please selec one option')
}).required()

const schemaHor = yup.object({
    modalidad: yup.string(),
    horario: yup.string().required('Horario is a required field')
}).required()

const schemaTar = yup.object({
    tarifa: yup.string().required('select one product')
}).required()

const schema2 = yup.object({
    contactName: yup.string(),
    nifOrNie: yup.string().required('Nif is a required field').matches(/^(\d{8})([A-Z])$/, 'Invalid cif form'),
    email: yup.string().email().required('Email is a required field'),
    phoneNumber: yup.string().required('Phone number is a required field').matches(/^\+?([6-9]\d{2}|7[1-9]\d{1})\d{6}$/, 'Invalid phone form')
}).required()

const schema3 = yup.object({
    address: yup.object({
        street: yup.string().required('Street is a required field'),
        city: yup.string().required('City is a required field'),
        zipCode: yup.string().required('Zip code is a required field').matches(/^\d{5}(?:[- ]?\d{4})?$/, 'Invalid zipcode form'),
        state: yup.string().required('State is a required field'),
    }).required(),
}).required()

const schema4 = yup.object({
    pago: yup.string(),
    recomendado: yup.string().required('required field')
}).required()





const RegisterMatricula = () => {

    const schemas = [schema1, schemaHor, schemaTar, schema2, schema3, schema4];
    const navigate = useNavigate()
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStep, setFormStep] = useState(0)
    const [matriculas, setMatriculas] = useState({})

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schemas[formStep]), mode: "all"
    });

    const completeFormStep = (data) => {
        isValid && setFormStep(curr => curr + 1)
    }

    const getRama = () => {
        let rama = ['Ciecias Sociales', 'Ciencias Naturales', 'Ciencias Sociales', 'Humanidades']
        let options = rama.map(rama => {
            return {
                value: rama
            }
        });
        return options;
    }

    const getProvinciaEstudio = () => {
        let provinciaEstudio = ['Madrid', 'Barcelona', 'Alicante']
        let options = provinciaEstudio.map(provinciaEstudio => {
            return {
                value: provinciaEstudio
            }
        });
        return options;
    }
    const onSubmit = async (data) => {
        // e.preventDefault();
        setIsSubmitting(true)
        await addDoc(collection(db, "matriculas/"), {
            data,
            createdAt: new Date(),
            completed: false,
        });
        setMatriculas();
        setIsSubmitting(false)
        navigate('/')

    };




    const backButton = () => {
        if (formStep >= 0 && formStep <= 5) {
            setFormStep(curr => curr - 1)
        }
    }

    return (
        <div className="container">
            <form onSubmit={formStep === 5 ? handleSubmit(handleSubmit) : handleSubmit(completeFormStep)}>
                {formStep === 0 &&
                    (
                        <div className='row mt-5'>
                            <div className='col'>
                                <img src={transition1} alt=""></img>
                                <img src={FooterPic1} style={{height:'250px'}} alt=""></img>
                            </div>
                            <div className='col'>
                                <h1>¿En qué te quieres especializar?</h1>
                                <section>
                                    <label htmlFor="form-select" className="form-select1 mt-5">Select list (select one):</label>
                                    <select
                                        className="form-select bg-light"
                                        aria-label="Default select example"
                                        {...register('rama')}
                                        error={backErrors?.rama || errors.rama?.message}
                                    >
                                        <option >ej.: Ciencias Sociales </option>
                                        {getRama().map((option) => (
                                            <option key={option.value}
                                                value={option.value}>
                                                {option.value}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="form-select" className="form-select2 mt-5">Select list (select one):</label>
                                    <select
                                        className="form-select bg-light "
                                        aria-label="Default select example"
                                        {...register('provinciaEstudio')}
                                        error={backErrors?.provinciaEstudio || errors.provinciaEstudio?.message}
                                    >
                                        <option >ej.: Madrid </option>
                                        {getProvinciaEstudio().map((option) => (
                                            <option key={option.value}
                                                value={option.value}>
                                                {option.value}
                                            </option>
                                        ))}
                                    </select>
                                <div className='mt-5'>
                                    <InputComponent
                                        label="¿Has sido alumni?"
                                        id="alumni"
                                        register={register}
                                        error={backErrors?.alumni || errors.alumni?.message}
                                        type="alumni"
                                        name="alumni"
                                    />
                                    </div>
                                    <button

                                        className="btn-primary btn mt-4 mb-4"
                                        onClick={completeFormStep}
                                        type="submit"
                                    >
                                        Siguiente</button>
                                </section>
                            </div>
                        </div>)}
                {formStep === 1 &&
                    (<div className='row mt-5'>
                        <div className='col'>
                            <img className='mb-5'src={transition2}alt=""></img>
                            <img src={FooterPic2} style={{height:'250px'}} alt=""></img>
                        </div>
                        <div className='col'>
                            <h1> Elige el horario y modalidad que más te acomode</h1>
                            <section>
                                <div className='mt-5'>
                                <InputComponent
                                    label="Modalidad *"
                                    id="modalidad"
                                    register={register}
                                    error={backErrors?.modalidad || errors.modalidad?.message}
                                    type="modalidad"
                                    name="modalidad"
                                />
                                </div>
                                <div className='mt-5'>
                                <InputComponent
                                    label="Horario *"
                                    id="horario"
                                    register={register}
                                    error={backErrors?.horario || errors.horario?.message}
                                    name="horario"
                                />
                                </div>
                                <a
                                    className="mt-5 mb-4 me-4 text-light"
                                    onClick={backButton}
                                    type="button"
                                >
                                    Atrás</a>
                                <button
                                    className="btn-primary mx-3 btn mt-4 mb-4"
                                    onClick={completeFormStep}
                                    type="submit"
                                >
                                    Siguiente</button>

                            </section>
                        </div>
                    </div>)}
                {formStep === 2 &&
                    (<div className='row mt-5'>
                        <div className='col'>
                            <img src={transition3} className='mb-4' alt=""></img>
                            <img src={FooterPic3} style={{height:'250px'}} alt=""></img>
                        </div>
                        <div className='col'>
                            <h1> Seleccione tu la tarifa</h1>
                            <section>
                                <div className='mt-5'>
                                <InputComponent
                                    label="Tarifa *"
                                    id="tarifa"
                                    register={register}
                                    error={backErrors?.tarifa || errors.tarifa?.message}
                                    name="tarifa"
                                />
                                </div>
                                <a
                                    className="mt-5 mb-4 me-4 text-light"
                                    onClick={backButton}
                                    type="button"
                                >
                                    Atrás</a>
                                <button
                                    className="btn-primary btn mt-4 mb-4"
                                    onClick={completeFormStep}
                                    type="submit"
                                >
                                    Siguiente</button>

                            </section>
                        </div>
                    </div>)}
                {formStep === 3 &&
                    (<div className='row mt-4'>
                        <div className='col'>
                            <img src={transition4} className='mb-5' alt=""></img>
                            <img src={FooterPic4} style={{height:'250px'}} alt=""></img>
                        </div>
                        <div className='col'>
                            <h1> Elige el horario y modalidad que más te acomode</h1>
                            <section>
                                <InputComponent
                                    label="Nombre Completo *"
                                    id="contactName"
                                    register={register}
                                    error={backErrors?.contactName || errors.contactName?.message}
                                    name="contactName"
                                />
                                <InputComponent
                                    label="Email *"
                                    id="email"
                                    register={register}
                                    error={backErrors?.email || errors.email?.message}
                                    type="email"
                                    name="email"
                                />
                                <InputComponent
                                    label="NIF/NIE *"
                                    id="nifOrNie"
                                    register={register}
                                    error={backErrors?.nifOrNie || errors.nifOrNie?.message}
                                    type="nifOrNie"
                                    name="nifOrNie"
                                />
                                <InputComponent
                                    label="Teléfono móvil *"
                                    id="phoneNumber"
                                    register={register}
                                    error={backErrors?.phoneNumber || errors.phoneNumber?.message}
                                    name="phoneNumber"
                                />
                                <a
                                    className="mt-4 mb-4 me-4 text-light"
                                    onClick={backButton}
                                    type="button"
                                >
                                    Atrás</a>
                                <button
                                    className="btn-primary btn mt-4 mb-4"
                                    onClick={completeFormStep}
                                    type="submit"
                                >
                                    Siguiente</button>

                            </section>
                        </div>
                    </div>)}
                {formStep === 4 &&
                    (<div className='row mt-4'>
                        <div className='col'>
                            <img src={transition5} className='mb-5' alt=""></img>
                            <img src={FooterPic5} style={{height:'250px'}} alt=""></img>
                        </div>
                        <div className='col'>
                            <h1> Elige el horario y modalidad que más te acomode</h1>
                            <section>
                                <InputComponent
                                    label="Calle *"
                                    id="street"
                                    register={register}
                                    name="address.street"
                                    error={backErrors?.address?.street || errors.address?.street?.message}
                                />
                                <InputComponent
                                    label="Localidad *"
                                    id="city"
                                    register={register}
                                    name="address.city"
                                    error={backErrors?.address?.city || errors.address?.city?.message}
                                />
                                <InputComponent
                                    label="Ciudad *"
                                    id="state"
                                    register={register}
                                    name="address.state"
                                    error={backErrors?.address?.state || errors.address?.state?.message}
                                />
                                <InputComponent
                                    label="Código Postal *"
                                    id="zipCode"
                                    register={register}
                                    name="address.zipCode"
                                    error={backErrors?.address?.zipCode || errors.address?.zipCode?.message}
                                />
                                <a
                                    className="mt-4 mb-4 me-4 text-light"
                                    onClick={backButton}
                                    type="button"
                                >
                                    Atrás</a>
                                <button
                                    className="btn-primary btn mt-4 mb-4"
                                    onClick={completeFormStep}
                                    type="submit"
                                >
                                    Siguiente</button>

                            </section>
                        </div>
                    </div>)}
                {formStep === 5 &&
                    (<div className='row mt-5'>
                        <div className='col'>
                            <img src={transition6} className='mb-5' alt=""></img>
                            <img src={FooterPic6} style={{height:'250px'}} alt=""></img>
                        </div>
                        <div className='col'>
                            <h1> Forma de Pago</h1>
                            <section>
                                <InputComponent
                                    label="¿Cómo prefieres abonar tu primer pago?"
                                    id="pago"
                                    register={register}
                                    name="pago"
                                    error={backErrors?.pago || errors.pago?.message}
                                />
                                <InputComponent
                                    label="¿Vienes recomendado por alguien? *"
                                    id="recomendado"
                                    register={register}
                                    name="recomendado"
                                    error={backErrors?.recomendado || errors.recomendado?.message}
                                />

                                <a
                                    className="mt-4 mb-4 me-4 text-light"
                                    onClick={backButton}
                                    type="button"
                                >
                                    Atás </a>

                                <button onClick={handleSubmit(onSubmit)}
                                    className={`btn btn-${isSubmitting ? 'secondary' : 'primary'} mt-4 mb-4`}>{isSubmitting ? 'Enviando solicitud...' : 'Enviar'}
                                </button>
                            </section>
                        </div>
                    </div>)}
            </form>
        </div>
    )
}

export default RegisterMatricula