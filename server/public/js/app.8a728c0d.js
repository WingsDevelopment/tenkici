(function(e){function t(t){for(var r,s,a=t[0],l=t[1],c=t[2],p=0,h=[];p<a.length;p++)s=a[p],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&h.push(i[s][0]),i[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(h.length)h.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var l=n[a];0!==i[l]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},o=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/public/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),i=n.n(r);i.a},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"background-color":"#eef5db"},attrs:{id:"app"}},[n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},o=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[e.spawned?e._e():[n("button",{on:{click:e.spawnAsPeasant}},[e._v("Spawn as peasant")]),n("button",{on:{click:e.spawnAsVampire}},[e._v("Spawn as vampire")])],null!=e.player&&null!=e.otherPlayers?n("Canvas",{attrs:{socket:e.socket,player:e.player,otherPlayers:e.otherPlayers,walls:e.walls,invisRunes:e.invisRunes}}):e._e()],2)},a=[],l=n("8374"),c=l["a"],u=n("2877"),p=Object(u["a"])(c,s,a,!1,null,"8895ae56",null),h=p.exports,f={name:"app",components:{HelloWorld:h}},y=f,d=(n("034f"),Object(u["a"])(y,i,o,!1,null,null,null)),v=d.exports,b=n("7591"),w=n.n(b);r["default"].config.productionTip=!1,r["default"].use(w.a),new r["default"]({render:function(e){return e(v)}}).$mount("#app")},8374:function(e,t,n){"use strict";(function(e){n("c740"),n("4160"),n("a434"),n("b64b"),n("d3b7"),n("25f0"),n("159b");var r=n("8055"),i=n.n(r),o=n("2b0e"),s=n("9ce3");t["a"]={name:"HelloWorld",props:{},components:{Canvas:s["a"]},data:function(){return{socket:{},player:null,otherPlayers:{},spawned:!1,walls:[],invisRunes:[],invises:0}},created:function(){var e=this;this.socket=i()("http://192.168.1.109:3000"),this.socket.binaryType="blob",this.socket.on("join",(function(t){e.player=t,e.spawned=!0})),this.socket.on("serverError",(function(e){alert("Server error: "+e)})),this.socket.on("initWalls",(function(t){console.log(t),e.walls=t})),this.socket.on("initInvises",(function(t){console.log(t),t.forEach((function(t){e.invisRunes.push(t)}))})),this.socket.on("invisSpawned",(function(t){e.invisRunes.push(t)})),this.socket.on("invisConsumed",(function(t){null!=e.player&&e.player.id==t&&(e.player.isInvisible=!0),null!=e.otherPlayers[t]&&(e.otherPlayers[t].isInvisible=!0)})),this.socket.on("deleteInvisesFromMap",(function(t){t.forEach((function(t){var n=e.invisRunes.findIndex((function(e){return e.id===t}));-1!=n&&e.invisRunes.splice(n,1)}))})),this.socket.on("invisExpired",(function(t){var n=e.onPlayerMoved(t);e.player.id===n&&(e.player.isInvisible=!1),null!=e.otherPlayers[n]&&(e.otherPlayers[n].isInvisible=!1)})),this.socket.on("initOthers",(function(t){Object.keys(t).forEach((function(n){n!=e.player.id&&o["default"].set(e.otherPlayers,n,t[n])}))})),this.socket.on("playerAdded",(function(t){t.id!=e.player.id&&o["default"].set(e.otherPlayers,t.id,t)})),this.socket.on("playerRemoved",(function(t){o["default"].delete(e.otherPlayers,t)})),this.socket.on("playerMoved",(function(t){e.onPlayerMoved(t)})),this.socket.on("playerDied",(function(t){e.player.id===t?(e.player=null,alert("umro si nube, F5")):o["default"].delete(e.otherPlayers,t)}))},mounted:function(){},methods:{onPlayerMoved:function(t){t=new e(t).toString();var n=parseInt(t.substring(0,4),10),r=parseInt(t.substring(4,8),10),i=t.substring(8);if(null!=this.player&&i==this.player.id)this.player.position.x=n,this.player.position.y=r;else{var o=this.otherPlayers[i];null!=o&&(o.position.x=n,o.position.y=r)}return i},spawnAsVampire:function(){this.socket.emit("createPlayer",1)},spawnAsPeasant:function(){this.socket.emit("createPlayer",0)}}}}).call(this,n("b639").Buffer)},"85ec":function(e,t,n){},"9ce3":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-stage",{attrs:{config:e.configKonva}},[n("v-layer",[n("div"),n("v-circle",{attrs:{config:e.configCircle}}),null!=e.otherPlayers?e._l(e.getOthers,(function(e){return n("playerCanvas",{key:e.id,attrs:{player:e}})})):e._e(),e._l(e.walls,(function(e){return n("v-rect",{key:"wall"+e.id,attrs:{config:{x:e.x,y:e.y,width:e.width,height:e.height,fill:"brown",shadowBlur:10}}})})),e._l(e.invisRunes,(function(e){return n("v-circle",{key:"inv"+e.id,attrs:{config:{x:e.position.x,y:e.position.y,radius:e.radius,fill:e.color,shadowBlur:10}}})}))],2)],1)],1)},i=[],o=(n("4de4"),n("4160"),n("4fad"),n("c1f9"),n("b64b"),n("159b"),n("3835")),s={Left:0,Up:1,Right:2,Down:3,LeftUp:4,LeftDown:5,RightUp:6,RightDown:7},a=s,l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("v-circle",{attrs:{config:e.configCircle}})],1)},c=[],u={name:"Canvas",props:{socket:Object,player:Object},computed:{configCircle:function(){return{x:this.player.position.x,y:this.player.position.y,radius:this.player.radius,fill:this.player.color,stroke:this.player.isInvisible?"":"black",strokeWidth:this.player.isInvisible?0:4,shadowBlur:15}}}},p=u,h=n("2877"),f=Object(h["a"])(p,l,c,!1,null,null,null),y=f.exports,d={name:"Canvas",props:{socket:Object,player:Object,otherPlayers:Object,walls:Array,invisRunes:Array},components:{playerCanvas:y},data:function(){return{position:{x:0,y:0},configKonva:{width:1500,height:730},map:{65:!1,83:!1,68:!1,87:!1},currentKeyDown:{}}},created:function(){},computed:{getOthers:function(){if(null!=this.player&&null!=this.otherPlayers)return 1===this.player.playerType?Object.fromEntries(Object.entries(this.otherPlayers).filter((function(e){var t=Object(o["a"])(e,2),n=(t[0],t[1]);return!n.isInvisible}))):this.otherPlayers},configCircle:function(){return{x:this.player.position.x,y:this.player.position.y,radius:this.player.radius,fill:this.player.color,stroke:this.player.isInvisible?"":"black",strokeWidth:this.player.isInvisible?0:4,shadowBlur:15}},configCirclesForOther:function(e){return console.log(this.otherPlayers),console.log(e),{x:this.otherPlayers[e].position.x,y:this.otherPlayers[e].position.y,radius:20,fill:this.otherPlayers[e].color,stroke:"black",strokeWidth:4}}},mounted:function(){var e=this;window.addEventListener("keydown",(function(t){e.checkAndTranslate(t.keyCode)})),window.addEventListener("keyup",(function(t){e.keyUp(t.keyCode)}))},methods:{checkAndTranslate:function(e){switch(e){case 65:this.currentKeyDown[e]!=a.Left&&(this.socket.emit("changeDirection",a.Left),this.currentKeyDown[e]=a.Left);break;case 83:this.currentKeyDown[e]!=a.Down&&(this.socket.emit("changeDirection",a.Down),this.currentKeyDown[e]=a.Down);break;case 68:this.currentKeyDown[e]!=a.Right&&(this.socket.emit("changeDirection",a.Right),this.currentKeyDown[e]=a.Right);break;case 87:this.currentKeyDown[e]!=a.Up&&(this.socket.emit("changeDirection",a.Up),this.currentKeyDown[e]=a.Up);break;case 32:this.socket.emit("consumeInvis");break}},keyUp:function(e){var t=this,n=-1;this.currentKeyDown[e]=-1,Object.keys(this.currentKeyDown).forEach((function(e){-1!=t.currentKeyDown[e]&&(n=t.currentKeyDown[e])})),this.socket.emit("changeDirection",n)}}},v=d,b=Object(h["a"])(v,r,i,!1,null,"7da9aa73",null);t["a"]=b.exports}});
//# sourceMappingURL=app.8a728c0d.js.map