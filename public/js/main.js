document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const crewName = document.querySelector('input').value
    try{
        const response = await fetch(`https://bridge-crew-api.herokuapp.com/api/${crewName}`)
        const data = await response.json()

        console.log(data)
        document.querySelector('h2').innerText = data.name
    }catch(error){
        console.log(error)
    }
}