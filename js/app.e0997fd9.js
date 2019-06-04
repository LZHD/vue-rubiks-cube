(function(t){function e(e){for(var o,i,a=e[0],u=e[1],c=e[2],l=0,f=[];l<a.length;l++)i=a[l],s[i]&&f.push(s[i][0]),s[i]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);h&&h(e);while(f.length)f.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,a=1;a<n.length;a++){var u=n[a];0!==s[u]&&(o=!1)}o&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var o={},s={app:0},r=[];function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var h=u;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.styleObj},t._l(t.cubes,function(t,e){return n("cube",{key:e,attrs:{faces:t.faces,_position:t.position}})}),1)},r=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cube",style:t.styleObj},t._l(t.faces,function(t,e){return n("face",{key:e,attrs:{_type:t.type,color:t.color}})}),1)},a=[],u={SIZE:100,LEFT:0,RIGHT:1,TOP:2,BOTTOM:3,FRONT:4,BACK:5},c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"face",class:t.extClass,style:t.styleObj})},h=[],l=(n("c5f6"),{name:"face",data:function(){return{styleObj:{width:u.SIZE+"px",height:u.SIZE+"px",position:"absolute",left:"0px",top:"0px",boxSizing:"border-box",backgroundColor:this.color},extClass:"face"+this._type}},props:{_type:Number,_cube:String,color:{default:null,type:String}},created:function(){switch(this._type){case u.LEFT:this.$set(this.styleObj,"transformOrigin","100% 50%"),this.$set(this.styleObj,"transform","translate3d(-"+u.SIZE+"px, 0px, 0px) rotateY(-90deg)");break;case u.RIGHT:this.$set(this.styleObj,"transformOrigin","0% 50%"),this.$set(this.styleObj,"transform","translate3d("+u.SIZE+"px, 0px, 0px) rotateY(90deg)");break;case u.TOP:this.$set(this.styleObj,"transformOrigin","50% 100%"),this.$set(this.styleObj,"transform","translate3d(0px, -"+u.SIZE+"px, 0px) rotateX(90deg)");break;case u.BOTTOM:this.$set(this.styleObj,"transformOrigin","50% 0%"),this.$set(this.styleObj,"transform","translate3d(0px, "+u.SIZE+"px, 0px) rotateX(-90deg)");break;case u.FRONT:break;case u.BACK:this.$set(this.styleObj,"transform","translate3d(0px, 0px, -"+u.SIZE+"px) rotateY(180deg)");break}},methods:{getCube:function(){return this._cube},getNode:function(){return this.$el},getType:function(){return this._type},getColor:function(){return this.color}}}),f=l,p=n("2877"),d=Object(p["a"])(f,c,h,!1,null,"b3336bde",null),y=d.exports,b={name:"cube",components:{face:y},data:function(){return{styleObj:{width:u.SIZE+"px",height:u.SIZE+"px",position:"absolute",transformStyle:"preserve-3d"},_faces:{},_tmpFaces:{}}},props:{_rotation:String,_position:Array,faces:Array},created:function(){this.update()},methods:{update:function(){var t="";t+="translate3d("+-u.SIZE/2+"px, "+-u.SIZE/2+"px, "+-u.SIZE/2+"px) ",this._rotation&&(t+=this._rotation+" ");var e=Math.floor(1.5),n=this._position[0],o=this._position[1],s=-this._position[2];n-=e,o-=e,s+=e+.5,t+="translate3d("+n*u.SIZE+"px, "+o*u.SIZE+"px, "+s*u.SIZE+"px)";var r=this._rotation?"transform 300ms":"";this.$set(this.styleObj,"transition",r),this.$set(this.styleObj,"transform",t)},getPosition:function(){return this._position},getNode:function(){return this.$el},getFaces:function(){return this._faces},prepareColorChange:function(){}}},x=b,m=Object(p["a"])(x,i,a,!1,null,"03bb6868",null),v=m.exports,g=(n("6b54"),n("d225")),O=n("b0b4"),w=function(){function t(e,n,o,s){Object(g["a"])(this,t),this.x=e,this.y=n,this.z=o,this.w=s}return Object(O["a"])(t,[{key:"normalize",value:function(){var t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return new this.constructor(this.x/t,this.y/t,this.z/t,this.w/t)}},{key:"conjugate",value:function(){return new this.constructor(-this.x,-this.y,-this.z,this.w)}},{key:"toString",value:function(){return[this.x,this.y,this.z,this.w].toString()}},{key:"multiply",value:function(t){var e=this,n=e.w*t.x+e.x*t.w+e.y*t.z-e.z*t.y,o=e.w*t.y+e.y*t.w+e.z*t.x-e.x*t.z,s=e.w*t.z+e.z*t.w+e.x*t.y-e.y*t.x,r=e.w*t.w-e.x*t.x-e.y*t.y-e.z*t.z;return new this.constructor(n,o,s,r)}},{key:"toAxis",value:function(){return[this.x,this.y,this.z]}},{key:"toAngle",value:function(){var t=180/Math.PI;return 2*t*Math.acos(this.w)}},{key:"toRotation",value:function(){var t=this.toAxis(),e=this.toAngle();return"rotate3d("+t[0].toFixed(10)+","+t[1].toFixed(10)+","+t[2].toFixed(10)+","+e.toFixed(10)+"deg)"}},{key:"toRotations",value:function(){var t=180/Math.PI,e=t*Math.atan2(2*(this.w*this.x+this.y*this.z),1-2*(this.x*this.x+this.y*this.y)),n=t*Math.asin(2*(this.w*this.y-this.x*this.z)),o=t*Math.atan2(2*(this.w*this.z+this.x*this.y),1-2*(this.y*this.y+this.z*this.z));return e<0&&(e+=360),n<0&&(n+=360),o<0&&(o+=360),"rotateX("+e.toFixed(10)+"deg) rotateY("+n.toFixed(10)+"deg) rotate("+o.toFixed(10)+"deg)"}}],[{key:"formUnit",value:function(){return new this(0,0,0,1)}},{key:"fromRotation",value:function(t,e){var n=Math.PI/180,o=e*n,s=Math.sin(o/2),r=Math.cos(o/2);return new this(t[0]*s,t[1]*s,t[2]*s,r)}}]),t}(),S={name:"app",components:{cube:v},data:function(){return{size:3,cubes:[],faces:[],faceNodes:[],drag:{ec:[],mouse:[],face:null},styleObj:{position:"absolute",left:"50%",top:"55%",width:0,height:0,transformStyle:"preserve-3d"},rotation:{x:"",y:"",z:"",w:""}}},created:function(){for(var t=0;t<3;t++)for(var e=0;e<3;e++)for(var n=0;n<3;n++){var o=[];0===t&&o.push({type:u.FRONT,color:"red"}),2===t&&o.push({type:u.BACK,color:"orange"}),0===n&&o.push({type:u.LEFT,color:"blue"}),2===n&&o.push({type:u.RIGHT,color:"green"}),0===e&&o.push({type:u.TOP,color:"yellow"}),2===e&&o.push({type:u.BOTTOM,color:"white"}),this.cubes.push({faces:o,position:[n,e,t]})}this.update()},methods:{update:function(){document.body.style.perspective="460px",console.log(w.fromRotation([1,0,0],-35)),this.rotation=w.fromRotation([1,0,0],-35).multiply(w.fromRotation([0,1,0],45)),this.$set(this.styleObj,"transform","translateZ("+(-u.SIZE/2-u.SIZE)+"px) "+this.rotation.toRotation()+" translateZ("+u.SIZE/2+"px)"),document.body.addEventListener("mousedown",this.dragStart)},eventToFace:function(t){var e;if(document.elementFromPoint){var n=n.touches?n.touches[0]:n;e=document.elementFromPoint(n.clientX,n.clientY)}else e=t.target;var o=this.faceNodes.indexOf(e);return-1===o?null:this.faces[o]},dragStart:function(t){t.preventDefault(),t=t.touches?t.touches[0]:t,this.drag.mouse=[t.clientX,t.clientY],document.body.addEventListener("mousemove",this.dragMove),document.body.addEventListener("mouseup",this.dragEnd)},dragMove:function(t){t=t.touches?t.touches[0]:t;var e=[t.clientX,t.clientY],n=e[0]-this.drag.mouse[0],o=e[1]-this.drag.mouse[1],s=Math.sqrt(n*n+o*o);if(s){var r=[-o/s,n/s];this.drag.mouse=e,this.rotation=w.fromRotation([r[0],r[1],0],s/2).multiply(this.rotation),this.$set(this.styleObj,"transform","translateZ("+(-u.SIZE/2-u.SIZE)+"px) "+this.rotation.toRotation()+" translateZ("+u.SIZE/2+"px)")}},dragEnd:function(){document.body.removeEventListener("mousemove",this.dragMove),document.body.removeEventListener("mouseup",this.dragEnd)}}},E=S,_=Object(p["a"])(E,s,r,!1,null,null,null),j=_.exports;n("8e1f");o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(j)}}).$mount("#app")},"8e1f":function(t,e,n){}});
//# sourceMappingURL=app.e0997fd9.js.map