import './Register.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../components/InputComponent'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react"
import db from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import LeftSide from '../components/LeftSide';


const schema1 = yup.object({
    rama: yup.string().required('rama is a required field'),
    alumni: yup.string().required('Please selec one option'),
    provinciaEstudio: yup.string().required('Password is a required field')
}).required()

const schemaHor = yup.object({
    modalidad: yup.string(),
    horario: yup.string().required('Nif is a required field')
}).required()

const schemaTar = yup.object({
    tarifa: yup.string()
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
        city: yup.string().required('State is a required field'),
        zipCode: yup.string().required('Zip code is a required field').matches(/^\d{5}(?:[- ]?\d{4})?$/, 'Invalid zipcode form'),
        state: yup.string().required('City is a required field'),
    }).required(),
}).required()

const schema4 = yup.object({
    pago: yup.string(),
    recomendado: yup.string().required('Nif is a required field')
}).required()





const RegisterMatricula = () => {

    const schemas = [schema1, schemaHor, schemaTar, schema2, schema3, schema4 ];
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
       console.log(data);
        await addDoc(collection(db, "matriculas/"), {
          data,
          createdAt: new Date(),
          completed: false,
        });
        setMatriculas();
        navigate('/')
      };


    // const onSubmit = data => {
    //     setBackErrors({})
    //     setIsSubmitting(true)

    //     console.log(data);
    //     // registerRequest(data)
    //     //     .then((matricula) => {
    //     //         navigate('/')
    //     //     })
    //     //     .catch(err => {
    //     //         setBackErrors(err?.response?.data?.errors)
    //     //     })
    //     //     .finally(() => {
    //     //         setIsSubmitting(false)
    //     //     })
    // };




    const backButton = () => {
        if (formStep >= 0 && formStep <= 5) {
            setFormStep(curr => curr - 1)
        }
    }

    return (
        <div className="container">
            <div className='col'>
                {/* <LeftSide></LeftSide> */}
                <hr></hr>
                <form onSubmit={formStep === 5 ? handleSubmit(handleSubmit) : handleSubmit(completeFormStep)}>
                    {formStep === 0 &&
                        (<div className='formOne'>
                            <h1>¿En qué te quieres especializar?</h1>
                            <section>
                                <label htmlFor="form-select" className="form-select1">Select list (select one):</label>
                                <select
                                    className="form-select bg-light mt-4"
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

                                <InputComponent
                                    label="¿Has sido alumni?"
                                    id="alumni"
                                    register={register}
                                    error={backErrors?.alumni || errors.alumni?.message}
                                    type="alumni"
                                    name="alumni"
                                />
                                <label htmlFor="form-select" className="form-select2">Select list (select one):</label>
                                <select
                                    className="form-select bg-light mt-4"
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

                                <button

                                    className="btn-primary btn mt-4 mb-4"
                                    onClick={completeFormStep}
                                    type="submit"
                                >
                                    Siguiente</button>
                            </section>
                        </div>)}
                    {formStep === 1 &&
                        (<div className='formTwo'>
                            <h1> Elige el horario y modalidad que más te acomode</h1>
                            <section>
                                <InputComponent
                                    label="Modalidad *"
                                    id="modalidad"
                                    register={register}
                                    error={backErrors?.modalidad || errors.modalidad?.message}
                                    type="modalidad"
                                    name="modalidad"
                                />
                                <InputComponent
                                    label="Horario *"
                                    id="horario"
                                    register={register}
                                    error={backErrors?.horario || errors.horario?.message}
                                    name="horario"
                                />
                                <a
                                    className="mt-4 mb-4 me-4"
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
                        </div>)}
                    {formStep === 2 &&
                        (<div className='formTree'>
                            <h1> Seleccione tu la tarifa</h1>
                            <section>
                                <InputComponent
                                    label="Tarifa *"
                                    id="tarifa"
                                    register={register}
                                    error={backErrors?.tarifa || errors.tarifa?.message}
                                    name="tarifa"
                                />
                                <a
                                    className="mt-4 mb-4 me-4"
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
                        </div>)}
                    {formStep === 3 &&
                        (<div className='formFour'>
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
                                    className="mt-4 mb-4 me-4"
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
                        </div>)}
                    {formStep === 4 &&
                        (<div className='formFive'>
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
                                    className="mt-4 mb-4 me-4"
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
                        </div>)}
                    {formStep === 5 &&
                        (<div className='formSix'>
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
                       
                            <button
                                className="btn-primary btn mt-4 mb-4 me-4"
                                onClick={backButton}
                                type="button"
                            >
                                Atás </button>
                            <button onClick={handleSubmit(onSubmit)}
                                className={`btn btn-${isSubmitting ? 'secondary' : 'warning'} rounded-pill mt-4 mb-4`}>{isSubmitting ? 'Creating vehicle...' : 'Submit'}
                            </button>
                        </section>
                        </div>)}
                </form>
            </div>
        </div>
    )
}

export default RegisterMatricula