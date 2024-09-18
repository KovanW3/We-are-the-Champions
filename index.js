import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"
import { getDatabase, ref, onValue, push, remove, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"

const endorsementEl = document.getElementById("endorsement-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const listEl = document.getElementById("list-el")
const publishBtn = document.getElementById("publish-btn")

const appSettings = {
    databaseURL : "https://we-are-the-champions-ac0f9-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

let app = initializeApp(appSettings)
let database = getDatabase(app)
let championsInDB = ref( database, "Champions")
let fromInDB = ref( database, "Champions/From")
let toInDB = ref( database, "Champions/To")
let endorsementInDB = ref( database, "Champions/Endorsement")
let likesInDB = ref( database, "Champions/Likes")

onValue( championsInDB, function(snapshot) {

    if (snapshot.exists()) {
        listEl.innerHTML = ""
        let championsFromDB = Object.entries(snapshot.val())
        let endorsementsFromDB = Object.values(championsFromDB[0][1])
        let fromsFromDB = Object.values(championsFromDB[1][1])
        let tosFromDB = Object.values(championsFromDB[3][1])
        
        
        for (let i = 0; i < endorsementsFromDB.length; i++) {

            let likesFromDB = Object.values(championsFromDB[2][1])
            let likesIDs = Object.keys(championsFromDB[2][1])
                    
            let endorsementList = document.createElement("li")
            endorsementList.innerHTML = `<h4 class="to-class">To ${tosFromDB[i]}</h4>
                            <h5>${endorsementsFromDB[i]}</h5>`
                      
            listEl.append(endorsementList)
            
            let thirdLineContainer = document.createElement("div")
            thirdLineContainer.className = "third-line-container"
            
            let fromText = document.createElement("h4")
            fromText.textContent = `From ${fromsFromDB[i]}`
            fromText.className = "from-class"
               
            let likeButtonContainer = document.createElement("div")
            likeButtonContainer.className = "like-button-container"
                    
            let heartSymbol = document.createElement("h4")
            heartSymbol.className = "heart-symbol"
            heartSymbol.textContent = "🤍"

            let likesText = document.createElement("h4")
            likesText.textContent = `${likesFromDB[i]}`
            likesText.className = "likes-text"

            endorsementList.append(thirdLineContainer)
            thirdLineContainer.append(fromText)
            thirdLineContainer.append(likeButtonContainer)
            likeButtonContainer.append(heartSymbol)
            likeButtonContainer.append(likesText)
                    
            let likeKey = likesIDs[i] 
            let likesCount = likesFromDB[i]
                    
            heartSymbol.addEventListener("click", function() {

                let count = likesCount + 1
                update( likesInDB, {[likeKey]: count})
            })
          
        } 
    } else {

        listEl.innerHTML = "No Endorsements Yet"
    }
})

publishBtn.addEventListener("click", function() {

    let endorsementValue = endorsementEl.value
    let fromValue = fromEl.value
    let toValue = toEl.value
    push(endorsementInDB, endorsementValue)
    push(fromInDB, fromValue)
    push(toInDB, toValue)
    push(likesInDB, 0)

})


