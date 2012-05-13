/**
 * Wrapper for navigator.geolocation - compatible with the Phonegap API
 *
 * Tested on: 
 *   Firefox 12.0 (Linux), Chrome 18.0.1025.168 (Linux), webOS 3.0.5 Browser, Android 2.1 Emulator,
 *   mobile Safari (iOS 5.1), iOS 5.1 (Phonegap)
 *
 * 
 * Copyright (c) 2012, Robert Kowalski
 * 
 * Redistribution and use in source and binary forms, 
 * with or without modification, are permitted provided that 
 * the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, 
 * this list of conditions and the following disclaimer. 
 * Redistributions in binary form must reproduce the above copyright notice, 
 * this list of conditions and the following disclaimer in the documentation 
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS 
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF 
 * THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


enyo.kind({
    name: "rok.geolocation",
    kind: enyo.Component,
    events: {
        onSuccess: "",
        onError: ""
    },
    published: {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true,
        watch: false
    },
    create: function() {
        this.inherited(arguments);
        if (this.watch) {
            this.watchPosition();
        } else {
            this.getPosition();
        }
    },
    destroy: function() {
        if (this.watchId) {
            this.stopWatch();
        }
        this.inherited(arguments);
    },
    watchPosition: function() {
        var options = {
            maximumAge: this.maximumAge,
            timeout: this.timeout,
            enableHighAccuracy: this.enableHighAccuracy
        };
        this.watchId = navigator.geolocation.watchPosition(enyo.bind(this, "onPosition"), enyo.bind(this, "onFailure"), options);
    },
    stopWatchPosition: function() {
        navigator.geolocation.clearWatch(this.watchId);
        delete this.watchId;
        this.watch = false;
    },
    getPosition: function() {
        var options = {
            maximumAge: this.maximumAge,
            timeout: this.timeout,
            enableHighAccuracy: this.enableHighAccuracy
        };
        navigator.geolocation.getCurrentPosition(enyo.bind(this, "onPosition"), enyo.bind(this, "onFailure"), options);
    },
    onPosition: function(position) {
        var result = {};
        result.timestamp = new Date(position.timestamp);
        result.coords = position.coords;

        this.doSuccess(result);
    },
    onFailure: function(error) {
        this.doError(error);
    },
    watchChanged: function() {
        if (this.watch) {
            this.watchPosition();
        } else {
            this.stopWatchPosition();
        }
    }
});

