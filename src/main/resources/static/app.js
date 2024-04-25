
$(function (){
    saveMovies();
});

function formatMovies(movie){

    let defaultValue = "Choose movie";

    let out = "<select id = 'selectedMovie' onchange='validateMovie(this.value)'>";
    out += "<option value ='default'>" + defaultValue + "</option>";

    for (const i of movie){
        out += "<option>" + i.movie + "</option>";
    }

    out += "</select>";
    $("#movies").html(out);


}

function saveMovies(){
    $.get("/retrieveMovies", function (movie){
        formatMovies(movie);
    });
}

// creates an empty array to put all orders in and fetches the table to put them in

const all_tickets = document.getElementById("tickets");

//validates email using regex
function validateEmail(email){
    let alert = $("#err_email");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" ){
        alert.text("Please enter your email.");
        return false;
    }
    else if(!pattern.test(email)){
        alert.text("Please enter a valid email.")
        return false;
    }
    else{
        alert.text("");
        return true;
    }

}

function validatePhone(phone){
    let alert = $("#err_phone");
    const pattern = /^\d{8}$/;

    if (phone === "" ){
        alert.text("Please enter your phone number.");
        return false;
    }
    else if(!pattern.test(phone)){
        alert.text("Please enter a valid phone number.")
        return false;
    }

    else{
        alert.text("");
        return true;
    }

}

function validateMovie(input){
    let alert = $("#err_movie");

    if (input === "" || input === "Choose movie"){

        alert.text("Please choose a movie")
        return false;

    }
    else{
        alert.text("");
        return true;
    }

}

function validateFirstName(input){
    let alert = $("#err_first_name");

    if (input === "" ){

        alert.text("Please insert your first name.")
        return false;

    }
    else{
        alert.text("");
        return true;
    }

}

function validateLastName(input){
    let alert = $("#err_surname");

    if (input === "" ){

        alert.text("Please insert your last name.")
        return false;

    }
    else{
        alert.text("");
        return true;
    }

}

function validateAmount(input){
    let alert = $("#err_amount");

    if (input === "" || input<1 || isNaN(input) ){

        alert.text("Please insert a valid amount.")
        return false;

    }
    else{
        alert.text("");
        return true;
    }

}

//buys ticket by getting values and checking if email and phone is validated
function buyTicket(){

    const alert_phone = document.getElementById("err_phone");

    const alert_email = document.getElementById("err_email");
    const alert_first_name = document.getElementById("err_first_name");
    const alert_surname = document.getElementById("err_surname");
    const alert_amount = document.getElementById("err_amount");
    const alert_movie = document.getElementById("err_movie");


    const first_name = document.getElementById("first_name").value;
    const surname = document.getElementById("surname").value;
    const movie = document.getElementById("selectedMovie").value;
    const amount = document.getElementById("amount").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    alert_email.textContent = "";
    alert_phone.textContent = "";
    alert_surname.textContent = "";
    alert_first_name.textContent = "";
    alert_amount.textContent = "";
    alert_movie.textContent = "";


    if (validateEmail(email) && validatePhone(phone) && validateMovie(movie) &&validateFirstName(first_name) && validateLastName(surname) && validateAmount(amount)){
            const newOrder = {
                movie: movie,
                amount: amount,
                first_name: first_name,
                surname: surname,
                phone: phone,
                email: email

            };
            $.post("/saveTicket", newOrder, function (tickets ){

            fetchTickets();

        });


        first_name.value = "";
        surname.value = "";
        movie.value = "";
        phone.value = "";
        email.value = "";
        amount.value = 1;


    }




}
function fetchTickets() {
    $.get("/fetchTickets", function (tickets) {
        showList(tickets);
    });
}
//creates a table head and shows the array
function showList(tickets){

    all_tickets.innerHTML = "";

    let out = "<tr>" +
        "<th>" + "Movie" + "</th>" +
        "<th>" + "Amount" + "</th>" +
        "<th>" + "First Name" + "</th>" +
        "<th>" + "Surname" + "</th>" +
        "<th>" + "Phone number" + "</th>" +
        "<th>" + "Email" + "</th>" +
        "</tr>";

    for (let i of tickets) {
        out += "<tr>" + "<td>" + i.movie + "</td>" + "<td>" + i.amount +  "</td>" + "<td>" + i.first_name +
            "</td>" + "<td>" + i.surname + "</td>" + "<td>" + i.phone + "</td>" + "<td>" + i.email +" </td>"+ "</tr>";

    }

    all_tickets.innerHTML += out;
}

//empties the array and deletes the content of the table
function deleteTickets() {

    $.get("/deleteTickets", function (){
        fetchTickets();
    });


}


