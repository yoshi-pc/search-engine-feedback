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

    function onGoogle() {
        $('div#search a').on('click', function(e) {
            // ページの遷移を抑止
            e.preventDefault();
            const ROOT = 'div#rso > div';
            let s_query = $('input').val();
            let href_url = $(this).attr('href');
            let scanned = scan_order(ROOT, $(this));
            let s_order = get_param_int(location.href, 'start') + scanned[0];

            print_dump(s_query, href_url, s_order);
            DATA_TO_SEND = {
                query: s_query,
                url: href_url,
                order: s_order,
                x: e.clientX,
                y: e.clientY
            };
            open_tab(href_url);
            add_element(scanned[1]);
        });
    }

    function onYahoo() {
        $('div.sw-Card__title a').on('click', function(e) {
            // ページの遷移を抑止
            e.preventDefault();
            const ROOT = '.Contents__innerGroupBody';
            let s_query = $('input').val();
            let href_url = $(this).attr('href');
            let scanned = scan_order(ROOT, $(this));
            let s_order = get_param_int(location.href, 'start') + scanned[0];

            print_dump(s_query, href_url, s_order);
            DATA_TO_SEND = {
                query: s_query,
                url: href_url,
                order: s_order,
                x: e.clientX,
                y: e.clientY
            };
            open_tab(href_url);
            add_element(scanned[1]);
        })
    }

    function onBing() {
        $('div.b_title a').on('click', function(e) {
            // ページの遷移を抑止
            e.preventDefault();
            const ROOT = 'ol#b_results';
            let s_query = $('input').val();
            let href_url = $(this).attr('href');
            let scanned = scan_order(ROOT, $(this));
            let s_order = get_param_int(location.href, 'start') + scanned[0];

            print_dump(s_query, href_url, s_order);
            DATA_TO_SEND = {
                query: s_query,
                url: href_url,
                order: s_order,
                x: e.clientX,
                y: e.clientY
            };
            open_tab(href_url);
            add_element(scanned[1]);
        });
    }

    function scan_order(root, temp) {
        let parent = $(root).children();
        let s_order = -1;
        do {
            temp = temp.parent();
            s_order = parent.index(temp);
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
        $('.ext_feedback').remove();
        let offset_c = elm.offset();
        const idname = det_idname();
        let contents = '<form class=m-auto><button type=button class=\"btn btn-success m-2\">精巧</button><button type=button class=\"btn btn-danger m-2\">粗悪</button></form>'
        $('body').append('<div class=ext_feedback id=' + idname + '><a>[x]</a><span>このWebページは</span>' + contents + '<span class=\"d-flex justify-content-end\">でした。</span></div>');
        $('#' + idname).offset({top: offset_c.top, left: (offset_c.left + elm.width() + 50)});


        $('div.ext_feedback > a').click(function(e) {
            $(this).parent().remove();
        });

        $('div.ext_feedback button').click(function(e) {
            if($(this).attr('class').match(/btn-success/)) {
                send_fb(1);
                $('div.ext_feedback button.btn-danger').remove();
            } else {
                send_fb(-1);
                $('div.ext_feedback button.btn-success').remove();
            }
            $(this).animate({
                width: '130'
            }, 500);
            setTimeout(function() {$('div.ext_feedback').remove();}, 1000);
        });
    }
});
