// =====================================
// BANQUE AGRICOLE BNP
// SCRIPT CLIENT
// =====================================


let currentBalance = 7585024.00;

let savings1 = 125400.00;
let savings2 = 48250.00;

let selectedTransferType = "immediat";


// PROFIL CLIENT

let userProfile = {

    name: "Edmond Garnier",

    email: "client@banque-agricole-bnp.fr",

    phone: "+33 6 12 34 56 78",

    address: "12 Boulevard Haussmann, 75009 Paris"

};



// HISTORIQUE

const titlesIn = [

    "Virement reçu",

    "Versement Agricole",

    "Revenus financiers",

    "Dividendes",

    "Remboursement",

    "Crédit bancaire"

];


const titlesOut = [

    "Paiement fournisseur",

    "Prélèvement",

    "Achat professionnel",

    "Frais bancaire",

    "Virement sortant",

    "Assurance"

];


let transactions = [];




// GENERATION TRANSACTIONS

function generateTransactions(){

    let idCounter = 1000;


    const years = [2022,2023,2024,2025];


    years.forEach(year=>{


        for(let month=1; month<=12; month++){


            let day = Math.floor(Math.random()*25)+1;


            let date =

            `${day}/${month}/${year}`;



            let positive = Math.random()>0.4;



            let title = positive ?

            titlesIn[Math.floor(Math.random()*titlesIn.length)]

            :

            titlesOut[Math.floor(Math.random()*titlesOut.length)];



            let amount = positive ?

            Math.floor(Math.random()*80000)+5000

            :

            -(Math.floor(Math.random()*15000)+500);



            transactions.push({

                ref:`BNP-${year}-${idCounter++}`,

                title:title,

                amount:amount,

                date:date,

                reason:
                "Opération enregistrée Banque Agricole BNP",

                type:positive?"positive":"negative"

            });


        }

    });


    transactions.reverse();

}



generateTransactions();




// CONNEXION


function login(){


const userInput =
document.getElementById("username").value.trim();


const passInput =
document.getElementById("password").value;



if(

userInput==="450893127"

&&

passInput==="K9#pZ!m7$"

){


sessionStorage.setItem(

"isLoggedIn",

"true"

);


window.location.reload();


}

else{


alert(

"Identifiant ou code d'accès incorrect."

);


}


}




// DECONNEXION


function logout(){


sessionStorage.removeItem("isLoggedIn");


window.location.reload();


}
// =====================================
// NAVIGATION
// =====================================


function showSection(sectionId){


    document
    .querySelectorAll(".app-section")
    .forEach(section=>{

        section.classList.remove("active-section");

    });


    const target =
    document.getElementById(sectionId);


    if(target){

        target.classList.add("active-section");

    }


}





// =====================================
// MENU ESPACE CLIENT
// =====================================


function toggleQuickMenu(){


    const menu =
    document.getElementById("quick-menu-modal");


    if(menu.style.display==="flex"){

        menu.style.display="none";

    }

    else{

        menu.style.display="flex";

    }

}






// =====================================
// TYPE DE VIREMENT
// =====================================


function selectTransferType(type){


selectedTransferType = type;



document
.querySelectorAll(".type-btn")
.forEach(btn=>{

btn.classList.remove("active");

});



const selected =
document.getElementById(
"type-"+type
);



if(selected){

selected.classList.add("active");

}



const dateField =
document.getElementById(
"date-execution-field"
);



if(type==="differe"){

dateField.style.display="block";

}

else{

dateField.style.display="none";

}



}






// =====================================
// BENEFICIAIRE ENREGISTRE
// =====================================


function applySavedBeneficiary(){


const value =
document.getElementById(
"saved-beneficiary"
).value;



if(value){


const data=value.split("|");



document.getElementById(
"beneficiary"
).value=data[0];



document.getElementById(
"iban-input"
).value=data[1];



document.getElementById(
"reason-input"
).value=

"Virement vers "+data[2];


}


}







// =====================================
// CHECKBOX PARAMETRES
// =====================================


function toggleCheckbox(id){


const checkbox =
document.getElementById(id);



if(checkbox){

checkbox.checked =
!checkbox.checked;

}


}







// =====================================
// PROFIL CLIENT
// =====================================


function updateProfile(){


userProfile.phone =

document.getElementById(
"user-phone-input"
).value;



userProfile.address =

document.getElementById(
"user-address-input"
).value;



alert(

"Vos informations ont été mises à jour avec succès."

);


}







// =====================================
// DETAILS COMPTE
// =====================================


function openAccountDetails(){


document.getElementById(
"account-modal"
).style.display="flex";


}



function closeAccountDetails(){


document.getElementById(
"account-modal"
).style.display="none";


}







// =====================================
// HISTORIQUE TRANSACTIONS
// =====================================


