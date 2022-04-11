$(document).ready(function(){
    $('div#search a').on('click', function(e){
        // ページの遷移を抑止
        e.preventDefault();
        const ROOT = 'div#rso > div';
        let s_query = $('input').val();
        let s_order = -1;
        let href_url = $(this).attr('href');
        let parent = $(ROOT).children();
        let params = new URLSearchParams(location.href);
        let offset = params.get('start');
        if (offset === null) offset = 0
        else offset = parseInt(offset);

        // 親要素をindex()が-1でなくなるところまで遡る
        let temp = $(this);
        do {
            temp = temp.parent();
            s_order = parent.index(temp);
        } while(temp !== null && s_order === -1)
        
        console.log('検索クエリ:' + s_query + ', リンク先:' + href_url + ', 順位:' + (offset + s_order));
    });
});