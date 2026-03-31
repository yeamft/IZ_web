-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2022 at 04:09 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `bussiness_type`
--

CREATE TABLE `bussiness_type` (
  `bussiness_type_id` int(11) NOT NULL,
  `bussiness_type_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bussiness_type`
--

INSERT INTO `bussiness_type` (`bussiness_type_id`, `bussiness_type_name`, `status`) VALUES
(2, 'Shop', 1),
(3, 'Mini-market', 1),
(4, 'Super market', 1),
(5, 'Resturant', 1),
(6, 'Butchery', 1),
(7, 'Fruit seller', 1),
(8, 'bakery', 1),
(9, 'Diary products', 1),
(10, 'Beverage seller', 1),
(11, 'Others', 1),
(18, 'Resturant', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` varchar(20) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp(),
  `status` enum('on','off') NOT NULL,
  `check_out_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `product_id`, `user_id`, `quantity`, `created_at`, `updated_at`, `status`, `check_out_status`) VALUES
('ezi389577', 'PR577071', 'CL423950', 2, '2022-09-05', '2022-09-05', 'off', 1),
('ezi613114', 'PR577071', 'CL423950', 4, '2022-09-05', '2022-09-05', 'off', 1),
('ezi498102', 'PR577071', 'CL423950', 4, '2022-09-05', '2022-09-05', 'on', 0);

-- --------------------------------------------------------

--
-- Table structure for table `catagory`
--

CREATE TABLE `catagory` (
  `catagory_id` int(11) NOT NULL,
  `catagory_name` varchar(10) NOT NULL,
  `image_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `catagory`
--

INSERT INTO `catagory` (`catagory_id`, `catagory_name`, `image_path`, `image_name`) VALUES
(1, 'cloth', '', ''),
(2, 'Vechicles', 'http://192.168.137.1/ecommerce/images/vechicles.png', 'vechicles'),
(3, 'Property', 'http://192.168.137.1/ecommerce/images/property.png', 'property'),
(4, 'Phones & T', '', ''),
(5, 'Electronic', '', ''),
(6, 'Fashion', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `user_id` varchar(10) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `longtuid` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `address` varchar(70) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `middle_name` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`user_id`, `first_name`, `longtuid`, `latitude`, `address`, `last_name`, `middle_name`, `phone`, `password`, `status`) VALUES
('1', 'yodit', '38.7670434', '9.0115845', 'shibre buliding ', 'ssssssssssss', 'ssss', '0912345678', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_service`
--

CREATE TABLE `delivery_service` (
  `order_id` int(11) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `delivered_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery_service`
--

INSERT INTO `delivery_service` (`order_id`, `user_id`, `delivered_at`) VALUES
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(17, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00'),
(16, '1', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `percent` int(11) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `status` enum('on','off') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` double NOT NULL,
  `Description` varchar(40) NOT NULL,
  `Stock` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `catagory_id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `price`, `Description`, `Stock`, `rating`, `catagory_id`, `product_type_id`, `created_at`, `updated_at`, `id`, `status`) VALUES
('PR289375', 'ttt', 45, 'fghh', 12, NULL, 1, 1, '0000-00-00', '2022-09-13', 54, 1),
('PR337569', 'bvgh', 45, 'hhddg', 2, NULL, 1, 1, '2022-09-05', '2022-09-05', 40, 1),
('PR577071', 'jsnsb', 12, 'nsbs', 2, NULL, 1, 1, '2022-08-29', '2022-08-29', 39, 1),
('PR686348', 'tt', 45, 'fghh', 12, NULL, 1, 1, '2022-09-13', '2022-09-15', 56, 1),
('PR815969', 'ttt', 45, 'fghh', 12, NULL, 1, 1, '0000-00-00', '2022-09-13', 55, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `image_id` int(11) NOT NULL,
  `image_path` varchar(100) NOT NULL,
  `image_name` varchar(100) NOT NULL,
  `product_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`image_id`, `image_path`, `image_name`, `product_id`) VALUES
(31, 'http://192.168.137.1/images/0.png', 'yesg', ''),
(32, 'http://192.168.137.1/images/31.png', 'yesg', ''),
(33, 'http://192.168.137.1/ecommerce/images/test.png', 'test', '');

-- --------------------------------------------------------

--
-- Table structure for table `product_order`
--

CREATE TABLE `product_order` (
  `order_id` int(11) NOT NULL,
  `longitude` int(11) NOT NULL,
  `latitude` int(11) NOT NULL,
  `status` enum('pending','assigned','canceled','delivered') NOT NULL DEFAULT 'pending',
  `payment_status` int(11) NOT NULL DEFAULT 0,
  `total_price` double NOT NULL,
  `phone_number` int(10) NOT NULL,
  `createdt_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp(),
  `cart_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_order`
--

INSERT INTO `product_order` (`order_id`, `longitude`, `latitude`, `status`, `payment_status`, `total_price`, `phone_number`, `createdt_at`, `updated_at`, `cart_id`) VALUES
(12, 39, 9, 'pending', 0, 60, 912458688, '2022-08-29', '2022-08-29', 'ezi603657'),
(13, 39, 9, 'pending', 0, 132, 942555524, '2022-08-31', '2022-08-31', 'ezi577159'),
(14, 39, 9, 'pending', 0, 132, 942555524, '2022-08-31', '2022-08-31', 'ezi669518'),
(15, 39, 9, 'pending', 0, 144, 912457823, '2022-08-31', '2022-08-31', 'ezi779473'),
(16, 39, 9, 'assigned', 1, 24, 922826669, '2022-09-05', '2022-09-15', 'ezi389577'),
(17, 39, 9, 'assigned', 0, 48, 922826669, '2022-09-05', '2022-09-13', 'ezi613114');

-- --------------------------------------------------------

--
-- Table structure for table `product_supplier`
--

CREATE TABLE `product_supplier` (
  `product_id` varchar(10) NOT NULL,
  `supplier_id` varchar(10) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_supplier`
--

INSERT INTO `product_supplier` (`product_id`, `supplier_id`, `id`) VALUES
('PR577071', 'SU398414', 33),
('PR337569', 'SU398414', 34),
('PR289375', 'SU398414', 54),
('PR815969', 'SU398414', 55),
('PR686348', 'SU120899', 56);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `product_type_id` int(11) NOT NULL,
  `catagory_id` int(11) NOT NULL,
  `product_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` varchar(100) NOT NULL,
  `image_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`product_type_id`, `catagory_id`, `product_type`, `image_path`, `image_name`) VALUES
(1, 1, 'injera', 'http://192.168.137.1/ecommerce/images/injera.png', 'injera');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `distance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`distance`) VALUES
(40);

-- --------------------------------------------------------

--
-- Table structure for table `specification`
--

CREATE TABLE `specification` (
  `specification_id` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `product_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `suppiler_id` varchar(10) NOT NULL,
  `business_name` varchar(30) NOT NULL,
  `bussiness_owner_name` varchar(20) NOT NULL,
  `company_registration_number` varchar(30) NOT NULL,
  `business_licence_image` blob NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `country` varchar(10) NOT NULL DEFAULT 'Ethiopia',
  `city` varchar(10) NOT NULL,
  `subcity` varchar(10) NOT NULL,
  `status` enum('Active','NotActive') NOT NULL DEFAULT 'Active',
  `phone_number` int(10) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `bussiness_type_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`suppiler_id`, `business_name`, `bussiness_owner_name`, `company_registration_number`, `business_licence_image`, `user_name`, `user_password`, `country`, `city`, `subcity`, `status`, `phone_number`, `latitude`, `longitude`, `address`, `bussiness_type_id`, `id`) VALUES
('SU120899', 'test2', 'abebe', 'fgtyyukmkkki8', '', '0912131415', '123456', 'Ethiopia', 'Nekemte', 'Addis Kete', 'Active', 112345678, '9.09', '38.099', 'shibre', 8, 23),
('SU252229', '', '', '', '', '', '$2y$10$WHvfovkm0.SyOZgqPV2v3ui9ZHOH3V60u05TPt/BzcUVImc98YH32', 'Ethiopia', '', '', 'Active', 0, '', '', '', 2, 27),
('SU398414', 'test', 'abebe', 'hsjdbdus', '', '0942383498', '$2y$10$TDg5bNfhWp3kRBAU4uLviuWgVft3E5L0osPLbQk9lGuqqdcdQvl/2', 'Ethiopia', 'Addis Abab', 'Bole', 'Active', 112467976, '9.0115902', '38.7670417', '', 5, 16),
('SU709532', '', '', '', '', '', '0', 'Ethiopia', '', '', 'Active', 0, '', '', '', 3, 25);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(10) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(30) DEFAULT NULL,
  `country` varchar(10) NOT NULL DEFAULT 'Ethiopia',
  `city` varchar(20) DEFAULT NULL,
  `subcity` varchar(20) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longtuide` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `home_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `home_latitude` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `home_longtuide` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `phone_number`, `password`, `full_name`, `country`, `city`, `subcity`, `address`, `longtuide`, `latitude`, `home_address`, `home_latitude`, `home_longtuide`, `id`) VALUES
('CL423950', 922826669, '$2y$10$rkHkeqH0txDkb4m0NiZluehezmYUrIm0pLYUNT4jd5A6QjXrxea22', NULL, 'Ethiopia', NULL, NULL, NULL, '38.7670515', '9.0115833', 'Semien Hotel, Addis Ababa, Ethiopia', '9.0431363', '38.7497702', 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(10) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','supplier','delivery','admin','ship') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `phone_number`, `password`, `role`) VALUES
('100003', 933523052, '123456', 'admin'),
('CL934155', 932577865, '$2y$10$4HHK1kqngVsLaDKIENmluOIkvjIstl8hut9.KL0QKw8MsIIFl6GeS', 'user'),
('SU398414', 942383498, '$2y$10$TDg5bNfhWp3kRBAU4uLviuWgVft3E5L0osPLbQk9lGuqqdcdQvl/2', 'supplier');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bussiness_type`
--
ALTER TABLE `bussiness_type`
  ADD PRIMARY KEY (`bussiness_type_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `catagory`
--
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`catagory_id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `delivery_service`
--
ALTER TABLE `delivery_service`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `delivery_service_ibfk_3` (`order_id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `catagory_id` (`catagory_id`),
  ADD KEY `id` (`id`),
  ADD KEY `product_type_id` (`product_type_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `product_supplier`
--
ALTER TABLE `product_supplier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`product_type_id`),
  ADD KEY `catagory_id` (`catagory_id`);

--
-- Indexes for table `specification`
--
ALTER TABLE `specification`
  ADD PRIMARY KEY (`specification_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`suppiler_id`),
  ADD KEY `bussiness_type_id` (`bussiness_type_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bussiness_type`
--
ALTER TABLE `bussiness_type`
  MODIFY `bussiness_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `catagory`
--
ALTER TABLE `catagory`
  MODIFY `catagory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_supplier`
--
ALTER TABLE `product_supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `product_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `delivery_service`
--
ALTER TABLE `delivery_service`
  ADD CONSTRAINT `delivery_service_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `delivery` (`user_id`),
  ADD CONSTRAINT `delivery_service_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `product_order` (`order_id`);

--
-- Constraints for table `discount`
--
ALTER TABLE `discount`
  ADD CONSTRAINT `discount_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`catagory_id`) REFERENCES `catagory` (`catagory_id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`product_type_id`);

--
-- Constraints for table `product_supplier`
--
ALTER TABLE `product_supplier`
  ADD CONSTRAINT `product_supplier_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_supplier_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`suppiler_id`);

--
-- Constraints for table `product_type`
--
ALTER TABLE `product_type`
  ADD CONSTRAINT `product_type_ibfk_1` FOREIGN KEY (`catagory_id`) REFERENCES `catagory` (`catagory_id`);

--
-- Constraints for table `specification`
--
ALTER TABLE `specification`
  ADD CONSTRAINT `specification_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`bussiness_type_id`) REFERENCES `bussiness_type` (`bussiness_type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
