

    export const dom = () => {
        var screenY = $(window).height();

        $(window).on('load', function(){
            $("#divTimer").timer({
                seconds: 3,
                callback: hideTip(),
                repeat: false
            });
        });

        $(window).on('resize', function(){
            screenY = $(window).height();
            $("#mapHolder").css("height", screenY);
        });

        $(function(){
            $('#divTip1').toggle().animate({left:"70px"}, "slow");	
            $("#mapHolder").css("height", screenY);	 
       });
    };

    export const hideTip = () => {
        $('#divTip1').animate({bottom:"-200px"}, "slow");
    }








