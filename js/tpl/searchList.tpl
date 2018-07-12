<header id="You_header">
    <div id="You_prev" onclick="window.history.back()"> </div>
    <div class="headerRight"><!--<a>搜索</a>--></div>
    <div id="searchGoods">
        <a><input type="text" autocomplete="off" class="search_txt" id="keyword" data-attach-point='searchLink'></a>
    </div>
</header>

{{?it.serlist.length===0}}
    <div class="noSearchResult">
        <p>没有为您找到匹配的资讯建议您调整关键词重新搜索!</p>
    </div>
{{??}}
    <div class="newsList">
        <ul class="newsListUl">
            {{~it.serlist:item}}
            <li>
                <a href="{{=clientPath+item.url}}">
                    <img class="newsListLeft" src="{{=item.mthumb}}">
                    <div class="newsListRight">
                        <span>{{=item.title}}</span>
                        <p>{{=item.description}}</p>
                    </div>
                </a>
            </li>
            {{~}}
        </ul>
    </div>
{{?}}
<h2 class="h2-t h2-t5"> <em></em> 您可能感兴趣的资讯 </h2>
<div class="newsList">
    <ul class="newsListUl">
        {{~it.favlist:item}}
        <li>
            <a href="{{=clientPath+item.url}}">
                <img class="newsListLeft" src="{{=item.mthumb}}">
                <div class="newsListRight">
                    <span>{{=item.title}}</span>
                    <p>{{=item.description}}</p>
                </div>
            </a>
        </li>
        {{~}}
    </ul>
</div>
<a class="loadMore"> <span>加载完成</span> </a>