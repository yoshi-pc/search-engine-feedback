var DATA_TO_SEND = {
    query: "",
    url: "",
    order: "",
    x: "",
    y: "",
    judge: 0
};

$(document).ready(function(){
    if(location.hostname.match(/google/)) {
        onGoogle();
    } else if(location.hostname.match(/yahoo/)) {
        onYahoo();
    } else if(location.hostname.match(/bing/)) {
        onBing();
    }

    $('a').click(function(e) {
        console.log('x:' + e.clientX + ', y:' + e.clientY);
    });

    function click_event(e, ROOT, current_elem, query_box) {
        let s_query = $(query_box).val();
        let href_url = current_elem.attr('href');
        if (href_url == null || href_url === "#") {
            return null;
        }
        let scanned = scan_order(ROOT, current_elem);
        let s_order;
        if (scanned[0] == -1) {
            s_order = -1;
            console.log("parent element not found.")
        } else {
            e.preventDefault();
            s_order = get_param_int(location.href, 'start') + scanned[0];
            open_tab(href_url);
            add_element(scanned[1]);
        }
        
        print_dump(s_query, href_url, s_order);
        DATA_TO_SEND = {
            query: s_query,
            url: href_url,
            order: s_order,
            x: e.clientX,
            y: e.clientY
        };
    }

    function onGoogle() {
        const ROOT = 'div#rso > div';
        const target_sel = 'div#search a';
        $(target_sel).on('click', function(e) {
            click_event(e, ROOT, $(this), "textarea");
        });
    }

    function onYahoo() {
        const ROOT = '.Contents__innerGroupBody';
        const target_sel = 'div.sw-Card__title a';
        $(target_sel).on('click', function(e) {
            click_event(e, ROOT, $(this), "#header > div.Header__inner > div.Header__innerItem > div.SearchBox.SearchBox--north.js-SearchBox--north > form > div.SearchBox__searchInputWrap > input.SearchBox__searchInput.js-SearchBox__searchInput");
        });
    }

    function onBing() {
        const ROOT = 'ol#b_results';
        const target_sel = 'div.b_title a';
        $(target_sel).on('click', function(e) {
            click_event(e, ROOT, $(this), "#sb_form_q");
        });
    }

    function scan_order(root, temp) {
        // tempはクリックした要素
        // tempから1つずつ親に移って、index()が取得できるまで遡る
        // rootは検索結果のセルの要素
        // parentにはセルの要素が連なっている
        let parent = $(root).children();
        let s_order = -1;
        let i = 0;
        do {
            temp = temp.parent();
            s_order = parent.index(temp);

            if (i > 20) {
                return [-1, null];
            } else {
                i++;
            }
        } while(temp !== null && s_order === -1)

        return [s_order, temp];
    }

    function get_param_int(url, key) {
        let value = new URLSearchParams(url).get(key);
        if (value === null) return 0;
        else return parseInt(value);
    }

    function print_dump(q, h, o) {
        console.log('検索クエリ:' + q + ', リンク先:' + h + ', 順位:' + o);
    }

    function open_tab(url) {
        window.open(url, '_blank');
    }

    function det_idname() {
        const date = new Date();
        return 'ext_' + date.getHours().toString().padStart(2, '0') + date.getMinutes().toString().padStart(2, '0') + date.getSeconds().toString().padStart(2, '0');
    }

    function send_fb(judge) {
        // 直接呼び出せないので、Global変数を参照してそのまま送信する。
        DATA_TO_SEND["judge"] = judge;
        console.log(JSON.stringify(DATA_TO_SEND));
        $.ajax({
            url: "https://liella.love/search-engine-feedback/endpoint.php",
            type: "POST",
            cache: false,
            dataType: "json",
            data: JSON.stringify(DATA_TO_SEND),
            timeout: 3000
        }).then(function(data) {
            console.log("feedback is sent.");
        }).fail(function(req, status, error) {
            console.log("sending feedback is failed.");
            console.log(status);
            console.log(error);
        })
        console.log(DATA_TO_SEND);
    };

    function add_element(elm) {
        if (elm == null) {
            return;
        }

        $('.ext_feedback').remove();
        let offset_c = elm.offset();
        const idname = det_idname();
        let contents = '\
        <form class=m-auto>\
            <button type=button class=\"btn btn-success m-1\">高い</button>\
            <button type=button class=\"btn btn-secondary m-1\">普通</button>\
            <button type=button class=\"btn btn-danger m-1\">低い</button>\
        </form>\
        ';
        $('body').append('\
        <div class=ext_feedback id=' + idname + '>\
            <a>[x]</a>\
            <span>このWebページの<dfn>信頼度</dfn>は</span>' + contents + '<span class=\"d-flex justify-content-end\">です。\
            </span>\
        </div>'
        );
        $('#' + idname).offset({top: offset_c.top, left: (offset_c.left + elm.width() + 50)});

        $('div.ext_feedback > a').click(function(e) {
            $(this).parent().remove();
        });

        $('div.ext_feedback button').click(function(e) {
            const button_attr = $(this).attr('class');
            if(button_attr.match(/btn-success/)) {
                send_fb(1);
                $('div.ext_feedback button.btn-secondary').remove();
                $('div.ext_feedback button.btn-danger').remove();
            } else if(button_attr.match(/btn-secondary/)) {
                send_fb(0);
                $('div.ext_feedback button.btn-success').remove();
                $('div.ext_feedback button.btn-danger').remove();
            } else {
                send_fb(-1);
                $('div.ext_feedback button.btn-success').remove();
                $('div.ext_feedback button.btn-secondary').remove();
            }
            $(this).animate({
                width: '190'
            }, 500);
            setTimeout(function() {$('div.ext_feedback').remove();}, 1000);
        });
    }
});
