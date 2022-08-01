let datos =[]

let btnRegistro = document.getElementById('registro')
let btnIngreso = document.getElementById('ingreso')

btnRegistro.addEventListener('click', ()=>{
    const usuarioRegistrado =document.getElementById('userRegis').value
    const contraseñaRegistrada = document.getElementById('passRegis').value
    const reContraseña =document.getElementById('rePassRegis').value
    const email = document.getElementById('email').value 
    
    validar(usuarioRegistrado, contraseñaRegistrada,reContraseña,email)
})

class Usuario{
    constructor(usuario,pass,email) {
        this.usuario=usuario
        this.pass=pass
        this.email=email
    }
}

function validar(usuarioRegistrado, contraseñaRegistrada,reContraseña,email){

        if(usuarioRegistrado == "" || contraseñaRegistrada == "" ||reContraseña == "" || email == ""){
            Toastify({
                text: "Los campos no deben estar vacios",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
    }
        else if(contraseñaRegistrada.length < 6){
            Toastify({
                text: "La contraseña debe ser mayor a 6 digitos",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
    }
        else if(contraseñaRegistrada != reContraseña){
            Toastify({
                text: "Las contraseñas no coinciden",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
    }
    else{
        datos.push(new Usuario(usuarioRegistrado,contraseñaRegistrada,email))

        localStorage.setItem('dato', JSON.stringify(datos))
        
        document.getElementById('userRegis').value = ""
        document.getElementById('passRegis').value= ""
        document.getElementById('rePassRegis').value= ""
        document.getElementById('email').value = ""

        document.getElementById('tab-2').checked = false
        document.getElementById('tab-1').checked = true
    }
}

btnIngreso.addEventListener('click',ingresar)


function ingresar(){
    const usuario =document.getElementById('user').value
    const contraseña = document.getElementById('pass').value
    let validacion = validarIngreso(usuario,contraseña)
    let recuperoLocalS= JSON.parse(localStorage.getItem('dato'))
   
    if(validacion){
        if((recuperoLocalS[0].usuario == usuario) && (recuperoLocalS[0].pass == contraseña)){
            document.getElementById('user').value = "";
            document.getElementById('pass').value="";
            window.location.href = "/tienda.html";
        }else{
            Toastify({
                text: "Contraseña Invalida",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} 
              }).showToast();
        }
    }else{
        Toastify({
            text: "Lo siento algo debe estar mal",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} 
          }).showToast();
    }
    
}

function validarIngreso(usuario,contraseña) {
    if(usuario == "" || contraseña == ""){
        return false
    }else{
        return true
    }
}


