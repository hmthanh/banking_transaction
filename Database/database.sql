-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: Internet_Banking
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.21.10.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banking_info`
--

DROP TABLE IF EXISTS `banking_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banking_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `surplus` varchar(100) DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  `account_num` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `is_close` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banking_info`
--

LOCK TABLES `banking_info` WRITE;
/*!40000 ALTER TABLE `banking_info` DISABLE KEYS */;
INSERT INTO `banking_info` VALUES (1,'Argibank','99999999999999',18,'1','1','1'),(2,'Vietcombank','9999999999',18,'2','2','2'),(3,'TPBank','99',18,'4','1','1'),(4,'Vietcombank','99',18,'3','1','1'),(5,'VPBank','9999',18,'8','1','1');
/*!40000 ALTER TABLE `banking_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debt_info`
--

DROP TABLE IF EXISTS `debt_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debt_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `money` varchar(45) DEFAULT NULL,
  `owner_id` varchar(45) DEFAULT NULL,
  `debt_val` varchar(45) DEFAULT NULL,
  `date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `note` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debt_info`
--

LOCK TABLES `debt_info` WRITE;
/*!40000 ALTER TABLE `debt_info` DISABLE KEYS */;
INSERT INTO `debt_info` VALUES (1,'Thanh','322','1','2','2022-04-01 17:09:41','34');
/*!40000 ALTER TABLE `debt_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notify`
--

DROP TABLE IF EXISTS `notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipient` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify`
--

LOCK TABLES `notify` WRITE;
/*!40000 ALTER TABLE `notify` DISABLE KEYS */;
INSERT INTO `notify` VALUES (1,'2');
/*!40000 ALTER TABLE `notify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receiver_info`
--

DROP TABLE IF EXISTS `receiver_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receiver_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partner_bank` varchar(100) DEFAULT NULL,
  `owner_id` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `alias_name` varchar(100) DEFAULT NULL,
  `account_num` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receiver_info`
--

LOCK TABLES `receiver_info` WRITE;
/*!40000 ALTER TABLE `receiver_info` DISABLE KEYS */;
INSERT INTO `receiver_info` VALUES (1,'2','2','Thanh','Thanh','212'),(2,'1','1','sdf','sdf','123'),(6,'3','4','sdf','sdf','123'),(7,'5','8','sdf','sdf','123'),(8,'9','5','sdf','sdf','123'),(9,'10','18','thsdf','sdf','123132'),(10,'11','10','thsdf','sdf','123'),(11,'1','18','thsdf','thsdf','sdfsdf'),(12,'2','18','thsdf','sdf','sdf'),(13,'3','18','thsdf','sdf','1231'),(14,NULL,NULL,NULL,NULL,'');
/*!40000 ALTER TABLE `receiver_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh`
--

DROP TABLE IF EXISTS `refresh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh`
--

LOCK TABLES `refresh` WRITE;
/*!40000 ALTER TABLE `refresh` DISABLE KEYS */;
INSERT INTO `refresh` VALUES (4,'18','UJOPvQyD0VPDE8w1h2Zox8J07Gjv1qn7gaiWl3eHTiqUcmUvtmu8cZs8NHd7rNZwEwxeQCkF8rVBLP0OBcTcdHbq3nUgC0Dheh3o');
/*!40000 ALTER TABLE `refresh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_tranfer`
--

DROP TABLE IF EXISTS `transaction_tranfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_tranfer` (
  `trans_id` int NOT NULL AUTO_INCREMENT,
  `acc_name` varchar(45) DEFAULT NULL,
  `from_account` varchar(45) DEFAULT NULL,
  `to_account` varchar(45) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `timestamp` int DEFAULT NULL,
  `signature` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `partner_code` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `surplus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_tranfer`
--

LOCK TABLES `transaction_tranfer` WRITE;
/*!40000 ALTER TABLE `transaction_tranfer` DISABLE KEYS */;
INSERT INTO `transaction_tranfer` VALUES (1,'thanh','1','2',222,'22',21,'12','1','1','1','12212');
/*!40000 ALTER TABLE `transaction_tranfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `date_of_birth` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,'thah','','24234','1','thanh',1,'1','hmthanhgm@gmail.cm'),(2,'minh','','123','1','hmthanh',2,'1','s@gmail.com'),(3,'thai','','3223','2','thai',3,'1','2123@gmail.com'),(4,'222','','2323','2','234324',234,'1','22'),(5,'Hoang Minh Thanh','$2a$12$gc5cd093C8tyF7HY5nqAr.MoSpvntp8rboum62T2bSGQ5bXlX1D2S','84848032003','2000-04-01 00:00:00.000','hoangminhthanh1',3,'0','hmthanhgm@gmail.com'),(6,'Hoang Minh Thanh','$2a$12$laledp5WE6m3EhhTlCP4peQ13jgFU8xIb0kQjQxTxRAaqNFB0Ht7u','84848032003','2000-04-01 00:00:00.000','hoangminhthanh2',3,'0','hmthanhgm@gmail.com'),(7,'Hoang Minh Thanh','$2a$12$qTY7piTu21Xb5B6pLr879.GIosHttuMUaaedXBDUeC9bA9aJnQxiS','84848032003','2000-04-01 00:00:00.000','hoangminhthanh3',3,'0','hmthanhgm@gmail.com'),(8,'Hoang Minh Thanh','$2a$12$3gfQppaep6.ijOwbBiouYOTudoQ6Xwg/XoF1saN/AqVdS9AYnmpgy','84848032003','2000-04-01 00:00:00.000','hoangminhthanh4',3,'0','hmthanhgm@gmail.com'),(9,'Hoang Minh Thanh','$2a$12$7HbBmzaxsguqZqquZpuV4.I/1qedljT5BnA7dJE2vFb9ESh6FBvQi','84848032003','2000-04-01 00:00:00.000','hoangminhthanh5',3,'0','hmthanhgm@gmail.com'),(10,'Hoang Minh Thanh','$2a$12$KcNdESN7vrpHXYbo6pGqheuXCdDsqFRgFVkwsoOc2numGziRrYgFm','84848032003','2000-04-01 00:00:00.000','hoangminhthanh6',3,'0','hmthanhgm@gmail.com'),(11,'Hoang Minh Thanh','$2a$12$K418Z8.AB0ra1WF62d68gejprtP0ukG/b32hvbCyOt1rZmYVdu.1m','84848032003','2000-04-01 00:00:00.000','hoangminhthanh7',3,'0','hmthanhgm@gmail.com'),(12,'Hoang Minh Thanh','$2a$12$tjhQh.lnyGQ6iWRDIUtRj.Gt3Ico0ftWeLRzCbgaBsES2UkqgP5nK','84848032003','2000-04-01 00:00:00.000','hoangminhthanh8',3,'0','hmthanhgm@gmail.com'),(13,'Hoang Minh Thanh','$2a$12$ZgjGwL9C54uZ0YJ2/Hupfuxn/ySoVktd722V8z0766xlUjIdQsDpW','84848032003','2000-04-01 00:00:00.000','hoangminhthanh9',3,'0','hmthanhgm@gmail.com'),(14,'Hoang Minh Thanh','$2a$12$GX8SqXM0YzukWyxfWS65TeNrjK68lhsqBStpJEBihN8jYT7FXQSCC','84848032003','2000-04-01 00:00:00.000','hoangminhthanh10',3,'0','hmthanhgm@gmail.com'),(15,'Hoang Minh Thanh','$2a$12$naf.EY3BRizyy.p9yoYotOvOtiREkiXCKtuPLGge//Kav7P32dI7C','84848032003','2000-04-01 00:00:00.000','hoangminhthanh11',3,'0','hmthanhgm@gmail.com'),(16,'Hoang Minh Thanh','$2a$12$SKVCT5WdeeET9AVsEertI.pL/2j6E34wzNHLD4OjyPuW8RuILS7C6','84848032003','2000-04-01 00:00:00.000','hoangminhthanh12',3,'0','hmthanhgm@gmail.com'),(17,'Hoang Minh Thanh','$2a$12$NgUoBnDxEwxTJxCYi/wwlOG98s6LNOKFv7B9/Y3sIySeUjE0olasi','84848032003','2000-04-01 00:00:00.000','hoangminhthanh13',3,'0','hmthanhgm@gmail.com'),(18,'Hoang Minh Thanh','$2a$12$9eF9066vZmadXSFMQ5HWPeI.je5hyID5OW/lVAhsG5qzN/r.2a3ua','84848032003','2000-04-01 00:00:00.000','hoangminhthanh14',3,'0','hmthanhgm@gmail.com'),(19,'Hoang Minh Thanh','$2a$12$vgYRGIEUvtv4N4cnQWjYwOVKXw2TViTFaqduYwkcF6lx3YOf9S8sC','84848032003',NULL,'hoangminhthanh15',3,'0','hmthanhgm@gmail.com'),(20,'Hoang Minh Thanh','$2a$12$7bqwPZNQ4omNaYINeU3azOH7VD2tGKguoKGU4ghs/HaWFbGO6gyWu','84848032003',NULL,'hoangminhthanh16',3,'0','hmthanhgm@gmail.com');
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-03  7:11:49
