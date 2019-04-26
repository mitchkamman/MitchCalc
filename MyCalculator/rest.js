$(function (){

    $.ajax({
        type: 'GET', 
        url: 'http://0.0.0.0:5007/log/2+3=4',
        success: function(data) {
            console.log('success', data)
        }
    });

});