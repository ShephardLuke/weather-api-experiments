export class Location { // Holds name, coordinates and a boolean to show if it is saved by the user
    constructor(name, latitude, longitude, saved=false) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.saved = saved;
    }

    getName() {
        return this.name
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    setSaved(saved) {
        this.saved = saved
    }

    isSaved () {
        return this.saved;
    }
}