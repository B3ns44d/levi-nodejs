/*
  Warnings:

  - You are about to drop the column `completed` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
    ADD COLUMN `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'To do';

-- AlterTable
ALTER TABLE `task` DROP COLUMN `completed`,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
    ADD COLUMN `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'To do';
