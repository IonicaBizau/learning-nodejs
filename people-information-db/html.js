// Create table function
exports.createTable = function(items){
    var result = "<center><table border='1'><tr><td>FIRST NAME</td><td>LAST NAME</td><td>AGE</td><td>GENDER</td><td>ACTIONS<a href='add'><button>Add</button></a></td></tr>";

    for(var i in items){
    	    result += "<tr><td>" + items[i].firstName + "</td><td>" + items[i].lastName +"</td><td>" + items[i].age + "</td><td>" + items[i].gender + "</td><td><a href='edit?id=" + items[i]._id.toString() + "'><button>Edit</button></a><a href='delete?id=" + items[i]._id.toString() + "'><button>Delete</button></a></td></tr>";
    }
    
    result += "</table></center>";
    return result;
}


// Create edit/add data form
exports.createForm = function(item){
    // Begin of HTML content
    var result = "<html><body><center><h1>";

    // ------ TOP MESSAGE ------
    result += (item ? "Edit the data and press Save button" : "Add data and press Insert button");
    result += "</h1>";
    
    // ------ FORM BEGINING ------
    result += "<form enctype='multipart/form-data' name='input' action='" + (item ? "/edit?id=" + item._id.toString() : "/add") + "' method='post'>";
    
    // ------ FORM CONTENT ------
    // First name
    result += "First name: <input type='text' name='firstName' value='" + (item ? item.firstName : "") + "'><br>";
    
    // Last name
    result += "Last name: <input type='text' name='lastName' value='" + (item ? item.lastName : "") + "'><br>";
    
    // Age
    result += "Age: <input type='text' name='age' value='" + (item ? item.age : "") + "'><br>";
    
    // Gender
    var itemOrEmpty = item || {};
    var checkedOption = itemOrEmpty.gender === "male" ? "checked" : "";
    var radioButtons = "Gender: <input type='radio' name='gender' value='male' " + checkedOption + ">Male<input type='radio' name='gender' value='female'" + (checkedOption === "" ? "checked" : "") + ">Female<br>";
    result += radioButtons;
    
    // Submit button
    result += "<input type='submit' value='" + (item ? "Save" : "Insert") + "'>";
    
    // End of HTML content
    result += "</form></center></body></html>";
    
    return result;
}

// Create delete data form
exports.createDeleteForm = function(item){
    var result = "<html>" +
                 "  <body>" +
                 "      <center>" +
                 "          <h1>Are you sure you want to delete data selected?</h1>" +
                 "          <form enctype='multipart/form-data' name='input' action='/delete?id=" + item._id.toString() + "' method='post'>" +
                 "           <span>First name: " + item.firstName + "</span><br>" +
                 "          <span>First name: " + item.lastName + "</span><br>" +
                 "          <span>Age: " + item.age + "</span><br>" +
                 "          <span>Gender: " + item.gender + "</span><br>" +

                 "          <input type='submit' value='Yes, delete.'>" +
                 "          </form>" +
                 "      </center>" +
                 "  </body>" +
                 "  </html>";
    return result;
}

// Display thank you message
exports.createThankYouMessage = function(){
    var result ="<html>" + 
                "<body onload='window.setTimeout(function(){document.location = \"/\";}, 1000)'" + 
                "<h1>Thank you. You will be redirected to homepage in one second." + 
                "</body>" +
                "</html>";
    return result;
}
