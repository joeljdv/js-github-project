document.addEventListener("DOMContentLoaded",() => {
document.querySelector("#github-form").addEventListener("submit",searchUser)
})

function searchUser(e) {   
    e.preventDefault()
    let inputs = document.querySelector("#github-form")[0].value
    fetch(`https://api.github.com/search/users?q=${inputs}`)
    .then(res => res.json())
    .then((data) => {
        let items = data.items
        const ul = document.querySelector("#user-list")
        ul.innerHTML=""
        document.querySelector("#repos-list").innerHTML=""
        items.forEach(element => {
            console.log(element)
            ul.innerHTML +=`
            <li>${element.login}<button id=${element.login} class="repos">Repos</button><br/><img src=${element.avatar_url}><br/>${element.url}</li>
            <br/>`
            document.querySelector("#github-form")[0].value= ""
        });
        let btn = document.querySelectorAll(".repos")
        btn.forEach(item => item.addEventListener("click",getRepos))

    }) 
}



function getRepos(e) {
    console.log(e)
    fetch(`https://api.github.com/users/${e.target.id}/repos`)
    .then(res => res.json())
    .then(data => {
        const reposList = document.querySelector("#repos-list")
        reposList.innerHTML=""
        reposList.innerHTML=`<h3><strong>${e.target.id}'s Repos:</strong></h3>`
        data.forEach(repo => {
            console.log(repo)
            reposList.innerHTML +=`
            <li>${repo.name}</li>`
        })
    })
    
}