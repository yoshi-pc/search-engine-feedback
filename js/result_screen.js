$(document).ready(function(){
    if(location.hostname.match(/google/)) {
        onGoogle();
    } else if(location.hostname.match(/yahoo/)) {
        onYahoo();
    } else if(location.hostname.match(/bing/)) {
        onBing();
    }

    function onGoogle() {
        $('div#search a').on('click', function(e) {
            // ページの遷移を抑止
            e.preventDefault();
            const ROOT = 'div#rso > div';
            let s_query = $('input').val();
            let href_url = $(this).attr('href');
            let s_order = get_param_int(location.href, 'start') + scan_order(ROOT, $(this));

            print_dump(s_query, href_url, s_order);
        });
    }

    function onYahoo() {
        $('div.sw-Card__title a').on('click', function(e) {
            // ページの遷移を抑止
            e.preventDefault();
            const ROOT = '.Contents__innerGroupBody';
            let s_query = $('input').val();
            let href_url = $(this).attr('href');
            let s_order = get_param_int(location.href, 'b') + scan_order(ROOT, $(this));

            print_dump(s_query, href_url, s_order);
        })
    }

    function onBing() {
        $('div.b_title a').on('click', function(e) {
            // ページの遷移を抑止
            e.preventDefault();
            const ROOT = 'ol#b_results';
            let s_query = $('input').val();
            let href_url = $(this).attr('href');
            let s_order = get_param_int(location.href, 'first') + scan_order(ROOT, $(this));

            print_dump(s_query, href_url, s_order);
        });
    }

    function scan_order(root, temp) {
        let parent = $(root).children();
        let s_order = -1;
        do {
            temp = temp.parent();
            s_order = parent.index(temp);
        } while(temp !== null && s_order === -1)

        return s_order;
    }

    function get_param_int(url, key) {
        let value = new URLSearchParams(url).get(key);
        if (value === null) return 0;
        else return parseInt(value);
    }

    function print_dump(q, h, o) {
        console.log('検索クエリ:' + q + ', リンク先:' + h + ', 順位:' + o);
    }
});
