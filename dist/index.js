(()=>{var e={309:(e,t,n)=>{"use strict";const r=n(81),o=n(605),i=n(743);function s(e,t,n){const s=o(e,t,n),a=r.spawn(s.command,s.args,s.options);return i.hookChildProcess(a,s),a}e.exports=s,e.exports.spawn=s,e.exports.sync=function(e,t,n){const s=o(e,t,n),a=r.spawnSync(s.command,s.args,s.options);return a.error=a.error||i.verifyENOENTSync(a.status,s),a},e.exports._parse=o,e.exports._enoent=i},743:e=>{"use strict";const t="win32"===process.platform;function n(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function r(e,r){return t&&1===e&&!r.file?n(r.original,"spawn"):null}e.exports={hookChildProcess:function(e,n){if(!t)return;const o=e.emit;e.emit=function(t,i){if("exit"===t){const t=r(i,n);if(t)return o.call(e,"error",t)}return o.apply(e,arguments)}},verifyENOENT:r,verifyENOENTSync:function(e,r){return t&&1===e&&!r.file?n(r.original,"spawnSync"):null},notFoundError:n}},605:(e,t,n)=>{"use strict";const r=n(17),o=n(202),i=n(748),s=n(550),a="win32"===process.platform,c=/\.(?:com|exe)$/i,d=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;e.exports=function(e,t,n){t&&!Array.isArray(t)&&(n=t,t=null);const u={command:e,args:t=t?t.slice(0):[],options:n=Object.assign({},n),file:void 0,original:{command:e,args:t}};return n.shell?u:function(e){if(!a)return e;const t=function(e){e.file=o(e);const t=e.file&&s(e.file);return t?(e.args.unshift(e.file),e.command=t,o(e)):e.file}(e),n=!c.test(t);if(e.options.forceShell||n){const n=d.test(t);e.command=r.normalize(e.command),e.command=i.command(e.command),e.args=e.args.map((e=>i.argument(e,n)));const o=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${o}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}(u)}},748:e=>{"use strict";const t=/([()\][%!^"`<>&|;, *?])/g;e.exports.command=function(e){return e.replace(t,"^$1")},e.exports.argument=function(e,n){return e=(e=`"${e=(e=(e=`${e}`).replace(/(\\*)"/g,'$1$1\\"')).replace(/(\\*)$/,"$1$1")}"`).replace(t,"^$1"),n&&(e=e.replace(t,"^$1")),e}},550:(e,t,n)=>{"use strict";const r=n(147),o=n(63);e.exports=function(e){const t=Buffer.alloc(150);let n;try{n=r.openSync(e,"r"),r.readSync(n,t,0,150,0),r.closeSync(n)}catch(e){}return o(t.toString())}},202:(e,t,n)=>{"use strict";const r=n(17),o=n(806),i=n(24);function s(e,t){const n=e.options.env||process.env,s=process.cwd(),a=null!=e.options.cwd,c=a&&void 0!==process.chdir&&!process.chdir.disabled;if(c)try{process.chdir(e.options.cwd)}catch(e){}let d;try{d=o.sync(e.command,{path:n[i({env:n})],pathExt:t?r.delimiter:void 0})}catch(e){}finally{c&&process.chdir(s)}return d&&(d=r.resolve(a?e.options.cwd:"",d)),d}e.exports=function(e){return s(e)||s(e,!0)}},105:(e,t,n)=>{"use strict";const{PassThrough:r}=n(781);e.exports=e=>{e={...e};const{array:t}=e;let{encoding:n}=e;const o="buffer"===n;let i=!1;t?i=!(n||o):n=n||"utf8",o&&(n=null);const s=new r({objectMode:i});n&&s.setEncoding(n);let a=0;const c=[];return s.on("data",(e=>{c.push(e),i?a=c.length:a+=e.length})),s.getBufferedValue=()=>t?c:o?Buffer.concat(c,a):c.join(""),s.getBufferedLength=()=>a,s}},31:(e,t,n)=>{"use strict";const{constants:r}=n(300),o=n(781),{promisify:i}=n(837),s=n(105),a=i(o.pipeline);class c extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}}async function d(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};const{maxBuffer:n}=t,o=s(t);return await new Promise(((t,i)=>{const s=e=>{e&&o.getBufferedLength()<=r.MAX_LENGTH&&(e.bufferedData=o.getBufferedValue()),i(e)};(async()=>{try{await a(e,o),t()}catch(e){s(e)}})(),o.on("data",(()=>{o.getBufferedLength()>n&&s(new c)}))})),o.getBufferedValue()}e.exports=d,e.exports.buffer=(e,t)=>d(e,{...t,encoding:"buffer"}),e.exports.array=(e,t)=>d(e,{...t,array:!0}),e.exports.MaxBufferError=c},959:(e,t,n)=>{var r;function o(e,t,n){if("function"==typeof t&&(n=t,t={}),!n){if("function"!=typeof Promise)throw new TypeError("callback not provided");return new Promise((function(n,r){o(e,t||{},(function(e,t){e?r(e):n(t)}))}))}r(e,t||{},(function(e,r){e&&("EACCES"===e.code||t&&t.ignoreErrors)&&(e=null,r=!1),n(e,r)}))}n(147),r="win32"===process.platform||global.TESTING_WINDOWS?n(429):n(601),e.exports=o,o.sync=function(e,t){try{return r.sync(e,t||{})}catch(e){if(t&&t.ignoreErrors||"EACCES"===e.code)return!1;throw e}}},601:(e,t,n)=>{e.exports=o,o.sync=function(e,t){return i(r.statSync(e),t)};var r=n(147);function o(e,t,n){r.stat(e,(function(e,r){n(e,!e&&i(r,t))}))}function i(e,t){return e.isFile()&&function(e,t){var n=e.mode,r=e.uid,o=e.gid,i=void 0!==t.uid?t.uid:process.getuid&&process.getuid(),s=void 0!==t.gid?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),c=parseInt("010",8);return n&parseInt("001",8)||n&c&&o===s||n&a&&r===i||n&(a|c)&&0===i}(e,t)}},429:(e,t,n)=>{e.exports=i,i.sync=function(e,t){return o(r.statSync(e),e,t)};var r=n(147);function o(e,t,n){return!(!e.isSymbolicLink()&&!e.isFile())&&function(e,t){var n=void 0!==t.pathExt?t.pathExt:process.env.PATHEXT;if(!n)return!0;if(-1!==(n=n.split(";")).indexOf(""))return!0;for(var r=0;r<n.length;r++){var o=n[r].toLowerCase();if(o&&e.substr(-o.length).toLowerCase()===o)return!0}return!1}(t,n)}function i(e,t,n){r.stat(e,(function(r,i){n(r,!r&&o(i,e,t))}))}},34:(e,t,n)=>{"use strict";const{PassThrough:r}=n(781);e.exports=function(){var e=[],t=new r({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=o,t.on("unpipe",i),Array.prototype.slice.call(arguments).forEach(n),t;function n(r){return Array.isArray(r)?(r.forEach(n),this):(e.push(r),r.once("end",i.bind(null,r)),r.once("error",t.emit.bind(t,"error")),r.pipe(t,{end:!1}),this)}function o(){return 0==e.length}function i(n){!(e=e.filter((function(e){return e!==n}))).length&&t.readable&&t.end()}}},24:e=>{"use strict";const t=(e={})=>{const t=e.env||process.env;return"win32"!==(e.platform||process.platform)?"PATH":Object.keys(t).reverse().find((e=>"PATH"===e.toUpperCase()))||"Path"};e.exports=t,e.exports.default=t},63:(e,t,n)=>{"use strict";const r=n(395);e.exports=(e="")=>{const t=e.match(r);if(!t)return null;const[n,o]=t[0].replace(/#! ?/,"").split(" "),i=n.split("/").pop();return"env"===i?o:o?`${i} ${o}`:i}},395:e=>{"use strict";e.exports=/^#!(.*)/},908:(e,t,n)=>{var r=global.process;const o=function(e){return e&&"object"==typeof e&&"function"==typeof e.removeListener&&"function"==typeof e.emit&&"function"==typeof e.reallyExit&&"function"==typeof e.listeners&&"function"==typeof e.kill&&"number"==typeof e.pid&&"function"==typeof e.on};if(o(r)){var i,s=n(491),a=n(397),c=/^win/i.test(r.platform),d=n(361);"function"!=typeof d&&(d=d.EventEmitter),r.__signal_exit_emitter__?i=r.__signal_exit_emitter__:((i=r.__signal_exit_emitter__=new d).count=0,i.emitted={}),i.infinite||(i.setMaxListeners(1/0),i.infinite=!0),e.exports=function(e,t){if(o(global.process)){s.equal(typeof e,"function","a callback must be provided for exit handler"),!1===f&&m();var n="exit";return t&&t.alwaysLast&&(n="afterexit"),i.on(n,e),function(){i.removeListener(n,e),0===i.listeners("exit").length&&0===i.listeners("afterexit").length&&u()}}};var u=function(){f&&o(global.process)&&(f=!1,a.forEach((function(e){try{r.removeListener(e,l[e])}catch(e){}})),r.emit=x,r.reallyExit=g,i.count-=1)};e.exports.unload=u;var p=function(e,t,n){i.emitted[e]||(i.emitted[e]=!0,i.emit(e,t,n))},l={};a.forEach((function(e){l[e]=function(){o(global.process)&&r.listeners(e).length===i.count&&(u(),p("exit",null,e),p("afterexit",null,e),c&&"SIGHUP"===e&&(e="SIGINT"),r.kill(r.pid,e))}})),e.exports.signals=function(){return a};var f=!1,m=function(){!f&&o(global.process)&&(f=!0,i.count+=1,a=a.filter((function(e){try{return r.on(e,l[e]),!0}catch(e){return!1}})),r.emit=y,r.reallyExit=h)};e.exports.load=m;var g=r.reallyExit,h=function(e){o(global.process)&&(r.exitCode=e||0,p("exit",r.exitCode,null),p("afterexit",r.exitCode,null),g.call(r,r.exitCode))},x=r.emit,y=function(e,t){if("exit"===e&&o(global.process)){void 0!==t&&(r.exitCode=t);var n=x.apply(this,arguments);return p("exit",r.exitCode,null),p("afterexit",r.exitCode,null),n}return x.apply(this,arguments)}}else e.exports=function(){}},397:e=>{e.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"],"win32"!==process.platform&&e.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),"linux"===process.platform&&e.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")},806:(e,t,n)=>{const r="win32"===process.platform||"cygwin"===process.env.OSTYPE||"msys"===process.env.OSTYPE,o=n(17),i=r?";":":",s=n(959),a=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),c=(e,t)=>{const n=t.colon||i,o=e.match(/\//)||r&&e.match(/\\/)?[""]:[...r?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(n)],s=r?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",a=r?s.split(n):[""];return r&&-1!==e.indexOf(".")&&""!==a[0]&&a.unshift(""),{pathEnv:o,pathExt:a,pathExtExe:s}},d=(e,t,n)=>{"function"==typeof t&&(n=t,t={}),t||(t={});const{pathEnv:r,pathExt:i,pathExtExe:d}=c(e,t),u=[],p=n=>new Promise(((i,s)=>{if(n===r.length)return t.all&&u.length?i(u):s(a(e));const c=r[n],d=/^".*"$/.test(c)?c.slice(1,-1):c,p=o.join(d,e),f=!d&&/^\.[\\\/]/.test(e)?e.slice(0,2)+p:p;i(l(f,n,0))})),l=(e,n,r)=>new Promise(((o,a)=>{if(r===i.length)return o(p(n+1));const c=i[r];s(e+c,{pathExt:d},((i,s)=>{if(!i&&s){if(!t.all)return o(e+c);u.push(e+c)}return o(l(e,n,r+1))}))}));return n?p(0).then((e=>n(null,e)),n):p(0)};e.exports=d,d.sync=(e,t)=>{t=t||{};const{pathEnv:n,pathExt:r,pathExtExe:i}=c(e,t),d=[];for(let a=0;a<n.length;a++){const c=n[a],u=/^".*"$/.test(c)?c.slice(1,-1):c,p=o.join(u,e),l=!u&&/^\.[\\\/]/.test(e)?e.slice(0,2)+p:p;for(let e=0;e<r.length;e++){const n=l+r[e];try{if(s.sync(n,{pathExt:i})){if(!t.all)return n;d.push(n)}}catch(e){}}}if(t.all&&d.length)return d;if(t.nothrow)return null;throw a(e)}},491:e=>{"use strict";e.exports=require("assert")},300:e=>{"use strict";e.exports=require("buffer")},81:e=>{"use strict";e.exports=require("child_process")},361:e=>{"use strict";e.exports=require("events")},147:e=>{"use strict";e.exports=require("fs")},17:e=>{"use strict";e.exports=require("path")},781:e=>{"use strict";e.exports=require("stream")},837:e=>{"use strict";e.exports=require("util")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{execa:()=>se,execaCommand:()=>ce,execaCommandSync:()=>de,execaNode:()=>ue,execaSync:()=>ae});var e=n(17),t=n.n(e),o=n(81),i=n.n(o);const s=require("process");var a=n.n(s),c=n(309),d=n.n(c);const u=require("process"),p=require("path");function l(e={}){const{env:t=process.env,platform:n=process.platform}=e;return"win32"!==n?"PATH":Object.keys(t).reverse().find((e=>"PATH"===e.toUpperCase()))||"Path"}const f=(e,t,n,r)=>{if("length"===n||"prototype"===n)return;if("arguments"===n||"caller"===n)return;const o=Object.getOwnPropertyDescriptor(e,n),i=Object.getOwnPropertyDescriptor(t,n);!m(o,i)&&r||Object.defineProperty(e,n,i)},m=function(e,t){return void 0===e||e.configurable||e.writable===t.writable&&e.enumerable===t.enumerable&&e.configurable===t.configurable&&(e.writable||e.value===t.value)},g=(e,t)=>`/* Wrapped ${e}*/\n${t}`,h=Object.getOwnPropertyDescriptor(Function.prototype,"toString"),x=Object.getOwnPropertyDescriptor(Function.prototype.toString,"name");const y=new WeakMap,b=(e,t={})=>{if("function"!=typeof e)throw new TypeError("Expected a function");let n,r=0;const o=e.displayName||e.name||"<anonymous>",i=function(...s){if(y.set(i,++r),1===r)n=e.apply(this,s),e=null;else if(!0===t.throw)throw new Error(`Function \`${o}\` can only be called once`);return n};return function(e,t,{ignoreNonConfigurable:n=!1}={}){const{name:r}=e;for(const r of Reflect.ownKeys(t))f(e,t,r,n);((e,t)=>{const n=Object.getPrototypeOf(t);n!==Object.getPrototypeOf(e)&&Object.setPrototypeOf(e,n)})(e,t),((e,t,n)=>{const r=""===n?"":`with ${n.trim()}() `,o=g.bind(null,r,t.toString());Object.defineProperty(o,"name",x),Object.defineProperty(e,"toString",{...h,value:o})})(e,t,r)}(i,e),y.set(i,r),i};b.callCount=e=>{if(!y.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return y.get(e)};const v=b,S=require("os");var w=n.n(S);const E=function(e,t){return{name:`SIGRT${t+1}`,number:I+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},I=34,T=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}],C=function(){const e=function(){const e=64-I+1;return Array.from({length:e},E)}();return[...T,...e].map(O)},O=function({name:e,number:t,description:n,action:r,forced:o=!1,standard:i}){const{signals:{[e]:s}}=S.constants,a=void 0!==s;return{name:e,number:a?s:t,description:n,supported:a,action:r,forced:o,standard:i}},P=C().reduce((function(e,{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}){return{...e,[t]:{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}}}),{}),G=function(e,t){const n=t.find((({name:t})=>S.constants.signals[t]===e));return void 0!==n?n:t.find((t=>t.number===e))},A=(function(){const e=C(),t=Array.from({length:65},((t,n)=>function(e,t){const n=G(e,t);if(void 0===n)return{};const{name:r,description:o,supported:i,action:s,forced:a,standard:c}=n;return{[e]:{name:r,number:e,description:o,supported:i,action:s,forced:a,standard:c}}}(n,e)));Object.assign({},...t)}(),({stdout:e,stderr:t,all:n,error:r,signal:o,exitCode:i,command:s,escapedCommand:a,timedOut:c,isCanceled:d,killed:u,parsed:{options:{timeout:p}}})=>{i=null===i?void 0:i;const l=void 0===(o=null===o?void 0:o)?void 0:P[o].description,f=(({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:o,exitCode:i,isCanceled:s})=>e?`timed out after ${t} milliseconds`:s?"was canceled":void 0!==n?`failed with ${n}`:void 0!==r?`was killed with ${r} (${o})`:void 0!==i?`failed with exit code ${i}`:"failed")({timedOut:c,timeout:p,errorCode:r&&r.code,signal:o,signalDescription:l,exitCode:i,isCanceled:d}),m=`Command ${f}: ${s}`,g="[object Error]"===Object.prototype.toString.call(r),h=g?`${m}\n${r.message}`:m,x=[h,t,e].filter(Boolean).join("\n");return g?(r.originalMessage=r.message,r.message=x):r=new Error(x),r.shortMessage=h,r.command=s,r.escapedCommand=a,r.exitCode=i,r.signal=o,r.signalDescription=l,r.stdout=e,r.stderr=t,void 0!==n&&(r.all=n),"bufferedData"in r&&delete r.bufferedData,r.failed=!0,r.timedOut=Boolean(c),r.isCanceled=d,r.killed=u&&!c,r}),$=["stdin","stdout","stderr"],j=e=>{if(!e)return;const{stdio:t}=e;if(void 0===t)return $.map((t=>e[t]));if((e=>$.some((t=>void 0!==e[t])))(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${$.map((e=>`\`${e}\``)).join(", ")}`);if("string"==typeof t)return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);const n=Math.max(t.length,$.length);return Array.from({length:n},((e,n)=>t[n]))};var L=n(908),B=n.n(L);const k=(e,t="SIGTERM",n={})=>{const r=e(t);return N(e,t,n,r),r},N=(e,t,n,r)=>{if(!R(t,n,r))return;const o=M(n),i=setTimeout((()=>{e("SIGKILL")}),o);i.unref&&i.unref()},R=(e,{forceKillAfterTimeout:t},n)=>_(e)&&!1!==t&&n,_=e=>e===w().constants.signals.SIGTERM||"string"==typeof e&&"SIGTERM"===e.toUpperCase(),M=({forceKillAfterTimeout:e=!0})=>{if(!0===e)return 5e3;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e},U=(e,t)=>{e.kill()&&(t.isCanceled=!0)};function D(e){return null!==e&&"object"==typeof e&&"function"==typeof e.pipe}var F=n(31),q=n.n(F),H=n(34),K=n.n(H);const W=async(e,t)=>{if(e){e.destroy();try{return await t}catch(e){return e.bufferedData}}},X=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(e&&n)return t?q()(e,{encoding:t,maxBuffer:r}):q().buffer(e,{maxBuffer:r})},V=(async()=>{})().constructor.prototype,Y=["then","catch","finally"].map((e=>[e,Reflect.getOwnPropertyDescriptor(V,e)])),Z=(e,t)=>{for(const[n,r]of Y){const o="function"==typeof t?(...e)=>Reflect.apply(r.value,t(),e):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:o})}return e},z=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],Q=/^[\w.-]+$/,J=/"/g,ee=(e,t)=>z(e,t).join(" "),te=(e,t)=>z(e,t).map((e=>(e=>"string"!=typeof e||Q.test(e)?e:`"${e.replace(J,'\\"')}"`)(e))).join(" "),ne=/ +/g,re=e=>{const t=[];for(const n of e.trim().split(ne)){const e=t[t.length-1];e&&e.endsWith("\\")?t[t.length-1]=`${e.slice(0,-1)} ${n}`:t.push(n)}return t},oe=(e,n,r={})=>{const o=d()._parse(e,n,r);return e=o.command,n=o.args,(r={maxBuffer:1e8,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:(r=o.options).cwd||a().cwd(),execPath:a().execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...r}).env=(({env:e,extendEnv:t,preferLocal:n,localDir:r,execPath:o})=>{const i=t?{...a().env,...e}:e;return n?function({env:e=u.env,...t}={}){const n=l({env:e={...e}});return t.path=e[n],e[n]=function(e={}){const{cwd:t=u.cwd(),path:n=u.env[l()],execPath:r=u.execPath}=e;let o,i=p.resolve(t);const s=[];for(;o!==i;)s.push(p.join(i,"node_modules/.bin")),o=i,i=p.resolve(i,"..");return s.push(p.resolve(t,r,"..")),[...s,n].join(p.delimiter)}(t),e}({env:i,cwd:r,execPath:o}):i})(r),r.stdio=j(r),"win32"===a().platform&&"cmd"===t().basename(e,".exe")&&n.unshift("/q"),{file:e,args:n,options:r,parsed:o}},ie=(e,t,n)=>"string"==typeof t||Buffer.isBuffer(t)?e.stripFinalNewline?function(e){const t="string"==typeof e?"\n":"\n".charCodeAt(),n="string"==typeof e?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,-1)),e[e.length-1]===n&&(e=e.slice(0,-1)),e}(t):t:void 0===n?void 0:"";function se(e,t,n){const r=oe(e,t,n),o=ee(e,t),s=te(e,t);let a;(({timeout:e})=>{if(void 0!==e&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)})(r.options);try{a=i().spawn(r.file,r.args,r.options)}catch(e){const t=new(i().ChildProcess),n=Promise.reject(A({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:r,timedOut:!1,isCanceled:!1,killed:!1}));return Z(t,n)}const c=(e=>new Promise(((t,n)=>{e.on("exit",((e,n)=>{t({exitCode:e,signal:n})})),e.on("error",(e=>{n(e)})),e.stdin&&e.stdin.on("error",(e=>{n(e)}))})))(a),d=((e,{timeout:t,killSignal:n="SIGTERM"},r)=>{if(0===t||void 0===t)return r;let o;const i=new Promise(((r,i)=>{o=setTimeout((()=>{((e,t,n)=>{e.kill(t),n(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))})(e,n,i)}),t)})),s=r.finally((()=>{clearTimeout(o)}));return Promise.race([i,s])})(a,r.options,c),u=(async(e,{cleanup:t,detached:n},r)=>{if(!t||n)return r;const o=B()((()=>{e.kill()}));return r.finally((()=>{o()}))})(a,r.options,d),p={isCanceled:!1};a.kill=k.bind(null,a.kill.bind(a)),a.cancel=U.bind(null,a,p);const l=v((async()=>{const[{error:e,exitCode:t,signal:n,timedOut:i},c,d,l]=await(async({stdout:e,stderr:t,all:n},{encoding:r,buffer:o,maxBuffer:i},s)=>{const a=X(e,{encoding:r,buffer:o,maxBuffer:i}),c=X(t,{encoding:r,buffer:o,maxBuffer:i}),d=X(n,{encoding:r,buffer:o,maxBuffer:2*i});try{return await Promise.all([s,a,c,d])}catch(r){return Promise.all([{error:r,signal:r.signal,timedOut:r.timedOut},W(e,a),W(t,c),W(n,d)])}})(a,r.options,u),f=ie(r.options,c),m=ie(r.options,d),g=ie(r.options,l);if(e||0!==t||null!==n){const c=A({error:e,exitCode:t,signal:n,stdout:f,stderr:m,all:g,command:o,escapedCommand:s,parsed:r,timedOut:i,isCanceled:p.isCanceled,killed:a.killed});if(!r.options.reject)return c;throw c}return{command:o,escapedCommand:s,exitCode:0,stdout:f,stderr:m,all:g,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}}));return((e,t)=>{void 0!==t&&void 0!==e.stdin&&(D(t)?t.pipe(e.stdin):e.stdin.end(t))})(a,r.options.input),a.all=((e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;const n=K()();return e.stdout&&n.add(e.stdout),e.stderr&&n.add(e.stderr),n})(a,r.options),Z(a,l)}function ae(e,t,n){const r=oe(e,t,n),o=ee(e,t),s=te(e,t);let a;(({input:e})=>{if(D(e))throw new TypeError("The `input` option cannot be a stream in sync mode")})(r.options);try{a=i().spawnSync(r.file,r.args,r.options)}catch(e){throw A({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:r,timedOut:!1,isCanceled:!1,killed:!1})}const c=ie(r.options,a.stdout,a.error),d=ie(r.options,a.stderr,a.error);if(a.error||0!==a.status||null!==a.signal){const e=A({stdout:c,stderr:d,error:a.error,signal:a.signal,exitCode:a.status,command:o,escapedCommand:s,parsed:r,timedOut:a.error&&"ETIMEDOUT"===a.error.code,isCanceled:!1,killed:null!==a.signal});if(!r.options.reject)return e;throw e}return{command:o,escapedCommand:s,exitCode:0,stdout:c,stderr:d,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}}function ce(e,t){const[n,...r]=re(e);return se(n,r,t)}function de(e,t){const[n,...r]=re(e);return ae(n,r,t)}function ue(e,t,n={}){t&&!Array.isArray(t)&&"object"==typeof t&&(n=t,t=[]);const r=(e=>{const t=j(e);return"ipc"===t?"ipc":void 0===t||"string"==typeof t?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]})(n),o=a().execArgv.filter((e=>!e.startsWith("--inspect"))),{nodePath:i=a().execPath,nodeOptions:s=o}=n;return se(i,[...s,e,...Array.isArray(t)?t:[]],{...n,stdin:void 0,stdout:void 0,stderr:void 0,stdio:r,shell:!1})}})(),module.exports=r})();
//# sourceMappingURL=index.js.map
