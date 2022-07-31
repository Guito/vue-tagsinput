(function(e,g){typeof exports=="object"&&typeof module<"u"?module.exports=g(require("vue")):typeof define=="function"&&define.amd?define(["vue"],g):(e=typeof globalThis<"u"?globalThis:e||self,e["vue-tagsinput-v"]=g(e.Vue))})(this,function(e){"use strict";const g=e.createTextVNode(" tags input "),A={class:"tags-input-root",style:{position:"relative"}},I=["innerHTML"],L=["onClick"],O=["id","name","placeholder","value","onKeydown","onKeyup"],N={key:0,style:{display:"none"}},$=["name","value"],D=["textContent"],R=["innerHTML","onMouseover","onMousedown"],K=["textContent"],H=["innerHTML","onMouseover","onMousedown"],z={__name:"TagsInput",props:{elementId:String,inputId:String,existingTags:{type:Array,default:()=>[]},value:{type:Array,default:()=>[]},idField:{type:String,default:"key"},textField:{type:String,default:"value"},displayField:{type:String,default:null},valueFields:{type:String,default:null},disabled:{type:Boolean,default:!1},typeahead:{type:Boolean,default:!1},typeaheadStyle:{type:String,default:"badges"},typeaheadActivationThreshold:{type:Number,default:1},typeaheadMaxResults:{type:Number,default:0},typeaheadAlwaysShow:{type:Boolean,default:!1},typeaheadShowOnFocus:{type:Boolean,default:!0},typeaheadHideDiscard:{type:Boolean,default:!1},typeaheadUrl:{type:String,default:""},typeaheadCallback:{type:Function,default:null},placeholder:{type:String,default:"Add a tag"},discardSearchText:{type:String,default:"Discard Search Results"},limit:{type:Number,default:0},hideInputOnLimit:{type:Boolean,default:!1},onlyExistingTags:{type:Boolean,default:!1},deleteOnBackspace:{type:Boolean,default:!0},allowDuplicates:{type:Boolean,default:!1},validate:{type:Function,default:()=>!0},addTagsOnComma:{type:Boolean,default:!1},addTagsOnSpace:{type:Boolean,default:!1},addTagsOnBlur:{type:Boolean,default:!1},wrapperClass:{type:String,default:"tags-input-wrapper-default"},sortSearchResults:{type:Boolean,default:!0},caseSensitiveTags:{type:Boolean,default:!1},beforeAddingTag:{type:Function,default:()=>!0},beforeRemovingTag:{type:Function,default:()=>!0}},emits:["initialized","change","input","limit-reached","tag-added","tags-updated","tag-removed","tags-updated","keyup","keydown","focus","click","blur"],setup(i,{emit:r}){const a=i;e.ref(0);const o=e.ref([]),c=e.ref(""),k=e.ref(""),U=e.ref(""),d=e.ref([]),u=e.ref(0);e.ref(1);const v=e.ref(!1),S=e.ref(!1),f=e.ref(),F=e.ref(null);e.onMounted(()=>{f.value=M(a.existingTags),C(),a.typeaheadAlwaysShow&&h(),r("initialized"),addEventListener("click",t=>{t.target!==F.value&&y()})});const V=e.computed(()=>a.hideInputOnLimit&&a.limit>0&&o.value.length>=a.limit||a.disabled);e.watch(c.value,(t,l)=>{h(),t.length&&t!=l&&(t.substring(l.length,t.length),a.addTagsOnSpace&&t.endsWith(" ")&&(c.value=t.trim(),a.tagFromInput(!0)),a.addTagsOnComma&&(t=t.trim(),t.endsWith(",")&&(c.value=t.substring(0,t.length-1),a.tagFromInput(!0))),r("change",t))}),e.watch(a.existingTags,t=>{f.value.splice(0),f.value=M(t),h()}),e.watch(o.value,()=>{U.value=JSON.stringify(o.value),r("update:modelValue",o.value)}),e.watch(a.value,()=>{C()}),e.watch(a.typeaheadAlwaysShow,t=>{t?h():y()});const m=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),j=(t=!1)=>{if(!S.value)if(d.value.length&&u.value>=0&&!t)b(d.value[u.value]),c.value="";else{let l=c.value.trim();if(!a.onlyExistingTags&&l.length&&a.validate(l)){c.value="";let n={[a.idField]:"",[a.textField]:l};const s=m(a.caseSensitiveTags?n[a.textField]:n[a.textField].toLowerCase());for(let p of f.value){const ae=m(a.caseSensitiveTags?p[a.textField]:p[a.textField].toLowerCase());if(s===ae){n=Object.assign({},p);break}}T(n)}}},B=t=>{b(t),F.value.blur()},b=t=>{y(),T(t),e.nextTick(()=>{c.value="",k.value=""})},T=(t,l=!1)=>{if(!(a.disabled&&!l)){if(!a.beforeAddingTag(t))return!1;if(a.limit>0&&o.value.length>=a.limit)return r("limit-reached"),!1;E(t)||(o.value.push(t),e.nextTick(()=>{r("tag-added",t),r("tags-updated")}))}},J=()=>{!c.value.length&&this.deleteOnBackspace&&o.value.length&&w(o.value.length-1)},w=t=>{if(a.disabled)return;let l=o.value[t];if(!beforeRemovingTag(l))return!1;o.value.splice(t,1),e.nextTick(()=>{r("tag-removed",l),r("tags-updated"),a.typeaheadAlwaysShow&&h()})},h=()=>{if(a.typeahead!==!0)return!1;if(k.value!=c.value||!d.value.length&&a.typeaheadActivationThreshold==0||a.typeaheadAlwaysShow||this.typeaheadShowOnFocus){!typeaheadUrl.value.length&&!a.typeaheadCallback&&(d.value=[]),u.value=0;let t=t.value.trim();if(t.length&&t.length>=a.typeaheadActivationThreshold||a.typeaheadActivationThreshold==0||a.typeaheadAlwaysShow){const l=m(a.caseSensitiveTags?t:t.toLowerCase());if(a.typeaheadCallback)a.typeaheadCallback(l).then(n=>{f.value=n});else if(typeaheadUrl.value.length>0){f.value.splice(0);const n=new XMLHttpRequest,s=this;n.onreadystatechange=function(){console.log([readyState,status]),this.readyState==4&&this.status==200&&(s.typeaheadTags=JSON.parse(n.responseText),s.doSearch(l))};const p=typeaheadUrl.value.replace(":search",l);n.open("GET",p,!0),n.send()}else Q(l)}k.value=t.value}},Q=t=>{d.value=[];for(let l of f.value){const n=a.caseSensitiveTags?l[a.textField]:l[a.textField].toLowerCase(),s=d.value.map(p=>p[a.idField]);n.search(t)>-1&&!E(l)&&!s.includes(l[a.idField])&&d.value.push(l)}a.sortSearchResults&&d.value.sort((l,n)=>l[a.textField]<n[a.textField]?-1:l[a.textField]>n[a.textField]?1:0),a.typeaheadMaxResults>0&&(d.value=d.value.slice(0,a.typeaheadMaxResults))},q=()=>{c.value.length||e.nextTick(()=>{y()})},W=()=>{u.value+1<=d.value.length-1&&u.value++},G=()=>{u.value>0&&u.value--},y=(t=!1)=>{d.value=[],u.value=0,a.typeaheadAlwaysShow&&e.nextTick(()=>{h()}),t&&F.value.focus()},x=()=>{o.value.splice(0,o.value.length)},C=()=>{if(a.value&&a.value.length){if(!Array.isArray(a.value)){console.error("Voerro Tags Input: the v-model value must be an array!");return}let t=a.value;if(t.value==t)return;x();for(let l of t)T(l,!0)}else{if(o.value.length==0)return;x()}},E=t=>{if(a.allowDuplicates||!t)return!1;const l=m(a.caseSensitiveTags?t[a.textField]:t[a.textField].toLowerCase());for(let n of o.value){const s=a.caseSensitiveTags?n[a.textField]:n[a.textField].toLowerCase();if(n[a.idField]===t[a.idField]&&m(s).length==l.length&&s.search(l)>-1)return!0}return!1},X=t=>{r("keyup",t)},P=t=>{r("keydown",t)},Y=t=>{r("focus",t),v.value=!0},Z=t=>{r("click",t),v.value=!0,h()},_=t=>{r("blur",t),a.addTagsOnBlur&&a.tagFromInput(!0),a.typeaheadAlwaysShow?h():q(),v.value=!1},ee=t=>{if(!a.valueFields)return JSON.stringify(t);const l=a.valueFields.replace(/\s/,"").split(",");return l.length===1?t[l[0]]:JSON.stringify(Object.assign({},...l.map(n=>({[n]:t[n]}))))},te=t=>a.displayField!==void 0&&a.displayField!==null&&t[a.displayField]!==void 0&&t[a.displayField]!==null&&t[a.displayField]!==""?t[a.displayField]:t[a.textField],M=t=>t.map(l=>Object.assign({},l));return(t,l)=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[g,e.createElementVNode("div",A,[e.createElementVNode("div",{class:e.normalizeClass({[i.wrapperClass+" tags-input"]:!0,active:v.value,disabled:i.disabled})},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.value,(n,s)=>(e.openBlock(),e.createElementBlock("span",{key:s,class:e.normalizeClass(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default",{disabled:i.disabled}])},[e.renderSlot(t.$slots,"selected-tag",{tag:n,index:s,removeTag:w},()=>[e.createElementVNode("span",{innerHTML:n[i.textField]},null,8,I),e.withDirectives(e.createElementVNode("a",{href:"#",class:"tags-input-remove",onClick:e.withModifiers(p=>w(s),["prevent"])},null,8,L),[[e.vShow,!i.disabled]])])],2))),128)),e.withDirectives(e.createElementVNode("input",{type:"text",ref:"taginput",id:i.inputId,name:i.inputId,placeholder:i.placeholder,value:c.value,onInput:l[0]||(l[0]=n=>c.value=n.target.value),onCompositionstart:l[1]||(l[1]=n=>S.value=!0),onCompositionend:l[2]||(l[2]=n=>S.value=!1),onKeydown:[l[3]||(l[3]=e.withKeys(e.withModifiers(n=>j(!1),["prevent"]),["enter"])),e.withKeys(J,["8"]),e.withKeys(W,["down"]),e.withKeys(G,["up"]),P],onKeyup:[X,e.withKeys(y,["esc"])],onFocus:Y,onClick:Z,onBlur:_,onValue:l[4]||(l[4]=(...n)=>o.value&&o.value(...n))},null,40,O),[[e.vShow,!e.unref(V)]]),i.elementId?(e.openBlock(),e.createElementBlock("div",N,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.value,(n,s)=>(e.openBlock(),e.createElementBlock("input",{key:s,type:"hidden",name:`${i.elementId}[]`,value:ee(n)},null,8,$))),128))])):e.createCommentVNode("",!0)],2),e.withDirectives(e.createElementVNode("div",null,[i.typeaheadStyle==="badges"?(e.openBlock(),e.createElementBlock("p",{key:0,class:e.normalizeClass(`typeahead-${i.typeaheadStyle}`)},[i.typeaheadHideDiscard?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("span",{key:0,class:"tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",onClick:l[5]||(l[5]=e.withModifiers(n=>y(!0),["prevent"])),textContent:e.toDisplayString(i.discardSearchText)},null,8,D)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(n,s)=>(e.openBlock(),e.createElementBlock("span",{key:s,innerHTML:n[i.textField],onMouseover:p=>u.value=s,onMousedown:e.withModifiers(p=>B(n),["prevent"]),class:e.normalizeClass(["tags-input-badge",{"tags-input-typeahead-item-default":s!=u.value,"tags-input-typeahead-item-highlighted-default":s==u.value}])},null,42,R))),128))],2)):i.typeaheadStyle==="dropdown"?(e.openBlock(),e.createElementBlock("ul",{key:1,class:e.normalizeClass(`typeahead-${i.typeaheadStyle}`)},[i.typeaheadHideDiscard?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("li",{key:0,class:"tags-input-typeahead-item-default typeahead-hide-btn",onClick:l[6]||(l[6]=e.withModifiers(n=>y(!0),["prevent"])),textContent:e.toDisplayString(i.discardSearchText)},null,8,K)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(n,s)=>(e.openBlock(),e.createElementBlock("li",{key:s,innerHTML:te(n),onMouseover:p=>u.value=s,onMousedown:e.withModifiers(p=>B(n),["prevent"]),class:e.normalizeClass({"tags-input-typeahead-item-default":s!=u.value,"tags-input-typeahead-item-highlighted-default":s==u.value})},null,42,H))),128))],2)):e.createCommentVNode("",!0)],512),[[e.vShow,d.value.length]])])],64))}};return{install:(i,r)=>{i.component("TagsInput",z)}}});
