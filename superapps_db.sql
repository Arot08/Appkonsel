-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2025 at 04:12 AM
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
-- Database: `superapps_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `lk_availability`
--

CREATE TABLE `lk_availability` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lk_availability`
--

INSERT INTO `lk_availability` (`id`, `name`) VALUES
(1, 'Dapat Diakses'),
(2, 'Tidak Dapat Diakses');

-- --------------------------------------------------------

--
-- Table structure for table `lk_category`
--

CREATE TABLE `lk_category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lk_category`
--

INSERT INTO `lk_category` (`id`, `name`) VALUES
(1, 'Layanan Publik'),
(2, 'Manajemen Pemerintah');

-- --------------------------------------------------------

--
-- Table structure for table `lk_developer`
--

CREATE TABLE `lk_developer` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lk_developer`
--

INSERT INTO `lk_developer` (`id`, `name`) VALUES
(1, 'Diskominfo & Persandian'),
(2, 'Pihak Ketiga');

-- --------------------------------------------------------

--
-- Table structure for table `lk_status`
--

CREATE TABLE `lk_status` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lk_status`
--

INSERT INTO `lk_status` (`id`, `name`) VALUES
(1, 'Aktif'),
(2, 'Tidak Aktif'),
(3, 'Maintenance');

-- --------------------------------------------------------

--
-- Table structure for table `ms_application`
--

