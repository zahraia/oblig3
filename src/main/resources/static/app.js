// ready-function ensures all movies are displayed before the user can buy a ticket
$(function () {
    saveMovies();
});

//function that formats movies
function formatMovies(movie) {

    let defaultValue = "Choose movie";

    let out = "<select id = 'selectedMovie' class='form-control' onchange='validateMovie(this)'>";
    out += "<option value ='default'>" + defaultValue + "</option>";

    for (const i of movie) {
        out += "<option>" + i.movie + "</option>";
    }

    out += "</select>";
    $("#movies").html(out);


}

//function that calls for info from Controller and calls another function to format the movies
function saveMovies() {
    $.get("/retrieveMovies", function (movie) {
        formatMovies(movie);
    });
}


//validates email using regex
function validateEmail(email) {
    let alert = $("#err_email");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        alert.text("Please enter your email.");
        return false;
    } else if (!pattern.test(email)) {
        alert.text("Please enter a valid email.")
        return false;
    } else {
        alert.text("");
        return true;
    }

}

function validatePhone(phone) {
    let alert = $("#err_phone");
    const pattern = /^\d{8}$/;

    if (phone === "") {
        alert.text("Please enter your phone number.");
        return false;
    } else if (!pattern.test(phone)) {
        alert.text("Please enter a valid phone number.")
        return false;
    } else {
        alert.text("");
        return true;
    }

}

function validateMovie(input) {
    let alert = $("#err_movie");
    let selectedValue = $("#selectedMovie").val();
    console.log(selectedValue);

    if (selectedValue === "" || selectedValue === "default" || selectedValue === "Choose movie") {

        alert.text("Please choose a movie")
        return false;

    } else {
        alert.text("");
        return true;
    }

}

function validateFirstName(input) {
    let alert = $("#err_first_name");

    if (input === "") {

        alert.text("Please insert your first name.")
        return false;

    } else {
        alert.text("");
        return true;
    }

}

function validateLastName(input) {
    let alert = $("#err_surname");

    if (input === "") {

        alert.text("Please insert your last name.")
        return false;

    } else {
        alert.text("");
        return true;
    }

}


function validateAmount(input) {
    let alert = $("#err_amount");

    if (input === "" || input < 1 || isNaN(input)) {

        alert.text("Please insert a valid amount.")
        return false;

    } else {
        alert.text("");
        return true;
    }

}

function validateAll() {
    const movieCheck = validateMovie($("#selectedMovie").val());
    const firstNameCheck = validateFirstName($("#first_name").val());
    const surnameCheck = validateLastName($("#surname").val());
    const amountCheck = validateAmount($("#amount").val());
    const phoneCheck = validatePhone($("#phone").val());
    const emailCheck = validateEmail($("#email").val());

    if (movieCheck && firstNameCheck && surnameCheck && amountCheck && phoneCheck && emailCheck) {
        buyTicket();
    }
}

const ticketsDisplay = $("#tickets");

//buys ticket by getting values and checking if all input is validated
function buyTicket() {


    const first_name = $("#first_name").val();
    const surname = $("#surname").val();
    const movie = $("#selectedMovie").val();
    const amount = $("#amount").val();
    const phone = $("#phone").val();
    const email = $("#email").val();

    const newOrder = {
        movie: movie,
        amount: amount,
        first_name: first_name,
        surname: surname,
        phone: phone,
        email: email

    };
    //sends a post-request to the server with "/saveTicket", sends back newOrder to the server
    $.post("/saveTicket", newOrder, function (tickets) {

        //clears all input fields
        fetchTickets(tickets);
        $("#first_name").val("");
        $("#surname").val("");
        $("#selectedMovie").val("");
        $("#amount").val("");
        $("#phone").val("");
        $("#email").val("");

    });


}

//gets the tickets from the server
function fetchTickets() {
    $.get("/fetchTickets", function (tickets) {
        showList(tickets);
    });
}

//creates a table head and shows the array
function showList(tickets) {

    ticketsDisplay.html("");

    let out = "<tr>" +
        "<th>" + "Movie" + "</th>" +
        "<th>" + "Amount" + "</th>" +
        "<th>" + "First Name" + "</th>" +
        "<th>" + "Surname" + "</th>" +
        "<th>" + "Phone number" + "</th>" +
        "<th>" + "Email" + "</th>" +
        "</tr>";

    for (let i of tickets) {
        out += "<tr>" + "<td>" + i.movie + "</td>" + "<td>" + i.amount + "</td>" + "<td>" + i.first_name +
            "</td>" + "<td>" + i.surname + "</td>" + "<td>" + i.phone + "</td>" + "<td>" + i.email + " </td>" + "</tr>";

    }

    ticketsDisplay.append(out);
}

//deletes all tickets and ensures the table is updated
function deleteTickets() {

    $.get("/deleteTickets", function () {
        fetchTickets();
    });


}


