function ajaxCall(){
   $.ajax({
       url:'/search/'+ $("#searchValue").val(), 
       dataType:'json',
       type:'GET',
       success: function(data){
            // var search = $("#searchValue").val();
            // console.log(search);
            console.log(data);
           
            $('.jumbotron').empty();


            if(data.id==404){
                var eachSave="<div class='card text-white bg-dark' style='margin-top: 10px'>"
                eachSave+="<div class='card-header' style='background: rgb(56,55,55);background: linear-gradient(90deg, rgba(56,55,55,1) 71%, rgba(19,88,99,1) 100%);'></div>"
                eachSave+="<div class='col'><div class='card-body'><h5 class='card-title'>"+"No Such Subreddit in Your Saves"+"</h5>";
                eachSave+="<a href='/' class='btn btn-primary'>Go Back To Home</a>";
                eachSave+="</div></div></div></div>"
                $('.jumbotron').append(eachSave);
            }

            else{
                for (item in data){
		    var eachSave="<div class='card text-white bg-dark' style='margin-top: 10px'>"
		    eachSave+="<div class='card-header' style='background: rgb(56,55,55);background: linear-gradient(90deg, rgba(56,55,55,1) 71%, rgba(19,88,99,1) 100%);'>"
		    eachSave+= "r/"+data[item].subreddit+"</div>";
		    eachSave+="<div class='row no-gutters'><div class='col-auto'><img src='";

		    // blur the nsfw image
		    if(data[item].nsfw==true){
			eachSave+=data[item].url+"'" +"style='width:90px;height:90px;border:1px;margin-top:15px;-webkit-filter:blur(6px)'></div>";
		    }
		    else{
			eachSave+=data[item].url+"'" +"style='width:90px;height:90px;border:1px;margin-top: 15px'></div>";
		    }

		    eachSave+="<div class='col'><div class='card-body'><h5 class='card-title'>"+data[item].title+"</h5>";

		    // add heading to the nsfw post
		    if(data[item].nsfw==true){
			eachSave+="<h3>[NSFW]</h3>";
		    }

		    eachSave+="<a href='https://www.reddit.com"+data[item].link+ "' target='_blank' class='btn btn-primary'>Go To Post</a>";
		    eachSave+=" </div></div></div></div>"
		    $('.jumbotron').append(eachSave);
		};
	    }

	    // console.log(data);
       }
   });
};


$(document).ready(function(){
    // get all saves at initial
    $.getJSON("/allsaves",function(data){
         //console.log(data);
        for (item in data){
	    var eachSave="<div class='card text-white bg-dark' style='margin-top: 10px'>"
	    eachSave+="<div class='card-header' style='background: rgb(56,55,55);background: linear-gradient(90deg, rgba(56,55,55,1) 71%, rgba(19,88,99,1) 100%);'>"
	    eachSave+= "r/"+data[item].subreddit+"</div>";
	    eachSave+="<div class='row no-gutters'><div class='col-auto'><img src='";

	    // blur the nsfw image
	    if(data[item].nsfw==true){
		eachSave+=data[item].url+"'" +"style='width:90px;height:90px;border:1px;margin-top:15px;-webkit-filter:blur(6px)'></div>";
	    }
	    else{
		eachSave+=data[item].url+"'" +"style='width:90px;height:90px;border:1px;margin-top: 15px'></div>";
	    }
	    
	    eachSave+="<div class='col'><div class='card-body'><h5 class='card-title'>"+data[item].title+"</h5>";
	    if(data[item].nsfw==true){
		eachSave+="<h3>[NSFW]</h3>";
	    }
	    eachSave+="<a href='https://www.reddit.com"+data[item].link+ "' target='_blank' class='btn btn-primary'>Go To Post</a>";
	    eachSave+=" </div></div></div></div>"
	    $('.jumbotron').append(eachSave);
	};
    });

    //fetching saves 
    $("#allSave").on('click',function(){
	$.getJSON("/fetch",function(data){
	    if(data==="success"){
		$('.toast').toast('show');
		$('.toast-body').append("<p class='text-success'> Successfully Fetched All Your Saves </p> ");
	    }
	    else{
		$('.toast').toast('show');
		$('.toast-body').append("<p class='text-warning'>Unsuccessful Fetching. Try Agaian !</p>");
	    }
	});
    });
    
    $("#searchValue").off('keyup');
    $("#searchValue").on('keyup',function(){
	ajaxCall();
    });


}); 



