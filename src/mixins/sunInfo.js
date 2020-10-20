export default {
  data() {
    return {
      SunCalc: null,
      sunsetStr: "",
      sunsetAzimuth: ""
    }
  },
   methods: {
     getCardinal(angle) {
       const degreePerDirection = 360 / 8;
       const offsetAngle = angle + degreePerDirection / 2;
       return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
         : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
           : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
             : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
               : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
                 : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                   : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                     : "NW";
     },
     getSunInfo (long, lat) {
       this.SunCalc = require('suncalc');
       // get today's sunlight times for London
       let times = this.SunCalc.getTimes(new Date(), long, lat);

       // format sunset time from the Date object
       this.sunsetStr = times.sunset.getHours() + ':' + ((times.sunset.getMinutes()<10?'0':'') + times.sunset.getMinutes());

       // get position of the sun (azimuth and altitude) at today's sunset
       let sunsetPos = this.SunCalc.getPosition(times.sunset, long, lat);

       // get sunset azimuth in degrees
       let direction = Math.round((sunsetPos.azimuth * 180 / Math.PI)+180);
       this.sunsetAzimuth = direction + "º " + this.getCardinal(direction);
     },
   }
}
