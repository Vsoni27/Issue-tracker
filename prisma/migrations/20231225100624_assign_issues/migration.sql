-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assigneeId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `issue` ADD CONSTRAINT `issue_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
