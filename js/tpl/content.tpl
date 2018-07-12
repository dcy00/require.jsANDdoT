<!--标题-->
<header id="You_header">
    <div id="You_prev" onClick="window.history.back()"></div>
    <span class="You_describe">{{=it.info.columninfo.catname}}</span>
    <div class="showList" data-attach-point='showList'></div>
</header>
<!--分类列表-->
<div class="classify" style="display:none;" data-attach-point='columnNav'>

</div>
<div class="level"></div>
<!-- 咨询内容-->
<h3 class="contentTitle" data-attach-point="tip">{{=it.info.newsdetail.title}}</h3>
<p class="contentComing">
    <span>{{=it.info.newsdetail.copyfrom}}</span>
    <span class="time">{{=it.info.newsdetail.updatetime}}</span>
</p>
 <div class="newsdetail-content">{{=it.info.newsdetail.content}}</div>
<div class="clickGood" data-attach-point='choose' count='{{=it.info.newsdetail.dosupport}}'>
    <img src="../css/image/alreadyzan.png" id="alreadyzan">
    <img src="../css/image/zan.png" style="display: none" id="zan">
    <p><span id="choose">{{=it.info.newsdetail.dosupport}}</span>人推荐</p>
</div>
<!-- 分享到-->
<div class="shareBtn24">
        <div class="clear"></div>
    <div class="clear"></div>
</div>
<div class="h20"></div>
<div class="h10"></div>
<h2 class="h2-t h2-t11"><em></em>相关推荐</h2>
<div class="recommendationRelated">
    {{~it.info.newsrel:item}}
        <a href="{{=clientPath+item.url}}">
            <img src={{=item.mthumb}}>
            <p>{{=item.title}}</p>
        </a>
    {{~}}
    <div class="clear"></div>
</div>
<div class="h12"></div>
<h2 class="h2-t h2-t11"><em></em>您可能需要的药品</h2>
<div class="goodsListNeed">
{{~it.info.goodslist:item}}
    <div  class="NeedOne">
        <a class="leftA" href="{{=item.goods_url}}">
            <img src="{{=item.goods_img}}">
        </a>
        <div class="NeedOneRight">
            <p class="NeedOneRight01">
                {{=item.goods_name}}
            </p>
            <p class="NeedOneRight02">
                <label> 【参考价格】： </label>
                <span class="price">￥{{=item.shop_price}}</span>
            </p>
            <p class="NeedOneRight02">
                <label> 【生产厂家】： </label>
                <span>{{=item.factory}}</span>
            </p>
            <p class="NeedOneRight02 NeedOneRight04">
                <label> 【功能主治】： </label>
                <span>{{=item.goods_alias}}</span> </p>
            <p class="NeedOneRight03"> <a class="btn buyNow" href='{{=item.goods_url}}'>立即购买</a> </p>
        </div>
        <div class="clear"></div>
    </div>
{{~}}
</div>

<div class="h12"></div>
<div class="h10"></div>

<h2 class="h2-t h2-t11"> <em></em> 发表评论 </h2>
<div class="textArea">
    <div class="maopao"></div>
    <textarea placeholder="说说此刻自己的想法......" data-attach-point="area"></textarea>
    <div class="Islogin">
        <!--<p> 请 <a>登录</a> 后发表评论 </p>-->
        <a class="goWrite" data-attach-point='goWrite'>发表</a>
        <div class="clear"></div>
    </div>
</div>


<div class="h12"></div>
<div class="line6a6a6a"></div>
<div class="commentAllList">
    <!--评论列表-->
    <div>
        {{? it.info.commentlist.length!==0}}
            <ul class="comment-List-ul">

            </ul>
            <a class="loadMoreComment" href="{{=clientPath+it.info.comment.url}}">查看更多评论（<span>{{=it.info.comment.total}}</span>）</a></div>
        {{??}}
            <div class="noComment"> 暂无评论，赶紧发表您的想法吧！ </div>
        {{?}}

</div>
<div class="h12"></div>
<div class="h10"></div>
<h2 class="h2-t h2-t5"> <em></em> 精彩推荐 </h2>
    {{~it.info.newswonder:item}}
        <div class="imgNews">
            {{~item.imglist:itemimg}}
                {{?itemimg!==null}}
                    <a href="{{=clientPath+itemimg.url}}"><img src={{=itemimg.mthumb}}><span>{{=itemimg.title}}</span></a>
                {{?}}
            {{~}}
            <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
            {{~item.infolist:itemInfo:index}}
                {{?itemInfo!==null}}
                    {{?index!==item.infolist.length-1}}
                        <li>
                            <a class="l" href="{{=clientPath+itemInfo.url}}"><span></span>{{=itemInfo.title}}</a>
                            <a class="r">{{=itemInfo.views}}</a><a class="clear"></a>
                        </li>
                    {{??}}
                        <li class="noBorder">
                            <a class="l" href="{{=clientPath+itemInfo.url}}"><span></span>{{=itemInfo.title}}</a>
                            <a class="r">{{=itemInfo.views}}</a><a class="clear"></a>
                        </li>
                    {{?}}
                {{?}}
            {{~}}
        </ul>
    {{~}}
<div class="h12"></div>