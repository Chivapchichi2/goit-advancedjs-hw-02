var f=Object.defineProperty;var a=(o,t,i)=>t in o?f(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var s=(o,t,i)=>(a(o,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();class u{}s(u,"DELAY",1e3),s(u,"THROTTLE_DELAY",250);class c{}s(c,"CLICK","click"),s(c,"INPUT","input"),s(c,"SUBMIT","submit");export{c as E,u as U};