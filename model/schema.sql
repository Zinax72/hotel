-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2026 at 08:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `discountID` int(11) NOT NULL,
  `discountType` enum('PWD','SENIOR CITIZEN') NOT NULL,
  `discountPercent` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`discountID`, `discountType`, `discountPercent`) VALUES
(1, 'PWD', 20.00),
(2, 'SENIOR CITIZEN', 20.00);

-- --------------------------------------------------------

--
-- Table structure for table `login_audit`
--

CREATE TABLE `login_audit` (
  `auditID` int(11) NOT NULL,
  `loginName` varchar(100) DEFAULT NULL,
  `loginTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `action` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_audit`
--

INSERT INTO `login_audit` (`auditID`, `loginName`, `loginTime`, `action`) VALUES
(1, 'AASD@GMAIL.COM', '2026-04-02 11:20:33', 'LOGIN'),
(2, 'AASD@GMAIL.COM', '2026-04-02 11:37:10', 'LOGIN'),
(3, 'AASD@GMAIL.COM', '2026-04-02 11:37:41', 'LOGIN'),
(4, 'AASD@GMAIL.COM', '2026-04-02 11:51:25', 'LOGIN'),
(5, 'AASD@GMAIL.COM', '2026-04-02 11:55:07', 'LOGIN'),
(6, 'AASD@GMAIL.COM', '2026-04-02 12:07:31', 'LOGIN'),
(7, 'AASD@GMAIL.COM', '2026-04-02 12:08:50', 'LOGIN'),
(8, 'AASD@GMAIL.COM', '2026-04-02 12:14:00', 'LOGIN'),
(9, 'AASD@GMAIL.COM', '2026-04-02 12:14:11', 'LOGIN'),
(10, 'AASD@GMAIL.COM', '2026-04-02 12:14:17', 'LOGIN'),
(11, 'AASD@GMAIL.COM', '2026-04-02 12:14:44', 'LOGIN'),
(12, 'AASD@GMAIL.COM', '2026-04-02 12:16:46', 'LOGIN'),
(13, 'AASD@GMAIL.COM', '2026-04-02 12:18:24', 'LOGIN'),
(14, 'AASD@GMAIL.COM', '2026-04-02 12:18:47', 'LOGIN'),
(15, 'AASD@GMAIL.COM', '2026-04-03 04:51:38', 'LOGIN'),
(16, 'james@gmail.com', '2026-04-03 12:27:11', 'LOGIN'),
(17, 'james@gmail.com', '2026-04-03 12:27:30', 'LOGIN'),
(18, 'james@gmail.com', '2026-04-03 12:28:22', 'LOGIN'),
(19, 'james@gmail.com', '2026-04-03 12:28:26', 'LOGIN'),
(20, 'james@gmail.com', '2026-04-03 12:28:53', 'LOGIN'),
(21, 'james@gmail.com', '2026-04-03 12:39:41', 'LOGIN'),
(22, 'AASD@GMAIL.COM', '2026-04-04 09:27:08', 'LOGIN'),
(23, 'AASD@GMAIL.COM', '2026-04-04 09:27:09', 'LOGIN'),
(24, 'AASD@GMAIL.COM', '2026-04-04 09:27:27', 'LOGIN'),
(25, 'AASD@GMAIL.COM', '2026-04-04 09:27:28', 'LOGIN'),
(26, 'AASD@GMAIL.COM', '2026-04-04 09:27:28', 'LOGIN'),
(27, 'AASD@GMAIL.COM', '2026-04-04 09:27:38', 'LOGIN'),
(28, 'james@gmail.com', '2026-04-04 09:57:54', 'LOGIN'),
(29, 'james@gmail.com', '2026-04-04 10:20:31', 'LOGIN'),
(30, 'james@gmail.com', '2026-04-05 00:37:32', 'LOGIN'),
(31, 'james@gmail.com', '2026-04-06 03:20:59', 'LOGIN'),
(32, 'james@gmail.com', '2026-04-06 03:22:13', 'LOGIN'),
(33, 'james@gmail.com', '2026-04-06 03:22:56', 'LOGIN'),
(34, 'AASD@GMAIL.COM', '2026-04-06 03:23:19', 'LOGIN'),
(35, 'james@gmail.com', '2026-04-06 03:23:30', 'LOGIN'),
(36, 'james@gmail.com', '2026-04-06 03:23:47', 'LOGIN'),
(37, 'james@gmail.com', '2026-04-06 03:24:08', 'LOGIN'),
(38, 'james@gmail.com', '2026-04-06 03:27:47', 'LOGIN'),
(39, 'james@gmail.com', '2026-04-06 03:28:22', 'LOGIN'),
(40, 'james@gmail.com', '2026-04-06 03:28:56', 'LOGIN'),
(41, 'james@gmail.com', '2026-04-06 03:29:26', 'LOGIN'),
(42, 'james@gmail.com', '2026-04-06 03:29:46', 'LOGIN'),
(43, 'james@gmail.com', '2026-04-06 03:29:56', 'LOGIN'),
(44, 'james@gmail.com', '2026-04-06 03:30:21', 'LOGIN'),
(45, 'james@gmail.com', '2026-04-06 03:32:01', 'LOGIN'),
(46, 'raymondb@gmail.com', '2026-04-06 05:29:38', 'LOGIN'),
(47, 'james@gmail.com', '2026-04-06 07:13:02', 'LOGIN'),
(48, 'raymondab@gmail.com', '2026-04-06 07:14:15', 'LOGIN'),
(49, 'raymondb@gmail.com', '2026-04-06 07:47:34', 'LOGIN'),
(50, 'raymondb@gmail.com', '2026-04-06 07:48:00', 'LOGIN'),
(51, 'AASD@GMAIL.COM', '2026-04-06 08:14:46', 'LOGIN'),
(52, 'raymondb@gmail.com', '2026-04-06 08:15:32', 'LOGIN'),
(53, 'raymondb@gmail.com', '2026-04-07 14:58:04', 'LOGIN'),
(54, 'AASD@GMAIL.COM', '2026-04-07 15:59:47', 'LOGIN'),
(55, '', '2026-04-07 16:27:07', 'LOGIN'),
(56, 'raymondb@gmail.com', '2026-04-07 16:27:17', 'LOGIN'),
(57, 'AASD@GMAIL.COM', '2026-04-07 16:48:09', 'LOGIN'),
(58, '', '2026-04-07 16:48:15', 'LOGIN'),
(59, 'raymondb@gmail.com', '2026-04-07 16:48:38', 'LOGIN'),
(60, 'AASD@GMAIL.COM', '2026-04-07 17:24:57', 'LOGIN'),
(61, 'AASD@GMAIL.COM', '2026-04-08 12:48:49', 'LOGIN'),
(62, '', '2026-04-08 13:54:38', 'LOGIN'),
(63, 'AASD@GMAIL.COM', '2026-04-08 13:54:41', 'LOGIN'),
(64, '', '2026-04-08 14:12:01', 'LOGIN'),
(65, 'AASD@GMAIL.COM', '2026-04-08 14:12:04', 'LOGIN'),
(66, 'AASD@GMAIL.COM', '2026-04-08 14:12:36', 'LOGIN'),
(67, '', '2026-04-08 16:23:51', 'LOGIN'),
(68, 'AASD@GMAIL.COM', '2026-04-09 16:58:08', 'LOGIN'),
(69, 'AASD@GMAIL.COM', '2026-04-10 01:26:47', 'LOGIN');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `paymentID` int(11) NOT NULL,
  `resID` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payMethod` enum('CASH','CARD') NOT NULL,
  `payStatus` enum('PENDING','PAID','REFUNDED') DEFAULT 'PENDING',
  `payDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`paymentID`, `resID`, `amount`, `payMethod`, `payStatus`, `payDate`) VALUES
