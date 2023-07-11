-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 08, 2023 at 01:37 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--
CREATE DATABASE IF NOT EXISTS `inventory` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `inventory`;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  `stock` int(255) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `photo`, `stock`) VALUES(1, 'update_Products', 'updateddddd', 'http://127.0.0.1:8000/image1.jpeg', 205);
INSERT INTO `products` (`product_id`, `name`, `description`, `photo`, `stock`) VALUES(12, 'added product2', 'added product2', 'http://127.0.0.1:8000/image2.jpeg', 45);
INSERT INTO `products` (`product_id`, `name`, `description`, `photo`, `stock`) VALUES(20, 'please work please', 'did it work?', 'http://127.0.0.1:8000/image3.jpeg', 5);

-- --------------------------------------------------------

--
-- Table structure for table `product_warehouse`
--

DROP TABLE IF EXISTS `product_warehouse`;
CREATE TABLE IF NOT EXISTS `product_warehouse` (
  `product_id` int(255) NOT NULL,
  `warehouse_id` int(255) NOT NULL,
  `warehouse_stock` int(255) NOT NULL,
  PRIMARY KEY (`product_id`,`warehouse_id`),
  KEY `product_id` (`product_id`),
  KEY `warehouse_id` (`warehouse_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_warehouse`
--

INSERT INTO `product_warehouse` (`product_id`, `warehouse_id`, `warehouse_stock`) VALUES(1, 4, 23);
INSERT INTO `product_warehouse` (`product_id`, `warehouse_id`, `warehouse_stock`) VALUES(12, 4, 119);
INSERT INTO `product_warehouse` (`product_id`, `warehouse_id`, `warehouse_stock`) VALUES(12, 11, 6);
INSERT INTO `product_warehouse` (`product_id`, `warehouse_id`, `warehouse_stock`) VALUES(20, 3, 30);
INSERT INTO `product_warehouse` (`product_id`, `warehouse_id`, `warehouse_stock`) VALUES(20, 11, 7);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
CREATE TABLE IF NOT EXISTS `requests` (
  `request_id` int(255) NOT NULL AUTO_INCREMENT,
  `supervisor_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `date` varchar(255) NOT NULL,
  `request_type` varchar(255) NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `make_by` (`supervisor_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(20, 2, 1, 1, 'approved', '04/04/2023', 'decrement');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(22, 2, 1, 3, 'rejected', '08/04/2023', 'increment');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(23, 3, 1, 3, 'approved', '08/04/2023', 'increment');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(24, 2, 1, 3, 'approved', '08/04/2023', 'decrement');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(25, 3, 1, 3, 'approved', '08/04/2023', 'increment');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(26, 2, 1, 3, 'approved', '08/04/2023', 'increment');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(27, 3, 12, 3, 'rejected', '08/04/2023', 'decrement');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(28, 2, 12, 3, 'rejected', '08/04/2023', 'increment');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(29, 2, 12, 3, 'rejected', '08/04/2023', 'increment');
INSERT INTO `requests` (`request_id`, `supervisor_id`, `product_id`, `quantity`, `status`, `date`, `request_type`) VALUES(30, 3, 12, 4, 'approved', '08/04/2023', 'increment');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `phone`, `status`, `type`) VALUES(1, 'admin@gmail.com', '123', '012343', 'online', 'admin');
INSERT INTO `users` (`id`, `email`, `password`, `phone`, `status`, `type`) VALUES(2, 'super2@gmail.com', '12345', '01005345', 'online', 'supervisor');
INSERT INTO `users` (`id`, `email`, `password`, `phone`, `status`, `type`) VALUES(3, 'super3@gmail.com', '123456', '09283', 'offline', 'supervisor');
INSERT INTO `users` (`id`, `email`, `password`, `phone`, `status`, `type`) VALUES(9, 'super4@gmail.com', 'asd123', '123321', 'online', 'supervisor');
INSERT INTO `users` (`id`, `email`, `password`, `phone`, `status`, `type`) VALUES(14, 'test@test', '123', '123321', 'online', 'supervisor');

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

DROP TABLE IF EXISTS `warehouses`;
CREATE TABLE IF NOT EXISTS `warehouses` (
  `warehouse_id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `supervisor_id` int(255) DEFAULT NULL,
  PRIMARY KEY (`warehouse_id`),
  KEY `supervisor_id` (`supervisor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `warehouses`
--

INSERT INTO `warehouses` (`warehouse_id`, `name`, `location`, `status`, `supervisor_id`) VALUES(3, 'warehouse3', 'Haram', 'active', 3);
INSERT INTO `warehouses` (`warehouse_id`, `name`, `location`, `status`, `supervisor_id`) VALUES(4, 'new_warehouse4', 'Egypt', 'inactive', 9);
INSERT INTO `warehouses` (`warehouse_id`, `name`, `location`, `status`, `supervisor_id`) VALUES(11, 'test', 'misery land', 'active', 14);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_warehouse`
--
ALTER TABLE `product_warehouse`
  ADD CONSTRAINT `product_warehouse_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `product_warehouse_ibfk_2` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`);

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `make_by` FOREIGN KEY (`supervisor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD CONSTRAINT `warehouses_ibfk_1` FOREIGN KEY (`supervisor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
