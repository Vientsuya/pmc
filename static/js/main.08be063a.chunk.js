(this.webpackJsonppmc=this.webpackJsonppmc||[]).push([[0],{14:function(n,t,e){},15:function(n,t,e){"use strict";e.r(t);var c=e(2),r=e.n(c),a=e(7),u=e.n(a),i=e(0),o=e(3),s={lineNum:21,stack:Array(21).fill(""),programRunning:!1,AC:0,PC:0},j=function(){return Object.assign({},s)},b=["NULL","STOP","LOAD","STORE","JUMP","JNEG","JZERO","ADD","SUB","MULT","DIV","MOD","OR","AND","NOT"],O=e(1),l=Object(c.createContext)(void 0),f=function(){var n=Object(c.useContext)(l);if(void 0===n)throw new Error("useMemory must be used within a MemoryProvider");return n},d=function(n){var t=n.children,e=Object(c.useState)(j()),r=Object(o.a)(e,2),a=r[0],u=r[1],s=function(n){return(n+1)%a.lineNum},b=function n(t,e){switch(t){case"$":return Number(e);case"@":return Number(a.stack[e]);case"&":return Number(a.stack[n("@",e)]);default:throw new Error('Unhandled instruction "'.concat(t,'" with value: ').concat(e," !"))}},f={NULL:function(n,t){u((function(n){return Object(i.a)(Object(i.a)({},n),{},{PC:s(n.PC)})}))},STOP:function(n,t){return 0},LOAD:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:b(n,t),PC:s(e.PC)})}))},STORE:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{stack:e.stack.map((function(e,c){return c===b(n,t)?a.AC:e})),PC:s(e.PC)})}))},JUMP:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{PC:b(n,t)})}))},JNEG:function(n,t){a.AC<0?u((function(e){return Object(i.a)(Object(i.a)({},e),{},{PC:b(n,t)})})):u((function(n){return Object(i.a)(Object(i.a)({},n),{},{PC:s(n.PC)})}))},JZERO:function(n,t){0!==a.AC?u((function(n){return Object(i.a)(Object(i.a)({},n),{},{PC:s(n.PC)})})):u((function(e){return Object(i.a)(Object(i.a)({},e),{},{PC:b(n,t)})}))},ADD:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:Number(e.AC)+b(n,t),PC:s(e.PC)})}))},SUB:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:Number(e.AC)-b(n,t),PC:s(e.PC)})}))},MULT:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:e.AC*b(n,t),PC:s(e.PC)})}))},DIV:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:e.AC/b(n,t),PC:s(e.PC)})}))},MOD:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:e.AC%b(n,t),PC:s(e.PC)})}))},OR:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:e.AC||b(n,t)?1:0,PC:s(e.PC)})}))},AND:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:e.AC&&b(n,t)?1:0,PC:s(e.PC)})}))},NOT:function(n,t){u((function(e){return Object(i.a)(Object(i.a)({},e),{},{AC:b(n,t)?1:0,PC:s(e.PC)})}))}},d={memory:a,setMemory:u,commands:f};return Object(O.jsx)(l.Provider,{value:d,children:t})},m=e(8),C=function(){var n=f().memory;return Object(O.jsxs)("div",{className:"register-values",children:[Object(O.jsxs)("span",{children:["AC: ",n.AC]}),Object(O.jsxs)("span",{children:["PC: ",n.PC]})]})},P=function(n){var t=n.lineNumber,e=f(),r=e.memory,a=e.setMemory,u=Object(c.useState)(""),s=Object(o.a)(u,2),j=s[0],l=s[1],d=Object(c.useState)(!1),m=Object(o.a)(d,2),C=m[0],P=m[1],v=Object(c.useState)([]),N=Object(o.a)(v,2),p=N[0],h=N[1],A=t===r.PC&&r.programRunning,g=A?"current-line-num":"line-count-num",x=A?"current-line-input":"";return Object(O.jsxs)("div",{className:"line",children:[Object(O.jsxs)("div",{className:"".concat(g," ").concat(C?"focused-line":""),children:[t,"."]}),Object(O.jsxs)("div",{className:"auto-complete-text-box",children:[Object(O.jsx)("input",{className:"".concat(x," ").concat(j?"input-error":""),type:"text",onFocus:function(){P(!0)},onBlur:function(n){var t;P(!1),l(""===(t=n.target.value)||RegExp(/[\w]+ [$@&]+ \d+/).test(t)?"":"Invalid Format")},disabled:r.programRunning,value:r.stack[t],onChange:function(n){!function(n){var e=n.target.value.toUpperCase();a((function(n){return Object(i.a)(Object(i.a)({},n),{},{stack:n.stack.map((function(n,c){return c===t?e:n}))})}))}(n),function(n){var t=n.target.value,e=[];if(t.length>0){var c=new RegExp("^".concat(t),"i");e=b.sort().filter((function(n){return c.test(n)}))}h(e)}(n)}}),Object(O.jsx)("div",{className:"suggestion-box",children:0===p.length?null:Object(O.jsx)("ul",{children:p.map((function(n,e){return Object(O.jsx)("li",{className:"suggestion",onClick:function(){return e=n,a((function(n){return Object(i.a)(Object(i.a)({},n),{},{stack:n.stack.map((function(n,c){return t===c?e:n}))})})),void h([]);var e},children:n},e)}))})})]})]})},v=function(n){var t=n.lineCount,e=n.addLine;return Object(O.jsxs)("div",{className:"editor",children:[Object(O.jsx)(C,{}),Object(O.jsxs)("div",{className:"line-container",children:[Array.from({length:t},(function(n,t){return Object(O.jsx)(P,{lineNumber:t},t)})),Object(O.jsx)("div",{className:"add-line",onClick:function(){return e()},children:"Dodaj Lini\u0119"})]})]})},N=(e(14),function(){var n=f(),t=n.memory,e=n.setMemory,c=n.commands,r=function(n){if(console.log("[".concat(t.PC,"]: "),{operation:n}),!n||!isNaN(n))return c.NULL(null,null);var e=function(n){var t=n.trim().split(" "),e=Object(o.a)(t,3),c=e[0],r=e[1],a=e[2];return console.log({command:c,addressType:r,value:a}),{command:c,addressType:r,value:a}}(n),r=e.command,a=e.addressType,u=e.value;if(!(r in c))throw new Error('Unknown command "'.concat(r,'"'));return c[r.toUpperCase()](a,u)},a=t.programRunning,u=!t.programRunning,s=!t.programRunning||0!==t.PC;return Object(O.jsxs)("div",{className:"main-container",children:[Object(O.jsx)(v,{lineCount:t.lineNum,addLine:function(){e((function(n){return Object(i.a)(Object(i.a)({},n),{},{stack:[].concat(Object(m.a)(n.stack),[""]),lineNum:n.lineNum+1})}))}}),Object(O.jsxs)("div",{className:"button-box",children:[Object(O.jsx)("button",{className:"run-program",disabled:a,onClick:function(){console.log(t),e((function(n){return Object(i.a)(Object(i.a)({},n),{},{programRunning:!0})}))},children:"ZA\u0141ADUJ DO PAMI\u0118CI"}),Object(O.jsx)("button",{disabled:u,onClick:function(){return r(t.stack[t.PC])},children:"WYKONAJ INSTRUKCJE"}),Object(O.jsx)("button",{disabled:s,onClick:function(){t.stack.forEach((function(n){r(n)})),e((function(n){return Object(i.a)(Object(i.a)({},n),{},{programRunning:!1})}))},children:"WYKONAJ CA\u0141Y PROGRAM"}),Object(O.jsx)("button",{onClick:function(){e(j())},children:"RESET"})]})]})});u.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(d,{children:Object(O.jsx)(N,{})})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.08be063a.chunk.js.map