(1, 99, 16000.00, 'CASH', 'PAID', '2026-04-10 05:56:48'),
(2, 100, 16000.00, 'CASH', 'PAID', '2026-04-10 05:58:30');

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `promoID` int(11) NOT NULL,
  `promoName` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `promoCode` varchar(50) DEFAULT NULL,
  `discountPercent` decimal(5,2) NOT NULL,
  `maxUses` int(11) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`promoID`, `promoName`, `description`, `promoCode`, `discountPercent`, `maxUses`, `startDate`, `endDate`, `status`, `created_at`) VALUES
(1, 'Valentines Special', NULL, NULL, 15.00, NULL, '2026-02-10', '2026-02-16', 'INACTIVE', '2026-04-07 16:28:46'),
(2, 'Summer Promo', NULL, NULL, 10.00, NULL, '2026-04-01', '2026-05-31', 'ACTIVE', '2026-04-07 16:28:46'),
(3, 'Christmas Special', NULL, NULL, 20.00, NULL, '2026-12-20', '2026-12-26', 'INACTIVE', '2026-04-07 16:28:46'),
(6, 'asd', NULL, NULL, 5.00, NULL, '2026-04-08', '2026-04-09', 'ACTIVE', '2026-04-07 16:41:09');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `resID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `guestsNum` int(11) NOT NULL,
  `numAdults` int(11) DEFAULT 1,
  `numChildren` int(11) DEFAULT 0,
  `hasPet` tinyint(1) DEFAULT 0,
  `discountID` int(11) DEFAULT NULL,
  `promoID` int(11) DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') DEFAULT 'PENDING',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`resID`, `userID`, `roomID`, `checkIn`, `checkOut`, `guestsNum`, `numAdults`, `numChildren`, `hasPet`, `discountID`, `promoID`, `totalPrice`, `status`, `createdAt`) VALUES
(89, 1, 4, '2026-04-10', '2026-04-11', 1, 1, 0, 0, 2, NULL, NULL, 'PENDING', '2026-04-10 02:19:50'),
(90, 1, 7, '2026-04-10', '2026-04-11', 3, 2, 1, 1, 1, NULL, NULL, 'PENDING', '2026-04-10 05:40:22'),
(91, 1, 7, '2026-04-10', '2026-04-11', 3, 2, 1, 1, 1, NULL, NULL, 'PENDING', '2026-04-10 05:40:23'),
(92, 1, 7, '2026-04-10', '2026-04-11', 3, 2, 1, 1, 1, NULL, NULL, 'PENDING', '2026-04-10 05:40:26'),
(93, 1, 7, '2026-04-10', '2026-04-11', 3, 2, 1, 1, 1, NULL, NULL, 'PENDING', '2026-04-10 05:40:28'),
(94, 1, 6, '2026-04-10', '2026-04-11', 4, 3, 1, 1, 1, NULL, 3580.00, 'PENDING', '2026-04-10 05:48:40'),
(95, 1, 8, '2026-04-10', '2026-04-11', 3, 2, 1, 1, 2, NULL, 8400.00, 'PENDING', '2026-04-10 05:49:23'),
(96, 1, 3, '2026-04-10', '2026-04-11', 3, 2, 1, 1, 1, NULL, 4200.00, 'PENDING', '2026-04-10 05:52:25'),
(97, 1, 2, '2026-04-08', '2026-04-11', 1, 1, 0, 0, 2, NULL, 6000.00, 'PENDING', '2026-04-10 05:54:38'),
(98, 1, 10, '2026-04-10', '2026-04-11', 1, 1, 0, 0, 2, NULL, 2000.00, 'PENDING', '2026-04-10 05:55:35'),
(99, 1, 8, '2026-04-12', '2026-04-14', 1, 1, 0, 0, 2, NULL, 16000.00, 'PENDING', '2026-04-10 05:56:48'),
(100, 1, 8, '2026-04-07', '2026-04-09', 1, 1, 0, 0, 2, NULL, 16000.00, 'CONFIRMED', '2026-04-10 05:58:29');

-- --------------------------------------------------------

--
-- Table structure for table `reservations_archive`
--

CREATE TABLE `reservations_archive` (
  `archiveID` int(11) NOT NULL,
  `resID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `guestsNum` int(11) NOT NULL,
  `numAdults` int(11) DEFAULT 1,
  `numChildren` int(11) DEFAULT 0,
  `hasPet` tinyint(1) DEFAULT 0,
  `discountID` int(11) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','PENDING','CONFIRMED') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archivedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `archiveReason` enum('CANCELLED','COMPLETED','DELETED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations_archive`
--

INSERT INTO `reservations_archive` (`archiveID`, `resID`, `userID`, `roomID`, `checkIn`, `checkOut`, `guestsNum`, `numAdults`, `numChildren`, `hasPet`, `discountID`, `status`, `createdAt`, `archivedAt`, `archiveReason`) VALUES
(2, 31, 1, 4, '0000-00-00', '0000-00-00', 1, 1, 0, 0, 0, '', '2026-04-03 07:29:23', '2026-04-03 18:10:01', 'DELETED'),
(3, 33, 1, 9, '0000-00-00', '0000-00-00', 1, 1, 0, 0, 0, 'CANCELLED', '2026-04-03 07:30:46', '2026-04-03 18:10:18', 'DELETED'),
(4, 32, 1, 4, '0000-00-00', '0000-00-00', 1, 1, 0, 0, 0, 'CANCELLED', '2026-04-03 07:30:29', '2026-04-03 18:10:19', 'DELETED'),
(5, 30, 1, 9, '0000-00-00', '0000-00-00', 1, 1, 0, 0, 0, 'CANCELLED', '2026-04-03 07:25:10', '2026-04-03 18:10:20', 'DELETED'),
(7, 22, 1, 4, '0000-00-00', '0000-00-00', 1, 1, 0, 1, 0, 'COMPLETED', '2026-04-02 00:16:02', '2026-04-04 12:53:18', 'DELETED'),
(8, 15, 1, 7, '2026-03-29', '2026-03-31', 3, 2, 1, 1, 1, '', '2026-03-29 05:03:38', '2026-04-05 03:28:00', 'DELETED'),
(9, 9, 1, 3, '2026-03-29', '2026-03-31', 4, 3, 1, 1, 1, 'PENDING', '2026-03-28 22:54:00', '2026-04-05 03:29:30', 'DELETED'),
(10, 13, 1, 1, '2026-03-23', '2026-03-31', 1, 1, 0, 0, 0, 'PENDING', '2026-03-29 03:31:34', '2026-04-05 03:29:39', 'DELETED'),
(11, 22, 1, 4, '0000-00-00', '0000-00-00', 1, 1, 0, 1, 0, 'PENDING', '2026-04-02 00:16:02', '2026-04-05 14:25:07', 'DELETED'),
(12, 21, 1, 6, '2026-04-02', '2026-04-03', 4, 3, 1, 1, 2, 'COMPLETED', '2026-04-01 00:37:49', '2026-04-05 14:25:22', 'DELETED');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `roomID` int(11) NOT NULL,
  `roomNo` varchar(10) NOT NULL,
  `roomTypeID` int(11) NOT NULL,
  `floor` int(11) DEFAULT NULL,
  `status` enum('AVAILABLE','OCCUPIED','MAINTENANCE') DEFAULT 'AVAILABLE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`roomID`, `roomNo`, `roomTypeID`, `floor`, `status`) VALUES
(1, '101', 1, 1, 'AVAILABLE'),
(2, '102', 2, 1, 'AVAILABLE'),
(3, '103', 3, 1, 'AVAILABLE'),
(4, '201', 1, 2, 'AVAILABLE'),
(5, '202', 2, 2, 'AVAILABLE'),
(6, '203', 4, 2, 'AVAILABLE'),
(7, '301', 3, 3, 'AVAILABLE'),
(8, '302', 5, 3, 'AVAILABLE'),
(9, '303', 1, 3, 'AVAILABLE'),
(10, '304', 2, 3, 'AVAILABLE');

-- --------------------------------------------------------

--
-- Table structure for table `roomtypes`
--

CREATE TABLE `roomtypes` (
  `typeID` int(11) NOT NULL,
  `typeName` varchar(50) NOT NULL,
  `pricePerNight` decimal(10,2) NOT NULL,
  `maxOccupancy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roomtypes`
--

INSERT INTO `roomtypes` (`typeID`, `typeName`, `pricePerNight`, `maxOccupancy`) VALUES
(1, 'Standard', 1500.00, 2),
(2, 'Deluxe', 2500.00, 2),
(3, 'Suite', 5000.00, 4),
(4, 'Family', 3500.00, 5),
(5, 'Presidential', 10000.00, 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contactNo` varchar(20) DEFAULT NULL,
  `role` enum('GUEST','RECEPTIONIST','MANAGER','ADMIN') DEFAULT 'GUEST'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `lastName`, `firstName`, `email`, `password`, `contactNo`, `role`) VALUES
