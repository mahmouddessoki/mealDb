
var categoery="Beef"
var allcats=[];
var allMeals=[]

// as we have more than one http task we do the following
//ajax way before ECMS 6
/*
function getHttpResponse(url,func)
{
    var http= new XMLHttpRequest();
    http.open("GET", url)
    http.send()
    http.addEventListener("readystatechange",function(){
    if(http.status == 200 && http.readyState == 4)
    {
        
        func(this)
    }
})  
}*/
//ajax way after ECMS 6
async function getHttpResponse(url,callBack)
{
    let result = await fetch(url)
    let myData = await result.json();
    callBack(myData)
}


function displayMeals(http)
{
    allMeals = http.meals;
    $("#demo").empty()
    for(var i=0 ; i < allMeals.length ;i++)
    {

        let myDiv = document.createElement("div");
        myDiv.classList.add("col-lg-3");
        myDiv.classList.add("col-md-4")
        document.getElementById("demo").appendChild(myDiv)
        var myItem = document.createElement("div");
        myItem.classList.add("item")
        myItem.setAttribute("data-toggle","modal")
        myItem.setAttribute("data-target","#staticBackdrop")
        myDiv.appendChild(myItem);
        let mealImg = document.createElement("img")
        let mealName = document.createElement("p")
        mealName.innerText = allMeals[i].strMeal
        mealImg.setAttribute("src",allMeals[i].strMealThumb)
        mealImg.classList.add("img-fluid")
        myItem.appendChild(mealImg);
        myItem.appendChild(mealName)
    }



}

function concatToNav(http)
{
    var allcats=http.categories;
    var hasalah=``;

    for(let i=0;i<10;i++)
    {

        if(i==0)
        {
            hasalah+=
            `
                <li class="nav-item">
                <a class="nav-link" href="#">`+allcats[i].strCategory+`</a>
                </li>
            ` 
        }

        else
        {
            hasalah+=
            `
            <li class="nav-item">
            <a class="nav-link" href="#">`+allcats[i].strCategory+`</a>
            </li>
            `
        }
        
    }

    
        document.getElementById("demo2").innerHTML=hasalah;
}
//as the links is dynamically created we do event on the document


 $('body').on('click', 'a', function(e) {
    categoery=e.target.text;
    if(e.target.text === "Restaurant")
    {
        categoery = "Beef";
    }
    getHttpResponse("https://www.themealdb.com/api/json/v1/1/filter.php?c="+categoery,displayMeals)
  
});




/**get meal details */

async function getMealDetails(mealName)
{
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    let result = await data.json()
    details = result.meals;
    return details;
}
let mealImg = document.createElement("img")
let mealInstructions = document.createElement("p")
async function getModal(mealName)
{
    let D =await getMealDetails(mealName);
    console.log(D)
    $(".modal-title").text(D[0].strMeal + " - " + D[0].strArea + " Meal");
   
    mealImg.setAttribute("src",D[0].strMealThumb)
    mealImg.classList.add("w-50");
   
    
    mealInstructions.classList.add("text-left","px-5","py-5")
    mealInstructions.innerText = D[0].strInstructions;
    $(".modal-body").empty()
    $(".modal-body").append(mealImg)
    $(".modal-body").append(mealInstructions)

}

 $('body').on('click', 'div.item', function(e) {
     let MealName = $(e.target).parent().find("p").text()
    getModal(MealName)
   
});

getHttpResponse("https://www.themealdb.com/api/json/v1/1/filter.php?c="+categoery,displayMeals)

getHttpResponse("https://www.themealdb.com/api/json/v1/1/categories.php",concatToNav)













