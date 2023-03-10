import { useNavigate, Form, useActionData } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

//useNavigate para paginadores o volver atras en una pagina
export async function action({request}){
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  const email = formData.get('email')
  const errores = []
  if (Object.values(datos).includes('')) {
    errores.push('Todos los datos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if (!regex.test(email)) {
    errores.push('el email no es valido')
  }

  if (Object.keys(errores).length) {
      return errores
  }
}

const NuevoCliente = () => {

  const errores = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-800'>Nuevo Cliente</h1>
      <p className='mt-3'>LLenatodos los campos para registrar un nuevo cliente</p>
    
      <div className="flex justify-end">
        <button onClick={() => navigate('/')} className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">Volver</button>
      </div>
    
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-14">
        
        {errores?.length && errores.map( (error,i) => <Error key={i}>{error}</Error> )}

        <Form method="post">
          <Formulario/>
          <input 
            type="submit" 
            className="mt-5 w-full bg-blue-800 p-3 uppercase font.bold text-white text-lg" 
            value='Registrar Cliente'
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente