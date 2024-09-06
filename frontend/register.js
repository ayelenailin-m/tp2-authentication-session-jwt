document.querySelector("#register-form").addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (!username || !password) {
        document.getElementById("message").innerText = "Por favor, completa todos los campos.";
        return
    }

    try {
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            credentials: "include", // Permite enviar las cookies de session
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        if (!response.ok) {
            divError.innerText= "Credenciales inválidas";
            divError.classList.add("bg-darger", "text-white", "text-center", "rounded", "p-2", "mt-3");

            setTimeout( () => {
                divError.hidden = true;
            }, 3500);
            return;
        } 
        const data = await response.json();
        console.log(data);

        window.location.href= "index.html";
    } catch (error) {
        console.error(error)
    }

});