(this["webpackJsonplearning-english"]=this["webpackJsonplearning-english"]||[]).push([[0],{21:function(e,t,a){},25:function(e,t,a){e.exports=a(40)},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(22),r=a.n(c),l=a(5);a(30),a(31),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=a(11),o=a(6),m=a(7),u=a(10),d=a(8),h=a(9),b=a(15),E=(a(32),a(13)),p=(a(33),function(e){return s.a.createElement("div",{className:"navigation"},s.a.createElement("button",{onClick:e.openSidebar,className:"btnMenu"},s.a.createElement(E.c,null)))}),v=(a(34),function(e){return s.a.createElement("div",{style:e.styles.sidebar,onClick:e.closeSidebar,className:"sidebar"},s.a.createElement("button",{className:"btnClose"},s.a.createElement(E.a,null)),s.a.createElement("div",{className:"sidebarContainer"},s.a.createElement(l.b,{to:"/exercises"},"Exercises")))}),f=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={styles:{sidebar:{width:0}}},a.openSidebar=a.openSidebar.bind(Object(b.a)(a)),a.closeSidebar=a.closeSidebar.bind(Object(b.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"openSidebar",value:function(){this.setState({styles:{sidebar:{width:"250px"}}})}},{key:"closeSidebar",value:function(){this.setState({styles:{sidebar:{width:0}}})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(v,{styles:this.state.styles,closeSidebar:this.closeSidebar}),s.a.createElement(p,{openSidebar:this.openSidebar}))}},{key:"componentDidMount",value:function(){localStorage.getItem("learningEnglish")||localStorage.setItem("learningEnglish",JSON.stringify({exercises:{}}))}}]),t}(s.a.Component),g=function(e){return fetch("https://summertime-sadness.herokuapp.com/api/"+e).then((function(e){return e.json()}))},N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleLocal=function(e){var t={};return e.forEach((function(e){t["lesson"+e.id]=[]})),t},a.state={lessons:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){this.state.lessons.sort((function(e,t){return 18===e.id?1:18===t.id?-1:e.id-t.id}));var e=this.state.lessons.map((function(e,t){return s.a.createElement("li",{key:t,className:"list-group-item li-nav"},s.a.createElement(l.b,{to:"/exercises/".concat(e.id),className:"nav-item"},e.title,s.a.createElement("span",{className:"itemRight"},s.a.createElement("span",{className:"text-success"},"0"),"/",e.exercises_count," \xa0",s.a.createElement(E.b,null))))}));return s.a.createElement("div",null,s.a.createElement(f,null),s.a.createElement("div",{className:"main"},s.a.createElement("div",{className:"card"},s.a.createElement("ul",{className:"list-group list-group-flush"},e))))}},{key:"componentDidMount",value:function(){var e=this,t=JSON.parse(localStorage.getItem("learningEnglish"));g("lessons").then((function(a){e.setState({lessons:a}),t.exercises=e.handleLocal(a),localStorage.setItem("learningEnglish",JSON.stringify(t))}))}}]),t}(s.a.Component),O=(a(21),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleAnswer=function(e){var t=JSON.parse(localStorage.getItem("learningEnglish"));console.log(t)},a.state={data:{},exercises:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.exercises.map((function(e,t){return s.a.createElement("div",{key:t,className:"card item"},s.a.createElement("div",{className:"card-body"},s.a.createElement("p",null,t+1,". ",e.bg),s.a.createElement("textarea",{className:"form-control",rows:"2",placeholder:"..."}),s.a.createElement("details",null,s.a.createElement("summary",{className:"answer","data-id":e.id,onClick:this.handleAnswer},"Answer"),s.a.createElement("p",null,e.en))))}),this);return s.a.createElement("div",null,s.a.createElement(f,null),s.a.createElement("div",{className:"main"},e))}},{key:"componentDidMount",value:function(){var e=this;g("exercises/200/".concat(this.props.match.params.lesson)).then((function(t){e.setState({data:t,exercises:t.data})}))}}]),t}(s.a.Component)),y=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={data:{},exercises:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(f,null),s.a.createElement("div",{className:"main"},s.a.createElement("div",{className:"row M-0"},s.a.createElement("div",{className:"col-sm-3 col-xs-6 P-5"},s.a.createElement(l.b,{to:"/exercises",className:"home-item"},s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-body"},"exercises")))))))}}]),t}(s.a.Component),S=function(){return s.a.createElement(i.c,null,s.a.createElement(i.a,{exact:!0,path:"/",component:y}),s.a.createElement(i.a,{exact:!0,path:"/exercises",component:N}),s.a.createElement(i.a,{path:"/exercises/:lesson",component:O}))};r.a.render(s.a.createElement(l.a,{basename:"/learning-english"},s.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[25,1,2]]]);
//# sourceMappingURL=main.0e82b758.chunk.js.map