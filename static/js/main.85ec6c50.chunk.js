(this["webpackJsonplog-painter"]=this["webpackJsonplog-painter"]||[]).push([[0],{13:function(e,n,t){"use strict";t.d(n,"f",(function(){return l})),t.d(n,"a",(function(){return v})),t.d(n,"b",(function(){return h})),t.d(n,"e",(function(){return y.c})),t.d(n,"d",(function(){return y.a})),t.d(n,"c",(function(){return E.a}));var a=t(318),r=t(323),l=Object(a.a)((function(){return Object(r.a)({Control:{display:"flex",marginTop:20},Body:{},Container:{},ControlButton:{width:100,marginLeft:10}})})),c=t(0),o=t.n(c),i=t(153),u=t(376),s=t(362),m=t(360),d=t(361),f=t(359),v=function(e){var n=e.open,t=e.onClose,a=e.body;return o.a.createElement("div",null,o.a.createElement(u.a,{open:n,onClose:t,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},o.a.createElement(f.a,null,"\u51fa\u9519\u5566"),o.a.createElement(m.a,null,o.a.createElement(d.a,{id:"alert-dialog-description"},a)),o.a.createElement(s.a,null,o.a.createElement(i.a,{onClick:t,color:"primary",autoFocus:!0},"\u597d\u7684"))))},p=t(75),b=t(12),g=t(94),h=function(e){var n=e.step1,t=e.step2,a=e.step3,r=e.initConfig,l=e.saveConfig,i=Object(c.useState)(0),u=Object(b.a)(i,2),s=u[0],m=u[1],d=Object(c.useState)([]),f=Object(b.a)(d,2),v=f[0],h=f[1],y=Object(b.a)(v,2),E=y[0],j=y[1],O=Object(c.useState)((function(){return[r()]})),C=Object(b.a)(O,2),S=C[0],x=C[1];function w(e){l(e),x([].concat(Object(p.a)(S),[e]))}function N(){x(S.slice(0,S.length-1)),l(S[S.length-1])}return o.a.createElement(g.a,{container:!0,xs:12},o.a.createElement(n,{key:"".concat(s,"-1"),show:0===v.length,onNextStep:function(e,n){w(n),h([e])}}),null==E?null:o.a.createElement(t,{key:"".concat(s,"-2"),show:1===v.length,args:E,onPrevStep:function(){N(),h([])},onNextStep:function(e,n){w(n),h([v[0],e])}}),null==j?null:o.a.createElement(a,{key:"".concat(s,"-3"),show:2===v.length,args:j,onPrevStep:function(){N(),h([v[0]])},onRestart:function(e){h([]),m(s+1),x([e]),l(e)}}))},y=t(30),E=t(62)},133:function(e,n,t){"use strict";(function(e){t.d(n,"a",(function(){return E}));var a=t(7),r=t(12),l=t(0),c=t.n(l),o=t(147),i=t.n(o),u=t(318),s=t(323),m=t(153),d=t(94),f=t(322),v=t(320),p=t(148),b=t.n(p),g=t(13),h=t(19),y=Object(u.a)((function(){return Object(s.a)({Output:{fontFamily:"\u5fae\u8f6f\u96c5\u9ed1",fontSize:14,padding:"16px 14px",borderColor:"#0000003b","&:hover":{borderColor:"#000000de"},borderStyle:"solid",borderWidth:1,borderRadius:4,maxHeight:200,overflowY:"scroll","& > p":{margin:"0.5em 0"}}})})),E=function(n){var t=n.args,o=n.onPrevStep,u=n.onRestart,s=Object(l.useContext)(g.d),p=Object(g.f)(),E=y(),j=Object(l.useRef)(s.players||{}).current,O=Object(l.useState)({open:!1}),C=Object(r.a)(O,2),S=C[0],x=C[1],w=function(e){x({body:e,open:!0})},N=h.b[s.general.rendererScheme],k=t.lines.map((function(e){var n,t,a,r;return{content:e.content,playerName:null!==(n=null===(t=j[e.playerId])||void 0===t?void 0:t.displayName)&&void 0!==n?n:"\u9519\u8bef",playerColor:null!==(a=null===(r=j[e.playerId])||void 0===r?void 0:r.color)&&void 0!==a?a:"black"}})),B=Object(l.useState)((function(){var n=new i.a("#clipboard-button",{target:function(){var e=document.getElementById("result-body");if(null==e)throw w("\u590d\u5236\u9519\u8bef\uff1a\u627e\u4e0d\u5230\u590d\u5236\u5bf9\u8c61"),new Error("\u627e\u4e0d\u5230\u590d\u5236\u5bf9\u8c61");return e}});return n.on("success",(function(){e((function(){return w("\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f\uff01")}))})),n.on("error",(function(e){w("\u590d\u5236\u9519\u8bef\uff01\u8bf7\u53cc\u51fb\u6587\u672c\u6846\u624b\u52a8\u590d\u5236\u5427\uff01"),console.error(e)})),n})),L=Object(r.a)(B,1)[0];return Object(l.useEffect)((function(){return function(){L.destroy()}})),n.show?c.a.createElement(d.a,{container:!0,className:p.Container},c.a.createElement(d.a,{item:!0,xs:12,className:p.Body},c.a.createElement("div",{className:E.Output,onDoubleClick:function(){var e=window.getSelection();if(e){var n=document.getElementById("result-body");if(n){var t=document.createRange();t.selectNode(n),e.removeAllRanges(),e.addRange(t)}}},id:"result-body"},c.a.createElement(v.a,{style:{float:"right",marginTop:-15},id:"clipboard-button"},c.a.createElement(b.a,null)),Object(h.a)(k,N,!1))),c.a.createElement(d.a,{item:!0,xs:12,justify:"flex-end",className:p.Control},c.a.createElement(m.a,{variant:"outlined",color:"secondary",className:p.ControlButton,onClick:o},"\u4e0a\u4e00\u6b65"),c.a.createElement(m.a,{variant:"contained",className:p.ControlButton,style:{backgroundColor:"#d4d45f"},onClick:function(){u(s)}},"\u518d\u505a\u4e00\u56e2")),c.a.createElement(f.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:S.open,autoHideDuration:6e3,onClose:function(){x(Object(a.a)(Object(a.a)({},S),{},{open:!1}))},message:S.body})):null}}).call(this,t(312).setImmediate)},170:function(e,n,t){e.exports=t(317)},178:function(e,n,t){},179:function(e,n,t){},19:function(e,n,t){"use strict";t.d(n,"b",(function(){return s})),t.d(n,"a",(function(){return m}));var a=t(0),r=t.n(a),l=t(92),c=t.n(l),o=t(139),i=t.n(o);function u(e,n){return r.a.createElement("p",{key:n,style:{color:e.playerColor}},"<".concat(e.playerName,"> "),e.content.map((function(e,n){return(0===n?[]:[r.a.createElement("br",{key:"br-".concat(n)})]).concat([r.a.createElement("span",{key:n},e)])})))}var s={"standard-rich":{id:"standard-rich",name:"\u6807\u51c6\u5c16\u62ec\u53f7\uff08\u5bcc\u6587\u672c\uff09",description:"\u6700\u5e38\u89c1\u7684\u683c\u5f0f\u3002\u8f93\u51fa\u5bcc\u6587\u672c\uff0c\u53ef\u76f4\u63a5\u590d\u5236\u7c98\u8d34\u5230Word\u91cc\u3002\u9884\u89c8\u5982\u4e0b\uff1a",allowNewPalette:!0,previewRenderer:{line:u},finalRenderer:{line:u}},"standard-bbs":{id:"standard-bbs",name:"\u6807\u51c6\u5c16\u62ec\u53f7\uff08BBS\b\u4ee3\u7801\uff09",description:"\u6700\u5e38\u89c1\u7684\u683c\u5f0f\u3002\u8f93\u51faBBS\u4ee3\u7801\uff0c\u53ef\u590d\u5236\u7c98\u8d34\u5230\u679c\u56ed\u3002\u6700\u7ec8\u6548\u679c\u9884\u89c8\u5982\u4e0b\uff1a",allowNewPalette:!1,previewRenderer:{line:u},finalRenderer:{line:function(e){function n(n,t){return e.apply(this,arguments)}return n.toString=function(){return e.toString()},n}((function(e,n){return r.a.createElement("span",{key:n},"[color=".concat(e.playerColor,"]<").concat(e.playerName,"> "),e.content.map((function(e,n){return(0===n?[]:[r.a.createElement("br",{key:"br-".concat(n)})]).concat([r.a.createElement("span",{key:n},e)])})),"[/color]",r.a.createElement("br",null))}))}},"tab-rich":{id:"tab-rich",name:"Tab\u5206\u5272\uff08\u5bcc\u6587\u672c\uff09",description:"\u4ee5Tab\u5206\u5272\u5404\u5143\u7d20\uff0c\u4fdd\u8bc1\u5782\u76f4\u5bf9\u9f50\u7684\u7279\u6b8a\u683c\u5f0f\u3002\u8f93\u51fa\u5bcc\u6587\u672c\uff0c\u53ef\u76f4\u63a5\u590d\u5236\u7c98\u8d34\u5230Word\u7b49\u8f6f\u4ef6\u4e2d\u3002\u5927\u81f4\u6548\u679c\u9884\u89c8\u5982\u4e0b\uff08\u6700\u7ec8\u6548\u679c\u53d6\u51b3\u4e8e\u6587\u6863\u8bbe\u5b9a\uff09\uff1a",allowNewPalette:!0,previewRenderer:{body:function(e){return r.a.createElement("table",{className:"tab-renderer-preview-table"},e)},line:function(e){function n(n,t){return e.apply(this,arguments)}return n.toString=function(){return e.toString()},n}((function(e,n){return r.a.createElement("tr",{key:n,style:{color:e.playerColor}},r.a.createElement("td",null,e.playerName),r.a.createElement("td",null,e.content.map((function(e,n){return(0===n?[]:[r.a.createElement("br",{key:"br-".concat(n)})]).concat([r.a.createElement("span",{key:n},e)])}))))}))},finalRenderer:{line:function(e){function n(n,t){return e.apply(this,arguments)}return n.toString=function(){return e.toString()},n}((function(e,n){return r.a.createElement("pre",{key:n,style:{color:e.playerColor},dangerouslySetInnerHTML:{__html:"&#9;".concat(c()(e.playerName),"&#9;").concat(i()(e.content.map(c.a),"&#11;"))}})}))}}};function m(e,n,t){var a=t?n.previewRenderer:n.finalRenderer,r=e.map(a.line);return null!=a.body?a.body(r):r}},30:function(e,n,t){"use strict";t.d(n,"b",(function(){return s})),t.d(n,"d",(function(){return m})),t.d(n,"c",(function(){return f})),t.d(n,"a",(function(){return v}));var a=t(7),r=t(0),l=t.n(r),c=t(90),o=t.n(c),i=t(62),u=t(19),s={removeLinesStartedWithParenthesis:!1,removeLinesStartedWithDot:!1,removeLinesStartedWithLenticular:!1,regularizeQuotes:!1,palette:"v2",rendererScheme:"standard-rich"},m=function(e){var n,t=null!==e&&void 0!==e?e:{},r={players:null!==(n=t.players)&&void 0!==n?n:{},general:Object(a.a)(Object(a.a)({},s),t.general)};return r.general.palette in i.a||(r.general.palette=null==e?"v2":"bbs"),r.general.rendererScheme in u.b||(r.general.rendererScheme="standard-rich"),u.b[r.general.rendererScheme].allowNewPalette||"v2"!=r.general.palette||(r.general.rendererScheme="standard-rich"),r},d=m(void 0),f={load:function(){return o.a.get("config")},save:function(e){o.a.set("config",e)}},v=l.a.createContext(d)},317:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(11),c=t.n(l),o=t(12),i=t(136),u=t.n(i),s=t(137),m=t.n(s),d=t(318),f=t(323),v=t(149),p=t(371),b=t(369),g=t(377),h=t(372),y=t(320),E=t(370),j=t(93),O=(t(178),t(179),t(7)),C=t(153),S=t(94),x=t(375),w=t(13),N=t(39),k=t(140),B=t.n(k),L=t(141),R=t.n(L),P=t(142),I=t.n(P),W=t(76),$=t.n(W);function D(e){if(null==e)return null;for(var n=e.content,t=/^.*\u64a4\u56de\u4e86\u4e00\u6761\u6d88\u606f( \u91cd\u65b0\u7f16\u8f91)?$/,a=/^.*\u64a4\u56de\u4e86\u6210\u5458.*\u7684\u4e00\u6761\u6d88\u606f$/,r=/^.*\u64a4\u56de\u4e86\u4e00\u6761\u6210\u5458\u6d88\u606f$/,l=/^\u4f60\u548c.*\u6709\d+\u4e2a\u5171\u540c\u597d\u53cb\uff0c\u70b9\u51fb\u6dfb\u52a0\u597d\u53cb\u3002$/,c=/^.*\u52a0\u5165\u672c\u7fa4\u3002$/,o=/^.*\u9080\u8bf7.*\u52a0\u5165\u4e86\u672c\u7fa4\u3002$/,i=n.length-1;i>=0&&[/^ *$/,t,a,r,l,c,o].some((function(e){return e.exec(n[i])}));i--);return e.content=e.content.slice(0,i+1),e}var z=/\(\d+\)|<.+@.+\..+>/,T=/(?:\u3010(.{1,6})\u3011)?/,A=/(?:(?:\u4e0a\u5348|\u4e0b\u5348) )?\d{1,2}:\d{2}:\d{2}(?: (?:AM|PM))?/;function V(e){if(null==e)return null;for(var n=e.content,t=/^\u2014 \u2014  \d{4}-\d{1,2}-\d{1,2}  \u2014 \u2014$/,a=n.length-1;a>=0&&[/^ *$/,t].some((function(e){return e.exec(n[a])}));a--);return e.content=e.content.slice(0,a+1),e}function F(e){if(null==e)return null;for(var n=e.content,t=/^ \d{4}-\d{2}-\d{2}$/,a=new RegExp("^".concat(A.source,".*\u64a4\u56de\u4e86\u4e00\u6761\u6d88\u606f$")),r=new RegExp("^".concat(A.source,".*\u64a4\u56de\u4e86\u6210\u5458.*\u7684\u4e00\u6761\u6d88\u606f$")),l=new RegExp("^".concat(A.source,".*\u64a4\u56de\u4e86\u4e00\u6761\u6210\u5458\u6d88\u606f$")),c=new RegExp("^".concat(A.source,".*\u52a0\u5165\u672c\u7fa4\u3002$")),o=n.length-1;o>=0&&[/^ *$/,t,a,r,l,c].some((function(e){return e.exec(n[o])}));o--);return e.content=e.content.slice(0,o+1),e}function H(e){if(null==e)return null;for(var n=e.content;n.length>0&&""===n[0].trim();)n.splice(0,1);for(;n.length>0&&""===n[n.length-1].trim();)n.splice(n.length-1,1);return 0===n.length?null:e}function Q(e){return I()(e,"()<>")}var M={headerParser:function(e){var n=new RegExp("\\d{4}-\\d{2}-\\d{2} ".concat(A.source)),t=new RegExp("^(".concat(n.source,") (.*?)(").concat(z.source,")?$")).exec(e);if(!t)return null;var a=Object(o.a)(t,4),r=(a[0],a[1]),l=a[2],c=a[3];return{player:{name:l,number:null==c?void 0:Q(c)},time:r}},logLineConverter:function(e){return["10000","1000000"].includes(e.player.number||"")?null:H(e)}},_={headerParser:function(e){var n=new RegExp("(?:\\d{1,4}\\/\\d{1,2}\\/\\d{1,4} )?".concat(A.source)),t=new RegExp("^".concat(T.source,"(.*?) (").concat(n.source,")$")).exec(e);if(!t)return null;var a=Object(o.a)(t,4),r=(a[0],a[1]);return{player:{name:a[2],title:r},time:a[3]}},logLineConverter:function(e){return $()(D,H)(e)}},q={headerParser:function(e){var n=new RegExp("^".concat(T.source,"(.*?)(").concat(z.source,") (").concat(A.source,")$")).exec(e);if(!n)return null;var t=Object(o.a)(n,5),a=(t[0],t[1]),r=t[2],l=t[3],c=t[4];return{player:{name:r,title:a,number:Q(l)},time:c}},logLineConverter:function(e){return $()(F,H)(e)}},J={headerParser:function(e){var n=/^(.*?) {2}(\d{1,2}:\d{2}:\d{2}) *$/.exec(e);if(!n)return null;var t=Object(o.a)(n,3);t[0];return{player:{name:t[1]},time:t[2]}},logLineConverter:function(e){return $()(V,H)(e)}};function U(e){return e.number?"qq:".concat(e.number):"name:".concat(e.name)}function Y(e,n){var t=new Set;return null!=n&&t.add(n),{playerId:e,names:t}}function G(e){return function(e){var n,t=[],a={},r=Object(N.a)(e.logLines);try{for(r.s();!(n=r.n()).done;){var l=n.value,c=l.player,o=l.time,i=l.content,u=U(c);a.playerId||(a[u]=Y(u,c.number)),a[u].names.add(c.name),t.push({playerId:u,time:o,title:c.title,content:i})}}catch(s){r.e(s)}finally{r.f()}return{lines:t,players:B()(a)}}(function(e){var n,t=[],a=void 0,r=Object(N.a)(e.split("\n"));try{var l=function(){var e=n.value,r=function(){if(a)return a.headerParser(e);for(var n=0,t=[q,J,M,_];n<t.length;n++){var r=t[n],l=r.headerParser(e);if(l)return a=r,l}return null}();if(r)t.push(Object(O.a)(Object(O.a)({},r),{},{content:[]}));else if(a){var l=t[t.length-1];l&&l.content.push(e)}};for(r.s();!(n=r.n()).done;)l()}catch(c){r.e(c)}finally{r.f()}return a?{logLines:R()(t.map(a.logLineConverter))}:{logLines:[]}}(e))}var K=function(e){var n=e.onNextStep,t=Object(a.useContext)(w.d),l=Object(w.f)(),c=Object(a.useState)(""),i=Object(o.a)(c,2),u=i[0],s=i[1],m=Object(a.useState)({open:!1}),d=Object(o.a)(m,2),f=d[0],v=d[1];return e.show?r.a.createElement(S.a,{container:!0,className:l.Container},r.a.createElement(S.a,{item:!0,xs:12,className:l.Body},r.a.createElement(x.a,{id:"outlined-basic",label:"\u539f\u6587",placeholder:"\u628a\u539f\u6587\u7c98\u8d34\u5230\u8fd9\u91cc\uff0c\u7136\u540e\u70b9\u51fb\u4e0b\u4e00\u6b65\u3002",variant:"outlined",multiline:!0,fullWidth:!0,rows:10,className:"Source-textfield",onChange:function(e){s(e.target.value)},value:u})),r.a.createElement(S.a,{item:!0,xs:12,justify:"flex-end",className:l.Control},r.a.createElement(C.a,{variant:"contained",color:"primary",disabled:u.length<5,className:l.ControlButton,onClick:function(){var e=function(e){var n=G(e);if(0!==n.players.length&&0!==n.lines.length)return n}(u);null==e?v({open:!0,body:"\u65e0\u6cd5\u4ece\u8fd9\u6bb5\u8bb0\u5f55\u4e2d\u627e\u5230\u53ef\u8bc6\u522b\u7684\u90e8\u5206\uff01\u8bf7\u68c0\u67e5\u540e\u518d\u8bd5\u4e00\u6b21\u5427\uff01"}):n(e,t)}},"\u4e0b\u4e00\u6b65")),r.a.createElement(w.a,Object.assign({onClose:function(){return v(Object(O.a)(Object(O.a)({},f),{},{open:!1}))}},f))):null},X=t(63),Z=t(75),ee=t(69),ne=t.n(ee),te=t(143),ae=t.n(te),re=t(70),le=t.n(re),ce=t(144),oe=t.n(ce),ie=t(145),ue=t.n(ie),se=t(146),me=t.n(se),de=t(379),fe=t(365),ve=t(368),pe=t(373),be=t(367),ge=t(378);function he(e){var n=['"',"\u201c","\u201d"],t=["\u201c","\u201d"],a=1;return e.map((function(e){return e.split("").map((function(e){return n.includes(e)?t[a=1-a]:e})).join("")}))}var ye=t(319),Ee=t(380),je=t(376),Oe=t(362),Ce=t(360),Se=t(361),xe=t(359),we=Object(d.a)((function(){return Object(f.a)({outerButton:{marginLeft:10},paper:{display:"flex",flexDirection:"row",background:"#f5f5f5"},menu:{flex:"100pt 0 0"},descriptionBox:{display:"flex",flexDirection:"column",fontSize:"medium",overflowX:"hidden"},descriptionText:{flex:"80pt 1 0",padding:20},descriptionDisplay:{flex:"20pt 0 0",height:20,display:"inline-flex",background:"white"},descriptionDisplayCell:{flex:"1",height:20}})})),Ne=function(e){var n=e.value,t=e.setValue,a=e.className,l=we(),c=r.a.useState(!1),i=Object(o.a)(c,2),u=i[0],s=i[1],m=r.a.useState(Object.values(w.c)[0].id),d=Object(o.a)(m,2),f=d[0],v=d[1],p=w.c[n],b=function(){s(!1)};return r.a.createElement("div",{className:a},"\u5f53\u524d\u914d\u8272\u65b9\u6848\uff1a",p.name,r.a.createElement(C.a,{color:"secondary",size:"small",variant:"contained",onClick:function(){s(!0),v(n)},className:l.outerButton},"\u5207\u6362"),r.a.createElement(je.a,{open:u,onClose:b},r.a.createElement(xe.a,null,"\u66f4\u6362\u914d\u8272\u65b9\u6848"),r.a.createElement(Ce.a,null,r.a.createElement(Se.a,null,"\u4f60\u5f53\u524d\u7684\u914d\u8272\u65b9\u6848\u662f\u201c",p.name,"\u201d\u3002",r.a.createElement("br",null)),r.a.createElement(ye.a,{className:l.paper},r.a.createElement(Ee.a,{className:l.menu},Object.values(w.c).map((function(e){return r.a.createElement(ge.a,{key:e.id,selected:e.id==f,onClick:function(){v(e.id)}},e.name)}))),r.a.createElement("div",{className:l.descriptionBox},r.a.createElement("div",{className:l.descriptionText},w.c[f].description),r.a.createElement("div",{className:l.descriptionDisplay},Object.values(w.c[f].contents()).map((function(e){return r.a.createElement("div",{key:e.value,className:l.descriptionDisplayCell,style:{background:e.value}})}))))),r.a.createElement(Se.a,null,"\u66f4\u6362\u914d\u8272\u65b9\u6848\u540e\uff0c\u6240\u6709\u73b0\u6709\u914d\u8272\u8bbe\u7f6e\u5c06\u91cd\u7f6e\u3002")),r.a.createElement(Oe.a,null,r.a.createElement(C.a,{onClick:function(){s(!1),t(f)},color:"primary",variant:"contained",disabled:f==n},"\u786e\u8ba4\u66f4\u6362"),r.a.createElement(C.a,{onClick:b,color:"secondary"},"\u4e0d\u4e86"))))},ke=t(19),Be=t(30),Le=Object(d.a)((function(){return Object(f.a)({PlayerConfig:{},Center:{display:"flex",alignItems:"center"}})})),Re=function(e){var n=e.enabled,t=e.setEnabled,a=(e.name,e.setName),l=e.color,c=e.setColor,o=e.palette,i=Le();return r.a.createElement(S.a,{item:!0,xs:6},r.a.createElement(S.a,{container:!0},r.a.createElement(S.a,{item:!0,xs:8},r.a.createElement(x.a,{defaultValue:e.name,variant:"outlined",fullWidth:!0,onBlur:function(e){a(e.target.value||"")}})),r.a.createElement(S.a,{item:!0,xs:4,className:i.Center},r.a.createElement(S.a,{container:!0},r.a.createElement(be.a,{row:!0,className:i.Center},r.a.createElement(fe.a,null,r.a.createElement(de.a,{checked:n,onChange:function(e,n){t(n)},value:"primary"})),r.a.createElement(fe.a,{style:n?{}:{visibility:"hidden"}},r.a.createElement(pe.a,{style:{backgroundColor:l,color:ne()(l).isLight()?"black":"white",padding:"4px 0px",textAlign:"center"},native:!0,value:l,onChange:function(e){c(e.target.value)}},Object.values(o).map((function(e){var n=e.value,t=e.name,a=e.isLight;return r.a.createElement("option",{key:n,value:n,style:{backgroundColor:n,color:a?"black":"white",textAlign:"center"}},t||n)})))))))))},Pe=function(e){var n=e.players,t=e.setPlayer,a=e.palette;return r.a.createElement(S.a,{container:!0,style:{overflowY:"auto"}},Object.values(n).map((function(e){return r.a.createElement(Re,{key:e.id,name:e.name,setName:function(n){t(e.id,Object(O.a)(Object(O.a)({},e),{},{name:n}))},enabled:e.enabled,setEnabled:function(n){t(e.id,Object(O.a)(Object(O.a)({},e),{},{enabled:n}))},color:e.color,setColor:function(n){t(e.id,Object(O.a)(Object(O.a)({},e),{},{color:n}))},palette:a})})))},Ie=Object(d.a)((function(){return Object(f.a)({PaletteSwitch:{marginBottom:10,marginTop:20},RendererSelect:{display:"flex",alignItems:"center",marginTop:20},RendererDescription:{fontSize:"90%",color:"gray"},RendererPreview:{padding:"0px 13px",border:"1px solid gray"}})})),We=function(e){var n=e.value,t=e.setValue,a=e.setPalette,l=e.className,c=Ie();return r.a.createElement(be.a,{className:l},r.a.createElement(ve.a,{control:r.a.createElement(de.a,{checked:n.removeLinesStartedWithParenthesis,onChange:function(e){t(Object(O.a)(Object(O.a)({},n),{},{removeLinesStartedWithParenthesis:e.target.checked}))},color:"primary"}),label:"\u53bb\u6389\u4ee5(\uff08\u5f00\u5934\u7684\u884c"}),r.a.createElement(ve.a,{control:r.a.createElement(de.a,{checked:n.removeLinesStartedWithDot,onChange:function(e){t(Object(O.a)(Object(O.a)({},n),{},{removeLinesStartedWithDot:e.target.checked}))},color:"primary"}),label:"\u53bb\u6389\u4ee5.\u3002\u5f00\u5934\u7684\u884c"}),r.a.createElement(ve.a,{control:r.a.createElement(de.a,{checked:n.removeLinesStartedWithLenticular,onChange:function(e){t(Object(O.a)(Object(O.a)({},n),{},{removeLinesStartedWithLenticular:e.target.checked}))},color:"primary"}),label:"\u53bb\u6389\u4ee5\u3010\u5f00\u5934\u7684\u884c"}),r.a.createElement(ve.a,{control:r.a.createElement(de.a,{checked:n.regularizeQuotes,onChange:function(e){t(Object(O.a)(Object(O.a)({},n),{},{regularizeQuotes:e.target.checked}))},color:"primary"}),label:"\u81ea\u52a8\u7ea0\u6b63\u524d\u540e\u5f15\u53f7"}),r.a.createElement(Ne,{value:n.palette,setValue:a,className:c.PaletteSwitch}))};function $e(e){var n={},t=[];return e.forEach((function(e){n[e.playerId]||(t.push(e),n[e.playerId]=!0)})),t}var De=function(e){var n=e.players,t=e.schemeId,l=e.setScheme,c=e.className,o=Object(a.useRef)(ae()($e)).current,i=Ie(),u=Object.values(ke.b).filter((function(n){return"v2"!=e.paletteId||n.allowNewPalette})),s=o(e.lines).filter((function(e){return n[e.playerId].enabled})).map((function(e){var t,a,r,l;return{content:e.content,playerName:null!==(t=null===(a=n[e.playerId])||void 0===a?void 0:a.name)&&void 0!==t?t:"\u9519\u8bef",playerColor:null!==(r=null===(l=n[e.playerId])||void 0===l?void 0:l.color)&&void 0!==r?r:"black"}})),m=ke.b[t];return r.a.createElement("div",{className:c},r.a.createElement("div",{className:i.RendererSelect},"\u6392\u7248\u683c\u5f0f\uff1a",r.a.createElement(fe.a,{variant:"outlined"},r.a.createElement(pe.a,{value:t,onChange:function(e,n){var t=e.target.value;t in ke.b&&l(t)}},u.map((function(e){return r.a.createElement(ge.a,{value:e.id},e.name)}))))),r.a.createElement("div",{className:i.RendererDescription},m.description),r.a.createElement("div",{className:i.RendererPreview},Object(ke.a)(s,m,!0)))};function ze(e,n,t){var a=Object(O.a)({},t),r=e.map((function(e){var r=n[e.playerId],l=ue()(Array.from(e.names)),c=null!=r?{id:e.playerId,name:r.displayName,nameCandidates:me()([r.displayName].concat(Object(Z.a)(l))),color:r.color,enabled:r.enabled}:{id:e.playerId,name:l[0],nameCandidates:l,color:"",enabled:!0};if(!(c.color in t)){var o=Object.keys(a)[0];c.color=o}return delete a[c.color],c}));return le()(r.map((function(e){return[e.id,e]})))}function Te(e,n){var t=e;return n.removeLinesStartedWithParenthesis&&(t=t.filter((function(e){return!["\uff08","("].includes(e.content[0][0])}))),n.removeLinesStartedWithDot&&(t=t.filter((function(e){return!["\u3002","."].includes(e.content[0][0])}))),n.removeLinesStartedWithLenticular&&(t=t.filter((function(e){return!["\u3010"].includes(e.content[0][0])}))),n.regularizeQuotes&&(t=t.map((function(e){return Object(O.a)(Object(O.a)({},e),{},{content:he(e.content)})}))),t}var Ae=function(e){var n=e.args,t=e.onPrevStep,l=e.onNextStep,c=Object(a.useContext)(w.d),i=Object(w.f)(),u=Object(a.useState)((function(){return c.general||{}})),s=Object(o.a)(u,2),m=s[0],d=s[1],f=w.c[m.palette],v=Object(a.useState)(ze(n.players,c.players,f.contents())),p=Object(o.a)(v,2),b=p[0],g=p[1];return e.show?r.a.createElement(S.a,{container:!0,className:i.Container},r.a.createElement(S.a,{item:!0,xs:12,className:i.Body},r.a.createElement(We,{value:m,setValue:d,setPalette:function(e){var t="v2"==e&&!ke.b[m.rendererScheme].allowNewPalette?Be.b.rendererScheme:m.rendererScheme;d(Object(O.a)(Object(O.a)({},m),{},{palette:e,rendererScheme:t}));var a=w.c[e];g(ze(n.players,c.players,a.contents()))}}),r.a.createElement(Pe,{players:b,setPlayer:function(e,n){g(Object(O.a)(Object(O.a)({},b),{},Object(X.a)({},e,n)))},palette:f.contents()}),r.a.createElement(De,{lines:n.lines,players:b,setScheme:function(e){d(Object(O.a)(Object(O.a)({},m),{},{rendererScheme:e}))},schemeId:m.rendererScheme,paletteId:m.palette})),r.a.createElement(S.a,{item:!0,xs:12,justify:"flex-end",className:i.Control},r.a.createElement(C.a,{variant:"outlined",color:"secondary",className:i.ControlButton,onClick:t},"\u4e0a\u4e00\u6b65"),r.a.createElement(C.a,{variant:"contained",color:"primary",className:i.ControlButton,onClick:function(){l({lines:Te(n.lines,m)},{players:oe()(b,(function(e){return{displayName:e.name,color:e.color,enabled:e.enabled}})),general:m})}},"\u4e0b\u4e00\u6b65"))):null},Ve=t(133),Fe=Object(d.a)((function(){return Object(f.a)({logo:{marginRight:15,backgroundColor:"white"},horizontalFill:{flex:"1 0 auto"},toolbarIcon:{height:24,width:24,fill:"white"}})})),He=function(e){var n=e.repoUrl,t=Fe();return r.a.createElement(b.a,{position:"static"},r.a.createElement(E.a,null,r.a.createElement(g.a,{alt:"Logo",src:"/android-chrome-512x512.png",className:t.logo}),r.a.createElement(j.a,{variant:"h6",className:t.horizontalFill},"DK\u7684\u8dd1\u56e2\u8bb0\u5f55\u7740\u8272\u5668"),r.a.createElement(y.a,{"aria-label":"GitHub",href:n,target:"_blank",rel:"noopener noreferrer"},r.a.createElement(u.a,{svg:m.a.svg,className:t.toolbarIcon}))))},Qe=function(e){var n=e.configStorage,t=Object(a.useState)((function(){return Object(Be.d)(n.load())})),l=Object(o.a)(t,2),c=l[0],i=l[1],u=w.d.Provider;return r.a.createElement(u,{value:c},r.a.createElement(w.b,{step1:K,step2:Ae,step3:Ve.a,initConfig:function(){return c},saveConfig:function(e){i(e),n.save(e)}}))},Me=Object(v.a)({palette:{primary:{main:"#795548"},secondary:{main:"#00897b"}}}),_e=function(){return r.a.createElement(p.a,{theme:Me},r.a.createElement("div",{className:"root"},r.a.createElement(He,{repoUrl:"https://github.com/dkwingsmt/log-painter"}),r.a.createElement(h.a,{maxWidth:"md",className:"Body-container"},r.a.createElement(Qe,{configStorage:w.e})),r.a.createElement("p",{style:{textAlign:"center",marginTop:100,color:"#dddddd",fontSize:"small"}},"\u6700\u540e\u66f4\u65b0\u65f6\u95f4\uff1a","2021\u5e743\u670812\u65e5\u661f\u671f\u4e94")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(_e,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},62:function(e,n,t){"use strict";t.d(n,"a",(function(){return v}));var a=t(7),r=t(150),l=t(69),c=t.n(l),o=t(70),i=t.n(o),u=t(91),s=t.n(u);function m(e){return i()(e.map((function(e){var n=e.value,t=Object(r.a)(e,["value"]);return[n,Object(a.a)(Object(a.a)({},t),{},{value:n,isLight:c()(n).isLight()})]})))}var d=[{value:"black",name:"\u9ed1\u8272"},{value:"silver",name:"\u7070\u8272"},{value:"red",name:"\u7ea2\u8272"},{value:"green",name:"\u7eff\u8272"},{value:"orange",name:"\u6a58\u8272"},{value:"purple",name:"\u7d2b\u8272"},{value:"teal",name:"\u84dd\u7eff"},{value:"fuchsia",name:"\u6843\u7ea2"},{value:"yellow",name:"\u9ec4\u8272"},{value:"beige",name:"\u7c73\u8272"},{value:"brown",name:"\u68d5\u8272"},{value:"navy",name:"\u6df1\u84dd"},{value:"maroon",name:"\u7d2b\u7ea2"},{value:"limegreen",name:"\u83b1\u59c6"},{value:"white",name:"\u767d\u8272"},{value:"brown",name:"\u68d5\u8272"},{value:"blue",name:"\u84dd\u8272"},{value:"pink",name:"\u7c89\u7ea2"}],f=[{value:"black",name:"\u9ed1\u8272"},{value:"silver",name:"\u94f6\u7070"},{value:"#634200",name:"\u6df1\u8910"},{value:"#e39700",name:"\u6697\u6a59"},{value:"#d4e300",name:"\u91d1\u8272"},{value:"#1ee300",name:"\u8349\u7eff"},{value:"#26067d",name:"\u975b\u8272"},{value:"#c20cf0",name:"\u84dd\u7d2b"},{value:"#fc6d0d",name:"\u9633\u6a59"},{value:"#0dfccc",name:"\u84dd\u7eff"},{value:"#095157",name:"\u6697\u5ca9\u7070"},{value:"#8a0e1e",name:"\u6697\u7ea2"},{value:"#e31717",name:"\u9c9c\u7ea2"},{value:"#1717e3",name:"\u84dd\u8272"},{value:"#fc1956",name:"\u6a31\u6843\u7ea2"},{value:"#bd1c72",name:"\u54c1\u7ea2"},{value:"#b06635",name:"\u9517\u9ec4"},{value:"#315723",name:"\u6697\u7eff"},{value:"#bda855",name:"\u6697\u5361\u5176"},{value:"#9a55bd",name:"\u4e2d\u84dd\u7d2b"},{value:"#5ebd5e",name:"\u53f6\u7eff"},{value:"#65a8c9",name:"\u7070\u84dd"},{value:"#6b88d6",name:"\u77e2\u8f66\u83ca\u84dd"},{value:"#68bdac",name:"\u4e2d\u78a7\u84dd"},{value:"#575034",name:"\u5496\u5561"},{value:"#d68c81",name:"\u73ab\u7470\u8910"},{value:"#3d4057",name:"\u666e\u9c81\u58eb\u84dd"},{value:"#bd84a2",name:"\u706b\u9e64\u7ea2"},{value:"#574141",name:"\u6697\u7070"},{value:"#ebf0d8",name:"\u7c73\u9ec4"},{value:"#eae3fc",name:"\u85b0\u8863\u8349\u7d2b"}],v={v2:{id:"v2",name:"\u8272\u677fv2\uff08\u63a8\u8350\uff09",description:"\u201c\u8272\u677fv2\u201d\u5305\u62ec31\u4e2a\u7cbe\u5fc3\u6311\u9009\u7684\u989c\u8272\uff0c\u589e\u5f3a\u4e86\u8272\u5f69\u95f4\u7684\u5bf9\u6bd4\u5ea6\u4ee5\u53ca\u4e0e\u767d\u8272\u80cc\u666f\u7684\u5bf9\u6bd4\u5ea6\uff0c\u7f3a\u70b9\u662f\u65e0\u6cd5\u8f93\u51fa\u81f3BBS\u4ee3\u7801\u3002",contents:s()((function(){return m(f)}))},bbs:{id:"bbs",name:"BBS\u989c\u8272",description:"\u201cBBS\u8272\u677f\u201d\u5305\u542b18\u4e2a\u5e38\u89c1\u4e8eBBS\u7684\u989c\u8272\uff0c\u662f\u4f20\u7edf\u7684\u914d\u8272\u65b9\u6848\uff0c\u7f3a\u70b9\u662f\u8272\u5f69\u95f4\u7684\u533a\u5206\u5ea6\u53ca\u4e0e\u80cc\u666f\u7684\u5bf9\u6bd4\u5ea6\u65e0\u6cd5\u4fdd\u8bc1\u3002",contents:s()((function(){return m(d)}))}}}},[[170,1,2]]]);
//# sourceMappingURL=main.85ec6c50.chunk.js.map