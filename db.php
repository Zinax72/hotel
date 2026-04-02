<?php 

if(!function_exists('getConnection')){
    function getConnection($role = 'GUEST'){ 
        switch($role) {
            case 'GUEST':
                $user = 'hotel_guest';
                $pass = 'guest123';
                break;
            case 'RECEPTIONIST':
                $user = 'hotel_receptionist';
                $pass = 'receptionist123';
                break;
            case 'MANAGER':
                $user = 'hotel_manager';
                $pass = 'manager123';
                break;
            case 'ADMIN':
                $user = 'hotel_admin';
                $pass = 'admin123';
                break;
            default:
                $user = 'hotel_guest';
                $pass = 'guest123';
        }

        $conn = new mysqli("localhost", $user, $pass, "hotel");
        
        if ($conn->connect_error) { 
            die("Connection failed: ".$conn->connect_error);
        }            

        return $conn;

    }

    function getAuthConnection(){
        $conn = new mysqli("localhost", "hotel_admin", "admin123", "hotel");

        if ($conn->connect_error) { 
            die("Connection failed: ".$conn->connect_error);
        }
        return $conn;
    }

    $conn = getConnection();
}


   
?>