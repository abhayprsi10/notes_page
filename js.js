const addtitle = document.getElementById('addtitle');
const addtext = document.getElementById('addtext');
const addnotebtn = document.getElementById('addbtn');
const notesdiv = document.getElementById('notes');
let notes = [];

const pdated = document.createElement("p");
const ptme = document.createElement("p");




function currentdate() {
    let date = new Date();
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let am_pm = "";

    if (hour >= 12) {
        if (hour > 12) hour -= 12;
        am_pm = "PM";
    } else {
        hour == 0;
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;

    pdated.innerHTML = `${month} ${day}, ${year}`;
    ptme.innerHTML = `${hour}:${min} ${am_pm}`;

    console.log(pdated.innerHTML);
    console.log(ptme.innerHTML);
}




shownotes();

function addnotes() {


    notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    }
    else {
        notes = JSON.parse(notes);
    }


    if (addtext.value == "") {
        alert('Add your note');
        return;
    }

    currentdate();


    const noteobj = {
        title: addtitle.value,
        text: addtext.value,
        time: ptme.innerHTML,
        date: pdated.innerHTML,
        fav: 'grey'
    }

    addtitle.value = '';
    addtext.value = '';


    notes.push(noteobj);

    localStorage.setItem('notes', JSON.stringify(notes));

    shownotes();

}


function shownotes() {
    notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    }
    else {
        notes = JSON.parse(notes);
    }


    let noteshtml = "";

    for (let i = 0; i < notes.length; ++i) {


        noteshtml += ` <div class="note">
                            <i class="fa-solid fa-delete-left deletebtn"  id=${i} onClick="deletenote(${i})"></i>
                            <i class="fa-solid fa-heart " style="color:${notes[i].fav}"  onClick="fav(this,${i})"></i>
                            <div class="title">${notes[i].title === "" ? "Note" : notes[i].title}</div>
                            <div class="text">${notes[i].text}</div> 
                            <p class="time">${notes[i].time}</p>
                            <p class="date">${notes[i].date}</p>
                        </div>`
    }

    notesdiv.innerHTML = noteshtml;

}


addnotebtn.addEventListener('click', addnotes);

function deletenote(index) {
    notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    }
    else {
        notes = JSON.parse(notes);
    }

    notes.splice(index, 1);

    localStorage.setItem('notes', JSON.stringify(notes));

    shownotes();
}

function fav(e, ind) {
    notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    }
    else {
        notes = JSON.parse(notes);
    }


    let curcol = e.style.color;

    if (curcol == 'orange') {
        e.style.color = 'grey';
        notes[ind].fav = 'grey';
    }
    else {
        e.style.color = 'orange';
        notes[ind].fav = 'orange';
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    shownotes();

}