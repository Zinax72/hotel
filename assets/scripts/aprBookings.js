loadData();

function loadData(){
    $.ajax({
        url:"manageBookings.php",
        type:"POST",
        success:function(data){
            $("#result").html(data);
        }
    })
}