HTMLElement.prototype.wrap=function(t){this.parentNode.insertBefore(t,this),this.parentNode.removeChild(this),t.appendChild(this)},Fluid.plugins={typing:function(t){var o;"Typed"in window&&((o=new window.Typed("#subtitle",{strings:["  ",t+"&nbsp;"],cursorChar:CONFIG.typing.cursorChar,typeSpeed:CONFIG.typing.typeSpeed,loop:CONFIG.typing.loop})).stop(),(t=document.getElementById("subtitle"))&&(t.innerText=""),jQuery(document).ready(function(){jQuery(".typed-cursor").addClass("h2"),o.start()}))},initTocBot:function(){var t,o=jQuery("#toc");0!==o.length&&window.tocbot&&(t=jQuery("#board-ctn").offset().top,window.tocbot.init({tocSelector:"#toc-body",contentSelector:".markdown-body",headingSelector:CONFIG.toc.headingSelector||"h1,h2,h3,h4,h5,h6",linkClass:"tocbot-link",activeLinkClass:"tocbot-active-link",listClass:"tocbot-list",isCollapsedClass:"tocbot-is-collapsed",collapsibleClass:"tocbot-is-collapsible",collapseDepth:CONFIG.toc.collapseDepth||0,scrollSmooth:!0,headingsOffset:-t}),0<jQuery(".toc-list-item").length&&o.css("visibility","visible"))},initFancyBox:function(t){"fancybox"in jQuery&&(jQuery(t||".markdown-body :not(a) > img, .markdown-body > img").each(function(){var t,o,e,n=jQuery(this),i=n.attr("data-src")||n.attr("src")||"";CONFIG.image_zoom.img_url_replace&&(o=(e=CONFIG.image_zoom.img_url_replace)[0]||"",t=e[1]||"",o&&(i=/^re:/.test(o)?(o=o.replace(/^re:/,""),e=new RegExp(o,"gi"),i.replace(e,t)):i.replace(o,t)));i=n.wrap(`
        <a class="fancybox fancybox.image" href="${i}"
          itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");n.is(".group-image-container img")?i.attr("data-fancybox","group").attr("rel","group"):i.attr("data-fancybox","default").attr("rel","default");n=n.attr("title")||n.attr("alt");n&&(i.append(`<p class="image-caption">${n}</p>`),i.attr("title",n).attr("data-caption",n))}),jQuery.fancybox.defaults.hash=!1,jQuery(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}}))},initAnchor:function(){if("anchors"in window){window.anchors.options={placement:CONFIG.anchorjs.placement,visible:CONFIG.anchorjs.visible},CONFIG.anchorjs.icon&&(window.anchors.options.icon=CONFIG.anchorjs.icon);var t=[];for(const o of(CONFIG.anchorjs.element||"h1,h2,h3,h4,h5,h6").split(","))t.push(".markdown-body > "+o);window.anchors.add(t.join(", "))}},initCopyCode:function(){var t,o,e;"ClipboardJS"in window&&(o="",o+='<button class="copy-btn" data-clipboard-snippet="">',o+='<i class="iconfont icon-copy"></i><span>Copy</span>',o+="</button>",(t=jQuery(".markdown-body pre")).each(function(){const t=jQuery(this);0<t.find("code.mermaid").length||0<t.find("span.line").length||t.append('<button class="copy-btn" data-clipboard-snippet=""><i class="iconfont icon-copy"></i><span>Copy</span></button>')}),o=new window.ClipboardJS(".copy-btn",{target:function(t){return t.previousElementSibling}}),jQuery(".copy-btn").addClass(0===(e=t).length||127.5<.213*(e=e.css("background-color").replace(/rgba*\(/,"").replace(")","").split(","))[0]+.715*e[1]+.072*e[2]?"copy-btn-dark":"copy-btn-light"),o.on("success",function(t){t.clearSelection();var o=t.trigger.outerHTML;t.trigger.innerHTML="Success",setTimeout(function(){t.trigger.outerHTML=o},2e3)}))}};