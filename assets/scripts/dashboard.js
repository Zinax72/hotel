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
        url: "../../controller/authControl.php",
        type: "POST",
        data: { action: "logoutUser" },
        success: function() {
            window.location.href = "../login.html";
        }
    });
});

$(function() {
    loadRevenue();
    loadRoomTypes();
    loadOccupancy();
    loadFrequentGuests();
});

function loadRevenue() {
    $.ajax({
        url:"../../controller/dashboard.php",
        type:"GET",
        data:{
            action:"getRevenuePerMonth"
        },
        success:function(data) {
            let rows = JSON.parse(data);

            let labels = rows.map(e => e.month);
            let values = rows.map(e => parseFloat(e.revenue));

            let ctx = document.getElementById("revenueChart").getContext('2d');

            new Chart(ctx, {
                type:'line',
                data: {
                    labels: labels,
                    datasets:[{
                        label: 'Revenue (₱)',
                        data: values,
                        borderColor: "#4e73df",
                        backgroundColor: 'rgba(78, 115, 223, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend:{
                            display: true
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    });
}

function loadRoomTypes() {
    $.ajax({
        url:"../../controller/dashboard.php",
        type:"GET",
        data:{
            action:"getMostBookedRoomTypes"
        },
        success:function(data) {
            let rows = JSON.parse(data);

            let labels = rows.map(e => e.typeName);
            let values = rows.map(e => parseInt(e.bookingCount));
            
            let ctx = document.getElementById("roomTypesChart").getContext('2d');

            new Chart(ctx, {
                type:'bar',
                data:{ 
                    labels: labels,
                    datasets: [{
                        label: 'Bookings',
                        data: values,
                        backgroundColor: '#b89a6a',
                        borderColor: '#d4b88a',
                        borderWidth: 1
                    }]
                },
                options:{
                    responsive: true,
                    plugins:{
                        legend:{
                            display: false
                        }
                    },
                    scales:{
                        y:{
                            beginAtZero: true,
                            ticks:{
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }
    });
}

function loadOccupancy() {
    $.ajax({
        url:"../../controller/dashboard.php",
        type:"GET",
        data:{
            action:"getOccupancyRate"
        },
        success:function(data) {
            let rows = JSON.parse(data);

            let labels = rows.map(e => "Room " + e.roomNo);
            let values = rows.map(e => parseInt(e.totalNights) || 0);

            let ctx = document.getElementById("occupancyChart").getContext('2d');

            new Chart(ctx, {
                type:'bar',
                data: {
                    labels: labels,
                    datasets:[{
                        label: 'Nights Occupied',
                        data: values,
                        backgroundColor: '#4a7043',
                        borderColor: '#5a8053',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }
    });
}

function loadFrequentGuests() {
    $.ajax({
        url:"../../controller/dashboard.php",
        type:"GET",
        data:{
            action:"getMostFrequentGuests"
        },
        success:function(data){
            let rows = JSON.parse(data);

            let tbody = $("#frequentGuestsTable tbody");
            tbody.html('');

            if (rows.length == 0) {
                tbody.append('<tr><td colspan="4">NO DATA AVAILABLE</td></tr>');
                return;
            }

            rows.forEach(e => {
                let row = `
                <tr>
                    <td>${e.firstName} ${e.lastName}</td>
                    <td>${e.email}</td>
                    <td>${e.totalBookings}</td>
                    <td>₱${parseFloat(e.totalSpent).toLocaleString()}</td>
                </tr>
                `;

                tbody.append(row);
            });
        }
    });
}