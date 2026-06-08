/*
  Warnings:

  - The values [ZALO_ZNS] on the enum `thong_bao_kenh` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `email_nhan_thong_bao` to the `dat_phong` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `anh_danh_gia_ma_danh_gia_fkey` ON `anh_danh_gia`;

-- DropIndex
DROP INDEX `anh_phong_ma_phong_fkey` ON `anh_phong`;

-- DropIndex
DROP INDEX `bang_gia_ma_phong_fkey` ON `bang_gia`;

-- DropIndex
DROP INDEX `danh_gia_ma_khach_fkey` ON `danh_gia`;

-- DropIndex
DROP INDEX `danh_gia_ma_phong_fkey` ON `danh_gia`;

-- DropIndex
DROP INDEX `dat_phong_ma_khach_fkey` ON `dat_phong`;

-- DropIndex
DROP INDEX `dat_phong_ma_khuyen_mai_fkey` ON `dat_phong`;

-- DropIndex
DROP INDEX `dat_phong_ma_phong_fkey` ON `dat_phong`;

-- DropIndex
DROP INDEX `dat_phong_dich_vu_ma_dat_phong_fkey` ON `dat_phong_dich_vu`;

-- DropIndex
DROP INDEX `dat_phong_dich_vu_ma_dich_vu_fkey` ON `dat_phong_dich_vu`;

-- DropIndex
DROP INDEX `hoan_tien_ma_dat_phong_fkey` ON `hoan_tien`;

-- DropIndex
DROP INDEX `hoan_tien_ma_thanh_toan_fkey` ON `hoan_tien`;

-- DropIndex
DROP INDEX `khuyen_mai_loai_phong_ma_loai_fkey` ON `khuyen_mai_loai_phong`;

-- DropIndex
DROP INDEX `nhat_ky_ma_admin_fkey` ON `nhat_ky`;

-- DropIndex
DROP INDEX `phong_ma_loai_fkey` ON `phong`;

-- DropIndex
DROP INDEX `phong_tien_nghi_ma_tien_nghi_fkey` ON `phong_tien_nghi`;

-- DropIndex
DROP INDEX `thanh_toan_ma_dat_phong_fkey` ON `thanh_toan`;

-- DropIndex
DROP INDEX `thong_bao_ma_dat_phong_fkey` ON `thong_bao`;

-- DropIndex
DROP INDEX `thong_bao_ma_khach_fkey` ON `thong_bao`;

-- DropIndex
DROP INDEX `yeu_thich_ma_phong_fkey` ON `yeu_thich`;

-- AlterTable
ALTER TABLE `dat_phong` ADD COLUMN `email_nhan_thong_bao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `thong_bao` MODIFY `kenh` ENUM('EMAIL', 'TRONG_APP') NOT NULL;

-- AddForeignKey
ALTER TABLE `phong` ADD CONSTRAINT `phong_ma_loai_fkey` FOREIGN KEY (`ma_loai`) REFERENCES `loai_phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anh_phong` ADD CONSTRAINT `anh_phong_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phong_tien_nghi` ADD CONSTRAINT `phong_tien_nghi_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phong_tien_nghi` ADD CONSTRAINT `phong_tien_nghi_ma_tien_nghi_fkey` FOREIGN KEY (`ma_tien_nghi`) REFERENCES `tien_nghi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bang_gia` ADD CONSTRAINT `bang_gia_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `khuyen_mai_loai_phong` ADD CONSTRAINT `khuyen_mai_loai_phong_ma_khuyen_mai_fkey` FOREIGN KEY (`ma_khuyen_mai`) REFERENCES `khuyen_mai`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `khuyen_mai_loai_phong` ADD CONSTRAINT `khuyen_mai_loai_phong_ma_loai_fkey` FOREIGN KEY (`ma_loai`) REFERENCES `loai_phong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dat_phong` ADD CONSTRAINT `dat_phong_ma_khach_fkey` FOREIGN KEY (`ma_khach`) REFERENCES `khach_hang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dat_phong` ADD CONSTRAINT `dat_phong_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dat_phong` ADD CONSTRAINT `dat_phong_ma_khuyen_mai_fkey` FOREIGN KEY (`ma_khuyen_mai`) REFERENCES `khuyen_mai`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dat_phong_dich_vu` ADD CONSTRAINT `dat_phong_dich_vu_ma_dat_phong_fkey` FOREIGN KEY (`ma_dat_phong`) REFERENCES `dat_phong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dat_phong_dich_vu` ADD CONSTRAINT `dat_phong_dich_vu_ma_dich_vu_fkey` FOREIGN KEY (`ma_dich_vu`) REFERENCES `dich_vu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thanh_toan` ADD CONSTRAINT `thanh_toan_ma_dat_phong_fkey` FOREIGN KEY (`ma_dat_phong`) REFERENCES `dat_phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hoan_tien` ADD CONSTRAINT `hoan_tien_ma_dat_phong_fkey` FOREIGN KEY (`ma_dat_phong`) REFERENCES `dat_phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hoan_tien` ADD CONSTRAINT `hoan_tien_ma_thanh_toan_fkey` FOREIGN KEY (`ma_thanh_toan`) REFERENCES `thanh_toan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `danh_gia` ADD CONSTRAINT `danh_gia_ma_dat_phong_fkey` FOREIGN KEY (`ma_dat_phong`) REFERENCES `dat_phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `danh_gia` ADD CONSTRAINT `danh_gia_ma_khach_fkey` FOREIGN KEY (`ma_khach`) REFERENCES `khach_hang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `danh_gia` ADD CONSTRAINT `danh_gia_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anh_danh_gia` ADD CONSTRAINT `anh_danh_gia_ma_danh_gia_fkey` FOREIGN KEY (`ma_danh_gia`) REFERENCES `danh_gia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yeu_thich` ADD CONSTRAINT `yeu_thich_ma_khach_fkey` FOREIGN KEY (`ma_khach`) REFERENCES `khach_hang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yeu_thich` ADD CONSTRAINT `yeu_thich_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thong_bao` ADD CONSTRAINT `thong_bao_ma_khach_fkey` FOREIGN KEY (`ma_khach`) REFERENCES `khach_hang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thong_bao` ADD CONSTRAINT `thong_bao_ma_dat_phong_fkey` FOREIGN KEY (`ma_dat_phong`) REFERENCES `dat_phong`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nhat_ky` ADD CONSTRAINT `nhat_ky_ma_admin_fkey` FOREIGN KEY (`ma_admin`) REFERENCES `quan_tri_vien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
