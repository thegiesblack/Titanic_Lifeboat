const data = require('./Manifest/Case1.json');

//init container for passenger and crew
var passEven = [];
var passOdd  = [];
var crewEven = [];
var crewOdd  = [];

//split passenger and crew data based on age
function convPass(data){
    for (var i in data){
        if (data[i].role == "passenger" && data[i].age%2 == 0){
            passEven.push(data[i]);
        }
        else if (data[i].role == "passenger" && data[i].age%2 != 0){
            passOdd.push(data[i]);
        }
    }
}

function convCrew(data){
    for (var i in data){
        if (data[i].role == "crew" && data[i].age%2 == 0){
            crewEven.push(data[i]);
        }
        else if (data[i].role == "crew" && data[i].age%2 != 0){
            crewOdd.push(data[i]);
        }
    }
}

convPass(data);
convCrew(data);

var boat     = 4;
var lifeboat = [];
for (var i = 0; i<boat;i++){
    var newArr = new Array();
    lifeboat.push(newArr);
}

var captain = {"name" : "Captain", "age" : 52};

//determine which lifeboat the captain will be put
captain.age % 2 == 0 ? lifeboat[1].push(captain.name) : lifeboat[0].push(captain.name);
goToLifeboat(passEven, passOdd, crewEven, crewOdd);

function goToLifeboat(passEven, passOdd, crewEven, crewOdd){
    //concate all odd and even data
    var allOdd = [];
    allOdd     = allOdd.concat(passOdd);
    allOdd     = allOdd.concat(crewOdd);

    var allEven = [];
    allEven     = allEven.concat(passEven);
    allEven     = allEven.concat(crewEven);

    //sort odd and even data based on age, and name alphabetically
    allEven = allEven.sort(function(a, b) {
      if (a.age > b.age) return 1;
      if (a.age < b.age) return -1;

      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    });

    allOdd = allOdd.sort(function(a, b) {
      if (a.age > b.age) return 1;
      if (a.age < b.age) return -1;

      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    });

    for (var i=0;i<boat;i++){
        var passengerMin        = 2;
        var passengerCounter    = 0;
        var personInBoat        = 0;
        var arrIndexToBeRemoved = [];

        var crewInBoat = 0;

        var howManyPersonLeft   = lifeboat[i][0] == "Captain" ? 7 : 8;
        var boatIsOddOrEven     = i%2==0 ? "odd" : "even";
        var arrOfPerson         = boatIsOddOrEven=="even" ? allEven : allOdd;
        for (var j=0; j<arrOfPerson.length; j++){
            if (boatIsOddOrEven == "odd"){
                if (arrOfPerson[j].role == "passenger"){
                    lifeboat[i].push(arrOfPerson[j].name);
                    passengerCounter++;
                    personInBoat++;
                    arrIndexToBeRemoved.push(j);
                }
                else if(arrOfPerson[j].role == "crew"){
                    if (passengerCounter < passengerMin+1 && personInBoat > 4){
                        continue;
                    } else {
                        lifeboat[i].push(arrOfPerson[j].name);
                        personInBoat++;
                        arrIndexToBeRemoved.push(j);
                    }
                }
                if(howManyPersonLeft == j+1){
                    break;
                }
            }
            else if (boatIsOddOrEven == "even"){
                if (arrOfPerson[j].role == "passenger"){
                    lifeboat[i].push(arrOfPerson[j].name);
                    passengerCounter++;
                    personInBoat++;
                    arrIndexToBeRemoved.push(j);
                }
                else if(arrOfPerson[j].role == "crew"){
                    if (passengerCounter < passengerMin+1 && personInBoat > 4){
                        continue;
                    } else {
                        lifeboat[i].push(arrOfPerson[j].name);
                        personInBoat++;
                        arrIndexToBeRemoved.push(j);
                    }
                }
                if(howManyPersonLeft == j+1){
                    break;
                }
            }
        }
        if (boatIsOddOrEven == "odd"){
            var deleted=0;
            for (var x = 0; x<arrIndexToBeRemoved.length; x++){
                allOdd.splice(arrIndexToBeRemoved[x]-deleted, 1);
                deleted++;
            }
        }
        else if (boatIsOddOrEven == "even"){
            var deleted=0;
            for (var x = 0; x<arrIndexToBeRemoved.length; x++){
                allEven.splice(arrIndexToBeRemoved[x]-deleted, 1);
                deleted++;
            }
        }
    }

    console.log("Final Output : ");
    console.log(JSON.stringify(lifeboat));
}
