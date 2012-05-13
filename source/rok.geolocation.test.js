
enyo.kind({
    name: "rok.geolocation.test",
    kind: enyo.Control,
    components: [
        {name: "geolocation", kind: "rok.geolocation", watch: false, timeout: 30000, maximumAge: 3000, enableHighAccuracy: true, onSuccess: "succ", onError: "err"},
        {name: "result", allowHtml: true}
    ],
    create: function() {
        this.inherited(arguments);

        // turn on watching for position changes
        this.$.geolocation.setWatch(true);

        // turn off watching for position changes
        this.$.geolocation.setWatch(false);

        // get current position a second time (first call at creation of the kind)
        this.$.geolocation.getPosition();
    },
    succ: function(inSender, inPosition) {
        this.log("[Success]: " + inPosition.timestamp);
        this.log(inPosition.coords);

        var content = 'timestamp: '         + inPosition.timestamp                 + '<br/>' +
                      'Latitude: '          + inPosition.coords.latitude           + '<br/>' +
                      'Longitude: '         + inPosition.coords.longitude          + '<br/>' +
                      'Altitude: '          + inPosition.coords.altitude           + '<br/>' +
                      'Accuracy: '          + inPosition.coords.accuracy           + '<br/>' +
                      'Altitude Accuracy: ' + inPosition.coords.altitudeAccuracy   + '<br/>' +
                      'Heading: '           + inPosition.coords.heading            + '<br/>' +
                      'Speed: '             + inPosition.coords.speed              + '<br/>';

        this.$.result.setContent(content);
    },
    err: function(inSender, inError) {
        this.log("[Error]: " + inError.message + " from " + inSender);
    }
});

var k = new rok.geolocation.test().write();
