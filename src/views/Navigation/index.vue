<template>
<div>
  <div class="map">
    <div class="cab-search">
    <div id="cab-search-form">

      <input
          type="text"
          id="cab-num"
          class="form-control"
          v-model="value"
          placeholder="Что вы ищете?"
      />
    </div>
      <div class="nav-keyboard">
    <KeyBoard @pressed="value = $event" :selfValue="value"></KeyBoard>
    </div>
   </div>
    <div class="floor-change">
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group-vertical btn-group-toggle mr-4" role="group" aria-label="First group">
         
          <button v-on:click="showSelector('9a')" value="9a" class="btn btn-secondary floor-num btn-lg ">9a</button>
          <button v-on:click="showSelector('8a')" value="8a" class="btn btn-secondary floor-num btn-lg">8a</button>
          <button v-on:click="showSelector('7a')" value="7a" class="btn btn-secondary floor-num btn-lg">7a</button>
          <div class="btn-group" role="group">

          <button v-on:click="showSelector('6')" value="6" class="btn btn-secondary floor-num btn-lg">6</button>
          <button v-on:click="showSelector('6a')" value="6a" class="btn btn-secondary floor-num btn-lg">6a</button>

        </div>
        <div class="btn-group" role="group">
          <button v-on:click="showSelector('5')" value="5" class="btn btn-secondary floor-num btn-lg">5</button>
          <button v-on:click="showSelector('5a')" value="5a" class="btn btn-secondary floor-num btn-lg">5a</button>
        </div>

        <div class="btn-group" role="group">
          <button v-on:click="showSelector('4')" value="4" class="btn btn-secondary floor-num btn-lg">4</button>
          <button v-on:click="showSelector('4a')" value="4a" class="btn btn-secondary floor-num btn-lg">4a</button>
        </div>
        <div class="btn-group" role="group">
          <button v-on:click="showSelector('3')" value="3" class="btn btn-secondary floor-num btn-lg">3</button>
          <button v-on:click="showSelector('3a')" value="3a" class="btn btn-secondary floor-num btn-lg">3a</button>
        </div>
        <div class="btn-group" role="group">
          <button v-on:click="showSelector('2')" value="2" class="btn btn-secondary floor-num btn-lg">2</button>
          <button v-on:click="showSelector('2a')" value="2a" class="btn btn-secondary floor-num btn-lg">2a</button>
        </div>
        <button v-on:click="showSelector('1')" value="1" class="btn btn-secondary floor-num btn-lg">1</button>
        <button v-on:click="showSelector('0')" value="0" class="btn btn-secondary floor-num btn-lg">0</button>
      </div>

    </div>
  </div>


  
  

  

<div class="floor-show">
  <Floor v-bind:showSelect="showSelect" v-bind:destDot="destDot" v-bind:homeDot="homeDot" />   
</div>
  

</div>
  </div>
</template>

<script>



import KeyBoard from "@/views/Navigation/components/KeyBoard";
import Floor from "@/views/Navigation/components/floor.vue"
import homeDot from "@/homedot.json"

