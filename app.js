// New Additions to this app
// Get data from JSON or in other words, array of objects
// Add Lives
// Randomize background images positions

const cardData = [
    {
        imgSrc: "./kobe.jpg",
        name: "kobePic"
    },

    {
        imgSrc: "./pak.jpg",
        name: "pakPic"
    },
    {
        imgSrc: "./kobe.jpg",
        name: "kobePic"
    },
    {
        imgSrc: "./leb.jpg",
        name: "lebPic"
    },
    {
        imgSrc: "./leb.jpg",
        name: "lebPic"
    },
    {
        imgSrc: "./pak.jpg",
        name: "pakPic"
    },
    {
        imgSrc: "./can.jpg",
        name: "canPic"
    },
    {
        imgSrc: "./montain.jpg",
        name: "montainPic"
    },
    {
        imgSrc: "./can.jpg",
        name: "canPic"
    },
    {
        imgSrc: "./montain.jpg",
        name: "montainPic"
    },
    {
        imgSrc: "./mario.jpg",
        name: "marioPic"
    },
    {
        imgSrc: "./raps.png",
        name: "rapsPIc"
    },
    {
        imgSrc: "./mushrrom.png",
        name: "mushroomPic"
    },
    {
        imgSrc: "./mario.jpg",
        name: "marioPic"
    },
    {
        imgSrc: "./raps.png",
        name: "rapsPic"
    },
    {
        imgSrc: "./mushrrom.png",
        name: "mushroomPic"
    }
]


let timesClicked = 0;
let arr = [];
let lives = 6;
const getLives = document.querySelector('.lives');
getLives.innerText = lives;
const grid = document.querySelector('.grid');
let groups;
document.addEventListener("DOMContentLoaded", () => {
    groups = document.querySelectorAll('.group');
});
const flex = document.querySelector('.flex');
const body = document.querySelector('body');
let matches = 0;

const randomize = () => {
    // Sorts the array of objects in random format
    const allCards = cardData;
    allCards.sort(() => Math.random() - 0.5);
    return allCards;
}

const cardGenerator = () => {
    // Go through the sorted items and add them to the DOM
    const getCards = randomize();

    getCards.forEach((eachCard) => {

        // Group Memory Card Parent Created
        let groupDiv = document.createElement('div');
        groupDiv.className = 'group';

        // Card div
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute("id", "card");


        // img tag
        let imgTag = document.createElement('img');
        imgTag.setAttribute("src", eachCard.imgSrc);
        imgTag.classList.add('imgz');

        // Add img and card inside .group div
        groupDiv.append(cardDiv);
        groupDiv.append(imgTag);
        grid.append(groupDiv);

        // To get the item thats being generated using JS
        // just add an event listener inside the function its being generated in
        groupDiv.addEventListener('click', () => {
            groupDiv.firstElementChild.classList.toggle("turn");
            groupDiv.lastElementChild.classList.toggle("turn");
            turnCards(groupDiv);
        })

    })
}


cardGenerator(); // runs initially


// Functions
const turnCards = (group) => {
    arr.push(group.lastElementChild.src);
    timesClicked++;

    // Right when group div is clicked, make sure it is unclickable for 2 seconds
    if (checkOdd) {
        group.style.pointerEvents = 'none';
    }

    // Get image src
    if (checkEven(timesClicked)) {
        checkImgz(group, arr);
    }
}

const checkImgz = (group, arrayz) => {

    if (arrayz[0] === arrayz[1]) {
        matches++;
        console.log(matches);

        groups.forEach((each) => {
            if (each.lastElementChild.src === arr[0] || each.lastElementChild.src === arr[1]) {
                console.log(each.lastElementChild.src);
                each.style.pointerEvents = "none";
                each.classList.add('winner');
                each.firstElementChild.style.border = '2px solid lightgreen';
                each.lastElementChild.style.border = '2px solid lightgreen';
            }
            else {
                if (matches == 8) {
                    each.style.pointerEvents = "none";
                }
                else {
                    each.style.pointerEvents = "none";
                    setTimeout(() => {
                        groups.forEach((nextEach) => {
                            if (nextEach.classList.contains('winner')) {
                                nextEach.style.pointerEvents = "none";
                            }
                            else {
                                nextEach.style.pointerEvents = "auto";
                            }
                        })
                    }, 2000);
                }
            }

        });

        arr = [];
    }
    else {
        lives--;
        console.log(lives);
        getLives.innerText = lives;

        //   Case Statement
        // Checks how many lives are left and removes 1 accordingly
        switch (lives) {
            case 5:
                flex.children[5].style.display = 'none';
                break;
            case 4:
                flex.children[4].style.display = 'none';
                break;
            case 3:
                flex.children[3].style.display = 'none';
                document.querySelector('header p').style.color = 'red';
                body.style.backgroundColor = 'pink';
                break;
            case 2:
                flex.children[2].style.display = 'none';
                body.style.backgroundColor = '#e63e62';
                document.querySelector('header p').style.color = 'white';
                break;
            case 1:
                flex.children[1].style.display = 'none';
                body.style.backgroundColor = '#d70040';
                break;
            case 0:
                flex.children[0].style.display = 'none';
                break;
        }

        // If the user loses, rotate items again and tell user to try again
        groups.forEach((each) => {
            const card = each.firstElementChild.classList;
            const img = each.lastElementChild.classList;


            if (each.lastElementChild.src === arr[0] || each.lastElementChild.src === arr[1]) {
                // Since when the user was not getting 2 cards correct, they were still able to click them
                // so we will add "none" pointer event for 1 second and then remove it
                if (lives !== 0) {
                    each.style.pointerEvents = "none";

                    setTimeout(() => {
                        each.style.pointerEvents = "auto";
                    }, 2000);
                }

                setTimeout(() => {
                    card.remove('turn');
                    img.remove('turn');
                }, 1000);
            }
            else {
                if (lives == 0) {
                    each.style.pointerEvents = "none";
                }
                else {
                    each.style.pointerEvents = "none";
                    setTimeout(() => {
                        each.style.pointerEvents = "auto";
                    }, 2000);
                }
            }
        });

    }
    arr = [];

    endTheGame();
}

const checkEven = (num) => {
    return (num % 2) == 0;
}

const checkOdd = (num) => {
    return num % 2;
}


const endTheGame = () => {
    if (lives == 0) {
        groups.forEach((each) => {
            console.log(each);
            each.style.pointerEvents = 'none';
        });
        alert('You are out of lives. Game will restart in 5 seconds!');
        body.style.backgroundColor = 'red';
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
    else if (matches === 8) {
        alert('You have won! Game will restart in 5 seconds!');
        body.style.backgroundColor = 'lightgreen';
        setTimeout(() => {
            location.reload();
        }, 5000);
    }

}
