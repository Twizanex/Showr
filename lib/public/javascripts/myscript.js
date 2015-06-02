function makeAjaxRequest(path, method, data, successcallback){
    $.ajax({
        type: method,
        url: "http://localhost:3000/"+path,
        data: data,
        dataType: 'JSON',
        cache: false,
        success: successcallback
    });
}


function validateMessage(name, postingas) {
    var text = document.getElementById('postMessage').value;
    var textLength = text.length;

    if (textLength < 140 && text != 0) {
        var messageInsert = '<div class="media">' + '<div class="media-body"><a href="/users/'+postingas+'"><h4 class="media-heading">'+postingas+'</h4></a><p class="message">'+text+'</p></div></div>';
        $(messageInsert).prependTo('#messageContainer');
        var data = {};
        data.name = name;
        data.text = text;
        makeAjaxRequest("postmessage", "POST", data, function(responseData){});
    }
    else
        {
            // error output to user with fadeout
            $('<p class="error"> Wrong input! input length has to be more than 0 and less then 140 characters </p>')
                .insertBefore("#messageForm")
                .delay(1500)
                .queue(function (next) {
                    $('p.error').fadeOut('slow', function () {
                        $("p.error").remove();
                    });
                    next();
                });
        }
}


function getAllMessages() {
    var username = document.getElementById('username').textContent
    var worker = new Worker('/javascripts/worker.js');
    /* Webworker code that gets messages async, by polling the getall route */
    /*----------------------------------------------------------------------*/
    worker.addEventListener('message', function(event) {
        $('#messageContainer').empty();
        console.log("Receiving messages from web-worker");
        var result = JSON.parse(event.data);
        var messageInsert = [];
        for(k in result) {
            //console.log(result[k].from);
            // Array of strings for easy DOM manipulation
            messageInsert[0] = '<div class="media">';
            messageInsert[1] = '<div class="media-body"><a href="/users/' + result[k].from + '"><h4 class="media-heading">' + result[k].from + '</h4></a><p class="message">' + result[k].text + '</p></div>';
            $(messageInsert.join("")).prependTo('#messageContainer');
        }
    });
    worker.postMessage(username);
    /*----------------------------------------------------------------------*/
}

$(document).ready(function() {
    getAllMessages();
    var url = window.location.href;
    $('.nav a[href="'+url+'"]').parent().addClass('active');
});

window.onload = function() {
    // Fetch all the users messages

    var friendname = document.getElementById('username').textContent;
    checkFriendStatus(friendname);

    $('#friendstatus').on("click", ".addfriendButton, .removefriendButton", function() {
        var friendbtn = $(this),
            spantext = friendbtn.find('.text');

        if( friendbtn.hasClass('addfriendButton') ) {
            addFriend(friendname);
            friendbtn.removeClass('addfriendButton').addClass('removefriendButton');
            friendbtn.find('span').toggleClass('glyphicon-plus glyphicon-minus');
            spantext.text('Remove friend');

        } else if( friendbtn.hasClass('removefriendButton') ) {
            removeFriend(friendname);
            friendbtn.removeClass('removefriendButton').addClass('addfriendButton');
            friendbtn.find('span').toggleClass('glyphicon-minus glyphicon-plus');
            spantext.text('Add user');
        }
    });

    $("#uploadfile").on("submit", function() {
        var form = $(this);
        var formData = new FormData(form[0]);
        $.ajax({
            url: "http://localhost:3000/upload",
            data: formData ? formData : form.serialize(),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            success: function (responseData) {
                $("#uploadbtn").prop('value', 'Success');
            },
            error : function(responseData) {
                $("#uploadbtn").prop('value', 'text-danger');
            }
        });
        return false;
    });

    $('#usersearch').on("submit", function() {
        var data = {};
        var usersearchname = $('#usersearchname').val();
        data.user = usersearchname;
        if (usersearchname.length > 0) {
            makeAjaxRequest('usersearch', "POST", data, function (result) {
                if (result.success == true) {
                    window.location.replace("http://localhost:3000/users/" + usersearchname);
                } else
                // error output to user with fadeout
                    $('<p class="text-danger">A user with the username of ' + usersearchname + ' does not exist</p>')
                        .appendTo("#usersearch")
                        .delay(1500)
                        .queue(function (next) {
                            $('p.text-danger').fadeOut('slow', function () {
                                $("p.text-danger").remove();
                            });
                            next();
                        });
            });
        }
        return false;
    });
};


function checkFriendStatus(name) {
    var data = {};
    data.name = name;
    //console.log(" the name to check :" + document.getElementById('username').textContent);
    var DOMinsert = "";
    makeAjaxRequest("checkfriendstatus", "POST", data, function (result) {
        if (result.status) {
            console.log("We are friends with " + result.name + "status: " + result.status);
            DOMinsert = '<button class="removefriendButton btn btn-info"><span class="glyphicon glyphicon-minus"></span><p class="text">Remove friend</p></button>';
        } else {
            console.log("We are not friends with " + result.name + "status: " + result.status);
            DOMinsert = '<button class=" addfriendButton btn btn-info"><span class="glyphicon glyphicon-plus"></span><p class="text">Add friend</p></button>';
        }
        /* if we dont have content in the friendstatus div we want to inject the proper add/remove button */
        if ($("#friendstatus:not(:empty)").length) {
            $(DOMinsert).appendTo('#friendstatus');
        }
    });
}

function addFriend(name){
    var data = {};
    data.name = name;
    makeAjaxRequest("addfriend", "POST", data, function(){
        checkFriendStatus(name);
    });
}

function removeFriend(name){
    var data = {};
    data.name = name;
    makeAjaxRequest("removefriend", "POST", data, function(){
        checkFriendStatus(name);
    });
}