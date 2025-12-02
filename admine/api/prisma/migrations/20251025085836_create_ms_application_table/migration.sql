-- CreateTable
CREATE TABLE `ms_application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status`INTEGER NOT NULL,
    `availability` INTEGER NOT NULL,
    `developer` INTEGER NOT NULL,
    `category` INTEGER NOT NULL,
    `tautanapp` VARCHAR(191) NULL,
    `desc` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
