function success() {
    console.log("success");
    setPersonCount();
    generatePersonList();
}

function onLoad() {
    console.log("onLoad entered");

    registerNewPersonButton();
    registerDeletePersonButton();
    registerUpdateCount();
    registerSelectSalutation();
    setPersonCount();
    generatePersonList();

    console.log("onLoad left");
}

function successSetPersonCount(data, status, xhr) {
    console.log(data);
    $("#personCount").text(data);
}

function setPersonCount() {
    $.ajax({
        type: "GET",
        url: "/api/personCount",
        success: successSetPersonCount
    });
}

function successGeneratePersonList(data, status, xhr) {
    console.log(data);
    data.forEach(function (person, index, list) {
        console.log(person);
        $("#personList").append("<a href='#' class='list-group-item'><h4 class='list-group-item-heading'>" + person.FirstName + " " + person.LastName +
            "</h4><p class='list-group-item-text'>" + person.Salutation + "," + " " + person.City + "," + " " + person.DateOfBirth +
    "</p></a>");
    });
}

function generatePersonList() {
    $("#personList").empty();
    $.ajax({
        type: "GET",
        url: "/api/persons",
        success: successGeneratePersonList
    });
}

function registerNewPersonButton() {
    $("#button").click(function () {
        console.log("The button was clicked.");
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var dateOfBirth = $("#dateOfBirth").val();
        var salutation = $("#salutation").val();
        var city = $("#city").val();
        console.log("First name: " + firstName);
        console.log("Last name: " + lastName);
        console.log("Date of birth: " + dateOfBirth);
        console.log("City: " + city);
        console.log("Salutation: " + salutation);
        $.ajax({
            type: "POST",
            url: "/api/person",
            data: {
                FirstName: firstName,
                LastName: lastName,
                DateOfBirth: dateOfBirth,
                City: city,
                salutation: salutation,

            },
            success: success
        });
    });
}

function registerSelectSalutation() {
    console.log("registerSelectSalutation");
    $("#salutationMr").click(function () {
        $("#salutation").text("Salutation: Mr.").append(" <span class='caret'></span>");
    });
    $("#salutationMrs").click(function () {
        $("#salutation").text("Salutation: Mrs.").append(" <span class='caret'></span>");
    });
}

function selectSalutation(salutation) {
    $("#salutation").text(saluation);
}

function registerUpdateCount() {
    $("#updateCount").click(function () {
        setPersonCount();
    });
}

function registerDeletePersonButton() {
    $("#buttonDelete").click(function () {
        console.log("Delete button has been pressed");
        $.ajax({
            type: "DELETE",
            url: "/api/persons",
            success: function () {
                console.log("Delete has been successful");
                setPersonCount();
                generatePersonList();
            }
        });
    });    
}