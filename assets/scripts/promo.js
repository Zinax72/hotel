// Check Session
$.ajax({
    url: "../../controller/checkSession.php",
    type: "GET",
    dataType: "JSON",
    success: function(data) { 
        if(data.role == "RECEPTIONIST") {
            $(".managerOnly").hide();
            $(".adminOnly").hide();
        } else if (data.role == "MANAGER") {
            $(".adminOnly").hide();
        }
    }
});

loadPromotions();

function loadPromotions() {
    $.ajax({
        url: "../../controller/promo.php",
        type: "GET",
        data: { action: "getAll" },
        success: function(data) {
            let p = JSON.parse(data);
            
            $("#promotions").empty(); 

            if(p.length == 0) {
                $("#emptyTable").html('<p>No Promotions Found</p>');
                return;
            }

            p.forEach(e => {
                let actions = `
                <div class="actionBtns">
                    <button class="editBtn" data-id="${e.promoID}">EDIT</button>
                    <button class="deleteBtn" data-id="${e.promoID}">DELETE</button>
                </div>
                `;

                let tableRow = `
                    <tr>
                        <td>${e.promoID}</td>
                        <td>${e.promoName}</td>
                        <td>${e.discountPercent}%</td>
                        <td>${e.startDate}</td>
                        <td>${e.endDate}</td>
                        <td>${e.status}</td>
                        <td>${actions}</td>
                    </tr>
                `;
                $("#promotions").append(tableRow);
            });
        }
    });
}

// Logout
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

// Add Button
$(document).on("click", "#addBtn", function() {
    $("#addModal").css("display", "flex");
});

// Close Modals
$(document).on("click", ".close", function() {
    $(this).closest(".modal").fadeOut(200);
});

// Save Add
$(document).on("click", "#saveAddBtn", function() {
    $.ajax({
        url: "../../controller/promo.php",
        type: "POST",
        data: {
            action: "add",
            promoName: $("#addPromoName").val(),
            discountPercent: $("#addDiscountPercent").val(),
            startDate: $("#addStartDate").val(),
            endDate: $("#addEndDate").val(),
            status: $("#addStatus").val()
        },
        success: function(data) {
            alert("Promotion Added Successfully");
            $("#addModal").fadeOut(200);
            $("#promotions").empty();
            loadPromotions();
        }
    });
});

// Edit Button
$(document).on("click", ".editBtn", function() {
    let promoID = $(this).data("id");

    $.ajax({
        url: "../../controller/promo.php",
        type: "GET",
        data: {
            action: "getOne",
            promoID: promoID
        },
        success: function(data) {
            let d = JSON.parse(data);

            $("#editPromoID").val(d.promoID);
            $("#editPromoName").val(d.promoName);
            $("#editDiscountPercent").val(d.discountPercent);
            $("#editStartDate").val(d.startDate);
            $("#editEndDate").val(d.endDate);
            $("#editStatus").val(d.status);

            $("#editModal").css("display", "flex");
        }
    });
});

// Save Edit
$(document).on("click", "#saveEditBtn", function() {
    $.ajax({
        url: "../../controller/promo.php",
        type: "POST",
        data: {
            action: "update",
            promoID: $("#editPromoID").val(),
            promoName: $("#editPromoName").val(),
            discountPercent: $("#editDiscountPercent").val(),
            startDate: $("#editStartDate").val(),
            endDate: $("#editEndDate").val(),
            status: $("#editStatus").val()
        },
        success: function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Promotion Updated Successfully");
                $("#editModal").fadeOut(250);
                $("#promotions").empty();
                loadPromotions();
            } else {
                alert(d.message || "Update failed");
            }
        }
    });
});

// Delete Button
$(document).on("click", ".deleteBtn", function() {
    if(!confirm("Are you sure you want to delete this promotion?")) {
        return;
    }

    let promoID = $(this).data("id");

    $.ajax({
        url: "../../controller/promo.php",
        type: "POST",
        data: {
            action: "delete",
            promoID: promoID
        },
        success: function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Promotion Deleted");
                $("#promotions").empty();
                loadPromotions();
            } else {
                alert(d.message || "Delete failed");
            }
        }
    });
});