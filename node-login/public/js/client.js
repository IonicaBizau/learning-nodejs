$(document).ready(function() {
    $.get("/getUserProfileData", function(data) {
        if (data === "null") {
            $("#error").find(".message").text("Please login.");
            $("#success").remove();
        }
        else {
            $("#error").remove();
            
            // string ---> JSON 
            data = $.parseJSON(data);
            setText(data);
            handlers();
        }
        
        $(".loading").fadeOut();
    });
});

function handlers() {
    $(".edit").editable({
        type: "text",
        pk: 1,
        url: "/edit_profile",
        title: "Edit:"
    });
    
    $(".btn-revoke").bind("click", function() {
    	var type = $(this).attr("data-type");
    	
    	$.post("/revokeAccess", {
    		"type": type
    	}, function(data) {
    		if (data.indexOf("error") !== -1) {
    			return;
    		}
    		
    		$("#div-" + type).fadeOut();
    	});
    });
}

/**
 * Set the text in page (profile information)
 * @param {Object} data
 */
function setText(data) {
    var type = "";
    
    var githubButton = "<a href='/login/github'>" +
                           "<button class='btn btn-large btn-info'>" +
                               "<img src='img/github-icon.png'> Login with Github" + 
                           "</button>" +
                       "</a>";
                    
    var bitbucketButton = "<a href='/login/bitbucket'>" +
                              "<button class='btn btn-large btn-primary'>" +
                                  "<img src='img/bitbucket-icon.png'> Login with Bitbucket" + 
                              "</button>" +
                          "</a>";

    if (data.github) {
        type = "github";
        var template = $(".template").clone().removeClass("template");
        setInfo(template, data, type);
        $("#information").prepend(template);
    }
    else {
        $("#information").prepend(githubButton);        
    }
        
    if (data.bitbucket) {
        type = "bitbucket";
        var template = $(".template").clone().removeClass("template");
        setInfo(template, data, type);
        $("#information").prepend(template);
    }
    else {
        $("#information").prepend(bitbucketButton);
    }

    if (type !== "") {
        $("#avatar").attr("src", data[type].avatar_url);    
    }
	else {
	    $("#avatar").hide();
	}
	
    $(".street").text(data.address.street);
    $(".zip").text(data.address.zip);
    $(".location").text(data.address.location);
}

/**
 * Set information in the element
 * @param {Object} element
 * @param {Object} data
 * @param {Object} type
 */
function setInfo(element, data, type) {
	var revokeLink = "";
	if (type === "github") {
		revokeLink = "https://github.com/settings/applications";
	}
	else {
		revokeLink = "https://bitbucket.org/account/user/" + data[type].login + "/api"
	}
	
	element.attr("id", "div-" + type);
	element.find(".btn-revoke").attr("data-type", type);
	element.find(".revoke-link").attr("href", revokeLink);
	element.find(".name").text(data[type].name);
    element.find(".username").text(data[type].login);
    element.find(".latest-login").text(data.latest_login);
    element.find(".account-created").text(data[type].account_created);
    element.find(".repos").text(data[type].public_repos);
    element.find(".type").text(type.charAt(0).toUpperCase() + type.slice(1)).attr("data-type", type);
    element.find(".email").text(data.email);
}