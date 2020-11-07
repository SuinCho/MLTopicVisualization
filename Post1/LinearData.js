

// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//   output.innerHTML = this.value;
// }
$(document).ready(function(){
    $.ajax({
        url:"./archive/2020_revised.csv",
        dataType:"text", 
        success:function(data)
        {
            var country_data = data.split(/\r?\n|\r/);
            var country_name = [];
             var gdp = [];
             var ladder_score = [];
            for(var count = 1; count < country_data.length; count++) {
                var cell_data = country_data[count].split(",");
                 for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                     if(cell_count === 0) {
                         country_name.push(cell_data[cell_count]);
                     }
                     if(cell_count === 2) {
                         ladder_score.push(cell_data[cell_count]);
                     }
                     if(cell_count === 6){
                         gdp.push(cell_data[cell_count]);
                     }
                 }
            }
         handleAsync(country_name, gdp, ladder_score);
        }
    })
    var slider = document.getElementById("gdp");
    // var gdpval = document.getElementById("gdpval");
    // gdpval.innerHTML = slider.value; // Display the default slider value
    console.log("aaa")
 })
 function handleAsync(country_name, gdp, ladder_score) {
     console.log(gdp)
     console.log(country_name)
     $("#country").text(country_name[1])
     $("#gdpval").text(gdp[1])
 }