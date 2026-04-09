$.ajax({
    url:"../../controller/checkSession.php",
    type:"GET",
    dataType:"JSON",
    success:function(data){ 
        if(data.role == "RECEPTIONIST") {
            $(".managerOnly").hide();
            $(".adminOnly").hide();
        } else if (data.role == "MANAGER") {
            $(".adminonly").hide();
        }
    }
});

$("#logoutBtn").click(function(){
    $.ajax({
        url: "../../controller/authControl.php",
        type: "POST",
        data: { action: "logoutUser" },
        success: function() {
            window.location.href = "../login.html";
        }
    });
});

$.ajax({
    url:"../../controller/dashboard.php",
    type:"GET",
    dataType:"json",
    success: function(data) {
        let month = [];
        let total = [];

        for(let i in data) {
            month.push(data[i].months);
            total.push(data[i].total);
        }

        let chart = document.getElementById("myChart");

        new Chart(chart, {
            type: "doughnut",
            data: {
                labels: month,
                datasets: [{
                    data: total,
                    backgroundColor: [
                        "rgba(79,142,247,0.85)",
                        "rgba(34,211,161,0.85)",
                        "rgba(251,191,36,0.85)",
                        "rgba(248,113,113,0.85)",
                        "rgba(124,58,237,0.85)",
                        "rgba(251,146,60,0.85)",
                        "rgba(20,184,166,0.85)",
                        "rgba(236,72,153,0.85)",
                        "rgba(99,102,241,0.85)",
                        "rgba(16,185,129,0.85)",
                        "rgba(245,158,11,0.85)",
                        "rgba(239,68,68,0.85)",
                    ],
                    borderWidth: 1
                }]
            },
            options: {
             responsive: true,     
       
    
        }
        });
        
    }
        });