"use strict";
(function () {

    var pickImage = document.querySelector("#pick-image");
    if (pickImage) {
        pickImage.onclick = function () {
            var pick = new MozActivity({
                name: "pick",
                data: {
                    type: ["image/png", "image/jpg", "image/jpeg"],
                    nocrop: true
                }
            });

            pick.onsuccess = function () {
                var img = document.createElement("img");
                img.src = window.URL.createObjectURL(this.result.blob);
                var imagePresenter = document.querySelector("#image-presenter");
                imagePresenter.appendChild(img);
                imagePresenter.style.display = "block";
            };

            pick.onerror = function () {
                console.log("Can't view the image");
            };
        };
    }

    var pickAnything = document.querySelector("#pick-anything");
    if (pickAnything) {
        pickAnything.onclick = function () {
             var pickAny = new MozActivity({
                 name: "pick"
             });

            pickAny.onsuccess = function () {
                var img = document.createElement("img");
                if (this.result.blob.type.indexOf("image") != -1) {
                    img.src = window.URL.createObjectURL(this.result.blob);
                    var imagePresenter = document.querySelector("#image-presenter");
                    imagePresenter.appendChild(img);
                    imagePresenter.style.display = "block";
                }
            };

            pickAny.onerror = function () {
                console.log("An error occurred");
            };
        };
    }

    var record = document.querySelector("#record");
    if (record) {
        record.onclick = function () {
            var rec = new MozActivity({
                name: "record" 
            });

            rec.onsuccess = function () {
                var img = document.createElement("img");
                img.src = window.URL.createObjectURL(this.result.blob);
                var imagePresenter = document.querySelector("#image-presenter");
                imagePresenter.appendChild(img);
                imagePresenter.style.display = "block";
            };

            rec.onerror = function () {
                alert("No taken picture returned");
            };
        };
    }

    var dial = document.querySelector("#dial");
    if (dial) {
        dial.onclick = function () {
            new MozActivity({
                name: "dial",
                data: {
                    //number: "+112233445567890"
                }
            });
        };
    }

    var share = document.querySelector("#share");
    if (share) {
        share.onclick = function () {
            new MozActivity({
                name: "share",
                data: {
                    //type: "url", // Possibly text/html in future versions,
                    number: 1,
                    url: "http://gmail.com"
                }
            });
        };
    }

    var shareImage = document.querySelector("#share-image"),
        imgToShare = document.querySelector("#image-to-share");
    if (shareImage && imgToShare) {
        shareImage.onclick = function () {
            if(imgToShare.naturalWidth > 0) {

                var blobCanvas = document.createElement("canvas");
                blobCanvas.width = imgToShare.width;
                blobCanvas.height = imgToShare.height;

                var blobCanvasContext = blobCanvas.getContext("2d");
                blobCanvasContext.drawImage(imgToShare, 0, 0);
                blobCanvas.toBlob(function (blob) {
                    new MozActivity({
                        name: "share",
                        data: {
                            type: "image/*",
                            number: 1,
                            blobs: [blob]
                        }
                    });
                });
            }
            else {
                alert("Image failed to load, can't be shared");
            }
        };
    }

    /*
    <script type="text/javascript">// <![CDATA[
      $("#searchterm").keyup(function(e){
        var q = $("#searchterm").val();
        $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
        {
          srsearch: q,
          action: "query",
          list: "search",
          format: "json"
        },
        function(data) {
          $("#results").empty();
          $("#results").append("

Results for <b>" + q + "</b>

");
          $.each(data.query.search, function(i,item){
            $("#results").append("
<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a>" + item.snippet + "</div>
");
          });
        });
      }); */

// ]]></script>
/*    var viewURL = document.querySelector("#searchValue");
    var findURL = "https://en.wikipedia.org/wiki/"+searchValue;
    if (searchValue) {
        viewURL.onclick = function () {
            new MozActivity({
                name: "view",
                data: {
                    type: "url", // Possibly text/html in future versions
                    url: findURL,
                }
            });
        };
    }
*/
    
//creates a listener for when you press a key
window.onkeyup = keyup;

//creates a global Javascript variable
var inputTextValue;

function keyup(e) {
  //setting your input text to the global Javascript Variable for every key press
  inputTextValue = e.target.value;
  $('#searchValue').text(inputTextValue);
  //listens for you to press the ENTER key, at which point your web address will change to the one you have input in the search box
  if (e.keyCode == 13) {
    window.location = "https://en.wikipedia.org/wiki/" + inputTextValue;
  }
}
    
    var composeEmail = document.querySelector("#compose-email");
    if (composeEmail) {
        composeEmail.onclick = function () {
            new MozActivity({
                name: "new", // Possibly compose-mail in future versions
                data: {
                    type : "mail",
                    url: "mailto:example@example.org"
                }
            });
        };
    }

    var saveBookmark = document.querySelector("#save-bookmark");
    if (saveBookmark) {
        saveBookmark.onclick = function () {
            new MozActivity({
                name: "save-bookmark",
                data: {
                    type: "url",
                    url: "http://wikipedia.org",
                    name: "introduction",
                    icon: "http://wikipedia.org/favicon.png"
                }
            });
        };
    }

    var openVideo = document.querySelector("#open-video");
    if (openVideo) {
        openVideo.onclick = function () {
            new MozActivity({
                name: "open",
                data: {
                    type: [
                      "video/webm",
                      "video/mp4",
                      "video/3gpp",
                      "video/youtube"
                    ],
                    url: "https://www.youtube.com/watch?v=BZP1rYjoBgI"
                }
            });
        };
    }

    // Notifications
    var addNotification = document.querySelector("#add-notification");
    if (addNotification) {
        addNotification.onclick = function () {
            if ("Notification" in window) {
                // Firefox OS 1.1 and higher
                if (Notification.permission !== "denied") {
                    Notification.requestPermission(function (permission) {
                        if(!("permission" in Notification)) {
                            Notification.permission = permission;
                        }
                    });
                }

                if (Notification.permission === "granted") {
                    new Notification("See this", {
                        body : "wikitube has a notification"
                    });
                }
            }
            else {

                var notify = navigator.mozNotification.createNotification(
                    "See this",
                    "wikitube has a notification"
                );
                notify.show();
            }
        };
    }


    // Geolocation
    var geolocation = document.querySelector("#geolocation"),
        geolocationDisplay = document.querySelector("#geolocation-display");
    if (geolocation && geolocationDisplay) {
        geolocation.onclick = function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                geolocationDisplay.innerHTML = "<strong>Latitude:</strong> " + position.coords.latitude + ", <strong>Longitude:</strong> " + position.coords.longitude;
                geolocationDisplay.style.display = "block";
            },
            function () {
                geolocationDisplay.innerHTML = "Failed to get your current location";
                geolocationDisplay.style.display = "block";
            });
        };
    }


    // Cross domain XHR
    var crossDomainXHR = document.querySelector("#cross-domain-xhr"),
        crossDomainXHRDisplay = document.querySelector("#cross-domain-xhr-display");
    if (crossDomainXHR && crossDomainXHRDisplay) {
        crossDomainXHR.onclick = function () {
            var xhr = new XMLHttpRequest({mozSystem: true});
            xhr.open("GET", "http://wikipedia.org", true);
            xhr.onreadystatechange = function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    crossDomainXHRDisplay.innerHTML = "<h4>Result from Cross-domain XHR</h4>" + xhr.response;
                    crossDomainXHRDisplay.style.display = "block";
                }
            };

            xhr.onerror = function () {
                crossDomainXHRDisplay.innerHTML = "<h4>Result from Cross-domain XHR</h4><p>Cross-domain XHR failed</p>";
                crossDomainXHRDisplay.style.display = "block";
            };
            xhr.send();
        };
    }

    // deviceStorage, pictures
    var deviceStoragePictures = document.querySelector("#device-storage-pictures"),
        deviceStoragePicturesDisplay = document.querySelector("#device-storage-pictures-display");
    if (deviceStoragePictures && deviceStoragePicturesDisplay) {
        deviceStoragePictures.onclick = function () {
            var deviceStorage = navigator.getDeviceStorage("pictures"),
                cursor = deviceStorage.enumerate();
            deviceStoragePicturesDisplay.innerHTML = "<h4>Result from deviceStorage - pictures</h4>";

            cursor.onsuccess = function () {
                if (!cursor.result) {
                    deviceStoragePicturesDisplay.innerHTML = "No files";
                }

                var file = cursor.result,
                    filePresentation;
                filePresentation = "<strong>" + file.name + ":</strong> " + parseInt(file.size / 1024, 10) + "kb<br>";
                filePresentation += "<p><img src='" + window.URL.createObjectURL(file) + "' alt=''></p>";
                deviceStoragePicturesDisplay.innerHTML += filePresentation;

                deviceStoragePicturesDisplay.style.display = "block";
            };

            cursor.onerror = function () {
                console.log(this.error);
                deviceStoragePicturesDisplay.innerHTML = "<h4>Result from deviceStorage - pictures</h4><p>deviceStorage failed</p><p>" + 
						(this.error.message || this.error.name || this.error.toString()) + "</p>";
                deviceStoragePicturesDisplay.style.display = "block";
            };
        };
    }

    // Alarm API
    var alarmDate = new Date("Aug 31, 2014 15:20:00"),
        addAlarm = document.querySelector("#add-alarm"),
        alarmDisplay = document.querySelector("#alarm-display");
    if (addAlarm) {
        addAlarm.onclick = function () {
            var alarm = navigator.mozAlarms.add(alarmDate, "honorTimezone", {
                "optionalData" : "I am data"
            });

            alarm.onsuccess = function () {
                alarmDisplay.innerHTML = "Alarm scheduled for " + alarmDate;
            };

            alarm.onerror = function () { 
                alarmDisplay.innerHTML = "Failed to set the alarm<br>" + this.error.name;
            };

            var getAllAlarms = navigator.mozAlarms.getAll();
            getAllAlarms.onsuccess = function () {
                alarmDisplay.innerHTML += "<h4>All alarms</h4>";
                this.result.forEach(function (alarm) {                    
                    alarmDisplay.innerHTML += "<p><strong>Id:</strong> " + alarm.id + 
                    ", <strong>date:</strong> " + alarm.date + 
                    ", <strong>respectTimezone:</strong> " + alarm.respectTimezone + 
                    ", <strong>data:</strong> " + JSON.stringify(alarm.data) + "</p>";
                });
            };

            getAllAlarms.onerror = function () { 
                alarmDisplay.innerHTML = "<p>Failed to get all alarms</p>" + this.error.name;
            };
        };
    }

    var removeAllAlarms = document.querySelector("#remove-all-alarms"),
        removeAlarmsDisplay = document.querySelector("#remove-alarms-display");
    if(removeAllAlarms) {
        removeAllAlarms.onclick = function () {
            var getAddedAlarms = navigator.mozAlarms.getAll();
            getAddedAlarms.onsuccess = function () {
                this.result.forEach(function (alarm) {
                    navigator.mozAlarms.remove(alarm.id);
                });
                removeAlarmsDisplay.innerHTML = "All alarms removed";
                if (alarmDisplay) {
                    alarmDisplay.innerHTML = "";
                }
            };

            getAddedAlarms.onerror = function () { 
                removeAlarmsDisplay.innerHTML = "<p>Failed to remove all alarms</p>" + this.error.name;
            };
        };
    }
})();
