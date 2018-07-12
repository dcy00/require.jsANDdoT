 <!-- 头部-->
    <div id="header" class="header">
        <img  class="logo" src="css/image/logo.png">
        <div class="headerRight">
        <a href="html/login.html" style="display:block;" id="unLogin"> 登录 </a>
        <a class="self" style="display:none;" id="loginIn"></a></div>
        <div id="searchGoods">
            <input type="text" autocomplete="off" class="search_txt" data-attach-point='searchLink'>
        </div>
    </div>
    <!-- 头部轮转-->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            {{~ it.topimg:item}}
            <div class="swiper-slide">
                <a class="bannerLink" href="{{=clientPath+item.url}}">
                    <img src="{{=item.mthumb}}"/>
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
        <div></div>
    </div>
    <!--nav导航-->
    <nav class="quick-enter-nav fz12">
        {{~ it.nlist:item}}
            <a class="quick-entry-link" href="{{=clientPath+item.url}}" >
                <img src="{{=item.image}}"/>
                <span>{{=item.catname}}</span>
            </a>
        {{~}}
        <div class="clear"></div>
    </nav>
    <div class="h10"></div>
    <!--热点推荐-->
    <h2 class="h2Yellow"> 热点推荐 </h2>
    <ul class="hotUl hotUl1">
        {{~ it.hotlist:item:index}}
            {{? index!==it.hotlist.length-1}}
                    <li>
                        <a class="l" href="{{=clientPath+item.url}}">
                            <span>[{{=item.catname}}]</span>{{=item.title}}
                        </a>
                        {{? item.comnum!=='0'}}
                            <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                            <a class="clear"></a>
                        {{?}}
                    </li>
            {{??}}
                    <li class="noBorder">
                        <a class="l" href="{{=clientPath+item.url}}">
                            <span>[{{=item.catname}}]</span>{{=item.title}}
                        </a>
                       {{? item.comnum!=='0'}}
                            <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                            <a class="clear"></a>
                       {{?}}
                    </li>
            {{?}}
        {{~}}
   </ul>
    <div class="h10"></div>
    <!--用药常识-->
    <div>
        <h2 class="h2-t h2-t1"> <em></em> 用药常识 </h2>
        <div class="imgNews">
            {{~it.allcolumn.medication.imgnews:item}}
                <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
            {{~}}
            <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
            {{~it.allcolumn.medication.newslist:item:index}}
                {{? index!==it.allcolumn.medication.newslist.length-1}}
                     <li>
                         <a class="l" href="{{=clientPath+item.url}}">
                            <span></span>{{=item.title}}
                         </a>
                         {{? item.comnum!=='0'}}
                            <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                            <a class="clear"></a>
                         {{?}}
                     </li>
                {{??}}
                    <li class="noBorder">
                        <a class="l" href="{{=clientPath+item.url}}">
                            <span></span>{{=item.title}}
                        </a>
                        {{? item.comnum!=='0'}}
                           <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                           <a class="clear"></a>
                        {{?}}
                    </li>
                {{?}}
             {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.medication.columnurl}}">进入用药常识频道</a>
        <div class="h10"></div>
    </div>
    <!--两性健康-->
    <div>
        <h2 class="h2-t h2-t2"> <em></em> 两性健康 </h2>
        <div class="imgNews">
               {{~it.allcolumn.sexual.imgnews:item}}
                   <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
               {{~}}
               <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
                {{~it.allcolumn.sexual.newslist:item:index}}
                    {{? index!==it.allcolumn.sexual.newslist.length-1}}
                        <li>
                             <a class="l" href="{{=clientPath+item.url}}">
                                <span></span>{{=item.title}}
                             </a>
                             {{? item.comnum!=='0'}}
                                <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                <a class="clear"></a>
                             {{?}}
                        </li>
                    {{??}}
                        <li class="noBorder">
                           <a class="l" href="{{=clientPath+item.url}}">
                               <span></span>{{=item.title}}
                           </a>
                           {{? item.comnum!=='0'}}
                              <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                              <a class="clear"></a>
                           {{?}}
                        </li>
                    {{?}}
                {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.sexual.columnurl}}">进入两性健康频道</a>
        <div class="h10"></div>
    </div>
    <!--保健养生+ -->
    <div>
        <h2 class="h2-t h2-t3"> <em></em> 保健养生 </h2>
        <div class="imgNews">
                {{~it.allcolumn.regimen.imgnews:item}}
                  <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
                {{~}}
                <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
                {{~it.allcolumn.regimen.newslist:item:index}}
                      {{? index!==it.allcolumn.regimen.newslist.length-1}}
                          <li>
                               <a class="l" href="{{=clientPath+item.url}}">
                                  <span></span>{{=item.title}}
                               </a>
                               {{? item.comnum!=='0'}}
                                  <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                  <a class="clear"></a>
                               {{?}}
                          </li>
                      {{??}}
                          <li class="noBorder">
                             <a class="l" href="{{=clientPath+item.url}}">
                                 <span></span>{{=item.title}}
                             </a>
                             {{? item.comnum!=='0'}}
                                <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                <a class="clear"></a>
                             {{?}}
                          </li>
                      {{?}}
                {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.regimen.columnurl}}">进入保健养生频道</a>
        <a class="imgnolike" href="{{=clientPath+it.adfirst.linkurl}}"> <img src="{{=it.adfirst.imageurl}}"> </a>
    </div>
    <!-- 健康问答 -->
    <div>
        <h2 class="h2-t h2-t4"> <em></em>健康问答</h2>
        <div class="imgNews">
                {{~it.allcolumn.answer.imgnews:item}}
                <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
                {{~}}
                <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
                {{~it.allcolumn.answer.newslist:item:index}}
                   {{? index!==it.allcolumn.answer.newslist.length-1}}
                         <li>
                              <a class="l" href="{{=clientPath+item.url}}">
                                 <span></span>{{=item.title}}
                              </a>
                              {{? item.comnum!=='0'}}
                                 <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                 <a class="clear"></a>
                              {{?}}
                         </li>
                   {{??}}
                         <li class="noBorder">
                            <a class="l" href="{{=clientPath+item.url}}">
                                <span></span>{{=item.title}}
                            </a>
                            {{? item.comnum!=='0'}}
                               <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                               <a class="clear"></a>
                            {{?}}
                         </li>
                   {{?}}
                {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.answer.columnurl}}">进入健康问答频道</a>
        <div class="h10"></div>
    </div>
    <!-- 健康快讯 -->
    <div>
        <h2 class="h2-t h2-t5"> <em></em> 健康快讯 </h2>
        <div class="imgNews">
                {{~it.allcolumn.health.imgnews:item}}
                <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
                {{~}}
           <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
                {{~it.allcolumn.health.newslist:item:index}}
                      {{? index!==it.allcolumn.health.newslist.length-1}}
                           <li>
                                <a class="l" href="{{=clientPath+item.url}}">
                                   <span></span>{{=item.title}}
                                </a>
                                {{? item.comnum!=='0'}}
                                   <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                   <a class="clear"></a>
                                {{?}}
                           </li>
                     {{??}}
                           <li class="noBorder">
                              <a class="l" href="{{=clientPath+item.url}}">
                                  <span></span>{{=item.title}}
                              </a>
                              {{? item.comnum!=='0'}}
                                 <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                 <a class="clear"></a>
                              {{?}}
                           </li>
                     {{?}}
                {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.health.columnurl}}">进入健康快讯频道</a>
        <div class="h10"></div>
    </div>
    <!-- 美容瘦身+ -->
    <div>
        <h2 class="h2-t h2-t6"> <em></em> 美容瘦身 </h2>
        <div class="imgNews">
                {{~it.allcolumn.beauty.imgnews:item}}
                <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
                {{~}}
          <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
                {{~it.allcolumn.beauty.newslist:item:index}}
                    {{? index!==it.allcolumn.beauty.newslist.length-1}}
                         <li>
                              <a class="l" href="{{=clientPath+item.url}}">
                                 <span></span>{{=item.title}}
                              </a>
                              {{? item.comnum!=='0'}}
                                 <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                 <a class="clear"></a>
                              {{?}}
                         </li>
                    {{??}}
                         <li class="noBorder">
                            <a class="l" href="{{=clientPath+item.url}}">
                                <span></span>{{=item.title}}
                            </a>
                            {{? item.comnum!=='0'}}
                               <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                               <a class="clear"></a>
                            {{?}}
                         </li>
                    {{?}}
                {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.beauty.columnurl}}">进入美容瘦身频道</a>
        <a class="imgnolike" href="{{=clientPath+it.adsecond.linkurl}}"> <img src="{{=it.adsecond.imageurl}}"> </a>
    </div>
    <!-- 医疗器械 -->
    <div>
        <h2 class="h2-t h2-t7"> <em></em> 医疗器械 </h2>
        <div class="imgNews">
                {{~it.allcolumn.devices.imgnews:item}}
                <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
                {{~}}
          <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
                {{~it.allcolumn.devices.newslist:item:index}}
                  {{? index!==it.allcolumn.devices.newslist.length-1}}
                       <li>
                            <a class="l" href="{{=clientPath+item.url}}">
                               <span></span>{{=item.title}}
                            </a>
                            {{? item.comnum!=='0'}}
                               <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                               <a class="clear"></a>
                            {{?}}
                       </li>
                  {{??}}
                       <li class="noBorder">
                          <a class="l" href="{{=clientPath+item.url}}">
                              <span></span>{{=item.title}}
                          </a>
                          {{? item.comnum!=='0'}}
                             <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                             <a class="clear"></a>
                          {{?}}
                       </li>
                  {{?}}
                {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.devices.columnurl}}">进入医疗器械频道</a>
        <div class="h10"></div>
    </div>
    <!-- 母婴健康 -->
    <div>
        <h2 class="h2-t h2-t8"> <em></em> 母婴健康 </h2>
        <div class="imgNews">
                {{~it.allcolumn.child.imgnews:item}}
                <a href="{{=clientPath+item.url}}"> <img src={{=item.mthumb}}> <span>{{=item.title}}</span> </a>
                {{~}}
          <div class="clear"></div>
        </div>
        <div class="he4"></div>
        <ul class="hotUl ul-t1">
                {{~it.allcolumn.child.newslist:item:index}}
                     {{? index!==it.allcolumn.child.newslist.length-1}}
                           <li>
                                <a class="l" href="{{=clientPath+item.url}}">
                                   <span></span>{{=item.title}}
                                </a>
                                {{? item.comnum!=='0'}}
                                   <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                   <a class="clear"></a>
                                {{?}}
                           </li>
                      {{??}}
                           <li class="noBorder">
                              <a class="l" href="{{=clientPath+item.url}}">
                                  <span></span>{{=item.title}}
                              </a>
                              {{? item.comnum!=='0'}}
                                 <a class="r" href="{{=clientPath+item.url}}">{{=item.comnum}}</a>
                                 <a class="clear"></a>
                              {{?}}
                           </li>
                     {{?}}
                {{~}}
        </ul>
        <a class="goDrug fz16" href="{{=clientPath+it.allcolumn.child.columnurl}}">进入母婴健康频道</a>
    </div>