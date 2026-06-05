-- CreateTable
CREATE TABLE `khach_hang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `zalo_id` VARCHAR(191) NOT NULL,
    `ho_ten` VARCHAR(191) NOT NULL,
    `so_dien_thoai` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `anh_dai_dien` VARCHAR(191) NULL,
    `trang_thai` ENUM('HOAT_DONG', 'BI_KHOA') NOT NULL DEFAULT 'HOAT_DONG',
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `khach_hang_zalo_id_key`(`zalo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quan_tri_vien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ho_ten` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mat_khau` VARCHAR(191) NOT NULL,
    `vai_tro` ENUM('SUPER_ADMIN', 'ADMIN') NOT NULL DEFAULT 'ADMIN',
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `quan_tri_vien_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loai_phong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_loai` VARCHAR(191) NOT NULL,
    `suc_chua` INTEGER NOT NULL,
    `dien_tich` DECIMAL(8, 2) NOT NULL,
    `moTa` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_loai` INTEGER NOT NULL,
    `ten_phong` VARCHAR(191) NOT NULL,
    `so_phong` VARCHAR(191) NOT NULL,
    `gia_co_ban` DECIMAL(12, 2) NOT NULL,
    `trang_thai` ENUM('CON_TRONG', 'DA_DAT', 'DANG_BAO_TRI') NOT NULL DEFAULT 'CON_TRONG',
    `moTa` TEXT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `phong_so_phong_key`(`so_phong`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anh_phong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_phong` INTEGER NOT NULL,
    `duong_dan` VARCHAR(191) NOT NULL,
    `la_anh_chinh` BOOLEAN NOT NULL DEFAULT false,
    `thu_tu` INTEGER NOT NULL DEFAULT 0,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tien_nghi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `bieu_tuong` VARCHAR(191) NULL,
    `nhom` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phong_tien_nghi` (
    `ma_phong` INTEGER NOT NULL,
    `ma_tien_nghi` INTEGER NOT NULL,

    PRIMARY KEY (`ma_phong`, `ma_tien_nghi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bang_gia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_phong` INTEGER NOT NULL,
    `ngay_bat_dau` DATE NOT NULL,
    `ngay_ket_thuc` DATE NOT NULL,
    `gia_theo_ngay` DECIMAL(12, 2) NOT NULL,
    `ghi_chu` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dich_vu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_dich_vu` VARCHAR(191) NOT NULL,
    `moTa` TEXT NULL,
    `don_gia` DECIMAL(12, 2) NOT NULL,
    `cach_tinh` ENUM('THEO_DEM', 'THEO_LUOT') NOT NULL,
    `hoat_dong` BOOLEAN NOT NULL DEFAULT true,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khuyen_mai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_code` VARCHAR(191) NOT NULL,
    `loai_giam` ENUM('PHAN_TRAM', 'SO_TIEN') NOT NULL,
    `gia_tri` DECIMAL(12, 2) NOT NULL,
    `don_hang_toi_thieu` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `so_luot_toi_da` INTEGER NOT NULL DEFAULT 0,
    `so_luot_da_dung` INTEGER NOT NULL DEFAULT 0,
    `ngay_bat_dau` DATE NOT NULL,
    `ngay_het_han` DATE NOT NULL,
    `hoat_dong` BOOLEAN NOT NULL DEFAULT true,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `khuyen_mai_ma_code_key`(`ma_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khuyen_mai_loai_phong` (
    `ma_khuyen_mai` INTEGER NOT NULL,
    `ma_loai` INTEGER NOT NULL,

    PRIMARY KEY (`ma_khuyen_mai`, `ma_loai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dat_phong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_booking` VARCHAR(191) NOT NULL,
    `ma_khach` INTEGER NOT NULL,
    `ma_phong` INTEGER NOT NULL,
    `ma_khuyen_mai` INTEGER NULL,
    `ngay_checkin` DATE NOT NULL,
    `ngay_checkout` DATE NOT NULL,
    `so_nguoi_lon` INTEGER NOT NULL DEFAULT 1,
    `so_tre_em` INTEGER NOT NULL DEFAULT 0,
    `tong_tien_phong` DECIMAL(12, 2) NOT NULL,
    `tong_tien_dich_vu` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `so_tien_giam` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `tong_thanh_toan` DECIMAL(12, 2) NOT NULL,
    `yeu_cau` TEXT NULL,
    `trang_thai` ENUM('CHO_THANH_TOAN', 'DA_XAC_NHAN', 'DANG_LUU_TRU', 'HOAN_THANH', 'DA_HUY') NOT NULL DEFAULT 'CHO_THANH_TOAN',
    `thoi_gian_dat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `dat_phong_ma_booking_key`(`ma_booking`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dat_phong_dich_vu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_dat_phong` INTEGER NOT NULL,
    `ma_dich_vu` INTEGER NOT NULL,
    `so_luong` INTEGER NOT NULL DEFAULT 1,
    `don_gia_luc_dat` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thanh_toan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_dat_phong` INTEGER NOT NULL,
    `ma_giao_dich` VARCHAR(191) NULL,
    `phuong_thuc` ENUM('ZALOPAY', 'MOMO', 'TIEN_MAT') NOT NULL,
    `so_tien` DECIMAL(12, 2) NOT NULL,
    `trang_thai` ENUM('DANG_XU_LY', 'THANH_CONG', 'THAT_BAI', 'DA_HOAN_TIEN') NOT NULL DEFAULT 'DANG_XU_LY',
    `du_lieu_callback` TEXT NULL,
    `thoi_gian` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `thanh_toan_ma_giao_dich_key`(`ma_giao_dich`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hoan_tien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_dat_phong` INTEGER NOT NULL,
    `ma_thanh_toan` INTEGER NOT NULL,
    `so_tien_hoan` DECIMAL(12, 2) NOT NULL,
    `ly_do` VARCHAR(191) NULL,
    `trang_thai` ENUM('CHO_XU_LY', 'DA_HOAN', 'TU_CHOI') NOT NULL DEFAULT 'CHO_XU_LY',
    `thoi_gian_xu_ly` DATETIME(3) NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `danh_gia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_dat_phong` INTEGER NOT NULL,
    `ma_khach` INTEGER NOT NULL,
    `ma_phong` INTEGER NOT NULL,
    `diem_tong` INTEGER NOT NULL,
    `diem_ve_sinh` INTEGER NULL,
    `diem_dich_vu` INTEGER NULL,
    `diem_vi_tri` INTEGER NULL,
    `noi_dung` TEXT NULL,
    `phan_hoi_admin` TEXT NULL,
    `ngay_dang` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `danh_gia_ma_dat_phong_key`(`ma_dat_phong`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anh_danh_gia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_danh_gia` INTEGER NOT NULL,
    `duong_dan` VARCHAR(191) NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yeu_thich` (
    `ma_khach` INTEGER NOT NULL,
    `ma_phong` INTEGER NOT NULL,
    `ngay_luu` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ma_khach`, `ma_phong`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thong_bao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_khach` INTEGER NOT NULL,
    `ma_dat_phong` INTEGER NULL,
    `tieu_de` VARCHAR(191) NOT NULL,
    `noi_dung` TEXT NOT NULL,
    `kenh` ENUM('ZALO_ZNS', 'EMAIL') NOT NULL,
    `trang_thai` ENUM('DA_GUI', 'THAT_BAI', 'DANG_CHO') NOT NULL DEFAULT 'DANG_CHO',
    `thoi_gian_gui` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nhat_ky` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_admin` INTEGER NOT NULL,
    `hanh_dong` VARCHAR(191) NOT NULL,
    `bang_lien_quan` VARCHAR(191) NOT NULL,
    `ban_ghi_id` INTEGER NULL,
    `du_lieu_truoc` JSON NULL,
    `du_lieu_sau` JSON NULL,
    `dia_chi_ip` VARCHAR(191) NULL,
    `thoi_gian` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
