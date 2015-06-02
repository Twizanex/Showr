/**
 * Created by ellie on 2014-10-20.
 */
function getAll(name) {
    var data = 'name=' + name;
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/getall', true);
        xhr.setRequestHeader("Content-Type",
            "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", data.length);
        xhr.setRequestHeader("Connection", "close");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                    //Posting back result
                    postMessage(xhr.responseText);
                }
        };

        xhr.send(data);
    } catch (e) {
        postMessage(null);
    }

}

self.addEventListener('message', function(event) {
    var name = event.data;
    // poll the message service
    getAll(name); // first time we request the messages will be instant, after that we fetch on interval
    setInterval( function() {
        getAll(name);
    }, 5000);
});

