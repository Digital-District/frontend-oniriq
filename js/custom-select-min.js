$("select").each((function(){var t=$(this),e=$(this).children("option").length;t.addClass("s-hidden"),t.wrap('<div class="select"></div>'),t.after('<div class="styledSelect"></div>');var i=t.next("div.styledSelect");i.text(t.children("option").eq(0).text());for(var l=$("<ul />",{class:"options"}).insertAfter(i),s=0;s<e;s++)$("<li />",{text:t.children("option").eq(s).text(),rel:t.children("option").eq(s).val()}).appendTo(l);var o=l.children("li");i.click((function(t){t.stopPropagation(),$("div.styledSelect.active").each((function(){$(this).removeClass("active").next("ul.options").hide()})),$(this).toggleClass("active").next("ul.options").toggle()})),o.click((function(e){e.stopPropagation(),i.text($(this).text()).removeClass("active"),t.val($(this).attr("rel")),l.hide()})),$(document).click((function(){i.removeClass("active"),l.hide()}))}));