export default {
name: "navigation",
  components: {KeyBoard, Floor},
  data() { 
  return {
    homeDot: homeDot.homedot,
    destDot: '',
    value: '',
    move: false,
    showSelect : '',
    cabFloorMatch : {
    "1":  ["101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "121", "123", "124", "125", "134"],
    "2":  ["201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "220", "222", "223", "224"],
    "2a": ["225", "226", "228", "232", "233", "234"],
    "3":  ["301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "321", "322", "323", "324", "325"],
    "3a": ["326", "327", "328", "329", "330", "334", "335", "336", "337", "338"],
    "4":  ["401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "420", "421", "422", "423", "424"],
    "4a": ["425", "426", "427", "428", "429", "433", "434", "435"],
    "5":  ["501", "502", "503", "504", "505", "506", "408", "410", "412", "413"],
    "5a": ["512", "513", "514", "515", "519", "520", "521", "522"],
    "6":  ["501", "504", "506"],
    "6a": ["606", "607", "608", "612", "613", "614"],
    "7a": ["703", "704", "705", "706", "707", "708", "712", "713", "714"],
    "8a": ["801", "802", "803", "807", "808", "809", "810"],
    "9a": ["901", "902", "903", "904", "905", "909", "910", "911", "912"]}

  };
  },
  methods: {
  showSelector(id) {
    
      this.showSelect = id
    
  },
  roomNumValidate(room) {
    
    for (var floor in this.cabFloorMatch) {
      
      for (var cab in this.cabFloorMatch[floor]){
        
        if (room === this.cabFloorMatch[floor][cab] ){
        this.showSelector(floor)
        return ('cab' + floor +  room.slice(1))
      }}
      
    }
    this.value = ''
    return (-1)
  }
  
},
watch: {
  value: function () {
    if (this.value.length===3)
    this.destDot=this.roomNumValidate(this.value)
    console.log(this.homeDot,this.destDot)

  }
},

}

</script>

<style >



.floor-change {
    /* z-index: 10; */
    position: relative;
    transform: scale(1.5);
    display: block;
    margin-left: 2rem;
    margin-top: 10rem;
    left: 25%;
    
}

.cab-search {
  display: block;
  height: 40px;

}
.form-control {
    height: 100%;
    font-size: 3rem;
}
body{
  margin: 0;
  padding: 0;
}
.map{
  position: relative;
  text-align: center;
}
svg{
  position: absolute;
  top: 0;
  left: 0;
  height: 50%;
  width: 50%;
  margin-top: 100px;
  margin-left: 150px;
}

.big{
  fill: white;
}

.part{
  stroke: #000;
  stroke-width:10px;
}

.big:hover {
   opacity: .6;
 }

.room{
  fill: aqua;
  opacity: .3;
}

.room:hover{
  opacity: .6;
}

.toilet{
  fill: rgb(233, 7, 233);
  opacity: .3;
}

.toilet:hover{
  opacity: .6;
}

.stair{
  fill: rgb(233, 9, 9);
  opacity: .3;
}

.stair:hover{
  opacity: .6;
}

.lift{
  fill: rgb(255, 231, 12);
  opacity: .3;
}

.lift:hover{
  opacity: .6;
}
.building{
  opacity:1;
  fill:#ffffff;
  fill-opacity:1;
  stroke:#000000;
  stroke-width:1;
  stroke-opacity:1;
}

.study{
  opacity:1;
  fill:rgb(127,188,226);
  stroke:#000000;
  stroke-width:1;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-miterlimit:4;
  stroke-dasharray:none;
  stroke-dashoffset:0;
  stroke-opacity:1;
}

.free{
  fill:rgb(60, 179, 113);
}

.toilet{
  opacity:1;
  fill:rgb(244,132,132);
  stroke:#000000;
  stroke-width:1;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-miterlimit:4;
  stroke-dasharray:none;
  stroke-dashoffset:0;
  stroke-opacity:1;
}

.stair{
  opacity:1;
  fill: rgb(255, 241, 109);
  stroke:#000000;
  stroke-width:1;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-miterlimit:4;
  stroke-opacity:1;
}

.void{
  opacity:1;
  fill:rgb(182,179,159);
  stroke:#000000;
  stroke-width:1;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-miterlimit:4;
  stroke-dasharray:none;
  stroke-dashoffset:0;
  stroke-opacity:1;
}

.mnblck{
  opacity:1;
  fill:#ffffff;
  fill-opacity:0.5;
  stroke:#000000;
  stroke-width:1;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-miterlimit:4;
  stroke-dasharray:none;
  stroke-dashoffset:0;
  stroke-opacity:1;
}

.dot{
  opacity:0;
  fill:red;
  fill-opacity:1;
  stroke:#000000;
}

.cab-num{
  font-style:normal;
  font-weight:normal;
  font-size:40px;
  line-height:1.25;
  font-family:sans-serif;
  letter-spacing:0px;
  word-spacing:0px;
  fill:#fff;
  fill-opacity:1;
  stroke: none;
}

.icon{
  fill:#ffffff;
  stroke:#000000;
}



.nav-keyboard {
  z-index: 10;
  position: absolute;
  left: 85%;
  transform: scale(2);
  margin-top: 2rem;
}


</style>
