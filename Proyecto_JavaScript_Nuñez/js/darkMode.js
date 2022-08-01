let darkMode = "dark"

localStorage.setItem("darkMode", darkMode)

$(()=>{
    
    $("#darkMode").click(()=>{
        const result = localStorage.getItem("darkMode");
        if(result === "light"){
    
            darkMode = "dark";
            localStorage.setItem("darkMode", darkMode)
            // verifica si existe la clase darkMode en body
            const existClass = $( "body" ).hasClass( "darkMode")
            if(existClass){
                $("body").removeClass("darkMode")
                $("#darkMode").addClass("far fa-moon")
            }
            
        }
        if(result === "dark"){
            $("body").addClass("darkMode");
            darkMode = "light";
            // guarda la config
            localStorage.setItem("darkMode", darkMode)
            $("#darkMode").addClass("far fa-sun")
        }
    })

   
})