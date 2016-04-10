var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        window.plugins.toast.showLongBottom('Use the back button to return to main.');
        document.getElementById("btnAdd").addEventListener("click", app.addItem);
        document.getElementById("btnToast").addEventListener("click", app.showToast);
        document.getElementById("btnDeviceInfo").addEventListener("click", app.showDeviceInfo);
        document.getElementById("takePhoto").addEventListener("click", app.takePhoto);
        document.getElementById("btnUrl").addEventListener("click", app.openWeb);
        app.receivedEvent('deviceready');
    },
    addItem: function() {
        console.log("Plugin ADD ITEM CALLED " + HybridBridge);
        var item = document.getElementById("bookmark").value;
        HybridBridge.addItem(item, "org.smartcar.smartcar.MyListActivity",
            function(){
                console.log("Hybrid Bridge Success")
            }, function(e){
                console.log("Hybrid Bridge Error" + e)
            }
        );
    },
    showDeviceInfo: function(){
        var message = 'Cordova version: ' + device.cordova;
        message += '\n\nDevice Model: ' + device.model;
        message += '\n\nDevice Version (Android): ' + device.version;
        alert(message);
    },
    takePhoto: function(){
        navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    },
    showToast: function(){
        window.plugins.toast.showShortCenter('PHONEGAP IS AWESOME!!!');
        window.plugins.toast.showShortCenter('PHONEGAP IS AWESOME twice!!!');
    },
    openWeb: function(){
        var url = "http://phonegap.com"
        window.open(url)
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();