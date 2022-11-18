// function getUsers(){

//     let request = new XMLHttpRequest ();
//  request.addEventListener("load",function ()    {
//     let answerText = this.responseText;
//     let answerJs = JSON.parse(answerText);
    
//     let ul = document.createElement('ul');

//     answerJs.data.forEach(element => {
//         let li = document.createElement('li');
//         li.textContent = `${element.first_name} ${element.last_name}`;
//         ul.appendChild(li);
//     });
//     document.getElementById('userinfo').appendChild(ul);
    
// });

// request.open("GET", "https://reqres.in/api/users?page=2");
// request.send();
// }


// getUsers();


let currentPages = 1;
let totalPages ;


function getUsersPages(currentPages) {
    fetch("https://reqres.in/api/users?page=" + currentPages, {
        method:"GET", 
    })
    .then(function(responseText){
        if (responseText.status !== 200) {
            throw responseText.status;
        }

        return responseText.json();
    })

    .then(function(responseJS){
        let ulList = document.createElement("ul");
        ulList.classList.add('ul-list');
        ulList.setAttribute('id','ul-list')
        const fragment =new DocumentFragment();

        responseJS.data.forEach(x => {
            let list = document.createElement('li');
            let image = document.createElement('img');
            image.src = x.avatar;
            ulList.appendChild(image);

            list.textContent = `${x.first_name} ${x.last_name}`;
            fragment.appendChild(list);
        })
        ulList.appendChild(fragment);
        document.getElementById("userinfomation").innerHTML="";
        document.getElementById("userinfomation").appendChild(fragment);
        document.getElementById("userinfomation").appendChild(ulList);
        totalPages = responseJS.total_pages;
    })
    
    .catch(function(error){
        if(error == 404){
            let paragraph =document.createElement('p') ;
            paragraph.textContent='Page not Found!';

            document.getElementById('userinfo').appendChild(paragraph);
        }
        if (error == 505) {
            let paragraph =document.createElement('p') ;
            paragraph.textContent='Page not Found!';

            document.getElementById('userinfo').appendChild(paragraph);
        }


    });
}

document.getElementById('next').addEventListener('click', function(){
    
    if (currentPages == totalPages) {
        return;
   }
    currentPages+=1;
    getUsersPages(currentPages);
});

document.getElementById('previous').addEventListener('click' , function(){
    if (currentPages == 1) {
        return;
    }
    currentPages-=1;
    getUsersPages(currentPages);
})

getUsersPages(currentPages);

