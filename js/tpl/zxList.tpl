<header id="You_header">
    <div id="You_prev" onclick="window.history.back()"> </div>
    <span class="You_describe">{{=it.columninfo.catname}}</span>
    <div class="showList" data-attach-point="showList"></div>
</header>
<!--分类列表-->
<div class="classify" style="display: none;" data-attach-point="columnNav">
    {{~it.nlist:item}}
        <span><a href="{{=clientPath+item.url}}">{{=item.catname}}</a></span>
    {{~}}
</div>
<div class="level"></div>
<!-- 头部轮转-->
<div class="swiper-container">
    <div class="swiper-wrapper">
        {{~it.topimg:item}}
        <div class="swiper-slide">
            <a class="bannerLink" href="{{=clientPath+item.url}}">
                <img src="{{=item.mthumb}}">
                <p class="title fz15">
                    <span class="l">{{=item.title}}</span>
                    <span  class="r">
                        <em class="active-num"></em>
                        <i class="fz18">/</i>
                        <i class="swipeLength fz18"></i>
                    </span>
                    <span class="clear"></span>
                </p>
            </a>
        </div>
       {{~}}

    </div>
</div>
<div class="h20"></div>
<h2 class="h2Yellow"> 用药推荐 </h2>
<ul class="hotUl ul-t1 hotUl1">
    {{~it.columnlist:item:index}}
        {{? index!==it.columnlist.length-1}}
            <li>
                <a class="l" href="{{=clientPath+item.url}}"><span></span>{{=item.title}}</a>
                {{? item.comnum!=='0'}}
                    <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a><a class="clear"></a>
                {{?}}
            </li>
        {{??}}
            <li class="noBorder">
                 <a class="l" href="{{=clientPath+item.url}}"><span></span>{{=item.title}}</a>
                 {{? item.comnum!=='0'}}
                    <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a><a class="clear"></a>
                 {{?}}
            </li>
        {{?}}
    {{~}}
</ul>
<div class="h10"></div>
<div class="newsList">
    <ul class="newsListUl">

    </ul>
</div>
<a class="loadMore" style="display:none"><span>加载完成</span></a>