(1, 'RAYMOND', 'ABOY', 'AASD@GMAIL.COM', '$2y$10$3JK3hfrskTFuuy8rAQTysO9Sr5RmE5ykSnRRrlUnoLhtHBZZKpfe6', '123123123', 'GUEST'),
(4, 'James', 'Dimla', 'james@gmail.com', '$2y$10$jOwuDxxeth0V9Bfkaymbz.qoaRK2eriNAlyO3DXuqiYrKE8HeF3xq', '09000000002', 'MANAGER'),
(8, '123', '123', '123@gmail.com', '12345678', '09457422529', 'GUEST'),
(9, '4321', '43215', '4321@gmail.com', '87654321', '09457422529', 'GUEST'),
(11, '43210', '43210', '43210@gmail.com', '$2y$10$iLNV9vrlYfKkVeS9tLDC1ucfziuwH1yTQaShbx8HJ8QODViIvPYEW', '09457422529', 'GUEST'),
(12, 'dsad', 'asdd', 'das2@gmail.com', '$2y$10$81jqqcU5kJlW9HMlVbQZT.9iBIS/sp.fXFT1oRzTWxh7sFAB4ikja', '12345678901', 'GUEST'),
(13, 'Raymond', 'Aboy', 'raymond@gmail.com', '$2y$10$aI7O.Q0Xe70BEdfUiGHa4O/HmziI9717aZC4J6vjyJ4T2MVguweZ6', '09457422529', 'GUEST'),
(14, 'Raymond', 'Aboy', 'ray@gmail.com', '$2y$10$zsp9aY6jSXEJlgGKZ1wtGO9Sv95YrZ59E5d4uJcPgvw.jUbF6nWXW', '09457422529', 'GUEST'),
(15, 'raymond', 'Aboy', 'aboy@gmail.com', '$2y$10$DdQ3udR35j7kANNDqVQFf.ZGjOGsvarFB2LoB0bNx8eM3Qn.M7mnm', '09457422529', 'GUEST'),
(17, 'Raymond Benjamin', 'Aboy', 'raymondb@gmail.com', '$2y$10$LbkCxp.HaWguPognZj1dYO6wC0TJFEYeoomGVd1qItngqf39OB2H6', '09457422529', 'ADMIN'),
(18, 'Aboy', 'Ray', 'raymondab@gmail.com', '$2y$10$Qh/HXf4KZNGph.UPJiKxdOU4k/iqt4cjzR7P5nnXjdVoYPlxn7LG2', '09457422529', 'GUEST'),
(20, '', '', '', '$2y$10$ssq.UuVC3hbuvGMZFLpiJOKgS6StL4U3hwUDaQZ8I0x2j/H5mYrIK', '', 'GUEST'),
(22, 'aboyt', 'rayray', 'rayaboy@gmail.com', '$2y$10$X3Xa6VLowwakr4ItgXRhvuBkTesY6va2b1ScOmhojzcZR5IcfakSi', '', 'GUEST');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`discountID`);