CREATE TABLE `ms_application` (
  `id` int(11) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL,
  `availability` varchar(191) NOT NULL,
  `developer` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `tautanapp` varchar(191) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ms_application`
--

INSERT INTO `ms_application` (`id`, `image`, `title`, `type`, `status`, `availability`, `developer`, `category`, `tautanapp`, `desc`, `createdAt`, `updatedAt`) VALUES
(6, 'apps-1.jpg', 'Statistik Bapenda', 'Website', '1', '1', '1', '1', 'http://statistik.bapenda.konaweselatankab.go.id', 'Aplikasi Statistik Pendapatan \r\nDaerah Kab, Konawe Selatan', '2025-12-01 02:36:44.000', '2025-12-02 01:56:12.616'),
(7, 'apps-1_1.jpg', 'Satu Data Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://data.konaweselatankab.go.id/', 'Aplikasi Berbasis Website yang dikembangkan dan dikelola oleh Dinas Komunikasi Informatika dan Persandiaan \r\nKab. Konawe Selatan yang. Satu Data Kabupaten Konawe Selatan adalah website resmi yang memberikan layanan publik yang berkaitan dengan data statistik Indikator Makro, data statistik Indeks Pembangunan Manusia, data statistik kemiskinan, data statistik\r\nPDRB, data statistik sektoral, peta administrasi, peta tematik, Data Keuangan, realisasi belanja dan realisasi pendapatan APBD, dan\r\ngaleri investasi.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(8, 'apps-1_2.jpg', 'WebGIS Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://121.52.72.101:5014/', 'Aplikasi Berbasis Website yang dikembangkan dan dikelola oleh Dinas Komunikasi Informatika dan Persandiaan \r\nKab. Konawe Selatan yang. WebGIS Kab. Konawe Selatan adalah website resmi Sistem Informasi Geografis Berbasis Web yang\r\nmemberikan layanan publik berkaitan dengan penyediaan akses terhadap data spasial dan informasi terkait wilayah Kabupaten Konawe Selatan, Provinsi Sulawesi Tenggara, Indonesia.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(9, 'apps-2.jpg', 'SIPIL', 'Website', '1', '1', '1', '1', 'http://sipil.konaweselatankab.go.id/login', 'Aplikasi SIPIL KONSEL merupakan aplikasi statistik pengolahan data pembangunan \r\ninfrastruktur di Kabupaten Konawe Selatan', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(10, 'apps-3.jpg', 'Statistik Dinkes', 'Website', '1', '1', '1', '1', 'https://statistik-dinkes.konaweselatankab.go.id', 'Aplikasi Pengolahan Data Statistik Dinas Kesehatan Kabupaten Konawe Selatan yang meliputi jumlah penyakit, \r\nfasilitas kesehatan, tenaga kesehatan gizi buruk dan lain sebagainya ', '2025-12-01 02:36:44.000', '2025-12-02 01:58:28.379'),
(11, 'apps-4.jpg', 'Statistik DPMD', 'Website', '1', '1', '1', '1', 'http://statistik-dpmd.konaweselatankab.go.id/login', 'Aplikasi Pengolahan Data Statistik Dinas Pembedayaan Masyarakat Desa Kabupaten Konawe Selatan \r\nyang meliputi jumlah penyakit, fasilitas kesehatan, tenaga kesehatan gizi buruk dan lain sebagainya ', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(12, 'apps-5.jpg', 'Statistik Disnaker', 'Website', '1', '1', '1', '1', 'https://statistik-disnaker.konaweselatankab.go.id/login', 'Aplikasi Pengolahan Data Statistik Dinas Tenaga Kerja dan Transmigrasi Kabupaten Konawe Selatan \r\nyang meliputi jumlah pencari kerja, status pekerja dan transmigran', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(13, 'apps-6.jpg', 'Statistik DKP', 'Website', '1', '1', '1', '1', 'https://statistik-dkp.konaweselatankab.go.id/login', 'Aplikasi pengolahan data laporan statistik pada Dinas Kelautan dan Perikanan Kabupaten Konawe Selatan \r\nyang dapat memudahkan dalam pengumpulan, pengelolaan, analisa data pada dinas tersebut.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(14, 'apps-7.jpg', 'Statistik BPBD', 'Website', '1', '1', '1', '1', 'https://statistik-bpbd.konaweselatankab.go.id/login', 'Aplikasi pengolahan data laporan statistik pada Badan Penanggulangan Bencana Daerah Kabupaten Konawe Selatan \r\nyang dapat memudahkan dalam pengumpulan, pengelolaan, analisa data pada dinas tersebut.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(15, 'apps-8.jpg', 'Statistik DISPERINDAG', 'Website', '1', '1', '1', '1', 'https://statistik-disperindag.konaweselatankab.go.id/login', 'APLIKASI Statistik Perindag merupakan Aplikasi Pengolahan Data Laporan Statistik pada Dinas Perindustrian dan Perdagangan Kabupaten Konawe Selatan\r\nyang dapat memudahkan dalam pengumpulan, pengelolaan, analisa data pada dinas tersebut.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(16, 'apps-9.jpg', 'Statistik BKKBN', 'Website', '1', '1', '1', '1', 'https://statistik-bkkbn.konaweselatankab.go.id/login', 'Aplikasi statistic sectoral BKKBN merupakan aplikasi yang memuat data-data berisi informasi kuantitatif perhitungan data \r\nyang menjadi asset dari BKKBN Konawe Selatan, seperti jumlah akseptor, pemakaian baru, pemakaian aktif, dan lain-lain', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(17, 'apps-10.jpg', 'Statistik DPRD', 'Website', '1', '1', '1', '1', 'https://statistik-dprd.konaweselatankab.go.id/login', 'Aplikasi statistic sectoral DPRD merupakan aplikasi yang memuat data-data berisi informasi \r\nkuantitatif perhitungan data yang menjadi asset dari DPRD Konawe Selatan, seperti jumlah kegiatan, jumlah peraturan yang diterbitkan, dan jumlah partai.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(18, 'apps-11.jpg', 'Statistik SATPOL-PP', 'Website', '1', '1', '1', '1', 'https://statistik-satpolpp.konaweselatankab.go.id/login', 'Aplikasi Pengolahan Data Statistik pada Satuan Polisi Pamong Praja Daerah Kabupaten Konawe Selatan \r\nyang dapat memudahkan dalam pengumpulan, pengelolaan dan analisa data.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(19, 'apps-12.jpg', 'APLIDAKOP UMKM', 'Website', '1', '1', '2', '1', 'https://aplidakop-umkm.konaweselatankab.go.id/login', 'Aplikasi Pengolahan Data Koperasi dan UMKM adalah sistem berbasis digital yang digunakan untuk \r\nmengelola, memantau, dan menyajikan data terkait Koperasi dan Usaha Mikro, Kecil, dan Menengah (UMKM) di daerah. \r\nAplikasi ini mendukung tugas Dinas Koperasi & UMKM dalam melakukan pendataan, pembinaan, serta penyusunan kebijakan berbasis data.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(20, 'apps-13.jpg', 'Statistik DTPHP', 'Website', '1', '1', '1', '1', 'http://statistik-dtphp.konaweselatankab.go.id/#/login', 'Aplikasi Pengolahan Data Statistik pada Dinas Tanaman Pangan Perkebunan dan\r\nHortikultura Kabupaten Konawe Selatan yang dapat memudahkan dalam pengumpulan, pengelolaan dan analisa data produksi tanaman pangan dan data-data lainnya.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(21, 'apps-14.jpg', 'SIM DPKH', 'Website', '1', '1', '2', '1', 'https://populasi-dpkh.konaweselatankab.go.id/#/login', 'Aplikasi ini digunakan untuk memberikan informasi terkait berita, pengumuman, statistik, pelayanan, \r\ndan lain-lain pada Dinas Peternakan dan Kesehatan Hewan Kab. Konawe Selatan', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(22, 'apps-15.jpg', 'Statistik Dukcapil', 'Website', '1', '1', '1', '1', 'https://statistik-dukcapil.konaweselatankab.go.id/#/login', 'Aplikasi ini digunakan untuk memberikan informasi terkait jumlah penduduk, dan informasi kependudukan, statistik, pelayanan, \r\ndan lain-lain pada Dinas Kependudukan dan Catatan Sipil Kab. Konawe Selatan', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(23, 'apps-16.jpg', 'SILADA KETAPANG', 'Website', '1', '1', '1', '1', 'https://silada.konaweselatankab.go.id/#/monev_login', 'Aplikasi ini digunakan untuk memberikan informasi terkait jumlah Produksi pangan, dan jumlah kebutuhan pangan, statistik, \r\ndan lain-lain pada Dinas ketahanan Pangan Kab. Konawe Selatan', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(24, 'apps-17.jpg', 'SIMPEG', 'Website', '1', '1', '1', '1', 'https://simpeg.konaweselatankab.go.id/#/login', 'SIMPEG (Sistem Informasi Kepegawaian)  \r\nadalah sebuah Sistem Informasi yang dirancang \r\nsebagai solusi untuk menangani berbagai hal dalam pengurusan Kepegawaian di lingkup Pemerintah Daerah Kab. Konawe Selatan mulai dari penyimpanan dan pemusatan data\r\nsecara terkomputerisasi hingga menangani berbagai macam laporan yang berhubungan\r\ndengan kepegawaian sehingga memudahkan dalam meningkatkan kebutuhan Administrasi\r\nkepegawaian. saat ini SIMPEG Kab. Konawe Selatan sudah terintegrasi 2 arah dengan \r\nSI-ASN milik BKN', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(25, 'apps-18.jpg', 'E-Dokumen', 'Website', '1', '1', '1', '1', 'http://e-dokumen.konaweselatankab.go.id/login', 'E-Dokumen (Elektronik Dokumen) Kabupaten Konawe Selatan.\r\nWebsite yang berfungsi sebagai pengarsipan dokumen parerintah daerah kabupaten konawe selatan', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(26, 'app-1764575365296.png', 'E-KINERJA', 'Website', '1', '1', '1', '1', 'https://e-kinerja.konaweselatankab.go.id/#/login', 'Aplikasi E-Kinerja adalah sistem yang digunakan untuk pendataan dan evaluasi kinerja Aparatur Sipil Negara (ASN).\r\nAplikasi ini terintegrasi dengan SIMPEG (Sistem Informasi Manajemen Kepegawaian) dan sistem absensi, \r\nmemungkinkan pengelolaan data kepegawaian, absensi harian, serta penilaian kinerja ASN secara otomatis dan real-time. \r\nDengan E-Kinerja, setiap ASN dapat memantau pencapaian tugas dan tanggung jawabnya, sementara pimpinan dapat melakukan\r\nevaluasi berbasis data terhadap performa ASN. Integrasi ini mendukung peningkatan efisiensi manajemen SDM dan akuntabilitas\r\ndi lingkungan pemerintahan.', '2025-12-01 02:36:44.000', '2025-12-01 07:49:25.311'),
(27, 'apps-20.jpg', 'Absensi Konsel', 'Website', '1', '1', '1', '1', 'https://absensi.konaweselatankab.go.id/#/login', 'Aplikasi Absensi Berbasis Lokasi untuk Kabupaten Konawe Selatan (Konsel) dirancang untuk memudahkan proses \r\nabsensi pegawai atau peserta dengan memanfaatkan lokasi geografis melalui teknologi GPS. Aplikasi ini bertujuan \r\nuntuk meningkatkan akurasi dan efisiensi dalam pengelolaan kehadiran, mengurangi kecurangan, serta memberikan transparansi \r\ndalam monitoring kehadiran.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(28, 'apps-21.jpg', 'SUMAKU', 'Website', '1', '1', '1', '1', 'https://sumaku.konaweselatankab.go.id/#/login', 'SUMAKU (Manajemen Surat Masuk dan Keluar) \r\nmerupak Website yang dugunakan pemerintah daerah Kabupaten Konawe Selatan \r\nyang berfungsi untuk membuat dan melacak surat masuk dan keluar.', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(29, 'apps-22.jpg', 'Official Website Konsel', 'Website', '1', '1', '1', '1', 'https://konaweselatankab.go.id/', 'Website Resmi Kabupaten Konawe Selatan yang berfungsi sebagai portal resmi berita dan informasi resmi pemerintahan Dareah\r\nKabupaten Konawe Selatan', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(30, 'apps-23.jpg', 'SIMRAL', 'Website', '1', '1', '1', '1', 'https://simral.konaweselatankab.go.id/', 'SIMRAL (Sistem Informasi Manajemen Perencanaan, Penganggaran, dan Pelaporan) merupakan website yang berfungsi untuk\r\nPerencanaan anggaran dan pelaporan anggaran', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(31, 'apps-24.jpg', 'SITA-TANAH', 'Website', '1', '1', '1', '1', 'http://sita.konaweselatankab.go.id/#/login', 'SITA-TANAH (Aplikasi Sistem Teknologi Informasi Pertanahan Daerah)\r\nMerupaka Aplikasi berbasis website yang digunakan untuk memberikan informasi luas tanah dan pendataan tanah ', '2025-12-01 02:36:44.000', '2025-12-01 02:36:44.000'),
(32, 'app-1764529669931.png', 'JDIH', 'Website', '1', '1', '2', '1', 'https://jdih.konaweselatankab.go.id/', 'JDIH merupakan Aplikasi Jaringan Dokumentasi dan Informasi Hukum Kabupaten Konawe Selatan yang dapat memudahkan \r\ndalam pencarian dan penelusuran peraturan perundang-undangan dan bahan dokumentasi hukum lainnya; \r\nUntuk Meningkatkan pemberian pelayanan pelaksanaan penegak hukum dan kepastian hukum.', '2025-12-01 02:36:45.000', '2025-12-02 03:06:22.979'),
(33, 'apps-26.jpg', 'ANOARI MANASA', 'Website', '1', '1', '1', '2', 'http://anoari-manasa.konaweselatankab.go.id/#/login', 'ANOARI MANASA (Aplikasi Online Rekonsiliasi Penerimaan Kas. Daerah Kab. Konawe Selatan\r\nMerupakan aplikasi berbasis website yang berfungsi untuk melakaukan rekonsiliasi secara online terhadap Penerimaan Kas Daerah', '2025-12-01 02:36:45.000', '2025-11-30 19:33:41.448'),
(34, 'apps-27.jpg', 'Bantuan & Hibah', 'Website', '1', '1', '1', '2', 'http://hibah.konaweselatankab.go.id', 'Aplikasi berbasis website yang didevelop oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan\r\nAplikasi Bantuan dan Hibah Pemerintah Daerah Kabupaten Konawe Selatan yang berfungsi untuk mendata penerimaan hibah daerah', '2025-12-01 02:36:45.000', '2025-11-30 19:37:23.781'),
(35, 'apps-28.jpg', 'Zona Nilai Tanah', 'Website', '1', '1', '1', '2', 'https://znt.konaweselatankab.go.id', 'Aplikasi berbasis website yang didevelop oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan\r\nZona Nilai Tanah Merupakaan aplikasi berbasis website yang digunakan untuk memantau nilai tanah daerah kabupaten konawe selatan', '2025-12-01 02:36:45.000', '2025-11-30 19:37:36.454'),
(36, 'apps-29.jpg', 'SIMPATI DESA', 'Website', '1', '1', '1', '2', 'https://simpatidesa.konaweselatankab.go.id', 'Simpati Desa Merupakan Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan. Aplikasi SIMPATI DESA Dikelolah Oleh DInas Pemberdayaan Masyarakat Desa.\r\nAplikasi ini memungkinkan pengelolaan surat-menyurat secara digital, mengatur berbagai jenis surat keluar dan masuk, \r\nserta menyederhanakan proses administrasi desa seperti pembuatan dokumen dan arsip. Selain itu, aplikasi ini juga memfasilitasi \r\npengelolaan database desa, mencakup data penduduk, aset desa, dan informasi penting lainnya. Dengan adanya sistem ini, \r\npelayanan publik di desa dapat berjalan lebih efisien dan terstruktur, mendukung transparansi dan kemudahan akses bagi warga dan \r\npemerintah daerah.', '2025-12-01 02:36:45.000', '2025-11-30 19:38:34.165'),
(37, 'app-1764529782855.jpeg', 'E-Retribusi', 'Website', '1', '1', '1', '2', 'https://e-retribusi.konaweselatankab.go.id/#/login', 'E-Retribusi adalah aplikasi digital yang digunakan untuk mengelola pemungutan retribusi daerah secara elektronik. \r\nAplikasi ini mendukung transparansi, akuntabilitas, dan efektivitas pemungutan retribusi, sekaligus menjadi bagian dari implementasi \r\nSPBE (Sistem Pemerintahan Berbasis Elektronik) di daerah.', '2025-12-01 02:36:45.000', '2025-11-30 19:39:26.672'),
(38, 'apps-31.jpg', 'SAPA KONSEL', 'Website', '1', '1', '1', '1', 'https://sapakonsel.konaweselatankab.go.id/#/login', 'Aplikasi berbasis website yang didevelop oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan\r\nMerupakan Aplikasi berbasis website yang berfungsi untuk melakuakan pendataan kekerasan pada anak dan perempuan', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(39, 'apps-32.jpg', 'COVID 19', 'Website', '1', '1', '1', '1', 'https://covid19.konaweselatankab.go.id/#/', 'Aplikasi berbasis website yang didevelop oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan\r\nMerupaka aplikasi berbasis website yang berfungsi untuk memberikan informasi seputar virus covid 19', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(40, 'apps-33.jpg', 'MARINA', 'Website', '1', '1', '1', '1', 'https://marina.konaweselatankab.go.id/#/', 'Aplikasi berbasis website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan\r\nyang berfungsi untuk Market place untuk penjualan produk UMKN masyarakat Kabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(41, 'apps-34.jpg', 'SIMCARD', 'Website', '1', '1', '2', '2', 'https://simcard.konaweselatankab.go.id/#/login', 'SIMCARD (Sistem Informasi Pencatatan dan Pendaftaran Penduduk)\r\nAplikasi permohonan pencatatan dan pendaftaran penduduk. bertujuan memudahkan masyarakat kabupaten konawe selatan dalam melakukan pencatatan atau pendaftaran penduduk', '2025-12-01 02:36:45.000', '2025-11-30 19:41:15.483'),
(42, 'app-1764530062347.jpeg', 'E-AUREL', 'Website', '1', '1', '1', '2', 'http://e-aurel.konaweselatankab.go.id/#/login', 'E-AUREL (Elektronik Audit dan Reviu Laporan)\r\nadalah sebuah aplikasi berbasis website yang dikelola oleh Inspektorat Daerah Kabupaten Konawe Selatan yang dirancang untuk mendukung proses audit internal dan reviu laporan keuangan, kinerja, atau laporan pertanggungjawaban lainnya dalam lingkungan pemerintahan.\r\nAplikasi ini memungkinkan auditor internal, inspektorat, maupun pihak pengawas lainnya untuk melakukan proses audit dan reviu secara sistematis, terdokumentasi, dan berbasis data digital, tanpa harus sepenuhnya mengandalkan dokumen fisik.', '2025-12-01 02:36:45.000', '2025-11-30 19:42:45.145'),
(43, 'app-1764530180868.png', 'E-RIDA', 'Website', '1', '1', '2', '1', 'https://e-rida.konaweselatankab.go.id/', 'E-RIDA (Elektronik Riset dan Inovasi Daerah)\r\nAplikasi ini digunakan untuk pendataan serta pengajuan permohonan riset dan inovasi daerah Kabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-11-30 19:16:20.979'),
(44, 'apps-37.jpg', 'Perak Konsel', 'Website', '1', '1', '2', '1', 'https://perak.konaweselatankab.go.id', 'PERAK KONSEL adalah aplikasi berbasis website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan\r\nAplikasi ini digunakan untuk memudahkan masyarakat dalam layanan pencetakan kartu kuning serta pencarian kerja yang ada \r\ndi Kabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-11-30 19:44:06.998'),
(45, 'apps-38.jpg', 'SIMBADA ', 'Website', '1', '1', '2', '1', 'https://simbada.konaweselatankab.go.id/#/login', 'SIMBADA (Sistem Informasi Batas Desa) adalah aplikasi berbasis website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan.\r\nAplikasi ini digunakan untuk memberikan batas-batas desa pada lingkup kabupaten Konawe Selatan, baik itu sanggahan batas desa, peta dasar, dan peta final', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(46, 'apps-39.jpg', 'SIPPADU', 'Website', '1', '1', '1', '2', 'https://sippadu.konaweselatankab.go.id/#/login', 'SIPPADU (Sistem Informasi Pengaduan Pelanggaran Perda dan Perkada Secara Terpadu) adalah aplikasi berbasis website yang \r\ndikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan. Aplikasi ini dikelola oleh Satua Polisi \r\nPamong Praja (SATPOL PP) Kabupaten Konawe Selatan yang digunakan masyarakat untuk melaporkan pengaduan terkait pelanggaran\r\nperatudan daerah', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(47, 'apps-40.jpg', 'Monev Pembangunan', 'Website', '1', '1', '2', '1', 'https://monev.konaweselatankab.go.id/#/login', 'E-MONEV Pembangunan adalah aplikasi berbasis website yang \r\ndikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan. Aplikasi ini dikelola oleh Bagian Administrasi Pembangunan, Sekretariat Daerah.\r\nAplikasi E-MONEV bertujuan untuk memonitoring serta mengevaluasi rencana pembangunan jangka panjang, pembangunan jangka menengah,  pembangunan jangka pendek, serta berfungsi untuk memantau serapan APBD secara konsisteten, efektif dan akurat', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(48, 'apps-41.jpg', 'Pelapooro-Konsel', 'Website', '1', '1', '1', '2', 'https://pelapooro.konaweselatankab.go.id/', 'PELAPOORO-KONSEL adalah aplikasi berbasis website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandian \r\nKabupaten Konawe Selatan. Whistle Blowing System (WBS) adalah Sistem pelaporan yang memungkinkan setiap pelapor untuk \r\nmelaporkan adanya dugaan tindakan korupsi, penyalahgunaan wewenang dan pelanggaran.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(49, 'apps-42.jpg', 'Sikola Pindara', 'Website', '1', '1', '1', '1', 'https://sikola-pindara.konaweselatankab.go.id/#/login', 'SIKOLA PINDARA (Sistem Informasi dan Tata Kelola Layanan Pendidikan Daerah)  adalah aplikasi berbasis website yang \r\ndikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan. Aplikasi SIKOLA PINDARA dikelola\r\noleh Dinas Pendidikan Kabupaten Konawe Selatan. \r\nAplikasi ini digunakan untuk memudahkan tenaga pendidik dalam pengurusan pengumpulan berkas tunjangan guru\r\n', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(50, 'apps-43.jpg', 'PPID', 'Website', '1', '1', '1', '1', 'http://ppid.konaweselatankab.go.id/', 'Cara baru yang lebih praktis untuk dapat informasi\r\nDapatkan Segala Jenis Informasi dan Dokumentasi, Langsung melalui Smartphone Anda Dimanapun dan Kapanpun!!', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(51, 'apps-44.jpg', 'SURVEY LAYANAN UKPBJ', 'Website', '2', '2', '1', '1', 'https://survei-layanan-ukpbj.konaweselatankab.go.id/', 'Website Ini Sedang dalam Perbaikan', '2025-12-01 02:36:45.000', '2025-11-30 19:23:33.874'),
(52, 'apps-45.jpg', 'E-Office', 'Website', '1', '1', '1', '2', 'http://www.e-office.konaweselatankab.go.id/#/login', 'E-Office adalah aplikasi yang dikembangkan dan dikelola Oleh Dinas Komunikasi Informatika dan Persandian \r\nKabupaten Konawe Selatan. Aplikasi Manajemen Persuratan (Tata Naskah Dinas Elektronik) Pemerintah Daerah \r\nKabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-11-30 20:24:45.045'),
(53, 'apps-46.jpg', 'E-Government', 'Website', '1', '1', '1', '1', 'http://e-government.konaweselatankab.go.id/#/monev_login', 'E-Government adalah aplikasi yang dikembangkan dan dikelola Oleh Dinas Komunikasi Informatika dan Persandian \r\nKabupaten Konawe Selatan. Aplikasi ini membarikan informasi dan data yang berkaitan smart city Kabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(54, 'apps-47.jpg', 'E-Agenda', 'Website', '1', '1', '1', '1', 'https://agenda.konaweselatankab.go.id/#/login', 'E-AGENDA  aplikasi yang dikembangkan Oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan dan\r\ndikelola oleh Sekretariat Daerah.\r\nAplikasi Agenda Bupati adalah sistem digital yang dirancang untuk membantu pengelolaan, pencatatan, dan publikasi\r\nkegiatan Bupati serta jajaran Pemerintah Daerah. Aplikasi ini menjadi bagian dari upaya penerapan SPBE \r\n(Sistem Pemerintahan Berbasis Elektronik) untuk mendukung keterbukaan informasi, efisiensi kerja, \r\ndan peningkatan pelayanan publik.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(55, 'apps-48.jpg', 'FILTERING BERANDA', 'Website', '1', '1', '1', '1', 'http://filtering-beranda.konaweselatankab.go.id/#/login', 'FILTERING BERANDA adalah Sistem yang terintegrasi pada semua portal berita Pemerintah Kabupaten Konawe Selatan baik milik Pemda maupun milik OPD. Aplikasi ini berfungsi sebagai media untuk melakukan penyaringan data informasi pada portal \r\npemerintah daerah baik yang dapat diakses melalui domain Pemerintah Daerah Kabupaten Konawe Selatan maupun yang dapat\r\ndiakses melalui subdomain pada portal resmi milik OPD, Sebelum berita tersebut dipublikasi pada masyarakat. Dengan adanya\r\naplikasi tersebut diharapkan dapan meminimalisir Informasi atau berita yang mengandung konten negative atau narasi yang dibuat\r\nuntuk menggiring kesebuah kepentingan sang pemilik sehingga mengabaikan unsur faktualisasidan aktualisasi dari informasi yang disajikan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(56, 'apps-49.jpg', 'LPPD', 'Website', '1', '1', '2', '1', 'https://lppd.konaweselatankab.go.id/#/login', 'LPPD (Laporan Penyelenggaraan Pemerintahan Daerah)  aplikasi yang dikembangkan Oleh Dinas Komunikasi Informatika\r\ndan Persandian Kabupaten Konawe Selatan dan dikelola Sekretariat Daerah Bagian Pemerintahan\r\nAplikasi ini digunakan untuk penyusunan Laporan Penyelenggaraan Pemerintahan Daerah Kabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(57, 'apps-50.jpg', 'SIKOMPAK', 'Website', '1', '1', '1', '1', 'https://sikonpak.konaweselatankab.go.id/#/login', 'SIKOMPAK(Sosialisasi dan Konsultasi Pajak) aplikasi yang dikembangkan Oleh Dinas Komunikasi Informatika\r\ndan Persandian Kabupaten Konawe Selatan dan dikelola oleh Inspektorat Daerah Kabupaten Konawe Selatan.\r\nAplikasi SIKOMPAK merupakan website yang digunakan untuk melakukan sosialisasi dan konsultasi pajak untuk \r\nOrganisasi Perangkat Daerah', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(58, 'apps-51.jpg', 'SIPESONA', 'Website', '1', '1', '1', '1', 'https://sipesona.konaweselatankab.go.id/#/login', 'Aplikasi Sipesona (Visit Konsel) adalah sistem informasi bagi pengunjung terkait destinasi wisata, rute wisata, produk wisata, \r\nkerajinan tangan, dan lain-lain yang dikembangkan oleh UMKM yang berada di Kabupaten Konawe Selatan.\r\nDikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan. ', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(59, 'apps-52.jpg', 'KUARTA', 'Website', '1', '1', '1', '1', 'https://kuarta.konaweselatankab.go.id/#/login', 'KUARTA Merupakan Sistem Informasi Manajemen terintegrasi yang mencakup Pengelolaan Sistem Informasi Daerah dalam \r\nPerencanaan, Penganggaran, Pelaporan dan Penatausahaan Keuangan Daerah.\r\nKuarta merupakan aplikasi berbasis website yang dikembangkan Dinas Komunikasi Informatika dan Persandian \r\nKabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(60, 'apps-53.jpg', 'Web SKPD Dinas Pemberdayaan Perempuan dan Anak Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dpppa.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan\r\nyang dikelola oleh Dinas Pemberdayaan Perempuan dan Anak Kab. Konawe Selatan. Website resmi yang memuat info grafis dan layanan publik terkait Pemberdayaan Perempuan dan Anak', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(61, 'apps-54.jpg', 'Web SKPD Dinas Perindustrian dan Perdagangan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://disperindag.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang dikelola oleh Dinas Perindustrian dan Perdagangan Kab. Konawe Selatan. Website resmi yang memuat info grafis dan layanan \r\npublik terkait Pengurusan Izin usaha dan pedagangan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(62, 'apps-55.jpg', 'Web SKPD Balai Latihan Kerja Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://blk.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Balai Latihan Kerja Kab. Konawe Selatan. Website resmi yang memuat infonformasi mengenai penyelenggaraan\r\npelatihan dan layanan publik terkait pendaftaran pelatihan-pelatihan peningkatan keterampilan dibidang industri.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(63, 'apps-56.jpg', 'Web SKPD Dinas Pemberdayaan Masyarakat Desa Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dpmd.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan \r\nyang dikelola oleh Dinas Pemberdayaan Masyarakat Desa Kab. Konawe Selatan. Website Resmi yang memuat informasi \r\nmengenai kegiatan dan Layanan Publik yang berkaitan dengan pemberdayaan masyarakat desa dan tata kelola pemerintahan\r\ndesa yang berada di Kabupaten Konawe Selatan', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(64, 'apps-57.jpg', 'Web SKPD Dinas Pengendalian Penduduk dan Keluarga Berencana Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dppkb.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Pengendalian Penduduk dan Keluarga Berencana Kab. Konawe Selatan. Website Resmi yang memuat informasi \r\nmengenai kegiatan, Program-program dan Layanan Publik yang berkaitan dengan kesejahteraan keluarga, Pelayanan Kontrasepsi,\r\nPil KB, Konseling Advokasi KIE, dan lain-lain.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(65, 'apps-58.jpg', 'Web SKPD Dinas Peternakan & Kesehatan Hewan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dpkh.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Peternakan & Kesehatan Hewan Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai kegiatan dan program-program yang di laksanakan oleh Dinas Peternakan & Kesehatan Hewan Kab. Konawe Selatan dan Layanan\r\nPublik mengenai Inseminasi Buatan, Pemeriksaan Kebuntingan, Pemeriksaan ATR, dan lain-lain.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(66, 'apps-59.jpg', 'Web Resmi Sekda Bagian Organisasi Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://ortala.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Sekretaris Daerah Bagian Organisasi Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai kegiatan dan program-program yang di laksanakan oleh Bagian Organisasi Kab. Konawe Selatan dan Layanan Akuntabilitas, Organisasi, Ketatalaksanaan, Analisis Jabatan dan lain-lain.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(67, 'apps-60.jpg', 'Web SKPD Dinas Komunikasi Informatika dan Persandian Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://diskominfo.konaweselatankab.go.id/', 'Aplikasi Berbasis Website yang dikembangkan dan dikelolah oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe\r\nSelatan yang memuat Informasi mengenai kegiatan dan program-program yang dilaksanakan oleh Dinas Komunikasi Informatika\r\ndan Persandiaan Kab. Konawe Selatan dan Layanan publik terkait aplikasi berbasis website dan android yang dikembangkan dan\r\ndikelola Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(68, 'apps-61.jpg', 'Web SKPD Dinas Pendidikan & Kebudayaan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://dikbud.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Pendidikan & Kebudayaan Kab. Konawe Selatan. Website resmi yang memuat informasi  mengenai Kegiatan\r\ndan program-program yang yang dilaksanakan oleh  Dinas Pendidikan & Kebudayaan Kab. Konawe Selatan dan layanan-layanan\r\nberkaitan dengan tenaga pendidik, sertifikasi dan lain-lain.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(69, 'apps-62.jpg', 'Web SKPD Badan Pembangunan dan Perencanaan Daerah Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://bappeda.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Badan Pembangunan dan Perencanaan Daerah Kab. Konawe Selatan. Website resmi yang memuat informasi \r\nmengenai Kegiatan dan program-program yang yang dilaksanakan oleh Badan Pembangunan dan Perencanaan Daerah Kab. Konawe Selatan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(70, 'apps-63.jpg', 'Web SKPD Dinas Kependudukan dan Catatan Sipil Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://disdukcapil.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Kependudukan dan Catatan Sipil Kab. Konawe Selatan. Website resmi yang memuat informasi  mengenai\r\nKegiatan dan program-program yang yang dilaksanakan oleh  Dinas Kependudukan dan Catatan Sipil Kab. Konawe Selatan dan\r\nLayanan Pendaftaran Penduduk serta pelayanan catatan sipil.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(71, 'apps-64.jpg', 'Web SKPD Dinas Lingkungan Hidup Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dlh.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Lingkungan Hidup Kab. Konawe Selatan. Website resmi yang memuat informasi mengenai\r\nKegiatan dan program-program yang yang dilaksanakan oleh Dinas Lingkungan Hidup Kab. Konawe Selatan dan Layanan\r\nrincian teknis tempat penyimpanan sementara LB3 dan Pelayanan Persampahan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(72, 'apps-65.jpg', 'Web SKPD Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dpmptsp.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan program-program yang yang dilaksanakan oleh Dinas Penanaman Modal dan Pelayanan \r\nTerpadu Satu Pintu Kab. Konawe Selatan dan Layanan izin mendirikan satuan pendidikan, izin penyelenggaraan satuan pendidikan\r\nnon formal, Izin Oprasional, izin praktek Apoteker, dan lain-lain.\r\n', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(73, 'apps-66.jpg', 'Web SKPD Dinas Sosial Kabupaten Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dinsos.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Sosial Kabupaten Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan program-program yang dilaksanakan oleh Dinas Sosial Kabupaten Konawe Selatan dan Layanan bidang penaganan fakir miskin, \r\nbidang penanganan fakir miskin, bidang perlindungan dan jaminan sosial, bidan rehabilitasi sosial dan lain-lain.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(74, 'apps-67.jpg', 'Web SKPD Dinas Tanaman Pangan Hortikultura dan Perkebunan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://dtphp.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Tanaman Pangan Hortikultura dan Perkebunan Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan program-program yang dilaksanakan oleh DDinas Tanaman Pangan Hortikultura dan Perkebunan \r\nKab. Konawe Selatan dan merumuskan dan melaksanakan kebijakan di bidang pertanian, termasuk tanaman pangan, hortikultura,\r\nperkebunan, serta prasarana dan sarana pertanian, termasuk penyuluhan pertanian. Selain itu, dinas ini juga bertanggung jawab\r\ndalam penyusunan programa penyuluhan pertanian', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(75, 'apps-68.jpg', 'Web SKPD Inspektorat Daerah Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://inspektorat.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Inspektorat Daerah Kabupaten Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan\r\nprogram-program yang dilaksanakan oleh Inspektorat Daerah Kabupaten Konawe Selatan dan Tugas dan layanan LHKPN/LHKASN\r\nrencana aksi daerah pemberantasan korupsi dan lain-lain.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(76, 'apps-69.jpg', 'Web SKPD Dinas Perhubungan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dishub.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Perhubungan Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan\r\nprogram-program yang dilaksanakan oleh Dinas Perhubungan Kab. Konawe Selatan dan Tugas perumusan kebijakan teknis di bidang perhubungan, penyelenggaran upaya peningkatan pelayanan publik di bidang perhubungan, dan lain-lain', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(77, 'apps-70.jpg', 'Web SKPD Dinas Koperasi dan UMKM Kab Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dinkop.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Koperasi dan UMKM Kab Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan\r\nprogram-program yang dilaksanakan oleh Dinas Koperasi dan UMKM Kab Konawe Selatan serta memberikan layanan berupa\r\nlayanan fasilitasi Koprasi dan UMKM, Layanan Koperasi, dan Layanan UMKM.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(78, 'apps-71.jpg', 'Web Rumah Sakit Umum Daerah Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://rsd.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Rumah Sakit Umum Daerah Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan\r\nprogram-program yang dilaksanakan oleh Rumah Sakit Umum Daerah Kab. Konawe Selatan serta memberikan pelayanan \r\npelayanan kesehatan, Sarana dan Prasaranan, dan setandar pelayanan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(79, 'apps-72.jpg', 'Web SKPD Dinas Perpustakaan dan Arsip Daerah Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://dpad.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Perpustakaan dan Arsip Daerah Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai\r\nKegiatan dan program-program yang dilaksanakan oleh Dinas Perpustakaan dan Arsip Daerah Kab. Konawe Selatan serta memberikan layanan membaca, layanan peminjaman buku, layanan story teling, Perpustakaan keliling, dan kerjasama \r\nantar Perpustakaan.\r\n', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(80, 'apps-73.jpg', 'Web SKPD UKPBJ Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://ukpbj.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh UKPBJ Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai Kegiatan dan program-program yang\r\ndilaksanakan oleh UKPBJ Kab. Konawe Selatan serta memberikan layanan konseling pengadaan barang dan jasa.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(81, 'apps-74.jpg', 'Web SKPD Dinas Perumahan, Kawasan, & Pertanahan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dpkp.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Perumahan, Kawasan, & Pertanahan Kab. Konawe Selatan. Website Resmi yang memuat informasi mengenai\r\nKegiatan dan program-program yang dilaksanakan oleh Dinas Perumahan, Kawasan, & Pertanahan Kab. Konawe Selatan \r\nserta memberikan layanan membaca, layanan Dokumen Pelaporan dan layanan Pertanahan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(82, 'apps-75.jpg', 'Web SKPD Dinas Kelautan dan Perikanan Kabupaten Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dkp.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Kelautan dan Perikanan Kabupaten Konawe Selatan. Website resmi yang memuat Informasi penting mengenai\r\nKegiatan dan program-program yang dilaksanakan oleh Dinas Kelautan dan Perikanan Kabupaten Konawe Selatan serta memberikan layanan kelayakan pengelolaan, sertifikasi budidaya ikan, pembenihan ikan, dan izin kapal pengangkutan ikan.\r\n', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(83, 'apps-76.jpg', 'Web SKPD Dinas Transmigrasi dan Tenaga Kerja Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://disnakertrans.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Transmigrasi dan Tenaga Kerja Kab. Konawe Selatan. Website resmi yang memuat informasi penting mengenai\r\nkegiatan dan program kerja yang dilaksanakan Dinas Transmigrasi dan Tenaga Kerja Kab. Konawe Selatan serta memberikan layanan publik berupa layanan pekerjaan, layanan peraturan, layanan hubungan industri, layanan pelatihan kerja, layanan \r\npenempatan tenaga kerja, dan layanan pengawasan tenaga kerja. ', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(84, 'apps-77.jpg', 'Web SKPD Satuan Polisi Pamong Praja Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://satpolpp.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Satuan Polisi Pamong Praja. Website resmi yang memuat informasi penting mengenai kegiatan dan program kerja\r\nSatuan Polisi Pamong Praja Kab. Konawe Selatan serta memberika layana terkait pengamanan dan ketertiban diwilayah\r\nKabupaten Konawe Selatan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(85, 'apps-78.jpg', 'Web SKPD Dinas Pariwisata dan Ekonomi Kreatif Kabupaten Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://disparekraf.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Pariwisata dan Ekonomi Kreatif Kabupaten Konawe Selatan.  Website resmi memuat informasi penting mengenai kegiatan dan program kerja Dinas Pariwisata dan Ekonomi Kreatif Kabupaten Konawe Selatan serta memberikan\r\nlayanan publik yang berkaitan dengan promosi tempat wisata dan promofi produk kreatif yang memliki nilai ekonomi yang baik.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(86, 'apps-79.jpg', 'Web SKPD Dinas Kesehatan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dinkes.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Kesehatan Kabupaten Konawe Selatan. Website resmi yang memberikan informasi penting mengenai kegiatan\r\ndan program kerja Dinas Kesehatan Kab. Konawe Selatan dan memberikan layanan publik yang berkaitan dengan peningkatan\r\nkesehatan masyarakat kabupaten Konawe Selatan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(87, 'apps-80.jpg', 'Web SKPD Badan Kesatuan Bangsa dan Politik Kab. Konawe Selatan Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://kesbangpol.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Badan Kesatuan Bangsa dan Politik Kab. Konawe Selatan. Website resmi yang memberikan\r\ninformasi penting mengenai kegiatan dan program kerja Badan Kesatuan Bangsa dan Politik Kab. Konawe Selatan dan memberikan\r\nlayanan publik yang berkaitan dengan Meningkatkan Kesadaran Hukum, Menciptakan Masyarakat yang Aman dan Tertib, dan\r\nMenciptakan Lingkungan yang Tentram dan Nyaman Bagi Seluruh Masyaraka kabupaten Konawe Selatan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(88, 'apps-81.jpg', 'Web SKPD Badan Riset dan Inovasi Daerah Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://brida.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Badan Riset dan Inovasi Daerah Kab. Konawe Selatan. Website resmi yang memberikan\r\ninformasi penting mengenai kegiatan dan program kerja  Badan Riset dan Inovasi Daerah Kab. Konawe Selatan dan memberikan\r\nlayanan publik yang berkaitan dengan kelitbangan daerah yang inovatif dan aplikatif dalam bidang sosial pemerintahan, ekonomi \r\ndan pembangunan serta inovasi dan teknologi.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(89, 'apps-82.jpg', 'Web SKPD Badan Pendapatan Daerah Kabupaten Konawe Selatan', 'Website', '1', '1', '1', '2', 'http://bapenda.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Badan Pendapatan Daerah Kabupaten Konawe Selatan. Website resmi yang memberikan informasi penting mengenai\r\nkegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan peningkatan Pendapatan Daerah di Bidang Perpajakan, Pengaduan Masyarakat Terkait Pajak Daerah, dan Visioner Terhadap Perubahan Untuk Mengembangkan Sistem\r\nPengelolaan Pajak Daerah Sehingga Pelayanan Publik Dibidang Pajak Daerah Mudah di Akses ', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(90, 'apps-83.jpg', 'Web SKPD Dinas Kepemudaan dan Olahraga Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dispora.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Kepemudaan dan Olahraga Kab. Konawe Selatan . Website resmi yang memberikan informasi penting \r\nmengenai kegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan data pemuda, data PPLPD, dan\r\nSarana Prasarana.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(91, 'apps-84.jpg', 'Web SKPD Badan Penanggulangan bencana daerah Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://bpbd.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Badan Penanggulangan bencana daerah Kab. Konawe Selatan. Website resmi yang memberikan informasi penting\r\nmengenai kegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan informasi tanggap bencana dan\r\npenanggulangan bencana.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(92, 'apps-85.jpg', 'Web SKPD Sekretariat DPRD Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dprd.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Sekretariat DPRD Kab. Konawe Selatan. Website resmi yang memberikan \r\ninformasi penting mengenai kegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan dokumen penting terhadap aturan yang telah diselesaikan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(93, 'apps-86.jpg', 'Web SKPD Dinas Ketahanan Pangan Kabupaten Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://ketapang.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Ketahanan Pangan Kabupaten Konawe Selatan. Website resmi yang memberikan informasi penting mengenai\r\nkegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan penyediaan data penting terkait ketahanan\r\npangan.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(94, 'apps-87.jpg', 'Web SKPD Dinas Pekerjaan Umum & Penataan Ruang Kabupaten Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://dpupr.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Pekerjaan Umum & Penataan Ruang Kabupaten Konawe Selatan . Website resmi yang memberikan informasi\r\npenting mengenai kegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan data hasil pekerjaan yang sudah terlaksana.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(95, 'apps-88.jpg', 'Web SKPD Badan Kepegawaian dan Pengembangan Sumber Daya Manusia Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://bkpsdm.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Badan Kepegawaian dan Pengembangan Sumber Daya Manusia Kab. Konawe Selatan . Website resmi yang\r\nmemberikan informasi penting mengenai kegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan\r\npegawai pemerintah Kab. Konawe Selatan', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(96, 'apps-89.jpg', 'Web SKPD Badan Keuangan dan Aset Daerah Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://bkad.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Badan Keuangan dan Aset Daerah Kab. Konawe Selatan. Website resmi yang memberikan informasi penting\r\nmengenai kegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan data dan dokumen transparansi \r\nAnggaran Daerah.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000'),
(97, 'apps-90.jpg', 'Web SKPD Dinas Pemadam Kebakaran Kab. Konawe Selatan', 'Website', '1', '1', '1', '2', 'https://damkar.konaweselatankab.go.id/#/', 'Aplikasi Berbasis Website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandiaan Kab. Konawe Selatan yang\r\ndikelola oleh Dinas Pemadam Kebakaran Kab. Konawe Selatan. Website resmi yang memberikan informasi penting\r\nmengenai kegiatan dan program kerja dan memberikan layanan publik yang berkaitan dengan lokasi kebakaran dan pertolongan\r\nselain memadamkan kebakaran.', '2025-12-01 02:36:45.000', '2025-12-01 02:36:45.000');
INSERT INTO `ms_application` (`id`, `image`, `title`, `type`, `status`, `availability`, `developer`, `category`, `tautanapp`, `desc`, `createdAt`, `updatedAt`) VALUES
(98, 'apps-91.jpg', 'Absensi Konsel', 'Mobile', '1', '1', '1', '2', 'https://drive.google.com/file/d/18hSCwJtqyTF6ZGQmVC92n0fXGOAdYKjS/view', 'Aplikasi Absensi Berbasis Lokasi untuk Kabupaten Konawe Selatan (Konsel) dirancang untuk memudahkan proses \r\nabsensi pegawai atau peserta dengan memanfaatkan lokasi geografis melalui teknologi GPS. Aplikasi ini bertujuan \r\nuntuk meningkatkan akurasi dan efisiensi dalam pengelolaan kehadiran, mengurangi kecurangan, serta memberikan transparansi \r\ndalam monitoring kehadiran.', '2025-12-01 02:36:45.000', '2025-11-30 18:51:13.037'),
(99, 'app-1764529808945.jpeg', 'E-Retribusi', 'Mobile', '1', '1', '2', '1', 'https://play.google.com/store/apps/details?id=com.konaweselatankab.eretribusi', 'E-Retribusi adalah aplikasi digital yang digunakan untuk mengelola pemungutan retribusi daerah secara elektronik. \r\nAplikasi ini mendukung transparansi, akuntabilitas, dan efektivitas pemungutan retribusi, sekaligus menjadi bagian dari implementasi \r\nSPBE (Sistem Pemerintahan Berbasis Elektronik) di daerah.', '2025-12-01 02:36:45.000', '2025-11-30 19:10:09.050'),
(100, 'apps-93.jpg', 'SIMBADA ', 'Mobile', '1', '1', '2', '1', 'https://play.google.com/store/apps/details?id=com.simbadakonselv2', 'SIMBADA (Sistem Informasi Batas Desa) adalah aplikasi berbasis website yang dikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan.\r\nAplikasi ini digunakan untuk memberikan batas-batas desa pada lingkup kabupaten Konawe Selatan, baik itu sanggahan batas desa, peta dasar, dan peta final', '2025-12-01 02:36:45.000', '2025-11-30 18:54:09.247'),
(101, 'apps-94.jpg', 'SIPPADU', 'Mobile', '1', '1', '2', '2', 'https://drive.google.com/file/d/1ISN-mOPpUVE9NZJ6kyAanAVYyE4vPk-Q/view?usp=sharing', 'SIPPADU (Sistem Informasi Pengaduan Pelanggaran Perda dan Perkada Secara Terpadu) adalah aplikasi berbasis website yang \r\ndikembangkan oleh Dinas Komunikasi Informatika dan Persandian Kabupaten Konawe Selatan. Aplikasi ini dikelola oleh Satua Polisi \r\nPamong Praja (SATPOL PP) Kabupaten Konawe Selatan yang digunakan masyarakat untuk melaporkan pengaduan terkait pelanggaran\r\nperatudan daerah', '2025-12-01 02:36:45.000', '2025-11-30 18:54:50.194'),
(102, 'apps-95.jpg', 'FIRETAP', 'Mobile', '1', '1', '2', '1', 'https://drive.google.com/file/d/1Ay_wpCE_ho4tOODoUUnjB-Wkh_uUYKtd/view', 'Aplikasi ini digunakan untuk penanganan pengaduan masayarakat secara realtime dengan memanfaatkan lokasi GPS dari pelapor dan satgas, sehingga proses penanganan laporan dapat lebih efektif dan efisien karena dipantau langsung pada Command Center Damkar-Mat', '2025-12-01 02:36:45.000', '2025-11-30 18:56:14.461');

-- --------------------------------------------------------

--
-- Table structure for table `ms_information`
--

CREATE TABLE `ms_information` (
  `id` int(11) NOT NULL,
  `tautanlink` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ms_information`
--

INSERT INTO `ms_information` (`id`, `tautanlink`, `image`, `createdAt`, `updatedAt`) VALUES
(5, 'https://konaweselatankab.go.id/', 'app-1764523728344.jpg', '2025-11-30 17:28:48.455', '2025-11-30 17:28:48.455'),
(6, 'https://play.google.com/store/apps/developer?id=Diskominfo+%26+Sandi+Kabupaten+Konawe+Selatan&hl=en', 'app-1764523879320.jpg', '2025-11-30 17:31:19.408', '2025-11-30 17:31:19.408'),
(7, 'https://diskominfo.konaweselatankab.go.id/', 'app-1764523912032.jpg', '2025-11-30 17:31:52.130', '2025-11-30 17:31:52.130'),
(8, 'https://dashboard-superapp.konaweselatankab.go.id', 'app-1764523927716.jpg', '2025-11-30 17:32:07.749', '2025-12-02 03:03:43.415');

-- --------------------------------------------------------

--
-- Table structure for table `ms_userrole`
--

CREATE TABLE `ms_userrole` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ms_userrole`
--

INSERT INTO `ms_userrole` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Super Admin', '0000-00-00 00:00:00.000', '0000-00-00 00:00:00.000'),
(2, 'Admin', '0000-00-00 00:00:00.000', '0000-00-00 00:00:00.000'),
(3, 'User', '0000-00-00 00:00:00.000', '0000-00-00 00:00:00.000');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userRoleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `createdAt`, `userRoleID`) VALUES
(1, 'dimasazani95@gmail.com', '$2b$10$qtkXncnVWiEpT3wh5Cmh5OtMKIH/jNDSK5.rkPlGsRBGWHFqw3xTm', 'Dimas Azani P', '2025-10-25 14:56:03.169', 1),
(2, 'sugionoadjah@gmail.com', '$2b$10$Yb4/GA.4gRj3.W0DqjDAteEzN.2uOdQ1fth98e7QVuRuL56dOI0Cq', 'Sarni Masrum', '2025-11-19 06:07:22.056', 2),
(4, 'ggmop001@gmail.com', '$2b$10$tlDIytuXp.0Hrig.sSL5durhncwlLHJ5ThjhMVC86w8O9Iq0ZS4za', 'Dimas', '2025-12-01 20:05:33.340', 2);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0886616d-734a-469d-8ab7-e5e20e8a3ac2', 'a3a528bea5435e243d65969a60f66df860ff4c8645375172bd341afca85cca2a', '2025-10-25 14:45:58.992', '20251011191537_init', NULL, NULL, '2025-10-25 14:45:58.925', 1),
('0d22a8ba-38fa-416d-b303-878c6bc59b5a', '957f5735b84267f3c3b77051737518a5edb939fa4ffddc7a1665f4ed5eb7d4da', '2025-10-25 14:45:59.077', '20251025085836_create_ms_application_table', NULL, NULL, '2025-10-25 14:45:59.004', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lk_availability`
--
ALTER TABLE `lk_availability`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lk_category`
--
ALTER TABLE `lk_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lk_developer`
--
ALTER TABLE `lk_developer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lk_status`
--
ALTER TABLE `lk_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ms_application`
--
ALTER TABLE `ms_application`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ms_information`
--
ALTER TABLE `ms_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ms_userrole`
--
ALTER TABLE `ms_userrole`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lk_availability`
--
ALTER TABLE `lk_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lk_category`
--
ALTER TABLE `lk_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lk_developer`
--
ALTER TABLE `lk_developer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lk_status`
--
ALTER TABLE `lk_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ms_application`
--
ALTER TABLE `ms_application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `ms_information`
--
ALTER TABLE `ms_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ms_userrole`
--
ALTER TABLE `ms_userrole`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
