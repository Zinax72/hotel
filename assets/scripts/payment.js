$.ajax({
    url:"../../controller/checkSession.php",
    type:"GET",
    dataType:"JSON",
    success:function(data){ 
        if(data.role == "RECEPTIONIST") {
            $(".managerOnly").hide();
            $(".adminOnly").hide();
        } else if (data.role == "MANAGER") {
            $(".adminOnly").hide();
        }
    }
});

$("#logoutBtn").click(function(){
    $.ajax({
        url:"../../controller/authControl.php",
        type:"POST",
        data:{
            action:"logoutUser"
        },
        success:function(data) {
            window.location.href = "../login.html"
        }
    })
});

loadPayments();
function loadPayments() {
    $.ajax({
        url:"../../controller/paymentRecords.php",
        type:"GET",
        data: {
            action:"getAllPayments"
        },
        success:function(data) {
            let pay = JSON.parse(data);
            if (pay.length == 0) {
                $("#payments").append('<tr><td colspan="5">NO DATA AVAILABLE</td></tr>');
                return;
            }

            pay.forEach(e=> {
                let table = `
                    <tr>
                        <td>${e.paymentID}</td>
                        <td>${e.resID}</td>
                        <td>${e.amount}</td>
                        <td>${e.payMethod}</td>
                        <td>${e.payStatus}</td>
                    </tr>
                `;
                $("#payments").append(table);
            });
        }
    });
};
