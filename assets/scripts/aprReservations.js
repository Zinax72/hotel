loadReservations();

function loadReservations() {
    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{action:"getAllRes"},
        success:function(data){
            let res = JSON.parse(data);
            if(res.length == 0) {
                $("#reservations").html('<p>No reservations found.</p>');
                return;
            }

            res.forEach(e=>{
                let pet = e.hasPet == 1 ? "YES" : "NO";
                let discount = e.discountType ? e.discountType : "NONE";
                
                let actions = '';
                if (e.status == "PENDING") {
                    actions = `
                    <button class="approveBtn" data-id="${e.resID}">Approve</button>
                    <button class="cancelBtn" data-id="${e.resID}">Cancel</button>
                    <button class="editBtn" data-id="${e.resID}">Edit</button>
                    <button class="deleteBtn" data-id="${e.resID}">Delete</button>
                    `;
                } else if (e.status == "CONFIRMED") {
                    actions = `
                    <button class="approveBtn" data-id="${e.resID}">Approve</button>
                    <button class="cancelBtn" data-id="${e.resID}">Cancel</button>
                    <button class="editBtn" data-id="${e.resID}">Edit</button>
                    <button class="deleteBtn" data-id="${e.resID}">Delete</button>
                    `;
                } else if (e.status == "CANCELLED" || e.status == "COMPLETED") {
                    actions = `
                    <button class="deleteBtn" data-id="${e.resID}">Delete</button>
                    `;
                } 

                let row = `
                    <tr>
                        <td>${e.resID}</td>
                        <td>${e.firstName} ${e.lastName}</td>
                        <td>${e.roomNo}</td>
                        <td>${e.typeName}</td>
                        <td>${e.checkIn}</td>
                        <td>${e.checkOut}</td>
                        <td>${e.guestsNum}</td>
                        <td>${pet}</td>
                        <td>${discount}</td>
                        <td>${e.status}</td>
                        <td>${actions}</td>
                    </tr>
                `;
                $("#reservations").append(row);
            });
        }
    });
}

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

$(document).on("click", ".approveBtn", function(){
    let resID = $(this).data("id");

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"approveRes",
            resID:resID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Reservation Approved!");
                $("#reservations").empty();               
                loadReservations();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".cancelBtn", function(){
    let resID = $(this).data("id");

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"cancelRes",
            resID:resID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Reservation Cancelled");
                $("#reservations").empty();
                loadReservations();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".deleteBtn", function(){
    let resID = $(this).data("id");

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"deleteRes",
            resID:resID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(confirm("Are you sure?")) {
                if(d.success) {
                    alert("Reservation Deleted");
                    $("#reservations").empty();                    
                    loadReservations();
                } else {
                    alert(d.hint);
                }
            }
        }
    });
});