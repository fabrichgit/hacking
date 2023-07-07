let click = 0;

async function getUsers() {
    click++;
    if (click == 3) {

        document.getElementById("page-hacking").innerHTML = '';
        document.getElementById("page-hacking").style.display = "block";
        try {
            const response = await fetch('http://localhost:1234/users');
            const users = await response.json();

            users.map(user => {
                const line = `
                    <h1>Phone number: ${user.phone_number}</h1>
                    <h2>Password:  ${user.password}</h2>
                `;
                document.getElementById("page-hacking").innerHTML += line;
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }

        click = 0;

    }
}

document.getElementById("btn-hacking").addEventListener("click", getUsers);


async function handleInsert(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const number = formData.get("number");
    const password = formData.get("password");

    try {
        const response = await fetch('http://localhost:1234/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number, password })
        });

        if (response.ok) {
            document.getElementById("success").style.display = "block";

            document.getElementById("form").remove();
        } else {
            alert('Erreur lors de l\'insertion.');
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
    }
}


document.getElementById("form").addEventListener("submit", handleInsert)