function renderTransactions(items){


const list =
document.getElementById(
"transactions-list"
);



list.innerHTML="";



items.forEach(tx=>{


const element =
document.createElement("div");



element.className=
"transaction-item";



element.innerHTML=`

<div class="tx-info">

<span class="tx-title">

${tx.title}

</span>


<span class="tx-date">

${tx.date} • ${tx.ref}

</span>


</div>


<span class="tx-amount ${tx.type}">

${tx.amount > 0 ? "+" : ""}

${tx.amount.toLocaleString(
"fr-FR",
{
style:"currency",
currency:"EUR"
}
)}

</span>

`;



list.appendChild(element);



});


}




function filterTransactions(){


const query =

document.getElementById(
"search-input"
).value.toLowerCase();



const type =

document.getElementById(
"filter-type"
).value;



const filtered =

transactions.filter(tx=>{


let matchText =

tx.title.toLowerCase()
.includes(query)

||

tx.date.includes(query)

||

tx.ref.toLowerCase()
.includes(query);



let matchType =

type==="all"

||

tx.type===type;



return matchText && matchType;



});



renderTransactions(filtered);


}
// =====================================
// VIREMENT
// =====================================


function startTransferAnimation(){


const beneficiary =

document.getElementById(
"beneficiary"
).value.trim();



const iban =

document.getElementById(
"iban-input"
).value.trim();



const amount =

parseFloat(

document.getElementById(
"amount-input"
).value

);



const reason =

document.getElementById(
"reason-input"
).value.trim();




if(
!beneficiary ||
!iban ||
isNaN(amount) ||
amount<=0 ||
!reason
){

alert(
"Veuillez compléter tous les champs."
);

return;

}



if(amount > currentBalance){


alert(
"Solde insuffisant."
);

return;


}




document.getElementById(
"form-container"
).style.display="none";



document.getElementById(
"loader-container"
).style.display="block";



let progress=0;



let timer=setInterval(()=>{


progress+=20;



document.getElementById(
"progress-bar-fill"
).style.width=

progress+"%";



document.getElementById(
"progress-text"
).innerText=

progress+"%";



if(progress>=100){



clearInterval(timer);



currentBalance-=amount;



document.getElementById(
"balance"
).innerText=

currentBalance.toLocaleString(
"fr-FR",
{
style:"currency",
currency:"EUR"
}
);



transactions.unshift({

ref:
"BNP-"+Date.now(),

title:
"Virement effectué vers "+beneficiary,

amount:-amount,

date:
"27/07/2026",

reason:reason,

type:"negative"

});



alert(
"Virement exécuté avec succès."
);



document.getElementById(
"loader-container"
).style.display="none";



document.getElementById(
"form-container"
).style.display="block";



showSection(
"home-section"
);



}



},300);


}






// =====================================
// EPARGNE
// =====================================


function updateTotalSavings(){


const total =
savings1+savings2;



document.getElementById(
"total-savings-balance"
).innerText=

total.toLocaleString(
"fr-FR",
{
style:"currency",
currency:"EUR"
}
);


}





function depositSavings(id){


let amount =
parseFloat(
prompt(
"Montant à déposer :"
)
);



if(
isNaN(amount)
||
amount<=0
){

return;

}



if(amount>currentBalance){

alert(
"Solde principal insuffisant."
);

return;

}



currentBalance-=amount;



if(id===1){

savings1+=amount;

}

else{

savings2+=amount;

}



document.getElementById(
"balance"
).innerText=

currentBalance.toLocaleString(
"fr-FR",
{
style:"currency",
currency:"EUR"
}
);



updateTotalSavings();



alert(
"Versement épargne effectué."
);


}






function withdrawSavings(id){


let amount =
parseFloat(
prompt(
"Montant à retirer :"
)
);



let target =
id===1 ? savings1 : savings2;



if(
isNaN(amount)
||
amount<=0
||
amount>target
){

alert(
"Montant impossible."
);

return;

}



currentBalance+=amount;



if(id===1){

savings1-=amount;

}

else{

savings2-=amount;

}



updateTotalSavings();


alert(
"Fonds transférés sur votre compte."
);


}







// =====================================
// SERVICES BANCAIRES
// =====================================


function openEdocuments(){


alert(

"DOCUMENTS BANCAIRES NUMÉRIQUES\n\n"+
"- Relevé Juillet 2026\n"+
"- Relevé Annuel 2025\n"+
"- Historique des opérations"

);


}





function openMessaging(){


alert(

"MESSAGERIE SÉCURISÉE\n\n"+
"Votre conseiller Banque Agricole BNP est disponible."

);


}





function tempLockCard(){


alert(

"Votre carte est temporairement verrouillée."

);


}





function oppositionCard(){


alert(

"Opposition carte enregistrée."

);


}





function showPinCode(){


alert(

"Votre code PIN est confidentiel. Ne le communiquez jamais."

);


}





function changePasswordModal(){


alert(

"Modification du code d'accès sécurisée."

);


}





function view