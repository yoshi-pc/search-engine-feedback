$(document).ready(function(){
    $('div#search a').on('click', function(e){
        // ページの遷移を抑止
        e.preventDefault();
        const TREE = 'div#rso > div > div';
        let s_query = $('input').val();
        //let s_order = $('div#rso > div > div').index($(this).parent().parent().parent());
        let s_order = -1;
        let class_name = $(this).attr('class');
        let parent;
        if (class_name === 'l') {
            console.log("子要素っぽい");
            s_order = $(this).parents(TREE).index($(this).closest('table').parent());
        } else {
            console.log("親要素っぽい");
            let temp = $(this);
            do {
                temp = temp.parent();
                s_order = $(this).parents(TREE).index(temp);
            } while(s_order === -1 && temp !== null)
        }
        //$(this).parent().parent().parent().css("background-color", "yellow");
        let href_url = $(this).attr('href');
        console.log("検索クエリ：" + s_query + ", リンク先：" + href_url + ", 順位：" + s_order);
        console.log($(this).attr("class"));
    });
});