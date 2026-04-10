$.ajax({
    url:"../../controller/checkSession.php",
    type:"GET",
    dataType:"JSON",
    success:function(data){
        if(data.loggedIN) {
            $("#loginBtn").hide();
            $("#burgerBtn").show(); // ✅ show when logged in
            $("#navUsername").text("WELCOME, Mr. " + data.firstName);
        } else {
            $("#burgerBtn").hide(); // ✅ hide when not logged in
            $("#loginBtn").show();  // make sure login shows
        }
    }
});