--
-- Indexes for table `login_audit`
--
ALTER TABLE `login_audit`
  ADD PRIMARY KEY (`auditID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`paymentID`),
  ADD KEY `resID` (`resID`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promoID`),
  ADD UNIQUE KEY `promoCode` (`promoCode`),
  ADD KEY `idx_dates` (`startDate`,`endDate`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`resID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `roomID` (`roomID`),
  ADD KEY `discountID` (`discountID`),
  ADD KEY `promoID` (`promoID`);

--
-- Indexes for table `reservations_archive`
--
ALTER TABLE `reservations_archive`
  ADD PRIMARY KEY (`archiveID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`roomID`),
  ADD UNIQUE KEY `roomNo` (`roomNo`),
  ADD KEY `roomTypeID` (`roomTypeID`);

--
-- Indexes for table `roomtypes`
--
ALTER TABLE `roomtypes`
  ADD PRIMARY KEY (`typeID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `discountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_audit`
--
ALTER TABLE `login_audit`
  MODIFY `auditID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `paymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `promoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `resID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `reservations_archive`
--
ALTER TABLE `reservations_archive`
  MODIFY `archiveID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `roomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `roomtypes`
--
ALTER TABLE `roomtypes`
  MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`resID`) REFERENCES `reservations` (`resID`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`roomID`) REFERENCES `rooms` (`roomID`),
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`discountID`) REFERENCES `discount` (`discountID`),
  ADD CONSTRAINT `reservations_ibfk_4` FOREIGN KEY (`promoID`) REFERENCES `promotions` (`promoID`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`roomTypeID`) REFERENCES `roomtypes` (`typeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

DROP USER 'hotel_receptionist'@'localhost';
DROP USER 'hotel_admin'@'localhost';
DROP USER 'hotel_guest'@'localhost';
DROP USER 'hotel_manager'@'localhost';

-- ── create ──
CREATE USER 'hotel_admin'@'localhost' IDENTIFIED BY 'admin123';
CREATE USER 'hotel_guest'@'localhost' IDENTIFIED BY 'guest123';
CREATE USER 'hotel_receptionist'@'localhost' IDENTIFIED BY 'receptionist123';
CREATE USER 'hotel_manager'@'localhost' IDENTIFIED BY 'manager123';

GRANT ALL PRIVILEGES ON hotel.* TO 'hotel_admin'@'localhost';

GRANT SELECT ON hotel.rooms TO 'hotel_guest'@'localhost';
GRANT SELECT ON hotel.roomtypes TO 'hotel_guest'@'localhost';
GRANT SELECT ON hotel.discount TO 'hotel_guest'@'localhost';
GRANT SELECT ON hotel.promotions TO 'hotel_guest'@'localhost';
GRANT SELECT ON hotel.users TO 'hotel_guest'@'localhost';
GRANT SELECT, INSERT ON hotel.reservations TO 'hotel_guest'@'localhost';
GRANT SELECT, INSERT ON hotel.payments TO 'hotel_guest'@'localhost';
GRANT SELECT, INSERT ON hotel.login_audit TO 'hotel_guest'@'localhost';

GRANT SELECT ON hotel.rooms TO 'hotel_receptionist'@'localhost';
GRANT SELECT ON hotel.roomtypes TO 'hotel_receptionist'@'localhost';
GRANT SELECT ON hotel.discount TO 'hotel_receptionist'@'localhost';
GRANT SELECT ON hotel.promotions TO 'hotel_receptionist'@'localhost';
GRANT SELECT, UPDATE ON hotel.reservations TO 'hotel_receptionist'@'localhost';
GRANT SELECT, INSERT ON hotel.payments TO 'hotel_receptionist'@'localhost';
GRANT SELECT ON hotel.users TO 'hotel_receptionist'@'localhost';
GRANT SELECT, INSERT ON hotel.login_audit TO 'hotel_receptionist'@'localhost';

GRANT SELECT, INSERT, UPDATE, DELETE ON hotel.rooms TO 'hotel_manager'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON hotel.roomtypes TO 'hotel_manager'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON hotel.reservations TO 'hotel_manager'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON hotel.reservations_archive TO 'hotel_manager'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON hotel.promotions TO 'hotel_manager'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON hotel.payments TO 'hotel_manager'@'localhost';
GRANT SELECT, INSERT ON hotel.users TO 'hotel_manager'@'localhost';
GRANT SELECT ON hotel.discount TO 'hotel_manager'@'localhost';
GRANT SELECT, INSERT ON hotel.login_audit TO 'hotel_manager'@'localhost';

FLUSH PRIVILEGES;