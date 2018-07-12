{{~it:item:index}}
    <li>
        <div class="commentDiv">
                <img class="faceImg" src="../css/image/faceImg.png">
                <div class="comment-List-r">
                    <div class="com-List-p">
                        <span class="com-name">{{=item.username}}</span> <span class="com-time">{{=item.release}}</span>
                    </div>
                    <p>{{=item.content}}</p>
                    <div class="np-post-footer">
                        <a href="javascript:void(0)" id='{{=item.id}}' data-attach-point=point count='{{=item.support}}' class="btn btn-upvote">(<em>{{=item.support}}</em>)</a>
                        <a href="javascript:void(0)" data-attach-point="reply" class="btn btn-reply">回复(<em>{{=item.replynum}}</em>)</a>
                    </div>
                     <!--回复-->
                    <div class="textArea" style="display:none">
                        <textarea placeholder="说说此刻自己的想法......" data-attach-point='area'></textarea>
                        <div class="Islogin">
                            <a class="goWrite" id={{=item.id}} data-attach-point="goReply">发表</a>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
        </div>
        <!--回复后-->
            <div data-attach-point="addItem">
                {{~item.replycomment:temp}}
                    <div class="replyDiv">
                        <img class="faceImg" src="../css/image/faceImg.png">
                        <div class="comment-List-r">
                            <div class="com-List-p">
                                <span class="com-name">{{=temp.username}}</span> <span class="com-time">{{=temp.release}}</span>
                            </div>
                            <p>{{=temp.content}}</p>
                        </div>
                    </div>
                {{~}}
            </div>
    </li>
{{~}}