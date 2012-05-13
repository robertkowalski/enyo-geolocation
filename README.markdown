Enyo Geolocation
================

Enyo kind for geolocations - compatible with the Phonegap API
--------------------------------------------------------------


Tested on: 

 - Firefox 12.0
 - Chrome 18.0.1025.168
 - webOS 3.0.5 Browser
 - Android 2.1 Emulator
 - mobile Safari (iOS 5.1)
 - iOS 5.1 (Phonegap)

Optional Settings
-----------------

```
option                | default | explanation
===============================================================
watch                 | [false] | watch for position changes
timeout               | [10000] | timeout for position lookup
maximumAge            | [3000]  | max age of cached positions
enableHighAccuracy    | [true]  | use high-accuracy positioning
```

Change after creation of kind with e.g.

```
// start watching
this.$.myKindName.setWatch(true);
```


Usage Example
-------------

```javascript


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

```
---------------------------------------

License 
-------

Copyright (c) 2012, Robert Kowalski
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.


THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

